"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PacientesTable } from "@/components/features/patients/pacientes-table"
import { PacientesList } from "@/components/features/patients/pacientes-list"
import { Pagination } from "@/components/features/patients/pagination"
import type { Patient } from "@/lib/types/paciente"

export default function PacientesPage() {
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
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
    },
    {
      id: "2",
      documentId: "87654321",
      firstName: "María",
      lastName: "García",
      birthDate: new Date("2012-08-20"),
      address: "Calle Falsa 123, CABA",
      healthInsurance: {
        hasInsurance: false,
      },
      parentA: {
        firstName: "Ana",
        lastName: "García",
        documentId: "45678912",
        phone: "+54 9 11 4567-8912",
      },
      legalGuardian: "A",
      registrationDate: new Date("2024-02-10"),
      lastUpdate: new Date("2024-11-28"),
      active: true,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const filteredPatients = patients.filter((p) =>
    `${p.documentId}${p.firstName}${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPatients.length / pageSize)
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleEdit = (patient: Patient) => {
    router.push(`/pacientes/${patient.id}/editar`)
  }

  const handleDelete = (patient: Patient) => {
    if (confirm(`¿Está seguro que desea eliminar a ${patient.firstName} ${patient.lastName}?`)) {
      setPatients(patients.filter(p => p.id !== patient.id))
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Gestiona la información de tus pacientes
          </p>
        </div>
        <Button onClick={() => router.push("/pacientes/crear")} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por DNI, nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
      </Card>

      {/* Vista de tabla para desktop */}
      <div className="hidden md:block">
        <PacientesTable
          patients={paginatedPatients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Vista de cards para móvil */}
      <div className="block md:hidden">
        <PacientesList
          patients={paginatedPatients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          total={filteredPatients.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
