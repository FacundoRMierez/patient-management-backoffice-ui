interface ActivityItemProps {
  title: string
  description: string
  time: string
}

export function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
        <div className="h-2 w-2 rounded-full bg-blue-600" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  )
}
