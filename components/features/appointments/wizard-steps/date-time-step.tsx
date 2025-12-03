"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock } from "lucide-react"
import type { AppointmentFormData } from "@/lib/types/appointment"

interface DateTimeStepProps {
  data: Partial<AppointmentFormData>
  onChange: (field: string, value: any) => void
}

export function DateTimeStep({ data, onChange }: DateTimeStepProps) {
  const calculateDuration = () => {
    if (data.startTime && data.endTime) {
      const [startHour, startMin] = data.startTime.split(':').map(Number)
      const [endHour, endMin] = data.endTime.split(':').map(Number)
      const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin)
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      if (totalMinutes > 0) {
        return hours > 0 
          ? `${hours}h ${minutes}min` 
          : `${minutes}min`
      }
    }
    return null
  }

  const duration = calculateDuration()

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Label htmlFor="date" className="text-sm sm:text-base flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Fecha del Turno <span className="text-red-500">*</span>
        </Label>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Selecciona el día para el turno
        </p>
        <Input
          id="date"
          type="date"
          value={data.date || ''}
          onChange={(e) => onChange('date', e.target.value)}
          className="mt-2 sm:mt-3 h-12 sm:h-11"
        />
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="startTime" className="text-sm sm:text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hora de Inicio <span className="text-red-500">*</span>
          </Label>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Hora de inicio del turno
          </p>
          <Input
            id="startTime"
            type="time"
            value={data.startTime || ''}
            onChange={(e) => onChange('startTime', e.target.value)}
            className="mt-2 sm:mt-3 h-12 sm:h-11"
          />
        </div>

        <div>
          <Label htmlFor="endTime" className="text-sm sm:text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hora de Fin <span className="text-red-500">*</span>
          </Label>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Hora de finalización del turno
          </p>
          <Input
            id="endTime"
            type="time"
            value={data.endTime || ''}
            onChange={(e) => onChange('endTime', e.target.value)}
            className="mt-2 sm:mt-3 h-12 sm:h-11"
          />
        </div>
      </div>

      {duration && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-green-900">
            <span className="font-medium">Duración del turno:</span> {duration}
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="observations" className="text-sm sm:text-base">
          Observaciones (opcional)
        </Label>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Notas adicionales sobre el turno
        </p>
        <textarea
          id="observations"
          rows={4}
          value={data.observations || ''}
          onChange={(e) => onChange('observations', e.target.value)}
          placeholder="Ej: Primera sesión, evaluación inicial, seguimiento..."
          className="mt-2 sm:mt-3 flex w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </div>
    </div>
  )
}
