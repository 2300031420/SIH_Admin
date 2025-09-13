"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface AttendanceSummaryData {
  totalStudents: number
  presentCount: number
  absentCount: number
  lastUpdated?: string
}

interface AttendanceSummaryProps {
  schoolId: string
}

interface AttendanceApiResponse {
  _id: "Present" | "Absent" | string
  count: number
}

export function AttendanceSummary({ schoolId }: AttendanceSummaryProps) {
  const { t } = useLanguage()
  const [attendanceData, setAttendanceData] = useState<AttendanceSummaryData>({
    totalStudents: 0,
    presentCount: 0,
    absentCount: 0,
    lastUpdated: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendanceSummary = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/attendance/summary/${schoolId}`,
          { credentials: "include" }
        )
        const data: AttendanceApiResponse[] = await res.json()

        const present = data.find(d => d._id === "Present")?.count || 0
        const absent = data.find(d => d._id === "Absent")?.count || 0
        const total = present + absent

        setAttendanceData({
          totalStudents: total,
          presentCount: present,
          absentCount: absent,
          lastUpdated: new Date().toLocaleTimeString(),
        })
      } catch (err) {
        console.error("Error fetching attendance summary:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAttendanceSummary()
  }, [schoolId])

  const attendancePercentage = attendanceData.totalStudents
    ? Math.round((attendanceData.presentCount / attendanceData.totalStudents) * 100)
    : 0

  if (loading) return <p className="text-center text-gray-500">{t("loading_attendance") || "Loading..."}</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Students */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{t("total_students") || "Total Students"}</p>
            <p className="text-3xl font-bold">{attendanceData.totalStudents}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Present */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{t("present") || "Present"}</p>
            <p className="text-3xl font-bold">{attendanceData.presentCount}</p>
          </div>
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Absent */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{t("absent") || "Absent"}</p>
            <p className="text-3xl font-bold">{attendanceData.absentCount}</p>
          </div>
          <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
            <UserX className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Attendance % */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{t("attendance_rate") || "Attendance %"}</p>
            <p className="text-3xl font-bold">{attendancePercentage}%</p>
          </div>
          <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
