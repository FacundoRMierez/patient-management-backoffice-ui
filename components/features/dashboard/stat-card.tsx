import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  color: string
  change: string
}

export function StatCard({ title, value, icon: Icon, color, change }: StatCardProps) {
  return (
    <Card className="p-6 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`rounded-lg ${color} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  )
}
