"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { PatientWizard } from "@/components/features/patients/paciente-wizard"
import { PatientService } from "@/lib/services/patient.service"
import type { PatientFormData } from "@/lib/types/paciente"

export default function EditarPacientePage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string
  const [initialData, setInitialData] = useState<Partial<PatientFormData> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadPatient()
  }, [patientId])

  const loadPatient = async () => {
    try {
      setLoading(true)
      setError(null)
      const patientService = PatientService.getInstance()
      const patient = await patientService.getPatientById(patientId)
      
      // Convertir Patient de la API al formato del formulario
      const formData = patientService.convertPatientToFormData(patient)
      setInitialData(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar paciente')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePatient = async (formData: PatientFormData, mode: 'create' | 'edit') => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      const patientService = PatientService.getInstance()
      await patientService.updatePatient(patientId, formData)
      
      // Redirigir a la lista de pacientes
      router.push("/pacientes")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar paciente')
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/pacientes")
  }

  if (loading || !initialData) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Breadcrumbs
          items={[
            { label: "Pacientes", href: "/pacientes" },
            { label: "Editar Paciente" },
          ]}
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando datos del paciente...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Breadcrumbs
        items={[
          { label: "Pacientes", href: "/pacientes" },
          { label: "Editar Paciente" },
        ]}
      />
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      <PatientWizard
        mode="edit"
        initialData={initialData}
        onClose={handleCancel}
        onSuccess={handleUpdatePatient}
      />
    </div>
  )
}
