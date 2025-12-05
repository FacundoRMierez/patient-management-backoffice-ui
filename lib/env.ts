/**
 * Configuración de entornos
 * Maneja las variables de entorno según el ambiente
 */

export const env = {
  // URL de la aplicación
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // URL de la API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  
  // Ambiente actual
  environment: process.env.NEXT_PUBLIC_ENV || 'development',
  
  // Habilitar datos mock
  enableMockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true',
  
  // Helpers
  isDevelopment: process.env.NEXT_PUBLIC_ENV === 'development' || process.env.NODE_ENV === 'development',
  isProduction: process.env.NEXT_PUBLIC_ENV === 'production' || process.env.NODE_ENV === 'production',
  isTest: process.env.NEXT_PUBLIC_ENV === 'test',
} as const

// Validar variables requeridas
if (typeof window === 'undefined') {
  // Solo validar en el servidor
  const required = ['NEXT_PUBLIC_APP_URL']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0 && env.isProduction) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(', ')}`)
  }
}

export default env
