"use client"

import { useRouter } from "next/navigation"
import { Clock, DollarSign, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Appointment } from "@/lib/types/appointment"

interface AppointmentMobileListProps {
  appointments: Appointment[]
  currentDate: Date
  onDateChange: (date: Date) => void
  onAppointmentClick: (appointment: Appointment) => void
}

export function AppointmentMobileList({
  appointments,
  currentDate,
  onDateChange,
  onAppointmentClick,
}: AppointmentMobileListProps) {
  const router = useRouter()

  // Group appointments by date
  const groupedAppointments = appointments.reduce((groups, appointment) => {
    const dateKey = new Date(appointment.date).toDateString()
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(appointment)
    return groups
  }, {} as Record<string, Appointment[]>)

  // Sort dates
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana'
    } else {
      return date.toLocaleDateString('es-AR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      })
    }
  }

  const getDayStats = (dateAppointments: Appointment[]) => {
    const total = dateAppointments.length
    const completed = dateAppointments.filter(a => a.status === 'completed').length
    const revenue = dateAppointments
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.price, 0)
    
    return { total, completed, revenue }
  }

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">No hay turnos programados</p>
        <Button onClick={() => router.push('/turnos/crear')}>
          Crear Turno
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-20">
      {sortedDates.map(dateKey => {
        const dateAppointments = groupedAppointments[dateKey]
        const stats = getDayStats(dateAppointments)
        const isToday = new Date(dateKey).toDateString() === new Date().toDateString()

        return (
          <div key={dateKey} className="space-y-2">
            {/* Date Header */}
            <div className="sticky top-0 z-10 bg-gray-50 -mx-3 px-3 py-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className={cn(
                    "font-semibold capitalize",
                    isToday ? "text-blue-600" : "text-gray-900"
                  )}>
                    {formatDate(dateKey)}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {stats.total} {stats.total === 1 ? 'turno' : 'turnos'}
                  </Badge>
                </div>
                {stats.completed > 0 && (
                  <span className="text-xs text-gray-600">
                    ${stats.revenue.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Appointments */}
            <div className="space-y-2">
              {dateAppointments
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(appointment => (
                  <Card
                    key={appointment.id}
                    className={cn(
                      "p-3 border-l-4 cursor-pointer active:scale-[0.98] transition-transform",
                      appointment.status === 'scheduled' && "border-l-blue-500 bg-blue-50/50",
                      appointment.status === 'completed' && "border-l-green-500 bg-green-50/50 opacity-80",
                      appointment.status === 'cancelled' && "border-l-red-500 bg-red-50/50 opacity-60"
                    )}
                    onClick={() => onAppointmentClick(appointment)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Time badge */}
                      <div className="shrink-0">
                        <div className={cn(
                          "rounded-lg px-2 py-1.5 text-center min-w-[60px]",
                          appointment.status === 'scheduled' && "bg-blue-100",
                          appointment.status === 'completed' && "bg-green-100",
                          appointment.status === 'cancelled' && "bg-red-100"
                        )}>
                          <div className="text-lg font-bold text-gray-900 leading-none">
                            {appointment.startTime.split(':')[0]}
                          </div>
                          <div className="text-xs text-gray-600">
                            {appointment.startTime.split(':')[1]}
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {appointment.patientName}
                          </h4>
                          <span className="text-sm font-medium text-gray-900 shrink-0">
                            ${appointment.price.toLocaleString()}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.startTime} - {appointment.endTime}</span>
                            <span className="text-gray-400">•</span>
                            <span>{appointment.duration} min</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <DollarSign className="h-3 w-3" />
                            <span>
                              {appointment.paymentType === 'insurance' 
                                ? appointment.insuranceName 
                                : 'Particular'}
                            </span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {appointment.status === 'completed' && (
                            <Badge variant="success" className="text-xs">
                              Completado
                            </Badge>
                          )}
                          {appointment.status === 'cancelled' && (
                            <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                              Cancelado
                            </Badge>
                          )}
                          {appointment.type === 'recurring' && (
                            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                              Recurrente
                            </Badge>
                          )}
                        </div>

                        {appointment.observations && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                            {appointment.observations}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
