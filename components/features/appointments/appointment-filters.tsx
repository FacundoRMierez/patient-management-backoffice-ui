"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

interface AppointmentFiltersProps {
  patientFilter: string
  monthFilter: number
  yearFilter: number
  onPatientChange: (value: string) => void
  onMonthChange: (value: number) => void
  onYearChange: (value: number) => void
}

export function AppointmentFilters({
  patientFilter,
  monthFilter,
  yearFilter,
  onPatientChange,
  onMonthChange,
  onYearChange,
}: AppointmentFiltersProps) {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Patient search */}
      <div className="flex-1">
        <Label htmlFor="patient-search" className="sr-only">Buscar paciente</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="patient-search"
            type="text"
            placeholder="Buscar por paciente..."
            value={patientFilter}
            onChange={(e) => onPatientChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Month filter */}
      <div className="w-full sm:w-40">
        <Label htmlFor="month-filter" className="sr-only">Mes</Label>
        <select
          id="month-filter"
          value={monthFilter}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Year filter */}
      <div className="w-full sm:w-32">
        <Label htmlFor="year-filter" className="sr-only">Año</Label>
        <select
          id="year-filter"
          value={yearFilter}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
