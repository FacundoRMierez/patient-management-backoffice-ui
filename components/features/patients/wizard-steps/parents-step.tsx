import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ParentsStepProps {
  formData: any
  onChange: (field: string, value: string | boolean) => void
  errors: Record<string, string>
}

export function ParentsStep({ formData, onChange, errors }: ParentsStepProps) {
  return (
    <div className="space-y-6">
      {/* Parent A */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h4 className="mb-4 font-semibold text-gray-900">
          Progenitor A <span className="text-red-500">*</span>
        </h4>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="parentA_firstName">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="parentA_firstName"
                type="text"
                value={formData.parentA_firstName || ""}
                onChange={(e) => onChange("parentA_firstName", e.target.value)}
                className={errors.parentA_firstName ? "border-red-500" : ""}
              />
              {errors.parentA_firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.parentA_firstName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="parentA_lastName">
                Apellido <span className="text-red-500">*</span>
              </Label>
              <Input
                id="parentA_lastName"
                type="text"
                value={formData.parentA_lastName || ""}
                onChange={(e) => onChange("parentA_lastName", e.target.value)}
                className={errors.parentA_lastName ? "border-red-500" : ""}
              />
              {errors.parentA_lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.parentA_lastName}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="parentA_documentId">DNI (opcional)</Label>
              <Input
                id="parentA_documentId"
                type="text"
                value={formData.parentA_documentId || ""}
                onChange={(e) => onChange("parentA_documentId", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="parentA_phone">Teléfono (opcional)</Label>
              <Input
                id="parentA_phone"
                type="tel"
                value={formData.parentA_phone || ""}
                onChange={(e) => onChange("parentA_phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="parentA_email">Email (opcional)</Label>
            <Input
              id="parentA_email"
              type="email"
              value={formData.parentA_email || ""}
              onChange={(e) => onChange("parentA_email", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="parentA_occupation">Ocupación (opcional)</Label>
            <Input
              id="parentA_occupation"
              type="text"
              value={formData.parentA_occupation || ""}
              onChange={(e) => onChange("parentA_occupation", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Checkbox Parent B */}
      <div className="flex items-center space-x-2">
        <input
          id="hasParentB"
          type="checkbox"
          checked={formData.hasParentB || false}
          onChange={(e) => onChange("hasParentB", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="hasParentB" className="cursor-pointer">
          ¿Registrar Progenitor B?
        </Label>
      </div>

      {/* Parent B */}
      {formData.hasParentB && (
        <div className="rounded-lg border border-gray-200 p-4">
          <h4 className="mb-4 font-semibold text-gray-900">Progenitor B</h4>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="parentB_firstName">Nombre</Label>
                <Input
                  id="parentB_firstName"
                  type="text"
                  value={formData.parentB_firstName || ""}
                  onChange={(e) => onChange("parentB_firstName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="parentB_lastName">Apellido</Label>
                <Input
                  id="parentB_lastName"
                  type="text"
                  value={formData.parentB_lastName || ""}
                  onChange={(e) => onChange("parentB_lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="parentB_documentId">DNI</Label>
                <Input
                  id="parentB_documentId"
                  type="text"
                  value={formData.parentB_documentId || ""}
                  onChange={(e) => onChange("parentB_documentId", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="parentB_phone">Teléfono</Label>
                <Input
                  id="parentB_phone"
                  type="tel"
                  value={formData.parentB_phone || ""}
                  onChange={(e) => onChange("parentB_phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="parentB_email">Email</Label>
              <Input
                id="parentB_email"
                type="email"
                value={formData.parentB_email || ""}
                onChange={(e) => onChange("parentB_email", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="parentB_occupation">Ocupación</Label>
              <Input
                id="parentB_occupation"
                type="text"
                value={formData.parentB_occupation || ""}
                onChange={(e) => onChange("parentB_occupation", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Legal Guardian */}
      <div>
        <Label htmlFor="legalGuardian">
          Tutor Legal <span className="text-red-500">*</span>
        </Label>
        <select
          id="legalGuardian"
          value={formData.legalGuardian || "A"}
          onChange={(e) => onChange("legalGuardian", e.target.value)}
          className="mt-1 flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <option value="A">Progenitor A</option>
          {formData.hasParentB && <option value="B">Progenitor B</option>}
          {formData.hasParentB && <option value="both">Ambos</option>}
        </select>
      </div>
    </div>
  )
}
