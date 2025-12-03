"use client"

import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { AppointmentWizard } from "@/components/features/appointments/appointment-wizard"

export default function CreateAppointmentPage() {
  // Mock patients - TODO: Fetch from API
  const patients = [
    { id: '1', firstName: 'Juan', lastName: 'Pérez' },
    { id: '2', firstName: 'María', lastName: 'García' },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <Breadcrumbs
        items={[
          { label: "Turnos", href: "/turnos" },
          { label: "Crear Turno" },
        ]}
      />

      <AppointmentWizard patients={patients} />
    </div>
  )
}
