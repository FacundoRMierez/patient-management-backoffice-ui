import type { Patient, PatientFormData, PatientsResponse } from '@/lib/types/paciente'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface CreatePatientRequest {
  dni: string
  cut?: string
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  phoneNumber?: string
  email?: string
  
  // Health Insurance
  healthInsurance?: {
    hasInsurance: boolean
    insuranceName?: string
    affiliateNumber?: string
  }
  
  // Guardians
  guardians: Array<{
    type: 'A' | 'B'
    firstName: string
    lastName: string
    dni: string
    phoneNumber: string
    email?: string
    occupation?: string
    isLegalGuardian: boolean
  }>
  
  legalGuardianType: 'A' | 'B' | 'both'
  
  // School Data
  schoolInfo?: {
    attendsSchool: boolean
    schoolName?: string
    schoolAddress?: string
    grade?: string
    observations?: string
  }
  
  // Billing Data
  billingInfo?: {
    requiresBilling: boolean
    businessName?: string
    taxId?: string
    taxCondition?: string
    fiscalAddress?: string
    billingEmail?: string
  }
}

export interface PatientFilters {
  page?: number
  limit?: number
  search?: string
  hasInsurance?: boolean
  isActive?: boolean
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export class PatientService {
  private static instance: PatientService

  private constructor() {}

  static getInstance(): PatientService {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService()
    }
    return PatientService.instance
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  private getHeaders(): HeadersInit {
    const token = this.getToken()
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  // Convertir FormData del frontend al formato de la API
  private convertFormDataToRequest(formData: PatientFormData): CreatePatientRequest {
    const guardians: CreatePatientRequest['guardians'] = [
      {
        type: 'A',
        firstName: formData.parentA_firstName,
        lastName: formData.parentA_lastName,
        dni: formData.parentA_documentId,
        phoneNumber: formData.parentA_phone,
        email: formData.parentA_email,
        occupation: formData.parentA_occupation,
        isLegalGuardian: formData.legalGuardian === 'A' || formData.legalGuardian === 'both',
      },
    ]

    if (formData.hasParentB && formData.parentB_firstName) {
      guardians.push({
        type: 'B',
        firstName: formData.parentB_firstName,
        lastName: formData.parentB_lastName!,
        dni: formData.parentB_documentId!,
        phoneNumber: formData.parentB_phone!,
        email: formData.parentB_email,
        occupation: formData.parentB_occupation,
        isLegalGuardian: formData.legalGuardian === 'B' || formData.legalGuardian === 'both',
      })
    }

    return {
      dni: formData.documentId,
      cut: formData.cut,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.birthDate,
      address: formData.address,
      phoneNumber: formData.phone,
      email: formData.email,
      
      healthInsurance: {
        hasInsurance: formData.hasInsurance || false,
        insuranceName: formData.insuranceName,
        affiliateNumber: formData.memberNumber,
      },
      
      guardians,
      legalGuardianType: formData.legalGuardian,
      
      schoolInfo: formData.hasSchool ? {
        attendsSchool: true,
        schoolName: formData.schoolName,
        schoolAddress: formData.schoolLocation,
        grade: formData.grade,
        observations: formData.observations,
      } : {
        attendsSchool: false,
      },
      
      billingInfo: {
        requiresBilling: formData.requiresInvoice || false,
        businessName: formData.requiresInvoice ? formData.billingBusinessName : undefined,
        taxId: formData.requiresInvoice ? formData.billingTaxId : undefined,
        taxCondition: formData.requiresInvoice ? formData.billingFiscalCondition : undefined,
        fiscalAddress: formData.requiresInvoice ? formData.billingFiscalAddress : undefined,
        billingEmail: formData.requiresInvoice ? formData.billingEmail : undefined,
      },
    }
  }

  // Convertir Patient de la API al formato del formulario
  convertPatientToFormData(patient: Patient): Partial<PatientFormData> {
    return {
      documentId: patient.documentId,
      cut: patient.cut,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate instanceof Date 
        ? patient.birthDate.toISOString().split('T')[0]
        : new Date(patient.birthDate).toISOString().split('T')[0],
      address: patient.address,
      phone: patient.phone || '',
      email: patient.email || '',
      
      hasInsurance: patient.healthInsurance?.hasInsurance || false,
      insuranceName: patient.healthInsurance?.name || '',
      memberNumber: patient.healthInsurance?.memberNumber || '',
      
      parentA_firstName: patient.parentA.firstName,
      parentA_lastName: patient.parentA.lastName,
      parentA_documentId: patient.parentA.documentId,
      parentA_phone: patient.parentA.phone,
      parentA_email: patient.parentA.email || '',
      parentA_occupation: patient.parentA.occupation || '',
      
      hasParentB: !!patient.parentB,
      parentB_firstName: patient.parentB?.firstName || '',
      parentB_lastName: patient.parentB?.lastName || '',
      parentB_documentId: patient.parentB?.documentId || '',
      parentB_phone: patient.parentB?.phone || '',
      parentB_email: patient.parentB?.email || '',
      parentB_occupation: patient.parentB?.occupation || '',
      
      legalGuardian: patient.legalGuardian,
      
      hasSchool: !!patient.schoolData,
      schoolName: patient.schoolData?.schoolName || '',
      schoolLocation: patient.schoolData?.location || '',
      grade: patient.schoolData?.grade || '',
      observations: patient.schoolData?.observations || '',

      requiresInvoice: patient.billingData?.requiresInvoice || false,
      billingBusinessName: patient.billingData?.businessName || '',
      billingTaxId: patient.billingData?.taxId || '',
      billingFiscalAddress: patient.billingData?.fiscalAddress || '',
      billingFiscalCondition: patient.billingData?.fiscalCondition,
      billingEmail: patient.billingData?.email || '',
    }
  }

  async createPatient(formData: PatientFormData): Promise<Patient> {
    const requestData = this.convertFormDataToRequest(formData)
    
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al crear paciente'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.data
  }

  async updatePatient(id: string, formData: PatientFormData): Promise<Patient> {
    const requestData = this.convertFormDataToRequest(formData)
    
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al actualizar paciente'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.data
  }

  // Mapear respuesta de la API al formato del frontend
  private mapApiPatientToFrontend(apiPatient: any): Patient {
    const guardianA = apiPatient.guardians?.find((g: any) => g.type === 'A')
    const guardianB = apiPatient.guardians?.find((g: any) => g.type === 'B')
    
    return {
      id: apiPatient.id,
      documentId: apiPatient.dni,
      cut: apiPatient.cut,
      firstName: apiPatient.firstName,
      lastName: apiPatient.lastName,
      birthDate: new Date(apiPatient.dateOfBirth),
      address: apiPatient.address,
      phone: apiPatient.phoneNumber,
      email: apiPatient.email,
      
      healthInsurance: {
        hasInsurance: !!apiPatient.healthInsurance,
        name: apiPatient.healthInsurance?.insuranceName,
        memberNumber: apiPatient.healthInsurance?.affiliateNumber,
      },
      
      parentA: {
        firstName: guardianA?.firstName || '',
        lastName: guardianA?.lastName || '',
        documentId: guardianA?.dni || '',
        phone: guardianA?.phoneNumber || '',
        email: guardianA?.email,
        occupation: guardianA?.occupation,
      },
      
      parentB: guardianB ? {
        firstName: guardianB.firstName,
        lastName: guardianB.lastName,
        documentId: guardianB.dni,
        phone: guardianB.phoneNumber,
        email: guardianB.email,
        occupation: guardianB.occupation,
      } : undefined,
      
      legalGuardian: guardianA?.isLegalGuardian && guardianB?.isLegalGuardian 
        ? 'both' 
        : guardianA?.isLegalGuardian 
          ? 'A' 
          : 'B',
      
      schoolData: apiPatient.schoolInfo ? {
        schoolName: apiPatient.schoolInfo.schoolName,
        location: apiPatient.schoolInfo.schoolAddress,
        grade: apiPatient.schoolInfo.grade,
        observations: apiPatient.schoolInfo.observations,
      } : undefined,
      
      billingData: apiPatient.billingInfo ? {
        requiresInvoice: apiPatient.billingInfo.requiresBilling,
        businessName: apiPatient.billingInfo.businessName,
        taxId: apiPatient.billingInfo.taxId,
        fiscalAddress: apiPatient.billingInfo.fiscalAddress,
        fiscalCondition: apiPatient.billingInfo.taxCondition,
        email: apiPatient.billingInfo.billingEmail,
      } : undefined,
      
      registrationDate: new Date(apiPatient.createdAt),
      lastUpdate: new Date(apiPatient.updatedAt),
      active: apiPatient.isActive,
    }
  }

  async getPatients(filters?: PatientFilters): Promise<PatientsResponse> {
    const params = new URLSearchParams()
    
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())
    if (filters?.search) params.append('search', filters.search)
    if (filters?.hasInsurance !== undefined) params.append('hasInsurance', filters.hasInsurance.toString())
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters?.status) params.append('status', filters.status)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)

