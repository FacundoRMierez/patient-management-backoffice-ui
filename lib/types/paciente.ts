export interface Parent {
  firstName: string
  lastName: string
  documentId: string
  phone: string
  email?: string
  occupation?: string
}

export interface HealthInsurance {
  hasInsurance: boolean
  name?: string
  memberNumber?: string
}

export interface SchoolData {
  schoolName: string
  location: string
  grade: string
  observations?: string
}

export interface BillingData {
  requiresInvoice: boolean
  businessName?: string
  taxId?: string // CUIT/CUIL
  fiscalAddress?: string
  fiscalCondition?: 'RESPONSABLE_INSCRIPTO' | 'MONOTRIBUTISTA' | 'CONSUMIDOR_FINAL' | 'EXENTO'
  email?: string
}

export interface Patient {
  id: string
  documentId: string
  cut?: string
  firstName: string
  lastName: string
  birthDate: Date
  address: string
  phone?: string
  email?: string
  
  // Health Insurance
  healthInsurance: HealthInsurance
  
  // Parents
  parentA: Parent
  parentB?: Parent
  legalGuardian: 'A' | 'B' | 'both'
  
  // School Data
  schoolData?: SchoolData
  
  // Billing Data
  billingData?: BillingData
  
  // Metadata
  registrationDate: Date
  lastUpdate: Date
  active: boolean
}

export interface PatientFormData {
  // Step 1: Personal Data
  documentId: string
  cut?: string
  firstName: string
  lastName: string
  birthDate: string
  address: string
  phone?: string
  email?: string
  
  // Step 2: Health Insurance
  hasInsurance: boolean
  insuranceName?: string
  memberNumber?: string
  
  // Step 3: Parent A
  parentA_firstName: string
  parentA_lastName: string
  parentA_documentId: string
  parentA_phone: string
  parentA_email?: string
  parentA_occupation?: string
  
  // Step 4: Parent B (optional)
  hasParentB: boolean
  parentB_firstName?: string
  parentB_lastName?: string
  parentB_documentId?: string
  parentB_phone?: string
  parentB_email?: string
  parentB_occupation?: string
  
  legalGuardian: 'A' | 'B' | 'both'
  
  // Step 5: School Data
  hasSchool: boolean
  schoolName?: string
  schoolLocation?: string
  grade?: string
  observations?: string
  
  // Step 6: Billing Data
  requiresInvoice: boolean
  billingBusinessName?: string
  billingTaxId?: string
  billingFiscalAddress?: string
  billingFiscalCondition?: 'RESPONSABLE_INSCRIPTO' | 'MONOTRIBUTISTA' | 'CONSUMIDOR_FINAL' | 'EXENTO'
  billingEmail?: string
}

export interface PatientFilters {
  search: string // Document ID or name
  page: number
  pageSize: number
}

export interface PatientsResponse {
  patients: Patient[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
