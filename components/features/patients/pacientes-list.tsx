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
    <div className="space-y-3">
      {patients.map((patient) => (
        <Card key={patient.id} className="p-3">
          <div className="space-y-2.5">
            {/* Header con nombre y estado */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {patient.lastName}, {patient.firstName}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span>DNI: {patient.documentId}</span>
                  {patient.cut && (
                    <>
                      <span>•</span>
                      <span>CUT: {patient.cut}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge variant={patient.active ? "success" : "secondary"} className="text-xs shrink-0">
                {patient.active ? "Activo" : "Inactivo"}
              </Badge>
            </div>

            {/* Info básica */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600">Edad:</span>
                <span className="ml-1 font-medium text-gray-900">
                  {calculateAge(patient.birthDate)} años
                </span>
              </div>
              <div>
                <span className="text-gray-600">Tutor:</span>
                <span className="ml-1 font-medium text-gray-900">
                  Progenitor {patient.legalGuardian}
                </span>
              </div>
            </div>

            {/* Domicilio */}
            <div className="text-xs">
              <p className="text-gray-600 font-medium">Domicilio:</p>
              <p className="text-gray-900 break-words">{patient.address}</p>
            </div>

            {/* Contacto */}
            {patient.phone && (
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Phone className="h-4 w-4" />
                <span>{patient.phone}</span>
              </div>
            )}

            {/* Obra Social */}
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-gray-400" />
              {patient.healthInsurance.hasInsurance ? (
                <Badge variant="success">{patient.healthInsurance.name}</Badge>
              ) : (
                <Badge variant="secondary">Sin cobertura</Badge>
              )}
            </div>

            {/* Escuela */}
            {patient.schoolData && (
              <div className="flex items-start gap-2 text-xs">
                <GraduationCap className="h-3.5 w-3.5 text-gray-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {patient.schoolData.schoolName}
                  </p>
                  <p className="text-gray-600 text-xs">{patient.schoolData.grade}</p>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(patient)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:text-red-700"
                onClick={() => onDelete(patient)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
