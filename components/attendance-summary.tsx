"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const attendanceData = {
  totalStudents: 10,
  presentCount: 9,
  absentCount: 1,
  lastUpdated: "10:30 AM",
}

export function AttendanceSummary() {
  const { t } = useLanguage()
  const attendancePercentage = Math.round((attendanceData.presentCount / attendanceData.totalStudents) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card
        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
        style={{ animationDelay: "0ms" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t("total_students") || "Total Students"}</p>
              <p className="text-3xl font-bold text-gray-900 animate-count-up">{attendanceData.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t("present") || "Present"}</p>
              <p className="text-3xl font-bold text-gray-900 animate-count-up">{attendanceData.presentCount}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-green-500/25 transition-all duration-300">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t("absent") || "Absent"}</p>
              <p className="text-3xl font-bold text-gray-900 animate-count-up">{attendanceData.absentCount}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-red-500/25 transition-all duration-300">
              <UserX className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t("attendance_rate") || "Attendance %"}</p>
              <p className="text-3xl font-bold text-gray-900 animate-count-up">{attendancePercentage}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
