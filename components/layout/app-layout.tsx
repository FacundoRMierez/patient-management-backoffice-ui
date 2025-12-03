"use client"

import { useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"
import type { LayoutProps } from "@/lib/types"

export function AppLayout({ children }: LayoutProps) {
  const { isCollapsed, isMobile, toggleSidebar, collapseSidebar } = useSidebar()

  // Cerrar menú al hacer clic fuera en móvil
  useEffect(() => {
    if (!isMobile || isCollapsed) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("aside") && !target.closest("button")) {
        collapseSidebar()
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobile, isCollapsed, collapseSidebar])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Overlay para móvil cuando el menú está abierto */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={collapseSidebar}
        />
      )}

      {/* Header para móvil */}
      {isMobile && (
        <Header 
          onMenuClick={toggleSidebar}
          isCollapsed={isCollapsed}
        />
      )}

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isMobile ? "pt-16" : isCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <div className="p-3 sm:p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
