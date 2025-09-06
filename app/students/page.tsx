import { DashboardHeader } from "@/components/dashboard-header"
import { StudentManagement } from "@/components/student-management"

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Add, edit, and manage your class students</p>
        </div>

        {/* Student Management Component */}
        <StudentManagement />
      </main>
    </div>
  )
}
