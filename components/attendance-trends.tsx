"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock trend data - in real app this would come from API
const weeklyTrendData = [
  { day: "Mon", present: 42, absent: 3, total: 45 },
  { day: "Tue", present: 38, absent: 7, total: 45 },
  { day: "Wed", present: 44, absent: 1, total: 45 },
  { day: "Thu", present: 40, absent: 5, total: 45 },
  { day: "Fri", present: 43, absent: 2, total: 45 },
]

const monthlyTrendData = [
  { week: "Week 1", attendance: 89 },
  { week: "Week 2", attendance: 84 },
  { week: "Week 3", attendance: 92 },
  { week: "Week 4", attendance: 87 },
]

export function AttendanceTrends() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Attendance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Weekly Attendance Chart */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Daily Attendance This Week</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="present" fill="hsl(var(--primary))" name="Present" />
                  <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend Line Chart */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Monthly Attendance Percentage</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[75, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
