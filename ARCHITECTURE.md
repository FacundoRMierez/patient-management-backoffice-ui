# Patient Management System

Sistema integral de gestión de pacientes construido con Next.js, React, TypeScript y Tailwind CSS.

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue una arquitectura modular y escalable basada en principios de **Feature-Sliced Design** adaptados para Next.js.

### Estructura de Carpetas

```
patient-management-backoffice-ui/
├── app/
│   ├── (dashboard)/              # Route Group - Rutas con sidebar
│   │   ├── layout.tsx            # Layout compartido con AppLayout
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── patients/             # Módulo de pacientes
│   │   ├── appointments/         # Módulo de citas
│   │   ├── records/              # Módulo de historiales
│   │   └── settings/             # Módulo de configuración
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Estilos globales
│
├── components/
│   ├── ui/                       # Componentes base reutilizables
│   │   ├── button.tsx            # Botón con variantes
│   │   ├── card.tsx              # Card con subcomponentes
│   │   └── input.tsx             # Input estilizado
│   │
│   ├── layout/                   # Componentes de layout
│   │   ├── app-layout.tsx        # Layout principal con sidebar
│   │   ├── sidebar.tsx           # Menú lateral colapsable
│   │   └── header.tsx            # Header para móvil
│   │
│   └── features/                 # Componentes específicos por feature
│       └── dashboard/
│           ├── stat-card.tsx     # Tarjeta de estadísticas
│           └── activity-item.tsx # Item de actividad reciente
│
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.ts             # Hook para detectar móvil
│   └── use-sidebar.ts            # Hook para estado del sidebar
│
├── lib/
│   ├── utils.ts                  # Utilidades (cn, etc.)
│   ├── constants.ts              # Constantes de la aplicación
│   └── types/
│       └── index.ts              # Tipos TypeScript compartidos
│
└── config/
    └── site.ts                   # Configuración del sitio
```

## 📋 Principios de Organización

### 1. **Route Groups en Next.js**
- Se usa `(dashboard)` como route group para agrupar todas las páginas que comparten el mismo layout con sidebar
- El layout se aplica automáticamente sin afectar la URL

### 2. **Separación de Componentes**

#### **components/ui/** - Componentes Genéricos
Componentes reutilizables sin lógica de negocio:
- Button, Card, Input, etc.
- Siguen el patrón de componentes de shadcn/ui
- Usan `class-variance-authority` para variantes
- Son totalmente agnósticos del dominio

#### **components/layout/** - Componentes de Layout
Componentes relacionados con la estructura de la aplicación:
- AppLayout: Layout principal
- Sidebar: Menú lateral
- Header: Cabecera para móvil

#### **components/features/** - Componentes de Features
Componentes específicos de cada funcionalidad:
- Organizados por módulo (dashboard, patients, etc.)
- Contienen lógica específica del dominio

### 3. **Custom Hooks**
Lógica reutilizable extraída en hooks:
- `useMobile()`: Detecta si es dispositivo móvil
- `useSidebar()`: Maneja estado del sidebar (colapsado/expandido)

### 4. **Configuración Centralizada**
- **config/site.ts**: Configuración del sitio y navegación
- **lib/constants.ts**: Constantes como breakpoints, rutas, etc.
- **lib/types/**: Tipos TypeScript compartidos

### 5. **Utilidades**
- **lib/utils.ts**: Función `cn()` para combinar clases CSS eficientemente

## 🎨 Sistema de Diseño

### Componentes UI Base
Todos los componentes UI siguen estos principios:
- ✅ Tipados con TypeScript
- ✅ Usan `forwardRef` para refs
- ✅ Combinan clases con `cn()` utility
- ✅ Soportan props HTML nativas
- ✅ Tienen variantes consistentes

### Ejemplo de Uso

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Tarjeta</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">
          Click Me
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🚀 Beneficios de esta Arquitectura

1. **Escalabilidad**: Fácil agregar nuevas features sin afectar las existentes
2. **Mantenibilidad**: Código organizado y fácil de encontrar
3. **Reutilización**: Componentes UI compartidos en toda la app
4. **Testabilidad**: Componentes aislados son más fáciles de testear
5. **Colaboración**: Estructura clara para equipos grandes
6. **Performance**: Code splitting automático por Next.js

## 📝 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (Button.tsx, UserCard.tsx)
- **Hooks**: camelCase con prefijo "use" (useMobile.ts)
- **Utilidades**: camelCase (utils.ts, constants.ts)
- **Tipos**: PascalCase con sufijo Props/Type si aplica

### Imports
Se usa path aliasing con `@/`:
```tsx
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { ROUTES } from "@/lib/constants"
```

### Exports
- Named exports para utilidades y hooks
- Default exports para páginas y componentes principales

## 🔄 Flujo de Desarrollo

### Agregar una Nueva Página
1. Crear carpeta en `app/(dashboard)/nueva-pagina/`
2. Crear `page.tsx` (el layout se aplica automáticamente)
3. Agregar ruta a `config/site.ts` en `navigationConfig`

### Agregar un Nuevo Componente UI
1. Crear en `components/ui/mi-componente.tsx`
2. Usar `forwardRef` y tipado adecuado
3. Implementar variantes con `cva` si es necesario

### Agregar una Feature
1. Crear carpeta en `components/features/mi-feature/`
2. Crear componentes específicos de la feature
3. Usar componentes UI base cuando sea posible

## 🛠️ Tecnologías

- **Next.js 16** - Framework React con App Router
- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos
- **class-variance-authority** - Variantes de componentes
- **clsx + tailwind-merge** - Gestión de clases CSS

## 📦 Scripts

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
```

## 🎯 Próximos Pasos

- [ ] Implementar autenticación
- [ ] Conectar con API backend
- [ ] Agregar validación de formularios (React Hook Form + Zod)
- [ ] Implementar gestión de estado global (Zustand/Context)
- [ ] Agregar tests (Jest + Testing Library)
- [ ] Implementar modo oscuro
- [ ] Agregar internacionalización (i18n)
