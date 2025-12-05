"use client"

import { Edit, Trash2, Phone, Mail, GraduationCap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Patient } from "@/lib/types/paciente"

interface PatientsListProps {
  patients: Patient[]
  onEdit: (patient: Patient) => void
  onDelete: (patient: Patient) => void
}

export function PacientesList({ patients, onEdit, onDelete }: PatientsListProps) {
  const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  if (patients.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500">No se encontraron pacientes</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            {/* Header con nombre y estado */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base leading-tight">
                  {patient.lastName}, {patient.firstName}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-medium text-gray-500">DNI</span>
                  <span className="text-xs font-semibold text-gray-900">{patient.documentId}</span>
                  {patient.cut && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-medium text-gray-500">CUT</span>
                      <span className="text-xs font-semibold text-gray-900">{patient.cut}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge 
                variant={patient.active ? "success" : "secondary"} 
                className="text-xs font-semibold shrink-0 shadow-sm"
              >
                {patient.active ? "Activo" : "Inactivo"}
              </Badge>
            </div>

            {/* Divider sutil */}
            <div className="border-t border-gray-100"></div>

            {/* Info en grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Edad</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {calculateAge(patient.birthDate)} años
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Tutor</p>
                  <p className="text-sm font-semibold text-gray-900">
                    Progenitor {patient.legalGuardian}
                  </p>
                </div>
              </div>
            </div>

            {/* Domicilio */}
            <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
              <svg className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Domicilio</p>
                <p className="text-sm text-gray-900 leading-snug break-words">{patient.address}</p>
              </div>
            </div>

            {/* Contacto y extras en una fila */}
            <div className="flex flex-wrap gap-2">
              {patient.phone && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
                  <Phone className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-900">{patient.phone}</span>
                </div>
              )}

              {/* Obra Social */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 rounded-full">
                <Heart className={`h-3.5 w-3.5 ${patient.healthInsurance.hasInsurance ? 'text-rose-600' : 'text-gray-400'}`} />
                <span className={`text-xs font-medium ${patient.healthInsurance.hasInsurance ? 'text-rose-900' : 'text-gray-600'}`}>
                  {patient.healthInsurance.hasInsurance ? patient.healthInsurance.name : 'Sin cobertura'}
                </span>
              </div>
            </div>

            {/* Escuela */}
            {patient.schoolData && (
              <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3">
                <GraduationCap className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-amber-700 font-medium mb-0.5">Institución Educativa</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {patient.schoolData.schoolName}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">{patient.schoolData.grade}</p>
                </div>
              </div>
            )}

            {/* Acciones con mejor separación */}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                onClick={() => onEdit(patient)}
              >
                <Edit className="mr-1.5 h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 font-medium text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
                onClick={() => onDelete(patient)}
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
