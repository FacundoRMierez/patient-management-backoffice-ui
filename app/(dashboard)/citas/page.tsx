import { CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Citas</h1>
            <p className="mt-2 text-gray-600">
              Administra las citas médicas
            </p>
          </div>
          <Button>
            <CalendarPlus className="mr-2 h-5 w-5" />
            Nueva Cita
          </Button>
        </div>

        {/* Calendar placeholder */}
        <Card className="p-6">
          <p className="text-center text-gray-500">
            Calendario de citas aparecerá aquí
          </p>
        </Card>
      </div>
  )
}
