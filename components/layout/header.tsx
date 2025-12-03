"use client"

import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import type { HeaderProps } from "@/lib/types"

export function Header({ onMenuClick, isCollapsed }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
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
    </header>
  )
}
