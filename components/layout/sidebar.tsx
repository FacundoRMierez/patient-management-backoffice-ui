"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
  type LucideIcon
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import type { SidebarProps } from "@/lib/types"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
}

interface MenuItem {
  title: string
  href: string
  icon: LucideIcon
}

export function Sidebar({ isCollapsed, onToggle, isMobile = false }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLinkClick = () => {
    if (isMobile && !isCollapsed) {
      onToggle()
    }
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U'
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  // Convert navigation config to menu items with icons
  const menuItems: MenuItem[] = [
    {
      title: "Inicio",
      href: "/",
      icon: Home,
    },
    {
      title: "Pacientes",
      href: "/pacientes",
      icon: Users,
    },
    {
      title: "Turnos",
      href: "/turnos",
      icon: Calendar,
    },
    {
      title: "Historiales",
      href: "/historiales",
      icon: FileText,
    },
    {
      title: "Configuración",
      href: "/configuracion",
      icon: Settings,
    },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        isMobile && isCollapsed && "-translate-x-full"
      )}
    >
      {/* Header con logo y botón de colapsar */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <div
          className={cn(
            "flex items-center space-x-2 overflow-hidden transition-all duration-300",
            isCollapsed && "opacity-0"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">PM</span>
          </div>
          <span className="whitespace-nowrap text-xl font-semibold text-gray-800">
            {siteConfig.name}
          </span>
        </div>
        
        <button
          onClick={onToggle}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors",
            isCollapsed && "mx-auto"
          )}
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              <span
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}
              >
                {item.title}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer con info de usuario */}
      <div className="border-t border-gray-200 p-4">
        <div
          className={cn(
            "flex items-center mb-2",
            isCollapsed ? "justify-center" : "space-x-3"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 flex-shrink-0">
            <span className="text-xs font-medium text-white">
              {getInitials(user?.firstName, user?.lastName)}
            </span>
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        
        {!isCollapsed && (
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        )}
        
        {isCollapsed && (
          <button
            onClick={logout}
            className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  )
}
