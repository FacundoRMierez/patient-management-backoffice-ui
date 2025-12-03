import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="mt-2 text-gray-600">
            Administra las configuraciones del sistema
          </p>
        </div>

      {/* Settings sections */}
      <div className="space-y-4">
        {/* General settings */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Clínica
              </label>
              <Input
                type="text"
                placeholder="Clínica Médica"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contacto
              </label>
              <Input
                type="email"
                placeholder="contacto@clinica.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save button */}
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-5 w-5" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  )
}
