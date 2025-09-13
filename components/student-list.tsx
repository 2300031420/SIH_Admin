"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, UserCheck, UserX } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"

interface Student {
  _id: string
  name: string
  username: string
  rollNumber?: string
  status?: "present" | "absent"
  time?: string
}

export function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "present" | "absent">("all")
  const { t } = useLanguage()

  useEffect(() => {
    const fetchStudentsAndAttendance = async () => {
      try {
        const token = localStorage.getItem("token")

        // 1️⃣ Fetch teacher profile
        const resTeacher = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!resTeacher.ok) throw new Error("Failed to fetch teacher profile")
        const teacher = await resTeacher.json()
        const teacherSchoolId = teacher.teacherSchoolId

        // 2️⃣ Fetch students assigned to this teacher
        const resStudents = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/students`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!resStudents.ok) throw new Error("Failed to fetch students")
        const studentsData: Student[] = await resStudents.json()

        // 3️⃣ Fetch today’s attendance for this teacher
        let attendanceData: any[] = []
        if (teacherSchoolId) {
          const resAttendance = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/attendance/today/${teacherSchoolId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          if (resAttendance.ok) {
            attendanceData = await resAttendance.json()
          }
        }

        // 4️⃣ Map attendance to students
        const studentsWithStatus = studentsData.map(student => {
          const attendance = attendanceData.find(a => a.student._id === student._id)
          return {
            ...student,
            status: attendance ? attendance.status.toLowerCase() : "absent",
            time: attendance?.createdAt ? new Date(attendance.createdAt).toLocaleTimeString() : "-"
          }
        })

        setStudents(studentsWithStatus)
      } catch (err) {
        console.error("Error fetching students:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentsAndAttendance()
  }, [])

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return <p className="text-center text-gray-500">{t("loading_students")}</p>
  }

  return (
    <Card className="border-border/50 shadow-lg glass-effect">
      <CardHeader className="space-y-4">
        <CardTitle className="text-xl font-bold gradient-text">{t("student_list")}</CardTitle>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_students")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input/50 border-border/50 focus:ring-2 focus:ring-ring rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="rounded-xl"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "present" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("present")}
              className="rounded-xl"
            >
              {t("present")}
            </Button>
            <Button
              variant={statusFilter === "absent" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("absent")}
              className="rounded-xl"
            >
              {t("absent")}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredStudents.map((student, index) => (
            <div
              key={student._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border border-border/50 hover:bg-accent/5 transition-all duration-200 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                    student.status === "present"
                      ? "bg-gradient-to-br from-primary to-chart-1"
                      : "bg-gradient-to-br from-destructive to-red-600"
                  }`}
                >
                  {student.status === "present" ? (
                    <UserCheck className="w-5 h-5 text-white" />
                  ) : (
                    <UserX className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">{student.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("roll_number")}: {student.rollNumber || student.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium text-foreground">{t("time")}</p>
                  <p className="text-sm text-muted-foreground">{student.time || "-"}</p>
                </div>
                <Badge
                  variant={student.status === "present" ? "default" : "destructive"}
                  className={`px-3 py-1 rounded-full font-medium ${
                    student.status === "present"
                      ? "bg-gradient-to-r from-primary to-chart-1 text-white"
                      : "bg-gradient-to-r from-destructive to-red-600 text-white"
                  }`}
                >
                  {student.status === "present" ? t("present") : t("absent")}
                </Badge>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t("no_students_found")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
