export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  organizationName: string
  address: string
  phoneNumber: string
  professionalType: string | null
  licenseNumber: string | null
  specialization: string | null
  isDeleted: boolean
  isApproved: boolean
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt: string | null
  roles: string[]
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  organizationName: string
  address: string
  phoneNumber: string
  professionalType: 'PSYCHOLOGIST' | 'PSYCHIATRIST' | 'THERAPIST' | 'OTHER'
  licenseNumber: string
  specialization: string
}

export interface LoginResponse {
  message: string
  data: {
    user: User
    token: string
  }
}

export interface RegisterResponse {
  message: string
  data: {
    user: Omit<User, 'roles'>
  }
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