    const response = await fetch(`${API_URL}/patients?${params.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al obtener pacientes'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    // Mapear cada paciente de la API al formato del frontend
    const mappedPatients = Array.isArray(data.data) 
      ? data.data.map((p: any) => this.mapApiPatientToFrontend(p))
      : []
    
    return {
      patients: mappedPatients,
      total: data.meta?.total || 0,
      page: data.meta?.page || 1,
      pageSize: data.meta?.limit || 10,
      totalPages: data.meta?.totalPages || 0,
    }
  }

  async getPatientById(id: string): Promise<Patient> {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al obtener paciente'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return this.mapApiPatientToFrontend(data.data)
  }

  async deletePatient(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al eliminar paciente'
      throw new Error(errorMessage)
    }
  }

  async getStats(): Promise<{
    total: number
    active: number
    withInsurance: number
    byStatus?: {
      pending: number
      approved: number
      rejected: number
    }
  }> {
    const response = await fetch(`${API_URL}/patients/stats`, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al obtener estadísticas'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    // Mapear la respuesta de la API al formato esperado por el frontend
    return {
      total: data.data.totalPatients || 0,
      active: data.data.activePatients || 0,
      withInsurance: data.data.patientsWithInsurance || 0,
      byStatus: {
        pending: data.data.pendingPatients || 0,
        approved: data.data.totalPatients - (data.data.pendingPatients || 0),
        rejected: 0,
      }
    }
  }

  async approvePatient(id: string): Promise<Patient> {
    const response = await fetch(`${API_URL}/patients/${id}/approve`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al aprobar paciente'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.data
  }

  async togglePatientStatus(id: string): Promise<Patient> {
    const response = await fetch(`${API_URL}/patients/${id}/toggle-status`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error?.es || errorData.message || 'Error al cambiar estado del paciente'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.data
  }
}
