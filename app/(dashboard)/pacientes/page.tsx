"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, Search, Users, UserCheck, Calendar, TrendingUp, Filter, Download, Grid3x3, List, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PacientesTable } from "@/components/features/patients/pacientes-table"
import { PacientesList } from "@/components/features/patients/pacientes-list"
import { Pagination } from "@/components/features/patients/pagination"
import { PatientService } from "@/lib/services/patient.service"
import type { Patient } from "@/lib/types/paciente"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast, ToastContainer } from "@/components/ui/toast"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function PacientesPage() {
  const router = useRouter()
  const { toasts, success, error: showError, closeToast } = useToast()
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [totalPatients, setTotalPatients] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    withInsurance: 0,
    insurancePercentage: 0,
    thisMonth: 0,
  })
  const pageSize = 10

  // Cargar pacientes desde la API
  useEffect(() => {
    loadPatients()
    loadStats()
  }, [currentPage, searchTerm])

  const loadPatients = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const patientService = PatientService.getInstance()
      const response = await patientService.getPatients({
        page: currentPage,
        limit: pageSize,
        search: searchTerm || undefined,
      })
      
      setPatients(response.patients)
      setTotalPatients(response.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar pacientes')
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const patientService = PatientService.getInstance()
      const apiStats = await patientService.getStats()
      
      setStats({
        total: apiStats.total || 0,
        active: apiStats.active || 0,
        withInsurance: apiStats.withInsurance || 0,
        insurancePercentage: apiStats.total > 0 
          ? Math.round((apiStats.withInsurance / apiStats.total) * 100) 
          : 0,
        thisMonth: apiStats.byStatus?.approved || 0,
      })
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  const totalPages = Math.ceil(totalPatients / pageSize)

  const handleEdit = (patient: Patient) => {
    router.push(`/pacientes/${patient.id}/editar`)
  }

  const handleDelete = (patient: Patient) => {
    setPatientToDelete(patient)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!patientToDelete) return
    
    try {
      setIsDeleting(true)
      const patientService = PatientService.getInstance()
      await patientService.deletePatient(patientToDelete.id)
      
      success(
        'Paciente eliminado',
        `${patientToDelete.firstName} ${patientToDelete.lastName} ha sido eliminado correctamente`
      )
      
      setDeleteDialogOpen(false)
      setPatientToDelete(null)
      await loadPatients()
      await loadStats()
    } catch (err) {
      showError(
        'Error al eliminar',
        err instanceof Error ? err.message : 'No se pudo eliminar el paciente'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
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
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Nuevo Paciente
              </Button>
              <Button 
                onClick={() => {
                  loadPatients()
                  loadStats()
                  success('Datos actualizados', 'La lista de pacientes se ha recargado')
                }}
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                disabled={isLoading}
              >
                <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                Actualizar
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

      {/* Estado de error */}
      {error && (
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Error al cargar pacientes</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                loadPatients()
                loadStats()
              }} 
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          </div>
        </Card>
      )}

      {/* Estado de carga con skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {viewMode === 'table' ? (
            <Card className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 flex-1" />
                      <Skeleton className="h-9 flex-1" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && !error && patients?.length === 0 && searchTerm && (
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
      {!isLoading && !error && patients && patients.length > 0 && (
        <>
          {/* Vista de tabla para desktop */}
          <div className={viewMode === 'table' ? 'block' : 'hidden md:block'}>
            <div className="hidden md:block">
              <PacientesTable
                patients={patients}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>

          {/* Vista de cards para móvil o modo grid */}
          <div className={viewMode === 'grid' ? 'block' : 'block md:hidden'}>
            <PacientesList
              patients={patients}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            total={totalPatients}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Estado vacío */}
      {!isLoading && !error && (!patients || patients.length === 0) && !searchTerm && (
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

      {/* Dialog de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar paciente?</DialogTitle>
            <DialogDescription>
              {patientToDelete && (
                <span>
                  Esta acción eliminará permanentemente a{' '}
                  <span className="font-semibold text-gray-900">
                    {patientToDelete.firstName} {patientToDelete.lastName}
                  </span>{' '}
                  (DNI: {patientToDelete.documentId}). Esta acción no se puede deshacer.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setPatientToDelete(null)
              }}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                'Eliminar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  )
}
