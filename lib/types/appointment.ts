export type AppointmentType = 'single' | 'recurring'
export type PaymentType = 'insurance' | 'private'
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show'
export type RecurrencePattern = 'weekly' | 'biweekly' | 'monthly'

export interface RecurrenceConfig {
  pattern: RecurrencePattern
  daysOfWeek: number[] // 0 = Sunday, 1 = Monday, etc.
  startDate: Date
  endDate?: Date
  occurrences?: number
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  
  // Date and time
  date: Date
  startTime: string // "HH:mm" format
  endTime: string // "HH:mm" format
  duration: number // in minutes
  
  // Type and recurrence
  type: AppointmentType
  recurrence?: RecurrenceConfig
  parentAppointmentId?: string // For recurring appointments
  
  // Payment
  paymentType: PaymentType
  price: number
  insuranceName?: string
  
  // Status and notes
  status: AppointmentStatus
  observations?: string
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentFormData {
  patientId: string
  
  // Date and time
  date: string // "YYYY-MM-DD"
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  
  // Type and recurrence
  type: AppointmentType
  recurrencePattern?: RecurrencePattern
  daysOfWeek?: number[]
  recurrenceEndDate?: string
  recurrenceOccurrences?: number
  
  // Payment
  paymentType: PaymentType
  price: string
  insuranceName?: string
  
  // Notes
  observations?: string
}

export interface AppointmentFilters {
  patientId?: string
  month: number // 1-12
  year: number
  status?: AppointmentStatus
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  appointments: Appointment[]
}

export interface CalendarView {
  type: 'month' | 'week' | 'day'
  startDate: Date
  endDate: Date
}
