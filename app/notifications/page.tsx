import { NotificationsList } from "@/components/notifications-list"
import { QuickAlerts } from "@/components/quick-alerts"
import { DashboardHeader } from "@/components/dashboard-header"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Notifications & Alerts</h1>
          <p className="text-muted-foreground">Monitor attendance alerts and send quick messages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NotificationsList />
          <QuickAlerts />
        </div>
      </main>
    </div>
  )
}
