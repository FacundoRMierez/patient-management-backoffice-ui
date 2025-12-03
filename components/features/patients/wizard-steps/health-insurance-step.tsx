import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HealthInsuranceStepProps {
  formData: any
  onChange: (field: string, value: string | boolean) => void
  errors: Record<string, string>
}

export function HealthInsuranceStep({ formData, onChange, errors }: HealthInsuranceStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          id="hasInsurance"
          type="checkbox"
          checked={formData.hasInsurance || false}
          onChange={(e) => onChange("hasInsurance", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="hasInsurance" className="cursor-pointer">
          ¿Tiene Obra Social?
        </Label>
      </div>

      {formData.hasInsurance && (
        <>
          <div>
            <Label htmlFor="insuranceName">
              Nombre de la Obra Social <span className="text-red-500">*</span>
            </Label>
            <Input
              id="insuranceName"
              type="text"
              placeholder="Ej: OSDE, Swiss Medical, etc."
              value={formData.insuranceName || ""}
              onChange={(e) => onChange("insuranceName", e.target.value)}
              className={errors.insuranceName ? "border-red-500" : ""}
            />
            {errors.insuranceName && (
              <p className="mt-1 text-xs text-red-500">{errors.insuranceName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="memberNumber">Número de Afiliado</Label>
            <Input
              id="memberNumber"
              type="text"
              placeholder="123456789"
              value={formData.memberNumber || ""}
              onChange={(e) => onChange("memberNumber", e.target.value)}
            />
          </div>
        </>
      )}

      {!formData.hasInsurance && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            El paciente no tiene obra social registrada.
          </p>
        </div>
      )}
    </div>
  )
}
