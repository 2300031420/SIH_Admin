import { ManualOverrideForm } from "@/components/manual-override-form"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentOverrides } from "@/components/recent-overrides"

export default function ManualOverridePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Manual Attendance Override</h1>
          <p className="text-muted-foreground">Manually mark or correct student attendance when needed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ManualOverrideForm />
          <RecentOverrides />
        </div>
      </main>
    </div>
  )
}
