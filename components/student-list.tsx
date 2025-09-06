"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, UserCheck, UserX } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"

// Mock student data - in real app this would come from API
const studentsData = [
  { id: 1, name: "Aarav Sharma", rollNumber: "001", status: "present", time: "08:15 AM" },
  { id: 2, name: "Priya Patel", rollNumber: "002", status: "present", time: "08:20 AM" },
  { id: 3, name: "Rahul Kumar", rollNumber: "003", status: "absent", time: "-" },
  { id: 4, name: "Sneha Singh", rollNumber: "004", status: "present", time: "08:25 AM" },
  { id: 5, name: "Arjun Gupta", rollNumber: "005", status: "present", time: "08:18 AM" },
  { id: 6, name: "Kavya Reddy", rollNumber: "006", status: "absent", time: "-" },
  { id: 7, name: "Vikram Joshi", rollNumber: "007", status: "present", time: "08:30 AM" },
  { id: 8, name: "Ananya Mehta", rollNumber: "008", status: "present", time: "08:12 AM" },
]

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "present" | "absent">("all")
  const { t } = useLanguage()

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNumber.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
              key={student.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/5 transition-all duration-200 hover:shadow-md animate-fade-in"
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
                    {t("roll_number")}: {student.rollNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{t("time")}</p>
                  <p className="text-sm text-muted-foreground">{student.time}</p>
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
              <p>No students found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
