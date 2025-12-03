"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Calendar as CalendarIcon, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppointmentCalendar } from "@/components/features/appointments/appointment-calendar"
import { AppointmentMobileList } from "@/components/features/appointments/appointment-mobile-list"
import { AppointmentFilters } from "@/components/features/appointments/appointment-filters"
import { cn } from "@/lib/utils"
import type { Appointment } from "@/lib/types/appointment"

export default function AppointmentsPage() {
  const router = useRouter()
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [mobileView, setMobileView] = useState<'list' | 'calendar'>('list')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [patientFilter, setPatientFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1)
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear())

  // Mock data - TODO: Replace with API call
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'María García',
      date: new Date(2025, 11, 5, 14, 0),
      startTime: '14:00',
      endTime: '15:00',
      duration: 60,
      type: 'single',
      paymentType: 'private',
      price: 8000,
      status: 'scheduled',
      observations: 'Primera consulta',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      patientId: '1',
      patientName: 'Juan Pérez',
      date: new Date(2025, 11, 10, 10, 0),
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      type: 'recurring',
      paymentType: 'insurance',
      price: 5000,
      insuranceName: 'OSDE',
      status: 'scheduled',
      parentAppointmentId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const filteredAppointments = appointments.filter(apt => {
    const matchesPatient = !patientFilter || 
      apt.patientName.toLowerCase().includes(patientFilter.toLowerCase())
    
    const aptDate = new Date(apt.date)
    const matchesMonth = aptDate.getMonth() + 1 === monthFilter
    const matchesYear = aptDate.getFullYear() === yearFilter

    return matchesPatient && matchesMonth && matchesYear
  })

  const handleAppointmentClick = (appointment: Appointment) => {
    // TODO: Open appointment detail modal or navigate to edit page
    console.log('Appointment clicked:', appointment)
    router.push(`/turnos/${appointment.id}/editar`)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Turnos</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Gestiona los turnos de tus pacientes
          </p>
        </div>
        <Button onClick={() => router.push('/turnos/crear')} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Nuevo Turno
        </Button>
      </div>

      {/* Mobile View Toggle - Only visible on mobile */}
      <div className="sm:hidden flex rounded-lg border border-gray-300 overflow-hidden">
        <button
          onClick={() => setMobileView('list')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
            mobileView === 'list'
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 active:bg-gray-50"
          )}
        >
          <List className="h-4 w-4" />
          Lista
        </button>
        <button
          onClick={() => setMobileView('calendar')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-l border-gray-300",
            mobileView === 'calendar'
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 active:bg-gray-50"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          Calendario
        </button>
      </div>

      {/* Filters */}
      <AppointmentFilters
        patientFilter={patientFilter}
        monthFilter={monthFilter}
        yearFilter={yearFilter}
        onPatientChange={setPatientFilter}
        onMonthChange={setMonthFilter}
        onYearChange={setYearFilter}
      />

      {/* Desktop Calendar - Hidden on mobile */}
      <div className="hidden sm:block">
        <AppointmentCalendar
          appointments={filteredAppointments}
          view={view}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onViewChange={setView}
          onAppointmentClick={handleAppointmentClick}
        />
      </div>

      {/* Mobile Views */}
      <div className="sm:hidden">
        {mobileView === 'list' ? (
          <AppointmentMobileList
            appointments={filteredAppointments}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onAppointmentClick={handleAppointmentClick}
          />
        ) : (
          <AppointmentCalendar
            appointments={filteredAppointments}
            view={view}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onViewChange={setView}
            onAppointmentClick={handleAppointmentClick}
          />
        )}
      </div>

      {/* Stats - Hidden on mobile when in list view */}
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-3 gap-4",
        mobileView === 'list' && "hidden sm:grid"
      )}>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Turnos Programados</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {filteredAppointments.filter(a => a.status === 'scheduled').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Turnos Completados</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {filteredAppointments.filter(a => a.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total del Mes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${filteredAppointments.reduce((sum, apt) => sum + apt.price, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
