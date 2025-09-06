"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

// Mock data - in real app this would come from API
const chartData = [
  { name: "Present", value: 38, color: "hsl(var(--primary))" },
  { name: "Absent", value: 7, color: "hsl(var(--destructive))" },
]

export function AttendanceChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Present Students</span>
            <span className="font-medium text-primary">38 (84%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Absent Students</span>
            <span className="font-medium text-destructive">7 (16%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
