import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon?: string | LucideIcon
  disabled?: boolean
}

export interface SidebarNavItem extends NavItem {
  icon: LucideIcon
}

export interface LayoutProps {
  children: React.ReactNode
}

export interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobile?: boolean
}

export interface HeaderProps {
  onMenuClick: () => void
  isCollapsed: boolean
}
