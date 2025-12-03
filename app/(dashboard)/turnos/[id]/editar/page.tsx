"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { AppointmentForm } from "@/components/features/appointments/appointment-form"
import type { AppointmentFormData, Appointment } from "@/lib/types/appointment"

export default function EditAppointmentPage() {
  const router = useRouter()
  const params = useParams()
  const appointmentId = params.id as string
  const [initialData, setInitialData] = useState<Partial<AppointmentFormData> | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock patients - TODO: Fetch from API
  const patients = [
    { id: '1', firstName: 'Juan', lastName: 'Pérez' },
    { id: '2', firstName: 'María', lastName: 'García' },
  ]

  useEffect(() => {
    // TODO: Fetch appointment data from API
    // const response = await fetch(`/api/appointments/${appointmentId}`)
    // const appointment: Appointment = await response.json()

    // Mock data
    const mockAppointment: Appointment = {
      id: appointmentId,
      patientId: '1',
      patientName: 'Juan Pérez',
      date: new Date(2025, 11, 5, 10, 0),
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      type: 'single',
      paymentType: 'insurance',
      price: 5000,
      insuranceName: 'OSDE',
      status: 'scheduled',
      observations: 'Primera consulta',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Convert to form data
    const formData: Partial<AppointmentFormData> = {
      patientId: mockAppointment.patientId,
      date: mockAppointment.date.toISOString().split('T')[0],
      startTime: mockAppointment.startTime,
      endTime: mockAppointment.endTime,
      type: mockAppointment.type,
      paymentType: mockAppointment.paymentType,
      price: mockAppointment.price.toString(),
      insuranceName: mockAppointment.insuranceName,
      observations: mockAppointment.observations,
    }

    setInitialData(formData)
    setLoading(false)
  }, [appointmentId])

  const handleUpdateAppointment = (formData: AppointmentFormData) => {
    console.log('Updating appointment:', appointmentId, formData)
    
    // TODO: API call to update appointment (PUT)
    // await fetch(`/api/appointments/${appointmentId}`, { 
    //   method: 'PUT', 
    //   body: JSON.stringify(formData) 
    // })
    
    router.push('/turnos')
  }

  const handleCancel = () => {
    router.push('/turnos')
  }

  if (loading || !initialData) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Breadcrumbs
          items={[
            { label: "Turnos", href: "/turnos" },
            { label: "Editar Turno" },
          ]}
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando turno...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Breadcrumbs
        items={[
          { label: "Turnos", href: "/turnos" },
          { label: "Editar Turno" },
        ]}
      />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Editar Turno</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          Modifica los detalles del turno
        </p>
      </div>

      <AppointmentForm
        initialData={initialData}
        patients={patients}
        onSubmit={handleUpdateAppointment}
        onCancel={handleCancel}
      />
    </div>
  )
}
