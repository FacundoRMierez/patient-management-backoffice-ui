"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, CreditCard } from "lucide-react"
import type { AppointmentFormData } from "@/lib/types/appointment"

interface PaymentStepProps {
  data: Partial<AppointmentFormData>
  onChange: (field: string, value: any) => void
}

export function PaymentStep({ data, onChange }: PaymentStepProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Label className="text-sm sm:text-base flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Tipo de Pago <span className="text-red-500">*</span>
        </Label>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Selecciona cómo se realizará el pago
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3">
          <label className="flex flex-1 items-center gap-3 cursor-pointer rounded-lg border-2 border-gray-300 px-4 sm:px-6 py-3 sm:py-4 transition-colors hover:border-gray-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
            <input
              type="radio"
              name="paymentType"
              value="private"
              checked={data.paymentType === 'private'}
              onChange={(e) => onChange('paymentType', e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900 text-sm sm:text-base">Particular</p>
              <p className="text-xs text-gray-500">Pago directo</p>
            </div>
          </label>
          <label className="flex flex-1 items-center gap-3 cursor-pointer rounded-lg border-2 border-gray-300 px-4 sm:px-6 py-3 sm:py-4 transition-colors hover:border-gray-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
            <input
              type="radio"
              name="paymentType"
              value="insurance"
              checked={data.paymentType === 'insurance'}
              onChange={(e) => onChange('paymentType', e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900 text-sm sm:text-base">Obra Social</p>
              <p className="text-xs text-gray-500">Con cobertura</p>
            </div>
          </label>
        </div>
      </div>

      {data.paymentType === 'insurance' && (
        <div>
          <Label htmlFor="insuranceName" className="text-sm sm:text-base">
            Nombre de la Obra Social <span className="text-red-500">*</span>
          </Label>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Especifica qué obra social cubre el turno
          </p>
          <Input
            id="insuranceName"
            type="text"
            placeholder="Ej: OSDE, Swiss Medical, IOMA"
            value={data.insuranceName || ''}
            onChange={(e) => onChange('insuranceName', e.target.value)}
            className="mt-2 sm:mt-3 h-12 sm:h-11"
          />
        </div>
      )}

      <div>
        <Label htmlFor="price" className="text-sm sm:text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Precio de la Sesión <span className="text-red-500">*</span>
        </Label>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          {data.paymentType === 'insurance' 
            ? 'Monto que cubre la obra social' 
            : 'Valor de la sesión a cobrar'}
        </p>
        <div className="relative mt-2 sm:mt-3">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-base sm:text-base">
            $
          </span>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={data.price || ''}
            onChange={(e) => onChange('price', e.target.value)}
            className="pl-7 sm:pl-8 h-12 sm:h-11 text-base"
          />
        </div>
      </div>

      {data.price && parseFloat(data.price) > 0 && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 sm:p-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-blue-900">
              <span className="font-medium">Precio por sesión:</span> ${parseFloat(data.price).toFixed(2)}
            </p>
            {data.type === 'recurring' && data.recurrenceOccurrences && (
              <p className="text-xs sm:text-sm text-blue-900">
                <span className="font-medium">Total estimado ({data.recurrenceOccurrences} sesiones):</span>{' '}
                ${(parseFloat(data.price) * Number(data.recurrenceOccurrences)).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
