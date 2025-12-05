"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, Search, Users, UserCheck, Calendar, TrendingUp, Filter, Download, Grid3x3, List } from "lucide-react"
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
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const pageSize = 10

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = patients.length
    const active = patients.filter(p => p.active).length
    const withInsurance = patients.filter(p => p.healthInsurance.hasInsurance).length
    const thisMonth = patients.filter(p => {
      const registrationMonth = new Date(p.registrationDate).getMonth()
      const currentMonth = new Date().getMonth()
      return registrationMonth === currentMonth
    }).length

    return {
      total,
      active,
      withInsurance,
      insurancePercentage: total > 0 ? Math.round((withInsurance / total) * 100) : 0,
      thisMonth,
    }
  }, [patients])

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
    <div className="space-y-6">
      {/* Header con gradiente */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-xl">
        {/* Decoraciones de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">Pacientes</h1>
                  <p className="text-blue-100 text-sm mt-1">
                    Gestiona la información de tus pacientes de forma centralizada
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => router.push("/pacientes/crear")}
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Nuevo Paciente
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total de Pacientes */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">Registros totales</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Pacientes Activos */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stats.thisMonth} este mes
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Con Obra Social */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Con Obra Social</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.withInsurance}</p>
              <p className="text-xs text-purple-600 mt-1">
                {stats.insurancePercentage}% del total
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Nuevos este Mes */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Nuevos este Mes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.thisMonth}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString('es-ES', { month: 'long' })}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Búsqueda y Controles */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Barra de búsqueda */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por DNI, nombre o apellido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Controles de vista */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Vista:</span>
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Mensaje cuando no hay resultados */}
      {filteredPatients.length === 0 && searchTerm && (
        <Card className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mb-6">
              No hay pacientes que coincidan con "{searchTerm}"
            </p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Limpiar búsqueda
            </Button>
          </div>
        </Card>
      )}

      {/* Contenido principal */}
      {filteredPatients.length > 0 && (
        <>
          {/* Vista de tabla para desktop */}
          <div className={viewMode === 'table' ? 'block' : 'hidden md:block'}>
            <div className="hidden md:block">
              <PacientesTable
                patients={paginatedPatients}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>

          {/* Vista de cards para móvil o modo grid */}
          <div className={viewMode === 'grid' ? 'block' : 'block md:hidden'}>
            <PacientesList
              patients={paginatedPatients}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            total={filteredPatients.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Estado vacío */}
      {patients.length === 0 && !searchTerm && (
        <Card className="p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay pacientes registrados
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Comienza agregando tu primer paciente para gestionar su información médica
            </p>
            <Button onClick={() => router.push("/pacientes/crear")} size="lg">
              <UserPlus className="mr-2 h-5 w-5" />
              Agregar Primer Paciente
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
