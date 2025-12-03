export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const

export const SIDEBAR = {
  width: {
    expanded: 256, // 64 * 4 (w-64)
    collapsed: 64,  // 16 * 4 (w-16)
  },
  animation: {
    duration: 300, // ms
  },
} as const

export const ROUTES = {
  home: "/",
  patients: "/pacientes",
  appointments: "/turnos",
  records: "/historiales",
  settings: "/configuracion",
} as const
