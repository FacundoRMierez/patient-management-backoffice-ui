"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WizardStep {
  id: number
  title: string
  description: string
}

interface WizardProps {
  steps: WizardStep[]
  currentStep: number
  children: React.ReactNode
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  isLastStep: boolean
  isValid: boolean
  title?: string
  submitLabel?: string
}

export function Wizard({
  steps,
  currentStep,
  children,
  onClose,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  isValid,
  title = "Crear Paciente",
  submitLabel = "Crear Paciente",
}: WizardProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-600">
          Paso {currentStep + 1} de {steps.length}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    index < currentStep
                      ? "border-blue-600 bg-blue-600 text-white"
                      : index === currentStep
                      ? "border-blue-600 bg-white text-blue-600"
                      : "border-gray-300 bg-white text-gray-400"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center hidden sm:block">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      index <= currentStep ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
                {/* Versión móvil: solo mostrar el paso actual */}
                <div className="mt-1 text-center sm:hidden">
                  {index === currentStep && (
                    <p className="text-[10px] font-medium text-gray-900">
                      {step.title}
                    </p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 max-w-[60px] sm:max-w-[80px] transition-colors mx-1 sm:mx-2",
                    index < currentStep ? "bg-blue-600" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {steps[currentStep].title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>
        {children}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 rounded-lg border border-gray-200 bg-white p-4 sm:px-6 sm:py-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="order-2 sm:order-1"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
          <span className="sm:hidden">Atrás</span>
        </Button>

        <div className="flex gap-2 order-1 sm:order-2">
          <Button variant="ghost" onClick={onClose} className="flex-1 sm:flex-none">
            Cancelar
          </Button>
          {isLastStep ? (
            <Button onClick={onSubmit} disabled={!isValid} className="flex-1 sm:flex-none">
              <Check className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{submitLabel}</span>
              <span className="sm:hidden">Crear</span>
            </Button>
          ) : (
            <Button onClick={onNext} disabled={!isValid} className="flex-1 sm:flex-none">
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">Continuar</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
