"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileText, FileSpreadsheet } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function ReportFilters() {
  const [reportType, setReportType] = useState("weekly")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async (format: "csv" | "pdf") => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export Successful",
        description: `Report exported as ${format.toUpperCase()} file.`,
      })
    }, 2000)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Report Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Report Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">From Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Export Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Export</label>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("csv")}
                disabled={isExporting}
                className="flex-1"
              >
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
                disabled={isExporting}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
