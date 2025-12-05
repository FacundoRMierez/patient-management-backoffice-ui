export const siteConfig = {
  name: "Patient Management",
  shortName: "PM",
  description: "Sistema integral de gestión de pacientes",
  tagline: "Gestiona tu práctica profesional de forma eficiente y segura",
  version: "1.0.0",
  year: "2025",
  support: {
    email: "soporte@patientmanagement.com",
  },
  links: {
    terms: "/terms",
    privacy: "/privacy",
  },
}

export const navigationConfig = {
  mainNav: [
    {
      title: "Inicio",
      href: "/",
      icon: "Home",
    },
    {
      title: "Pacientes",
      href: "/pacientes",
      icon: "Users",
    },
    {
      title: "Citas",
      href: "/citas",
      icon: "Calendar",
    },
    {
      title: "Historiales",
      href: "/historiales",
      icon: "FileText",
    },
    {
      title: "Configuración",
      href: "/configuracion",
      icon: "Settings",
    },
  ],
}
