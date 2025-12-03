"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Appointment } from "@/lib/types/appointment"

interface AppointmentCalendarProps {
  appointments: Appointment[]
  view: 'month' | 'week' | 'day'
  currentDate: Date
  onDateChange: (date: Date) => void
  onViewChange: (view: 'month' | 'week' | 'day') => void
  onAppointmentClick: (appointment: Appointment) => void
}

export function AppointmentCalendar({
  appointments,
  view,
  currentDate,
  onDateChange,
  onViewChange,
  onAppointmentClick,
}: AppointmentCalendarProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: Date[] = []

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i))
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }

    return days
  }

  const getAppointmentsForDate = (date: Date): Appointment[] => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    onDateChange(newDate)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    onDateChange(newDate)
  }

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
    onDateChange(newDate)
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'month':
        navigateMonth(direction)
        break
      case 'week':
        navigateWeek(direction)
        break
      case 'day':
        navigateDay(direction)
        break
    }
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth()
  }

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate)

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Header with day names */}
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-xs font-semibold text-gray-700">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day)
          const isCurrentMonthDay = isCurrentMonth(day)
          const isTodayDay = isToday(day)

          return (
            <div
              key={index}
              className={cn(
                "min-h-24 bg-white p-2 hover:bg-gray-50 cursor-pointer transition-colors",
                !isCurrentMonthDay && "bg-gray-50 text-gray-400"
              )}
              onClick={() => {
                onDateChange(day)
                onViewChange('day')
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isTodayDay && "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                  )}
                >
                  {day.getDate()}
                </span>
                {dayAppointments.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {dayAppointments.length}
                  </span>
                )}
              </div>

              {/* Appointments */}
              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map(apt => (
                  <div
                    key={apt.id}
                    className={cn(
                      "rounded px-1 py-0.5 text-xs truncate",
                      apt.status === 'scheduled' && "bg-blue-100 text-blue-700",
                      apt.status === 'completed' && "bg-green-100 text-green-700",
                      apt.status === 'cancelled' && "bg-red-100 text-red-700",
                      apt.status === 'no-show' && "bg-gray-100 text-gray-700"
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      onAppointmentClick(apt)
                    }}
                  >
                    {apt.startTime} {apt.patientName}
                  </div>
                ))}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayAppointments.length - 3} más
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    // Get week days
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      return day
    })

    const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 9 PM

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header with days */}
          <div className="grid grid-cols-8 gap-px bg-gray-200 mb-px">
            <div className="bg-gray-50 p-2"></div>
            {weekDays.map((day, i) => (
              <div key={i} className="bg-gray-50 p-2 text-center">
                <div className="text-xs font-semibold text-gray-700">{dayNames[i]}</div>
                <div className={cn(
                  "text-lg font-bold",
                  isToday(day) && "flex h-8 w-8 mx-auto items-center justify-center rounded-full bg-blue-600 text-white"
                )}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 gap-px bg-gray-200">
              <div className="bg-white p-2 text-xs text-gray-500 text-right">
                {hour}:00
              </div>
              {weekDays.map((day, i) => {
                const dayAppointments = getAppointmentsForDate(day).filter(apt => {
                  const aptHour = parseInt(apt.startTime.split(':')[0])
                  return aptHour === hour
                })

                return (
                  <div key={i} className="bg-white p-1 min-h-16 hover:bg-gray-50 cursor-pointer">
                    {dayAppointments.map(apt => (
                      <div
                        key={apt.id}
                        className={cn(
                          "rounded px-2 py-1 text-xs mb-1 cursor-pointer",
                          apt.status === 'scheduled' && "bg-blue-100 text-blue-700 border border-blue-300",
                          apt.status === 'completed' && "bg-green-100 text-green-700 border border-green-300"
                        )}
                        onClick={() => onAppointmentClick(apt)}
                      >
                        <div className="font-medium">{apt.startTime} - {apt.endTime}</div>
                        <div className="truncate">{apt.patientName}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderDayView = () => {
    const hours = Array.from({ length: 14 }, (_, i) => i + 8)
    const dayAppointments = getAppointmentsForDate(currentDate)

    return (
      <div className="space-y-px bg-gray-200">
        {hours.map(hour => {
          const hourAppointments = dayAppointments.filter(apt => {
            const aptHour = parseInt(apt.startTime.split(':')[0])
            return aptHour === hour
          })

          return (
            <div key={hour} className="flex bg-white">
              <div className="w-20 p-4 text-sm text-gray-500 text-right border-r border-gray-200">
                {hour}:00
              </div>
              <div className="flex-1 p-2 min-h-20">
                {hourAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className={cn(
                      "rounded-lg p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow",
                      apt.status === 'scheduled' && "bg-blue-50 border-l-4 border-blue-500",
                      apt.status === 'completed' && "bg-green-50 border-l-4 border-green-500"
                    )}
                    onClick={() => onAppointmentClick(apt)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{apt.patientName}</span>
                      <span className="text-sm text-gray-600">{apt.startTime} - {apt.endTime}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{apt.paymentType === 'insurance' ? apt.insuranceName : 'Particular'}</span>
                      <span>${apt.price}</span>
                    </div>
                    {apt.observations && (
                      <div className="mt-2 text-sm text-gray-500">{apt.observations}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            {view === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            {view === 'week' && `Semana del ${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]}`}
            {view === 'day' && `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          </h2>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(new Date())}
          >
            Hoy
          </Button>
        </div>

        {/* View switcher */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            onClick={() => onViewChange('month')}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              view === 'month' 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            Mes
          </button>
          <button
            onClick={() => onViewChange('week')}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-x border-gray-300",
              view === 'week' 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            Semana
          </button>
          <button
            onClick={() => onViewChange('day')}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              view === 'day' 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            Día
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>
    </div>
  )
}
