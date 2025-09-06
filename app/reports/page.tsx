import { ReportFilters } from "@/components/report-filters"
import { AttendanceTrends } from "@/components/attendance-trends"
import { ReportTable } from "@/components/report-table"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Attendance Reports</h1>
          <p className="text-muted-foreground">Generate and export attendance reports for analysis</p>
        </div>

        <ReportFilters />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceTrends />
          <ReportTable />
        </div>
      </main>
    </div>
  )
}
