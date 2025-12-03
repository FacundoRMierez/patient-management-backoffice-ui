"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wizard } from "@/components/features/patients/wizard"
import { PatientSelectionStep } from "./wizard-steps/patient-selection-step"
import type { AppointmentFormData } from "@/lib/types/appointment"
import { DateTimeStep } from "./wizard-steps/date-time-step"
import { RecurrenceStep } from "./wizard-steps/recurrence-step"
import { PaymentStep } from "./wizard-steps/payment-step"

interface AppointmentWizardProps {
  initialData?: Partial<AppointmentFormData>
  patients: Array<{ id: string; firstName: string; lastName: string }>
}

const steps = [
  { id: 1, title: "Paciente", description: "Selecciona el paciente para el turno" },
  { id: 2, title: "Fecha y Horario", description: "Define fecha, hora de inicio y fin" },
  { id: 3, title: "Recurrencia", description: "Configura si el turno es único o recurrente" },
  { id: 4, title: "Pago", description: "Información de pago y precio" },
]

export function AppointmentWizard({ initialData, patients }: AppointmentWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<AppointmentFormData>>(
    initialData || {
      type: 'single',
      paymentType: 'private',
      price: '',
    }
  )

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Patient Selection
        return !!formData.patientId
      case 1: // Date and Time
        return !!(formData.date && formData.startTime && formData.endTime)
      case 2: // Recurrence
        if (formData.type === 'recurring') {
          return !!(
            formData.recurrencePattern &&
            formData.daysOfWeek &&
            formData.daysOfWeek.length > 0 &&
            (formData.recurrenceEndDate || formData.recurrenceOccurrences)
          )
        }
        return true
      case 3: // Payment
        if (formData.paymentType === 'insurance') {
          return !!(formData.price && formData.insuranceName)
        }
        return !!formData.price
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleClose = () => {
    router.push('/turnos')
  }

  const handleSubmit = async () => {
    // TODO: Implement API call
    console.log('Creating appointment:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push('/turnos')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PatientSelectionStep
            data={formData}
            patients={patients}
            onChange={updateFormData}
          />
        )
      case 1:
        return (
          <DateTimeStep
            data={formData}
            onChange={updateFormData}
          />
        )
      case 2:
        return (
          < RecurrenceStep
            data={formData}
            onChange={updateFormData}
          />
        )
      case 3:
        return (
          <PaymentStep
            data={formData}
            onChange={updateFormData}
          />
        )
      default:
        return null
    }
  }

  return (
    <Wizard
      steps={steps}
      currentStep={currentStep}
      onClose={handleClose}
      onNext={handleNext}
      onPrev={handlePrev}
      onSubmit={handleSubmit}
      isLastStep={currentStep === steps.length - 1}
      isValid={validateCurrentStep()}
      title="Crear Turno"
      submitLabel="Crear Turno"
    >
      {renderStep()}
    </Wizard>
  )
}
