"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { PatientWizard } from "@/components/features/patients/paciente-wizard"
import { PatientService } from "@/lib/services/patient.service"
import type { PatientFormData } from "@/lib/types/paciente"
import { useToast, ToastContainer } from "@/components/ui/toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function EditarPacientePage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string
  const { toasts, success, error: showError, closeToast } = useToast()
  const [initialData, setInitialData] = useState<Partial<PatientFormData> | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadPatient()
  }, [patientId])

  const loadPatient = async () => {
    try {
      setLoading(true)
      const patientService = PatientService.getInstance()
      const patient = await patientService.getPatientById(patientId)
      
      // Convertir Patient de la API al formato del formulario
      const formData = patientService.convertPatientToFormData(patient)
      setInitialData(formData)
    } catch (err) {
      showError(
        'Error al cargar paciente',
        err instanceof Error ? err.message : 'No se pudieron cargar los datos del paciente'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePatient = async (formData: PatientFormData, mode: 'create' | 'edit') => {
    try {
      setIsSubmitting(true)
      
      const patientService = PatientService.getInstance()
      await patientService.updatePatient(patientId, formData)
      
      success(
        'Cambios guardados',
        `Los datos de ${formData.firstName} ${formData.lastName} han sido actualizados`
      )
      
      // Pequeño delay para que se vea el toast antes de navegar
      setTimeout(() => {
        router.push("/pacientes")
      }, 800)
    } catch (err) {
      showError(
        'Error al actualizar',
        err instanceof Error ? err.message : 'No se pudieron guardar los cambios'
      )
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/pacientes")
  }

  if (loading || !initialData) {
    return (
      <>
        <ToastContainer toasts={toasts} onClose={closeToast} />
        
        <div className="space-y-4 sm:space-y-6">
          <Breadcrumbs
            items={[
              { label: "Pacientes", href: "/pacientes" },
              { label: "Editar Paciente" },
            ]}
          />
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
      <div className="space-y-4 sm:space-y-6">
        <Breadcrumbs
          items={[
            { label: "Pacientes", href: "/pacientes" },
            { label: "Editar Paciente" },
          ]}
        />
        
        <PatientWizard
          mode="edit"
          initialData={initialData}
          onClose={handleCancel}
          onSuccess={handleUpdatePatient}
        />
      </div>
    </>
  )
}
