import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalDataStepProps {
  formData: any
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export function PersonalDataStep({ formData, onChange, errors }: PersonalDataStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="documentId">
            DNI <span className="text-red-500">*</span>
          </Label>
          <Input
            id="documentId"
            type="text"
            placeholder="12345678"
            value={formData.documentId || ""}
            onChange={(e) => onChange("documentId", e.target.value)}
            className={errors.documentId ? "border-red-500" : ""}
          />
          {errors.documentId && <p className="mt-1 text-xs text-red-500">{errors.documentId}</p>}
        </div>

        <div>
          <Label htmlFor="cut">
            CUT (Código Único de Tramitación)
          </Label>
          <Input
            id="cut"
            type="text"
            placeholder="CUT-12345"
            value={formData.cut || ""}
            onChange={(e) => onChange("cut", e.target.value)}
            className={errors.cut ? "border-red-500" : ""}
          />
          {errors.cut && <p className="mt-1 text-xs text-red-500">{errors.cut}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="firstName">
            Nombre <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Juan"
            value={formData.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
        </div>

        <div>
          <Label htmlFor="lastName">
            Apellido <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Pérez"
            value={formData.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="birthDate">
          Fecha de Nacimiento <span className="text-red-500">*</span>
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate || ""}
          onChange={(e) => onChange("birthDate", e.target.value)}
          className={errors.birthDate ? "border-red-500" : ""}
        />
        {errors.birthDate && (
          <p className="mt-1 text-xs text-red-500">{errors.birthDate}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address">
          Domicilio <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="address"
          placeholder="Calle, número, ciudad, provincia"
          value={formData.address || ""}
          onChange={(e) => onChange("address", e.target.value)}
          className={errors.address ? "border-red-500" : ""}
          rows={2}
        />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+54 9 11 1234-5678"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@email.com"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
