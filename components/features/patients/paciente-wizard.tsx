"use client"

import { useState } from "react"
import { Wizard } from "./wizard"
import { PersonalDataStep } from "./wizard-steps/personal-data-step"
import { HealthInsuranceStep } from "./wizard-steps/health-insurance-step"
import { ParentsStep } from "./wizard-steps/parents-step"
import { SchoolDataStep } from "./wizard-steps/school-data-step"
import { BillingDataStep } from "./wizard-steps/billing-data-step"
import type { PatientFormData } from "@/lib/types/paciente"

const WIZARD_STEPS = [
  {
    id: 1,
    title: "Datos Personales",
    description: "Información básica del paciente",
  },
  {
    id: 2,
    title: "Obra Social",
    description: "Información de cobertura médica",
  },
  {
    id: 3,
    title: "Progenitores",
    description: "Datos de los responsables",
  },
  {
    id: 4,
    title: "Datos Escolares",
    description: "Información educativa (opcional)",
  },
  {
    id: 5,
    title: "Facturación",
    description: "Datos fiscales (opcional)",
  },
]

interface PatientWizardProps {
  mode?: 'create' | 'edit'
  initialData?: Partial<PatientFormData>
  onClose: () => void
  onSuccess: (patient: PatientFormData, mode: 'create' | 'edit') => void
}

export function PatientWizard({ 
  mode = 'create',
  initialData,
  onClose, 
  onSuccess 
}: PatientWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<PatientFormData>>(
    initialData || {
      hasInsurance: false,
      hasParentB: false,
      hasSchool: false,
      requiresInvoice: false,
      legalGuardian: 'A',
    }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 0: // Personal Data
        if (!formData.documentId?.trim()) newErrors.documentId = "Document ID is required"
        if (!formData.firstName?.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required"
        if (!formData.birthDate) newErrors.birthDate = "Birth date is required"
        if (!formData.address?.trim()) newErrors.address = "Address is required"
        break

      case 1: // Health Insurance
        if (formData.hasInsurance && !formData.insuranceName?.trim()) {
          newErrors.insuranceName = "Insurance name is required"
        }
        break

      case 2: // Parents
        if (!formData.parentA_firstName?.trim()) newErrors.parentA_firstName = "Required"
        if (!formData.parentA_lastName?.trim()) newErrors.parentA_lastName = "Required"
        // DNI y teléfono son opcionales según la API
        break

      case 3: // School Data
        // Todos los campos de escuela son opcionales
        break

      case 4: // Billing Data
        // Todos los campos de facturación son opcionales
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, WIZARD_STEPS.length - 1))
      setErrors({})
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSuccess(formData as PatientFormData, mode)
    }
  }


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalDataStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        )
      case 1:
        return (
          <HealthInsuranceStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        )
      case 2:
        return (
          <ParentsStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        )
      case 3:
        return (
          <SchoolDataStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        )
      case 4:
        return (
          <BillingDataStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        )
      default:
        return null
    }
  }

  return (
    <Wizard
      steps={WIZARD_STEPS}
      currentStep={currentStep}
      onClose={onClose}
      onNext={handleNext}
      onPrev={handlePrev}
      onSubmit={handleSubmit}
      isLastStep={currentStep === WIZARD_STEPS.length - 1}
      isValid={Object.keys(errors).length === 0}
    >
      {renderStepContent()}
    </Wizard>
  )
}
