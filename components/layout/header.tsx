"use client"

import { Menu, LogOut, User } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import type { HeaderProps } from "@/lib/types"

export function Header({ onMenuClick, isCollapsed }: HeaderProps) {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
        
        <div className="ml-4 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">PM</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            {siteConfig.name}
          </span>
        </div>
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <User className="h-5 w-5 text-gray-700" />
        </button>

        {showUserMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowUserMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  logout()
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
