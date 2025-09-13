"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Override {
  id: string
  studentName: string
  rollNumber: string
  originalStatus: string
  newStatus: string
  reason?: string
  timestamp: string
  teacherName: string
}

export function RecentOverrides() {
  const [recentOverrides, setRecentOverrides] = useState<Override[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchOverrides = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No auth token found")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/manual-overrides`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Failed to fetch recent overrides")

        const data = await res.json()

        const formatted = data.map((o: any) => ({
          id: o._id,
          studentName: o.student?.name || "Unknown",
          rollNumber: o.student?.rollNumber || "-",
          originalStatus: o.originalStatus || "Absent",
          newStatus: o.status || "Absent",
          reason: o.note || "",
          timestamp: new Date(o.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          teacherName: o.teacherName || "Teacher",
        }))

        setRecentOverrides(formatted)
      } catch (err: any) {
        console.error("Failed to fetch recent overrides:", err)
        toast({ title: "Error", description: err.message || "Failed to fetch recent overrides", variant: "destructive" })
      }
    }

    fetchOverrides()
  }, [toast])

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
          {recentOverrides.length > 0 ? (
            recentOverrides.map((override) => (
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
                    variant={override.originalStatus.toLowerCase() === "present" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {override.originalStatus}
                  </Badge>
                  <span className="text-sm text-muted-foreground">→</span>
                  <Badge
                    variant={override.newStatus.toLowerCase() === "present" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {override.newStatus}
                  </Badge>
                </div>

                {override.reason && <p className="text-sm text-muted-foreground italic">Reason: {override.reason}</p>}

                <p className="text-xs text-muted-foreground">Override by: {override.teacherName}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No recent overrides found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
