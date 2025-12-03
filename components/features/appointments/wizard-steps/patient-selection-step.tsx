"use client"

import { Label } from "@/components/ui/label"
import type { AppointmentFormData } from "@/lib/types/appointment"

interface PatientSelectionStepProps {
  data: Partial<AppointmentFormData>
  patients: Array<{ id: string; firstName: string; lastName: string }>
  onChange: (field: string, value: any) => void
}

export function PatientSelectionStep({
  data,
  patients,
  onChange,
}: PatientSelectionStepProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Label htmlFor="patientId" className="text-sm sm:text-base">
          Seleccionar Paciente <span className="text-red-500">*</span>
        </Label>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Elige el paciente para quien se agendará el turno
        </p>
        <select
          id="patientId"
          value={data.patientId || ''}
          onChange={(e) => onChange('patientId', e.target.value)}
          className="mt-2 sm:mt-3 flex h-12 sm:h-11 w-full rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <option value="">Selecciona un paciente</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.lastName}, {patient.firstName}
            </option>
          ))}
        </select>
      </div>

      {data.patientId && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-blue-900">
            <span className="font-medium">Paciente seleccionado:</span>{' '}
            {patients.find(p => p.id === data.patientId)?.firstName}{' '}
            {patients.find(p => p.id === data.patientId)?.lastName}
          </p>
        </div>
      )}
    </div>
  )
}
