import { FilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function RecordsPage() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historiales Médicos</h1>
            <p className="mt-2 text-gray-600">
              Consulta y gestiona los historiales clínicos
            </p>
          </div>
          <Button>
            <FilePlus className="mr-2 h-5 w-5" />
            Nuevo Historial
          </Button>
        </div>

        {/* Records placeholder */}
        <Card className="p-6">
          <p className="text-center text-gray-500">
            Historiales médicos aparecerán aquí
          </p>
        </Card>
      </div>
  )
}
