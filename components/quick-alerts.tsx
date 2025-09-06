"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, AlertTriangle, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock low attendance students - in real app this would come from API
const lowAttendanceStudents = [
  { name: "Rahul Kumar", rollNumber: "003", attendance: 73, parentContact: "+91 98765 43210" },
  { name: "Kavya Reddy", rollNumber: "006", attendance: 68, parentContact: "+91 98765 43211" },
]

const quickMessageTemplates = [
  "Your child has been absent for consecutive days. Please ensure regular attendance.",
  "Your child's attendance is below 75%. Please contact the school for discussion.",
  "Please send your child's medical certificate for recent absences.",
  "Parent-teacher meeting scheduled. Please confirm your availability.",
]

export function QuickAlerts() {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [messageType, setMessageType] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleSendAlert = async () => {
    if (!selectedStudent || (!messageType && !customMessage)) return

    setIsSending(true)

    // Simulate sending alert
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: "Alert Sent",
        description: "Notification has been sent to the parent/guardian.",
      })

      // Reset form
      setSelectedStudent("")
      setMessageType("")
      setCustomMessage("")
    }, 1500)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Send className="w-5 h-5 mr-2" />
          Quick Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Low Attendance Students Alert */}
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive mr-2" />
            <h4 className="font-medium text-destructive">Low Attendance Alert</h4>
          </div>
          <div className="space-y-2">
            {lowAttendanceStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-foreground">
                  {student.name} (Roll: {student.rollNumber})
                </span>
                <Badge variant="destructive" className="text-xs">
                  {student.attendance}%
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Send Alert Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-select">Select Student</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a student..." />
              </SelectTrigger>
              <SelectContent>
                {lowAttendanceStudents.map((student, index) => (
                  <SelectItem key={index} value={student.rollNumber}>
                    {student.name} (Roll: {student.rollNumber}) - {student.attendance}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-type">Quick Message Templates</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {quickMessageTemplates.map((template, index) => (
                  <SelectItem key={index} value={template}>
                    {template.substring(0, 50)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-message">Custom Message (Optional)</Label>
            <Textarea
              id="custom-message"
              placeholder="Write a custom message..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            onClick={handleSendAlert}
            disabled={!selectedStudent || (!messageType && !customMessage) || isSending}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSending ? "Sending..." : "Send Alert"}
          </Button>
        </div>

        {/* Class Statistics */}
        <div className="p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center mb-3">
            <Users className="w-4 h-4 text-muted-foreground mr-2" />
            <h4 className="font-medium text-foreground">Class Overview</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Students Below 75%:</span>
              <span className="ml-2 font-medium text-destructive">{lowAttendanceStudents.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Alerts Sent Today:</span>
              <span className="ml-2 font-medium text-primary">3</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
