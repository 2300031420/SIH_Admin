"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, UserX, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock student data - in real app this would come from API
const studentsData = [
  { id: 1, name: "Aarav Sharma", rollNumber: "001", currentStatus: "present", class: "Class 5A" },
  { id: 2, name: "Priya Patel", rollNumber: "002", currentStatus: "present", class: "Class 5A" },
  { id: 3, name: "Rahul Kumar", rollNumber: "003", currentStatus: "absent", class: "Class 5A" },
  { id: 4, name: "Sneha Singh", rollNumber: "004", currentStatus: "present", class: "Class 5A" },
  { id: 5, name: "Arjun Gupta", rollNumber: "005", currentStatus: "present", class: "Class 5A" },
  { id: 6, name: "Kavya Reddy", rollNumber: "006", currentStatus: "absent", class: "Class 5A" },
]

export function ManualOverrideForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [newStatus, setNewStatus] = useState<"present" | "absent" | null>(null)
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNumber.includes(searchTerm),
  )

  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student)
    setNewStatus(student.currentStatus)
    setNote("")
  }

  const handleSaveOverride = async () => {
    if (!selectedStudent || !newStatus) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Attendance Updated",
        description: `${selectedStudent.name}'s attendance has been marked as ${newStatus}.`,
      })

      // Reset form
      setSelectedStudent(null)
      setNewStatus(null)
      setNote("")
      setSearchTerm("")
    }, 1000)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Search & Override Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Student */}
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
        {searchTerm && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <Label>Search Results</Label>
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Roll: {student.rollNumber} • {student.class}
                    </p>
                  </div>
                  <Badge
                    variant={student.currentStatus === "present" ? "default" : "destructive"}
                    className={student.currentStatus === "present" ? "bg-primary text-primary-foreground" : ""}
                  >
                    {student.currentStatus === "present" ? "Present" : "Absent"}
                  </Badge>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No students found matching your search.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Selected Student Override */}
        {selectedStudent && (
          <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
            <div>
              <Label>Selected Student</Label>
              <div className="mt-2">
                <p className="font-medium text-foreground">{selectedStudent.name}</p>
                <p className="text-sm text-muted-foreground">
                  Roll: {selectedStudent.rollNumber} • {selectedStudent.class}
                </p>
                <p className="text-sm text-muted-foreground">
                  Current Status:
                  <Badge
                    variant={selectedStudent.currentStatus === "present" ? "default" : "destructive"}
                    className={`ml-2 ${selectedStudent.currentStatus === "present" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {selectedStudent.currentStatus === "present" ? "Present" : "Absent"}
                  </Badge>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>New Attendance Status</Label>
              <div className="flex space-x-2">
                <Button
                  variant={newStatus === "present" ? "default" : "outline"}
                  onClick={() => setNewStatus("present")}
                  className="flex-1"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Mark Present
                </Button>
                <Button
                  variant={newStatus === "absent" ? "destructive" : "outline"}
                  onClick={() => setNewStatus("absent")}
                  className="flex-1"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Mark Absent
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Reason for Override (Optional)</Label>
              <Textarea
                id="note"
                placeholder="e.g., Student forgot ID card, RFID scanner issue, late arrival..."
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
