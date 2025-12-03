"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Calendar, FileText, TrendingUp, Clock, DollarSign } from "lucide-react"
import { StatCard } from "@/components/features/dashboard/stat-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Appointment } from "@/lib/types/appointment"

export default function Home() {
  const router = useRouter()
  const today = new Date()

  // Mock data - TODO: Fetch from API
  const [todayAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'Juan Pérez',
      date: today,
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
      date: today,
      startTime: '14:00',
      endTime: '15:00',
      duration: 60,
      type: 'single',
      paymentType: 'private',
      price: 8000,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      patientId: '3',
      patientName: 'Carlos López',
      date: today,
      startTime: '16:00',
      endTime: '17:00',
      duration: 60,
      type: 'recurring',
      paymentType: 'insurance',
      price: 5500,
      insuranceName: 'Swiss Medical',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const scheduledToday = todayAppointments.filter(apt => apt.status === 'scheduled').length
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length
  const totalRevenueToday = todayAppointments
    .filter(apt => apt.status === 'completed')
    .reduce((sum, apt) => sum + apt.price, 0)

  return (
    <div className="space-y-6">
      {/* Título y descripción */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bienvenido a Patient Management
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          {today.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pacientes"
          value="156"
          icon={Users}
          color="bg-blue-500"
          change="+12%"
        />
        <StatCard
          title="Turnos Hoy"
          value={scheduledToday.toString()}
          icon={Calendar}
          color="bg-green-500"
          change={`${todayAppointments.length} total`}
        />
        <StatCard
          title="Completados"
          value={completedToday.toString()}
          icon={FileText}
          color="bg-purple-500"
          change={`${scheduledToday} pendientes`}
        />
        <StatCard
          title="Ingresos Hoy"
          value={`$${(totalRevenueToday / 1000).toFixed(0)}k`}
          icon={DollarSign}
          color="bg-orange-500"
          change={`$${totalRevenueToday.toLocaleString()}`}
        />
      </div>

      {/* Turnos de hoy */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Turnos de Hoy
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/turnos')}
          >
            Ver Todos
          </Button>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay turnos programados para hoy</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => router.push('/turnos/crear')}
              >
                Crear Turno
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppointments
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(appointment => (
                  <div
                    key={appointment.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all",
                      appointment.status === 'scheduled' && "bg-blue-50 border-blue-500",
                      appointment.status === 'completed' && "bg-green-50 border-green-500 opacity-75",
                      appointment.status === 'cancelled' && "bg-red-50 border-red-500 opacity-50"
                    )}
                    onClick={() => router.push(`/turnos/${appointment.id}/editar`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-gray-900">
                          {appointment.patientName}
                        </span>
                        {appointment.status === 'completed' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Completado
                          </span>
                        )}
                        {appointment.type === 'recurring' && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                            Recurrente
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {appointment.startTime} - {appointment.endTime}
                        </span>
                        <span>
                          {appointment.paymentType === 'insurance' 
                            ? appointment.insuranceName 
                            : 'Particular'}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${appointment.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
