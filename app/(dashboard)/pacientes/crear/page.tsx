"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { PatientWizard } from "@/components/features/patients/paciente-wizard"
import { PatientService } from "@/lib/services/patient.service"
import type { PatientFormData } from "@/lib/types/paciente"
import { useToast, ToastContainer } from "@/components/ui/toast"

export default function CrearPacientePage() {
  const router = useRouter()
  const { toasts, success, error: showError, closeToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreatePatient = async (formData: PatientFormData, mode: 'create' | 'edit') => {
    try {
      setIsSubmitting(true)
      
      const patientService = PatientService.getInstance()
      await patientService.createPatient(formData)
      
      success(
        'Paciente creado exitosamente',
        `${formData.firstName} ${formData.lastName} ha sido agregado al sistema`
      )
      
      // Pequeño delay para que se vea el toast antes de navegar
      setTimeout(() => {
        router.push("/pacientes")
      }, 800)
    } catch (err) {
      showError(
        'Error al crear paciente',
        err instanceof Error ? err.message : 'No se pudo crear el paciente'
      )
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/pacientes")
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
      <div className="space-y-4 sm:space-y-6">
        <Breadcrumbs
          items={[
            { label: "Pacientes", href: "/pacientes" },
            { label: "Crear Paciente" },
          ]}
        />
        
        <PatientWizard
          mode="create"
          onClose={handleCancel}
          onSuccess={handleCreatePatient}
        />
      </div>
    </>
  )
}
