import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface BillingDataStepProps {
  formData: any
  onChange: (field: string, value: string | boolean) => void
  errors: Record<string, string>
}

export function BillingDataStep({ formData, onChange, errors }: BillingDataStepProps) {
  return (
    <div className="space-y-6">
      {/* Pregunta principal */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requiresInvoice"
                checked={formData.requiresInvoice || false}
                onChange={(e) => onChange("requiresInvoice", e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="requiresInvoice" className="text-base font-semibold cursor-pointer">
                Requiere facturación
              </Label>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Marque esta opción si el paciente necesita factura para sus sesiones
            </p>
          </div>
        </div>
      </Card>

      {/* Campos de facturación (solo si requiere factura) */}
      {formData.requiresInvoice && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Datos de Facturación
            </h3>

            <div className="space-y-4">
              {/* Razón Social */}
              <div>
                <Label htmlFor="billingBusinessName">
                  Razón Social / Nombre Completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="billingBusinessName"
                  type="text"
                  placeholder="Nombre del responsable de facturación"
                  value={formData.billingBusinessName || ""}
                  onChange={(e) => onChange("billingBusinessName", e.target.value)}
                  className={errors.billingBusinessName ? "border-red-500" : ""}
                />
                {errors.billingBusinessName && (
                  <p className="mt-1 text-xs text-red-500">{errors.billingBusinessName}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* CUIT/CUIL */}
                <div>
                  <Label htmlFor="billingTaxId">
                    CUIT/CUIL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="billingTaxId"
                    type="text"
                    placeholder="20-12345678-9"
                    value={formData.billingTaxId || ""}
                    onChange={(e) => onChange("billingTaxId", e.target.value)}
                    className={errors.billingTaxId ? "border-red-500" : ""}
                  />
                  {errors.billingTaxId && (
                    <p className="mt-1 text-xs text-red-500">{errors.billingTaxId}</p>
                  )}
                </div>

                {/* Condición Fiscal */}
                <div>
                  <Label htmlFor="billingFiscalCondition">
                    Condición Fiscal <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="billingFiscalCondition"
                    value={formData.billingFiscalCondition || ""}
                    onChange={(e) => onChange("billingFiscalCondition", e.target.value)}
                    className={`flex h-10 w-full rounded-md border ${
                      errors.billingFiscalCondition ? "border-red-500" : "border-gray-300"
                    } bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="RESPONSABLE_INSCRIPTO">Responsable Inscripto</option>
                    <option value="MONOTRIBUTISTA">Monotributista</option>
                    <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                    <option value="EXENTO">Exento</option>
                  </select>
                  {errors.billingFiscalCondition && (
                    <p className="mt-1 text-xs text-red-500">{errors.billingFiscalCondition}</p>
                  )}
                </div>
              </div>

              {/* Domicilio Fiscal */}
              <div>
                <Label htmlFor="billingFiscalAddress">
                  Domicilio Fiscal <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="billingFiscalAddress"
                  placeholder="Domicilio registrado en AFIP"
                  value={formData.billingFiscalAddress || ""}
                  onChange={(e) => onChange("billingFiscalAddress", e.target.value)}
                  className={errors.billingFiscalAddress ? "border-red-500" : ""}
                  rows={2}
                />
                {errors.billingFiscalAddress && (
                  <p className="mt-1 text-xs text-red-500">{errors.billingFiscalAddress}</p>
                )}
              </div>

              {/* Email para Facturas */}
              <div>
                <Label htmlFor="billingEmail">
                  Email para envío de facturas
                </Label>
                <Input
                  id="billingEmail"
                  type="email"
                  placeholder="facturacion@ejemplo.com"
                  value={formData.billingEmail || ""}
                  onChange={(e) => onChange("billingEmail", e.target.value)}
                  className={errors.billingEmail ? "border-red-500" : ""}
                />
                {errors.billingEmail && (
                  <p className="mt-1 text-xs text-red-500">{errors.billingEmail}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Las facturas se enviarán a este correo electrónico
                </p>
              </div>

              {/* Nota informativa */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Importante</p>
                    <p>Los datos de facturación deben coincidir con la información registrada en AFIP. Las facturas se emitirán con estos datos.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje cuando no requiere factura */}
      {!formData.requiresInvoice && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">
            El paciente no requiere facturación. Puede continuar al siguiente paso.
          </p>
        </Card>
      )}
    </div>
  )
}
