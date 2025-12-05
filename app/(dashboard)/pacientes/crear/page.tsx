"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { PatientWizard } from "@/components/features/patients/paciente-wizard"
import { PatientService } from "@/lib/services/patient.service"
import type { PatientFormData } from "@/lib/types/paciente"

export default function CrearPacientePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreatePatient = async (formData: PatientFormData, mode: 'create' | 'edit') => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      const patientService = PatientService.getInstance()
      await patientService.createPatient(formData)
      
      // Redirigir a la lista de pacientes
      router.push("/pacientes")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear paciente')
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/pacientes")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Breadcrumbs
        items={[
          { label: "Pacientes", href: "/pacientes" },
          { label: "Crear Paciente" },
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
        mode="create"
        onClose={handleCancel}
        onSuccess={handleCreatePatient}
      />
    </div>
  )
}
