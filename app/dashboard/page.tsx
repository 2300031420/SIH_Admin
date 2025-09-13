import { AttendanceSummary } from "@/components/attendance-summary"
import { StudentList } from "@/components/student-list"
import { DashboardHeader } from "@/components/dashboard-header"


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Manage your class attendance efficiently</p>
        </div>

        {/* Modern Navigation Tabs */}
       

        {/* Today's Attendance Summary - Modern Cards */}
        

        {/* Student List Section */}
        <div className="space-y-6">
          <StudentList />
        </div>
      </main>
    </div>
  )
}
