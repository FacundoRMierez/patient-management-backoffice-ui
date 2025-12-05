"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AuthService } from "@/lib/services/auth.service"
import type { RegisterRequest } from "@/lib/types/auth"
import { CheckCircle2, ArrowLeft, UserPlus, Mail, Building2, MapPin, Phone, Award, Stethoscope, Eye, EyeOff, Sparkles } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    organizationName: '',
    address: '',
    phoneNumber: '',
    professionalType: 'PSYCHOLOGIST',
    licenseNumber: '',
    specialization: '',
  })

  const handleChange = (field: keyof RegisterRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const authService = AuthService.getInstance()
      await authService.register(formData)
      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
            {/* Icono de éxito animado */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Mensaje de éxito */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Solicitud Recibida!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Tu cuenta ha sido creada exitosamente
            </p>

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Próximos pasos</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      Revisaremos tu información
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      Verificaremos tus credenciales
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      Recibirás un correo con la aprobación
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mensaje de aprobación pendiente */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 mb-6 text-left">
              <p className="text-sm text-amber-800">
                <strong className="font-semibold">Aprobación pendiente:</strong> Tu cuenta está siendo revisada por nuestro equipo. Te notificaremos por correo electrónico cuando puedas acceder.
              </p>
            </div>

            {/* Botón de volver */}
            <Link href="/login">
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold shadow-lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al inicio de sesión
              </Button>
            </Link>

            {/* Soporte */}
            <p className="mt-6 text-sm text-gray-500">
              ¿Necesitas ayuda?{" "}
              <a href={`mailto:${siteConfig.support.email}`} className="text-blue-600 hover:text-blue-700 font-medium">
                Contacta a soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <div className="lg:flex w-full">
              {/* Panel izquierdo - Información */}
              <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white">
                <div className="h-full flex flex-col justify-between w-full">
                  <div>
                   

                    {/* Logo */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                      <span className="text-2xl font-bold">{siteConfig.shortName}</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                      Únete a {siteConfig.name}
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                      {siteConfig.tagline}
                    </p>

                    {/* Beneficios */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Gestión Completa</h4>
                          <p className="text-sm text-blue-100">Administra pacientes, turnos e historiales en un solo lugar</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">100% Seguro</h4>
                          <p className="text-sm text-blue-100">Cumplimiento total con normativas de privacidad médica</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Soporte Dedicado</h4>
                          <p className="text-sm text-blue-100">Asistencia personalizada para tu práctica</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-blue-100">
                    © {siteConfig.year} {siteConfig.name}
                  </div>
                </div>
              </div>

              {/* Panel derecho - Formulario */}
              <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12 overflow-y-auto bg-white">
                {/* Botón de volver - Mobile */}
                <div className="lg:hidden mb-6 pb-6 border-b">
                  <Link 
                    href="/login"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al inicio de sesión
                  </Link>
                </div>

                <div className="max-w-xl mx-auto">
                  {/* Título del formulario */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Crear Cuenta</h3>
                    </div>
                    <p className="text-gray-600">Completa tus datos profesionales para solicitar acceso</p>
                  </div>

                  {/* Formulario */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    {/* Información Personal */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                        Información Personal
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-700">Nombre</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            required
                            className="mt-1.5 h-11"
                            placeholder="Juan"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-700">Apellido</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            required
                            className="mt-1.5 h-11"
                            placeholder="Pérez"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700">
                          <Mail className="w-4 h-4 inline mr-1.5" />
                          Correo Electrónico
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="mt-1.5 h-11"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                        <div className="relative mt-1.5">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            required
                            className="h-11 pr-10"
                            placeholder="Mínimo 8 caracteres"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Usa al menos 8 caracteres con letras y números</p>
                      </div>
                    </div>

                    {/* Información Profesional */}
                    <div className="space-y-4 pt-6 border-t">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                        Información Profesional
                      </h4>

                      <div>
                        <Label htmlFor="organizationName" className="text-gray-700">
                          <Building2 className="w-4 h-4 inline mr-1.5" />
                          Nombre del Consultorio u Organización
                        </Label>
                        <Input
                          id="organizationName"
                          value={formData.organizationName}
                          onChange={(e) => handleChange('organizationName', e.target.value)}
                          className="mt-1.5 h-11"
                          placeholder="Mi Consultorio Psicológico"
                        />
                      </div>

                      <div>
                        <Label htmlFor="professionalType" className="text-gray-700">
                          <Stethoscope className="w-4 h-4 inline mr-1.5" />
                          Tipo de Profesional
                        </Label>
                        <select
                          id="professionalType"
                          value={formData.professionalType}
                          onChange={(e) => handleChange('professionalType', e.target.value)}
                          className="mt-1.5 flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <option value="PSYCHOLOGIST">Psicólogo/a</option>
                          <option value="PSYCHIATRIST">Psiquiatra</option>
                          <option value="THERAPIST">Terapeuta</option>
                          <option value="COUNSELOR">Consejero/a</option>
                          <option value="OTHER">Otro</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="licenseNumber" className="text-gray-700">
                            <Award className="w-4 h-4 inline mr-1.5" />
                            Matrícula
                          </Label>
                          <Input
                            id="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={(e) => handleChange('licenseNumber', e.target.value)}
                            className="mt-1.5 h-11"
                            placeholder="PSY-12345"
                          />
                        </div>
                        <div>
                          <Label htmlFor="specialization" className="text-gray-700">Especialización</Label>
                          <Input
                            id="specialization"
                            value={formData.specialization}
                            onChange={(e) => handleChange('specialization', e.target.value)}
                            className="mt-1.5 h-11"
                            placeholder="Psicología Clínica"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-4 pt-6 border-t">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
                        Información de Contacto
                      </h4>

                      <div>
                        <Label htmlFor="address" className="text-gray-700">
                          <MapPin className="w-4 h-4 inline mr-1.5" />
                          Dirección
                        </Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                          className="mt-1.5 h-11"
                          placeholder="Calle 123, Ciudad, País"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber" className="text-gray-700">
                          <Phone className="w-4 h-4 inline mr-1.5" />
                          Teléfono
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleChange('phoneNumber', e.target.value)}
                          className="mt-1.5 h-11"
                          placeholder="+54 11 1234-5678"
                        />
                      </div>
                    </div>

                    {/* Términos y condiciones */}
                    <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
                      Al crear una cuenta, aceptas nuestros{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                        Términos de Servicio
                      </Link>
                      {" "}y{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Política de Privacidad
                      </Link>
                    </div>

                    {/* Botón de envío */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando solicitud...
                        </div>
                      ) : (
                        "Crear Cuenta"
                      )}
                    </Button>
                  </form>

                  {/* Ya tienes cuenta */}
                  <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Iniciar sesión
                    </Link>
                  </p>
                </div>
              </div>
            </div>
        </div>
  )
}
