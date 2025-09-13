"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, UserX, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Student = {
  id: string
  uid: string
  name: string
  schoolId: string
  class: string
  currentStatus: "present" | "absent"
  autoMarked?: boolean
}

export function ManualOverrideForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [studentsData, setStudentsData] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [newStatus, setNewStatus] = useState<"present" | "absent" | null>(null)
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [loadingData, setLoadingData] = useState(true)

  // Fetch today's attendance safely
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No auth token found")

        // Fetch teacher profile
        const resTeacher = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!resTeacher.ok) throw new Error("Failed to fetch teacher profile")
        const teacher = await resTeacher.json()
        const teacherSchoolId = teacher.teacherSchoolId
        if (!teacherSchoolId) throw new Error("Teacher school ID not found")

        // Fetch today's attendance
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/attendance/today/${teacherSchoolId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) throw new Error("Failed to fetch attendance")
        const data = await res.json()

        const formatted: Student[] = data.map((rec: any) => ({
          id: rec.student?._id ?? rec.uid ?? Math.random().toString(),
          uid: rec.student?.uid ?? "unknown",
          name: rec.student?.name ?? "Unknown",
          schoolId: rec.student?.schoolId,
          class: rec.student?.class,
          currentStatus: rec.status?.toLowerCase() === "present" ? "present" : "absent",
          autoMarked: rec.autoMarked || false,
        }))

        setStudentsData(formatted)
      } catch (err: any) {
        console.error("Failed to fetch attendance:", err)
        toast({ title: "Error", description: err.message || "Failed to fetch attendance", variant: "destructive" })
      } finally {
        setLoadingData(false)
      }
    }

    fetchAttendance()
  }, [toast])

  // Filter students by search term
  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.schoolId.includes(searchTerm)   // ✅
  )

  // Select a student
  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    setNewStatus(student.currentStatus)
    setNote("")
  }

  // Save override
  const handleSaveOverride = async () => {
    if (!selectedStudent || !newStatus) return

    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No auth token found")

      const payload = {
        uid: selectedStudent.uid,
        status: newStatus === "present" ? "Present" : "Absent",
        note: note || "",
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/manual-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        toast({ title: "Attendance Updated", description: `${selectedStudent.name} marked as ${payload.status}` })

        // Update local state
        setStudentsData((prev) =>
          prev.map((s) =>
            s.id === selectedStudent.id
              ? {
                ...s,
                currentStatus: payload.status === "Present" ? "present" : "absent",
                autoMarked: false,
              }
              : s
          )
        )


        setSelectedStudent(null)
        setNewStatus(null)
        setNote("")
        setSearchTerm("")
      } else {
        toast({ title: "Error", description: data.message || "Failed to update", variant: "destructive" })
      }
    } catch (err: any) {
      console.error("Manual override error:", err)
      toast({ title: "Error", description: err.message || "Failed to update attendance", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingData) return <p className="text-center py-4">Loading attendance...</p>

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Search & Override Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Student</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Enter name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <Label>Search Results</Label>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">
                    School ID: {student.schoolId} • {student.class}

                  </p>
                </div>
                <Badge
                  variant={student.currentStatus === "present" ? "default" : student.autoMarked ? "outline" : "destructive"}
                  className={student.currentStatus === "present" ? "bg-primary text-primary-foreground" : ""}
                >
                  {student.currentStatus === "present" ? "Present" : student.autoMarked ? "Auto-Absent" : "Absent"}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No students found.</p>
          )}
        </div>

        {/* Override Form */}
        {selectedStudent && (
          <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
            <div>
              <Label>Selected Student</Label>
              <p className="font-medium text-foreground">{selectedStudent.name}</p>
              <p className="text-sm text-muted-foreground">
                School ID: {selectedStudent.schoolId} • {selectedStudent.class}
              </p>

              <p className="text-sm text-muted-foreground">
                Current Status:{" "}
                <Badge
                  variant={
                    selectedStudent.currentStatus === "present"
                      ? "default"
                      : selectedStudent.autoMarked
                        ? "outline"
                        : "destructive"
                  }
                  className={selectedStudent.currentStatus === "present" ? "bg-primary text-primary-foreground" : ""}
                >
                  {selectedStudent.currentStatus === "present"
                    ? "Present"
                    : selectedStudent.autoMarked
                      ? "Auto-Absent"
                      : "Absent"}
                </Badge>
              </p>
            </div>

            <div className="space-y-2">
              <Label>New Attendance Status</Label>
              <div className="flex space-x-2">
                <Button
                  variant={newStatus === "present" ? "default" : "outline"}
                  onClick={() => setNewStatus("present")}
                  className="flex-1"
                >
                  <UserCheck className="w-4 h-4 mr-2" /> Mark Present
                </Button>
                <Button
                  variant={newStatus === "absent" ? "destructive" : "outline"}
                  onClick={() => setNewStatus("absent")}
                  className="flex-1"
                >
                  <UserX className="w-4 h-4 mr-2" /> Mark Absent
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Reason for Override (Optional)</Label>
              <Textarea
                id="note"
                placeholder="e.g., Student forgot ID card, RFID issue..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleSaveOverride} disabled={!newStatus || isLoading} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Override"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
