# Variables de Entorno

Este proyecto utiliza diferentes archivos de entorno para cada ambiente:

## Archivos de Entorno

- **`.env.local`** - Desarrollo local (Git ignorado)
- **`.env.production`** - Producción (Git ignorado) 
- **`.env.example`** - Plantilla de ejemplo (commiteado)

## Uso

### Desarrollo Local
```bash
npm run dev
```
Usa `.env.local` automáticamente.

### Producción (Build)
```bash
npm run build
npm start
```
Usa `.env.production` automáticamente.

### Preview de Producción
```bash
npm run build
npm start
```

## Variables Disponibles

- `NEXT_PUBLIC_APP_URL` - URL de la aplicación
- `NEXT_PUBLIC_API_URL` - URL del backend API
- `NEXT_PUBLIC_ENV` - Ambiente (development/production/test)
- `NEXT_PUBLIC_ENABLE_MOCK_DATA` - Habilitar datos mock (true/false)

## Configuración en Vercel

Para configurar en Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las variables necesarias:
   - `NEXT_PUBLIC_APP_URL`: https://patient-management-backoffice-ui.vercel.app
   - `NEXT_PUBLIC_API_URL`: Tu URL de API en producción
   - `NEXT_PUBLIC_ENV`: production
   - `NEXT_PUBLIC_ENABLE_MOCK_DATA`: false

## Acceder a las Variables

```typescript
import env from '@/lib/env'

// Usar las variables
console.log(env.apiUrl)
console.log(env.isDevelopment)
```

## Nota de Seguridad

⚠️ Solo las variables con prefijo `NEXT_PUBLIC_` son accesibles en el navegador.
Variables sin este prefijo solo están disponibles en el servidor.
