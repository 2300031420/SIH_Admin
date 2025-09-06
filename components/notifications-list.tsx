"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, User, Bell, CheckCircle } from "lucide-react"
import { useState } from "react"

// Mock notifications data - in real app this would come from API
const notificationsData = [
  {
    id: 1,
    type: "low_attendance",
    title: "Low Attendance Alert",
    message: "Rahul Kumar (Roll: 003) has 73% attendance - below 75% threshold",
    studentName: "Rahul Kumar",
    rollNumber: "003",
    attendancePercentage: 73,
    timestamp: "2 hours ago",
    isRead: false,
    priority: "high",
  },
  {
    id: 2,
    type: "absent_streak",
    title: "Consecutive Absences",
    message: "Kavya Reddy (Roll: 006) has been absent for 3 consecutive days",
    studentName: "Kavya Reddy",
    rollNumber: "006",
    timestamp: "1 day ago",
    isRead: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "system",
    title: "RFID System Update",
    message: "Attendance system was offline for 15 minutes this morning",
    timestamp: "3 hours ago",
    isRead: true,
    priority: "low",
  },
  {
    id: 4,
    type: "manual_override",
    title: "Manual Override Recorded",
    message: "Attendance manually updated for Arjun Gupta (Roll: 005)",
    studentName: "Arjun Gupta",
    rollNumber: "005",
    timestamp: "5 hours ago",
    isRead: true,
    priority: "low",
  },
]

export function NotificationsList() {
  const [notifications, setNotifications] = useState(notificationsData)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "low_attendance":
      case "absent_streak":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case "system":
        return <Bell className="w-4 h-4 text-muted-foreground" />
      case "manual_override":
        return <User className="w-4 h-4 text-primary" />
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.isRead ? "border-border bg-muted/20" : "border-primary/20 bg-primary/5"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{notification.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                        {notification.priority}
                      </Badge>
                      {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{notification.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.timestamp}
                    </div>

                    {!notification.isRead && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="text-xs">
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No notifications at this time.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
