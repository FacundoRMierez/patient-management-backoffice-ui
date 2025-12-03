import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SchoolDataStepProps {
  formData: any
  onChange: (field: string, value: string | boolean) => void
  errors: Record<string, string>
}

export function SchoolDataStep({ formData, onChange, errors }: SchoolDataStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          id="hasSchool"
          type="checkbox"
          checked={formData.hasSchool || false}
          onChange={(e) => onChange("hasSchool", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="hasSchool" className="cursor-pointer">
          ¿Asiste a una escuela?
        </Label>
      </div>

      {formData.hasSchool && (
        <>
          <div>
            <Label htmlFor="schoolName">
              Nombre de la Escuela <span className="text-red-500">*</span>
            </Label>
            <Input
              id="schoolName"
              type="text"
              placeholder="Ej: Escuela Primaria N° 1"
              value={formData.schoolName || ""}
              onChange={(e) => onChange("schoolName", e.target.value)}
              className={errors.schoolName ? "border-red-500" : ""}
            />
            {errors.schoolName && (
              <p className="mt-1 text-xs text-red-500">{errors.schoolName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="schoolLocation">
              Ubicación <span className="text-red-500">*</span>
            </Label>
            <Input
              id="schoolLocation"
              type="text"
              placeholder="Dirección de la escuela"
              value={formData.schoolLocation || ""}
              onChange={(e) => onChange("schoolLocation", e.target.value)}
              className={errors.schoolLocation ? "border-red-500" : ""}
            />
            {errors.schoolLocation && (
              <p className="mt-1 text-xs text-red-500">{errors.schoolLocation}</p>
            )}
          </div>

          <div>
            <Label htmlFor="grade">
              Curso/Grado <span className="text-red-500">*</span>
            </Label>
            <Input
              id="grade"
              type="text"
              placeholder="Ej: 3° Grado, 1° Año"
              value={formData.grade || ""}
              onChange={(e) => onChange("grade", e.target.value)}
              className={errors.grade ? "border-red-500" : ""}
            />
            {errors.grade && (
              <p className="mt-1 text-xs text-red-500">{errors.grade}</p>
            )}
          </div>

          <div>
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              placeholder="Notas adicionales sobre la situación escolar"
              value={formData.observations || ""}
              onChange={(e) => onChange("observations", e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}

      {!formData.hasSchool && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            El paciente no asiste a ninguna escuela registrada.
          </p>
        </div>
      )}
    </div>
  )
}
