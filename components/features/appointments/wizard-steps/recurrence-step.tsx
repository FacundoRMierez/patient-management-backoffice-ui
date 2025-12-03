"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Repeat } from "lucide-react"
import type { AppointmentFormData } from "@/lib/types/appointment"

interface RecurrenceStepProps {
  data: Partial<AppointmentFormData>
  onChange: (field: string, value: any) => void
}

const weekDays = [
  { value: 0, label: 'Dom', fullLabel: 'Domingo' },
  { value: 1, label: 'Lun', fullLabel: 'Lunes' },
  { value: 2, label: 'Mar', fullLabel: 'Martes' },
  { value: 3, label: 'Mié', fullLabel: 'Miércoles' },
  { value: 4, label: 'Jue', fullLabel: 'Jueves' },
  { value: 5, label: 'Vie', fullLabel: 'Viernes' },
  { value: 6, label: 'Sáb', fullLabel: 'Sábado' },
]

export function RecurrenceStep({ data, onChange }: RecurrenceStepProps) {
  const toggleWeekDay = (day: number) => {
    const current = data.daysOfWeek || []
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day].sort()
    onChange('daysOfWeek', updated)
  }

  const selectedDaysText = () => {
    if (!data.daysOfWeek || data.daysOfWeek.length === 0) return ''
    const days = data.daysOfWeek.map(d => weekDays.find(wd => wd.value === d)?.fullLabel)
    return days.join(', ')
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Label className="text-sm sm:text-base flex items-center gap-2">
          <Repeat className="h-4 w-4" />
          Tipo de Turno <span className="text-red-500">*</span>
        </Label>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Define si el turno es único o se repite
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3">
          <label className="flex flex-1 items-center gap-3 cursor-pointer rounded-lg border-2 border-gray-300 px-4 sm:px-6 py-3 sm:py-4 transition-colors hover:border-gray-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
            <input
              type="radio"
              name="type"
              value="single"
              checked={data.type === 'single'}
              onChange={(e) => onChange('type', e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900 text-sm sm:text-base">Único</p>
              <p className="text-xs text-gray-500">Una sola vez</p>
            </div>
          </label>
          <label className="flex flex-1 items-center gap-3 cursor-pointer rounded-lg border-2 border-gray-300 px-4 sm:px-6 py-3 sm:py-4 transition-colors hover:border-gray-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
            <input
              type="radio"
              name="type"
              value="recurring"
              checked={data.type === 'recurring'}
              onChange={(e) => onChange('type', e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900 text-sm sm:text-base">Recurrente</p>
              <p className="text-xs text-gray-500">Se repite</p>
            </div>
          </label>
        </div>
      </div>

      {data.type === 'recurring' && (
        <div className="space-y-4 sm:space-y-6 pt-4 border-t border-gray-200">
          <div>
            <Label htmlFor="recurrencePattern" className="text-sm sm:text-base">
              Patrón de Recurrencia <span className="text-red-500">*</span>
            </Label>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Con qué frecuencia se repite el turno
            </p>
            <select
              id="recurrencePattern"
              value={data.recurrencePattern || ''}
              onChange={(e) => onChange('recurrencePattern', e.target.value)}
              className="mt-2 sm:mt-3 flex h-12 sm:h-11 w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <option value="">Selecciona un patrón</option>
              <option value="weekly">Semanal (cada semana)</option>
              <option value="biweekly">Quincenal (cada 2 semanas)</option>
              <option value="monthly">Mensual (cada mes)</option>
            </select>
          </div>

          <div>
            <Label className="text-sm sm:text-base">
              Días de la Semana <span className="text-red-500">*</span>
            </Label>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Selecciona los días en que se repite
            </p>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mt-2 sm:mt-3">
              {weekDays.map(day => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleWeekDay(day.value)}
                  className={`flex flex-col items-center justify-center h-14 sm:h-16 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    data.daysOfWeek?.includes(day.value)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs">{day.label}</span>
                </button>
              ))}
            </div>
            {data.daysOfWeek && data.daysOfWeek.length > 0 && (
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                Seleccionados: <span className="font-medium">{selectedDaysText()}</span>
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm sm:text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Finalización <span className="text-red-500">*</span>
            </Label>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Define cuándo termina la recurrencia
            </p>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 mt-2 sm:mt-3">
              <div>
                <Label htmlFor="recurrenceEndDate" className="text-xs sm:text-sm font-normal text-gray-700">
                  Fecha de Fin
                </Label>
                <Input
                  id="recurrenceEndDate"
                  type="date"
                  value={data.recurrenceEndDate || ''}
                  onChange={(e) => onChange('recurrenceEndDate', e.target.value)}
                  className="mt-2 h-12 sm:h-11"
                />
              </div>

              <div>
                <Label htmlFor="recurrenceOccurrences" className="text-xs sm:text-sm font-normal text-gray-700">
                  o Número de Sesiones
                </Label>
                <Input
                  id="recurrenceOccurrences"
                  type="number"
                  min="1"
                  placeholder="Ej: 10"
                  value={data.recurrenceOccurrences || ''}
                  onChange={(e) => onChange('recurrenceOccurrences', e.target.value)}
                  className="mt-2 h-12 sm:h-11"
                />
              </div>
            </div>
            <p className="mt-2 text-[10px] sm:text-xs text-gray-500">
              Completa la fecha de fin O el número de sesiones
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
