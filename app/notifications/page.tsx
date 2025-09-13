"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Users, GraduationCap, FileText, Sparkles, Clock } from "lucide-react"

export default function AssignmentPostingPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [priority, setPriority] = useState("medium") // default
  const [dueDate, setDueDate] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [className, setClassName] = useState("")
  const [section, setSection] = useState("")
  const [assignedBy, setAssignedBy] = useState("") // will be teacher’s name
  const [studentIds, setStudentIds] = useState("") // comma-separated input for now

  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!title || !description || !dueDate || !className || !section || !subject) {
      setError("Please fill in all required fields")
      return
    }
    setError("")
    setLoading(true)

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (!token) throw new Error("No auth token found")

      // Prepare backend-compatible payload
      const payload = {
        title,
        description,
        subject,
        priority,
        dueDate,
        estimatedTime,
        assignedBy,
        classId: `${className}-${section}`, // schema requires classId
        studentIds: studentIds
          ? studentIds.split(",").map((id) => id.trim())
          : [],
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to create assignment")

      setShowSuccess(true)
      setTitle("")
      setDescription("")
      setSubject("")
      setPriority("medium")
      setDueDate("")
      setEstimatedTime("")
      setClassName("")
      setSection("")
      setAssignedBy("")
      setStudentIds("")

      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to post assignment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Assignment
          </h1>
          <p className="text-gray-600">Share knowledge and inspire learning</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-pulse">
            <div className="flex items-center gap-2 text-green-800">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Assignment posted successfully!</span>
            </div>
          </div>
        )}

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Assignment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Title Field */}
            <div>
              <Label>Assignment Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter assignment title..." />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Details..." />
            </div>

            {/* Subject */}
            <div>
              <Label>Subject</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Mathematics" />
            </div>

            {/* Priority */}
            <div>
              <Label>Priority</Label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border p-2 rounded-lg"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <Label>Due Date</Label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            {/* Estimated Time */}
            <div>
              <Label>Estimated Time</Label>
              <Input
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="e.g., 2 hours"
              />
            </div>

            {/* Assigned By */}
            <div>
              <Label>Assigned By</Label>
              <Input
                value={assignedBy}
                onChange={(e) => setAssignedBy(e.target.value)}
                placeholder="e.g., Mr. John (auto-fill later)"
              />
            </div>

            {/* Class & Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Class</Label>
                <Input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g., 10" />
              </div>
              <div>
                <Label>Section</Label>
                <Input value={section} onChange={(e) => setSection(e.target.value)} placeholder="e.g., A" />
              </div>
            </div>

            {/* Student IDs */}
            <div>
              <Label>Student IDs (comma separated)</Label>
              <Input
                value={studentIds}
                onChange={(e) => setStudentIds(e.target.value)}
                placeholder="e.g., S001, S002"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit */}
            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? "Creating Assignment..." : "Post Assignment"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
