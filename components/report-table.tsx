"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock report data - in real app this would come from API
const reportData = [
  {
    studentName: "Aarav Sharma",
    rollNumber: "001",
    totalDays: 22,
    presentDays: 20,
    absentDays: 2,
    attendancePercentage: 91,
  },
  {
    studentName: "Priya Patel",
    rollNumber: "002",
    totalDays: 22,
    presentDays: 22,
    absentDays: 0,
    attendancePercentage: 100,
  },
  {
    studentName: "Rahul Kumar",
    rollNumber: "003",
    totalDays: 22,
    presentDays: 16,
    absentDays: 6,
    attendancePercentage: 73,
  },
  {
    studentName: "Sneha Singh",
    rollNumber: "004",
    totalDays: 22,
    presentDays: 19,
    absentDays: 3,
    attendancePercentage: 86,
  },
  {
    studentName: "Arjun Gupta",
    rollNumber: "005",
    totalDays: 22,
    presentDays: 21,
    absentDays: 1,
    attendancePercentage: 95,
  },
]

export function ReportTable() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Student Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {reportData.map((student, index) => (
            <div key={index} className="p-4 rounded-lg border border-border bg-muted/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{student.studentName}</p>
                  <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                </div>
                <Badge
                  variant={student.attendancePercentage >= 75 ? "default" : "destructive"}
                  className={student.attendancePercentage >= 75 ? "bg-primary text-primary-foreground" : ""}
                >
                  {student.attendancePercentage}%
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Attendance Progress</span>
                  <span className="text-foreground">
                    {student.presentDays}/{student.totalDays} days
                  </span>
                </div>
                <Progress value={student.attendancePercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium text-foreground">{student.totalDays}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Present</p>
                  <p className="font-medium text-primary">{student.presentDays}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="font-medium text-destructive">{student.absentDays}</p>
                </div>
              </div>

              {student.attendancePercentage < 75 && (
                <div className="p-2 bg-destructive/10 rounded border border-destructive/20">
                  <p className="text-xs text-destructive font-medium">⚠️ Low Attendance Alert</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-muted/20 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Class Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Average Attendance:</span>
              <span className="ml-2 font-medium text-primary">89%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Students Below 75%:</span>
              <span className="ml-2 font-medium text-destructive">1</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
