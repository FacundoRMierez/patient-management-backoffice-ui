"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { PatientWizard } from "@/components/features/patients/paciente-wizard"
import type { PatientFormData, Patient } from "@/lib/types/paciente"

export default function EditarPacientePage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string
  const [initialData, setInitialData] = useState<Partial<PatientFormData> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Aquí irá la llamada a la API para obtener el paciente (GET)
    // const response = await fetch(`/api/pacientes/${patientId}`)
    // const patient: Patient = await response.json()
    
    // Simulación de datos del paciente (mock)
    const mockPatient: Patient = {
      id: patientId,
      documentId: "12345678",
      firstName: "Juan",
      lastName: "Pérez",
      birthDate: new Date("2010-05-15"),
      address: "Av. Corrientes 1234, CABA",
      phone: "+54 9 11 1234-5678",
      healthInsurance: {
        hasInsurance: true,
        name: "OSDE",
        memberNumber: "123456789",
      },
      parentA: {
        firstName: "María",
        lastName: "Pérez",
        documentId: "98765432",
        phone: "+54 9 11 8765-4321",
      },
      legalGuardian: "A",
      schoolData: {
        schoolName: "Escuela Primaria N° 1",
        location: "Av. Belgrano 500, CABA",
        grade: "6° Grado",
      },
      registrationDate: new Date("2024-01-15"),
      lastUpdate: new Date("2024-12-01"),
      active: true,
    }

    // Convertir Patient to PatientFormData
    const formData: Partial<PatientFormData> = {
      documentId: mockPatient.documentId,
      firstName: mockPatient.firstName,
      lastName: mockPatient.lastName,
      birthDate: mockPatient.birthDate.toISOString().split('T')[0],
      address: mockPatient.address,
      phone: mockPatient.phone || '',
      email: mockPatient.email || '',
      
      hasInsurance: mockPatient.healthInsurance.hasInsurance,
      insuranceName: mockPatient.healthInsurance.name || '',
      memberNumber: mockPatient.healthInsurance.memberNumber || '',
      
      parentA_firstName: mockPatient.parentA.firstName,
      parentA_lastName: mockPatient.parentA.lastName,
      parentA_documentId: mockPatient.parentA.documentId,
      parentA_phone: mockPatient.parentA.phone,
      parentA_email: mockPatient.parentA.email || '',
      parentA_occupation: mockPatient.parentA.occupation || '',
      
      hasParentB: !!mockPatient.parentB,
      parentB_firstName: mockPatient.parentB?.firstName || '',
      parentB_lastName: mockPatient.parentB?.lastName || '',
      parentB_documentId: mockPatient.parentB?.documentId || '',
      parentB_phone: mockPatient.parentB?.phone || '',
      parentB_email: mockPatient.parentB?.email || '',
      parentB_occupation: mockPatient.parentB?.occupation || '',
      
      legalGuardian: mockPatient.legalGuardian,
      
      hasSchool: !!mockPatient.schoolData,
      schoolName: mockPatient.schoolData?.schoolName || '',
      schoolLocation: mockPatient.schoolData?.location || '',
      grade: mockPatient.schoolData?.grade || '',
      observations: mockPatient.schoolData?.observations || '',
    }

    setInitialData(formData)
    setLoading(false)
  }, [patientId])

  const handleUpdatePatient = (formData: PatientFormData, mode: 'create' | 'edit') => {
    console.log("Actualizar paciente:", patientId, formData)
    
    // TODO: Aquí irá la llamada a la API para actualizar el paciente (PUT)
    // await fetch(`/api/pacientes/${patientId}`, { 
    //   method: 'PUT', 
    //   body: JSON.stringify(formData) 
    // })
    
    // Redirigir a la lista de pacientes
    router.push("/pacientes")
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
      <PatientWizard
        mode="edit"
        initialData={initialData}
        onClose={handleCancel}
        onSuccess={handleUpdatePatient}
      />
    </div>
  )
}
