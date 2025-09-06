"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

// Mock recent overrides data - in real app this would come from API
const recentOverrides = [
  {
    id: 1,
    studentName: "Rahul Kumar",
    rollNumber: "003",
    originalStatus: "absent",
    newStatus: "present",
    reason: "Student forgot ID card",
    timestamp: "10:30 AM",
    teacherName: "Mrs. Sharma",
  },
  {
    id: 2,
    studentName: "Kavya Reddy",
    rollNumber: "006",
    originalStatus: "present",
    newStatus: "absent",
    reason: "Left early due to illness",
    timestamp: "11:15 AM",
    teacherName: "Mrs. Sharma",
  },
  {
    id: 3,
    studentName: "Arjun Gupta",
    rollNumber: "005",
    originalStatus: "absent",
    newStatus: "present",
    reason: "RFID scanner malfunction",
    timestamp: "09:45 AM",
    teacherName: "Mrs. Sharma",
  },
]

export function RecentOverrides() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Overrides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {recentOverrides.map((override) => (
            <div key={override.id} className="p-4 rounded-lg border border-border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{override.studentName}</span>
                  <span className="text-sm text-muted-foreground">({override.rollNumber})</span>
                </div>
                <span className="text-sm text-muted-foreground">{override.timestamp}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant={override.originalStatus === "present" ? "default" : "destructive"}
                  className={`text-xs ${override.originalStatus === "present" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {override.originalStatus}
                </Badge>
                <span className="text-sm text-muted-foreground">→</span>
                <Badge
                  variant={override.newStatus === "present" ? "default" : "destructive"}
                  className={`text-xs ${override.newStatus === "present" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {override.newStatus}
                </Badge>
              </div>

              {override.reason && <p className="text-sm text-muted-foreground italic">Reason: {override.reason}</p>}

              <p className="text-xs text-muted-foreground">Override by: {override.teacherName}</p>
            </div>
          ))}

          {recentOverrides.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No recent overrides found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
