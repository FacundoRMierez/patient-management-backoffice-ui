"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { AppointmentFormData, AppointmentType, PaymentType } from "@/lib/types/appointment"

interface AppointmentFormProps {
  initialData?: Partial<AppointmentFormData>
  patients: Array<{ id: string; firstName: string; lastName: string }>
  onSubmit: (data: AppointmentFormData) => void
  onCancel: () => void
}

export function AppointmentForm({
  initialData,
  patients,
  onSubmit,
  onCancel,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<AppointmentFormData>>(
    initialData || {
      type: 'single',
      paymentType: 'private',
      price: '',
    }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string | boolean | number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const weekDays = [
    { value: 0, label: 'Domingo' },
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
  ]

  const toggleWeekDay = (day: number) => {
    const current = formData.daysOfWeek || []
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day].sort()
    handleChange('daysOfWeek', updated)
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientId) newErrors.patientId = "Selecciona un paciente"
    if (!formData.date) newErrors.date = "La fecha es requerida"
    if (!formData.startTime) newErrors.startTime = "La hora de inicio es requerida"
    if (!formData.endTime) newErrors.endTime = "La hora de fin es requerida"
    if (!formData.price) newErrors.price = "El precio es requerido"

    if (formData.type === 'recurring') {
      if (!formData.recurrencePattern) newErrors.recurrencePattern = "Selecciona un patrón"
      if (!formData.daysOfWeek || formData.daysOfWeek.length === 0) {
        newErrors.daysOfWeek = "Selecciona al menos un día"
      }
      if (!formData.recurrenceEndDate && !formData.recurrenceOccurrences) {
        newErrors.recurrenceEndDate = "Define fecha fin o número de ocurrencias"
      }
    }

    if (formData.paymentType === 'insurance' && !formData.insuranceName) {
      newErrors.insuranceName = "El nombre de la obra social es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData as AppointmentFormData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Paciente</h3>
        <div>
          <Label htmlFor="patientId">
            Seleccionar Paciente <span className="text-red-500">*</span>
          </Label>
          <select
            id="patientId"
            value={formData.patientId || ''}
            onChange={(e) => handleChange('patientId', e.target.value)}
            className={`mt-1 flex h-10 w-full rounded-lg border ${
              errors.patientId ? 'border-red-500' : 'border-gray-300'
            } bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
          >
            <option value="">Selecciona un paciente</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.lastName}, {patient.firstName}
              </option>
            ))}
          </select>
          {errors.patientId && <p className="mt-1 text-xs text-red-500">{errors.patientId}</p>}
        </div>
      </Card>

      {/* Date and Time */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fecha y Horario</h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="date">
                Fecha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            <div>
              <Label htmlFor="startTime">
                Hora Inicio <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime || ''}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className={errors.startTime ? 'border-red-500' : ''}
              />
              {errors.startTime && <p className="mt-1 text-xs text-red-500">{errors.startTime}</p>}
            </div>

            <div>
              <Label htmlFor="endTime">
                Hora Fin <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime || ''}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className={errors.endTime ? 'border-red-500' : ''}
              />
              {errors.endTime && <p className="mt-1 text-xs text-red-500">{errors.endTime}</p>}
            </div>
          </div>
        </div>
      </Card>

      {/* Appointment Type */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de Turno</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="single"
                checked={formData.type === 'single'}
                onChange={(e) => handleChange('type', e.target.value)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Único</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="recurring"
                checked={formData.type === 'recurring'}
                onChange={(e) => handleChange('type', e.target.value)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Recurrente</span>
            </label>
          </div>

          {/* Recurring Options */}
          {formData.type === 'recurring' && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div>
                <Label htmlFor="recurrencePattern">
                  Patrón de Recurrencia <span className="text-red-500">*</span>
                </Label>
                <select
                  id="recurrencePattern"
                  value={formData.recurrencePattern || ''}
                  onChange={(e) => handleChange('recurrencePattern', e.target.value)}
                  className={`mt-1 flex h-10 w-full rounded-lg border ${
                    errors.recurrencePattern ? 'border-red-500' : 'border-gray-300'
                  } bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                >
                  <option value="">Selecciona un patrón</option>
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quincenal</option>
                  <option value="monthly">Mensual</option>
                </select>
                {errors.recurrencePattern && (
                  <p className="mt-1 text-xs text-red-500">{errors.recurrencePattern}</p>
                )}
              </div>

              <div>
                <Label>
                  Días de la Semana <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {weekDays.map(day => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleWeekDay(day.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.daysOfWeek?.includes(day.value)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
                {errors.daysOfWeek && (
                  <p className="mt-1 text-xs text-red-500">{errors.daysOfWeek}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="recurrenceEndDate">Fecha de Fin</Label>
                  <Input
                    id="recurrenceEndDate"
                    type="date"
                    value={formData.recurrenceEndDate || ''}
                    onChange={(e) => handleChange('recurrenceEndDate', e.target.value)}
                    className={errors.recurrenceEndDate ? 'border-red-500' : ''}
                  />
                  {errors.recurrenceEndDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.recurrenceEndDate}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="recurrenceOccurrences">
                    o Número de Ocurrencias
                  </Label>
                  <Input
                    id="recurrenceOccurrences"
                    type="number"
                    min="1"
                    value={formData.recurrenceOccurrences || ''}
                    onChange={(e) => handleChange('recurrenceOccurrences', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Payment */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pago</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="private"
                checked={formData.paymentType === 'private'}
                onChange={(e) => handleChange('paymentType', e.target.value)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Particular</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="insurance"
                checked={formData.paymentType === 'insurance'}
                onChange={(e) => handleChange('paymentType', e.target.value)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Obra Social</span>
            </label>
          </div>

          {formData.paymentType === 'insurance' && (
            <div>
              <Label htmlFor="insuranceName">
                Nombre de la Obra Social <span className="text-red-500">*</span>
              </Label>
              <Input
                id="insuranceName"
                type="text"
                placeholder="Ej: OSDE, Swiss Medical"
                value={formData.insuranceName || ''}
                onChange={(e) => handleChange('insuranceName', e.target.value)}
                className={errors.insuranceName ? 'border-red-500' : ''}
              />
              {errors.insuranceName && (
                <p className="mt-1 text-xs text-red-500">{errors.insuranceName}</p>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="price">
              Precio <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`pl-7 ${errors.price ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>
        </div>
      </Card>

      {/* Observations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Observaciones</h3>
        <div>
          <Label htmlFor="observations">Notas adicionales</Label>
          <Textarea
            id="observations"
            rows={4}
            placeholder="Información adicional sobre el turno..."
            value={formData.observations || ''}
            onChange={(e) => handleChange('observations', e.target.value)}
          />
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? 'Actualizar Turno' : 'Crear Turno'}
        </Button>
      </div>
    </form>
  )
}
