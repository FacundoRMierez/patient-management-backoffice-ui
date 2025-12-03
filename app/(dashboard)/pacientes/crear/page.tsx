"use client"

import { useRouter } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { PatientWizard } from "@/components/features/patients/paciente-wizard"
import type { PatientFormData } from "@/lib/types/paciente"

export default function CrearPacientePage() {
  const router = useRouter()

  const handleCreatePatient = (formData: PatientFormData, mode: 'create' | 'edit') => {
    console.log("Nuevo paciente:", formData)
    
    // TODO: Aquí irá la llamada a la API para crear el paciente (POST)
    // await fetch('/api/pacientes', { method: 'POST', body: JSON.stringify(formData) })
    
    // Redirigir a la lista de pacientes
    router.push("/pacientes")
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
      <PatientWizard
        mode="create"
        onClose={handleCancel}
        onSuccess={handleCreatePatient}
      />
    </div>
  )
}
