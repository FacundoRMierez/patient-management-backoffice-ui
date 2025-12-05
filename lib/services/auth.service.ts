import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/lib/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export class AuthService {
  private static instance: AuthService

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json()
      // Extract Spanish error message if available
      const errorMessage = errorData.error?.es || errorData.message || 'Error al iniciar sesión'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    // Store token and user in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    }

    return data
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      // Extract Spanish error message if available
      const errorMessage = errorData.error?.es || errorData.message || 'Error al registrarse'
      throw new Error(errorMessage)
    }

    return await response.json()
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  getUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = AuthService.getInstance()
