"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  id: string
  type: ToastType
  title: string
  description?: string
  onClose: () => void
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-900",
    iconClassName: "text-green-600"
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 border-red-200 text-red-900",
    iconClassName: "text-red-600"
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-amber-50 border-amber-200 text-amber-900",
    iconClassName: "text-amber-600"
  },
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-900",
    iconClassName: "text-blue-600"
  }
}

export function Toast({ id, type, title, description, onClose }: ToastProps) {
  const config = toastConfig[type]
  const Icon = config.icon

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-md rounded-xl border shadow-lg p-4 animate-in slide-in-from-top-full",
        config.className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.iconClassName)} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{title}</p>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Array<{ id: string; type: ToastType; title: string; description?: string }>
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  )
}

// Hook para usar el toast
export function useToast() {
  const [toasts, setToasts] = React.useState<Array<{ id: string; type: ToastType; title: string; description?: string }>>([])

  const toast = React.useCallback((type: ToastType, title: string, description?: string) => {
    const id = Math.random().toString(36)
    setToasts((prev) => [...prev, { id, type, title, description }])
  }, [])

  const closeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return {
    toasts,
    toast,
    closeToast,
    success: (title: string, description?: string) => toast("success", title, description),
    error: (title: string, description?: string) => toast("error", title, description),
    warning: (title: string, description?: string) => toast("warning", title, description),
    info: (title: string, description?: string) => toast("info", title, description),
  }
}
