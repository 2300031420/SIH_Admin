"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Users, Search } from "lucide-react"
import { toast } from "react-hot-toast"

interface Student {
  _id: string
  name: string
  username: string
  password: string
  role: "student" | "teacher"
  schoolId?: string
  teacherSchoolId?: string
  uid?: string
}

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [teacherSchoolId, setTeacherSchoolId] = useState("")

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const [formData, setFormData] = useState<Omit<Student, "_id">>({
    name: "",
    username: "",
    password: "",
    role: "student",
    schoolId: "",
    teacherSchoolId: "",
    uid: ""
  })

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/students`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setStudents(data)
    } catch (err) {
      toast.error("Failed to load students")
      console.error(err)
    }
  }

  const fetchTeacherProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error("Failed to fetch teacher profile")
    const data = await res.json()
    setTeacherSchoolId(data.teacherSchoolId || "")
  } catch (err) {
    toast.error("Failed to fetch teacher profile")
    console.error(err)
  }
}


  useEffect(() => {
    fetchTeacherProfile()
    fetchStudents()
  }, [])

  const handleInputChange = (field: keyof Omit<Student, "_id">, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
      role: "student",
      schoolId: "",
      teacherSchoolId: "",
      uid: ""
    })
  }

  const handleAddStudent = async () => {
    if (!formData.name || !formData.username || !formData.password) {
      toast.error("Please fill in all required fields")
      return
    }

    try {

       const payload = {
      ...formData,
      teacherSchoolId // this comes from state: const [teacherSchoolId, setTeacherSchoolId] = useState("")
    }
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error("Failed to add student")
      const newStudent: Student = await res.json()
      setStudents(prev => [...prev, newStudent])
      toast.success("Student added successfully!")
      setIsAddDialogOpen(false)
      resetForm()
    } catch (err) {
      toast.error("Failed to add student")
      console.error(err)
    }
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setFormData({ ...student })
    setIsEditDialogOpen(true)
  }

  const handleUpdateStudent = async () => {
    if (!editingStudent) return

    try {
      const res = await fetch(`${API_URL}/api/auth/students/${editingStudent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Failed to update student")
      const updatedStudent: Student = await res.json()
      setStudents(prev => prev.map(s => s._id === updatedStudent._id ? updatedStudent : s))
      toast.success("Student updated successfully!")
      setIsEditDialogOpen(false)
      setEditingStudent(null)
    } catch (err) {
      toast.error("Failed to update student")
      console.error(err)
    }
  }

  const handleDeleteStudent = async (studentId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/students/${studentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error("Failed to delete student")
      setStudents(prev => prev.filter(s => s._id !== studentId))
      toast.success("Student deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete student")
      console.error(err)
    }
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            Student Management
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Student</DialogTitle></DialogHeader>
              <StudentForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleAddStudent}
                submitText="Add Student"
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {filteredStudents.map(student => (
            <div key={student._id} className="flex items-center justify-between p-4 border rounded-xl">
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-muted-foreground">Username: {student.username}</p>
                <p className="text-sm text-muted-foreground">Role: {student.role}</p>
                {student.schoolId && <p className="text-sm text-muted-foreground">School ID: {student.schoolId}</p>}
                {student.teacherSchoolId && <p className="text-sm text-muted-foreground">Teacher School ID: {student.teacherSchoolId}</p>}
                {student.uid && <p className="text-sm text-muted-foreground">UID: {student.uid}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {/* Wrap Button in a span to avoid ref warning */}
                    <span>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Student</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {student.name}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteStudent(student._id)} className="bg-destructive text-white">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
          {filteredStudents.length === 0 && <p className="text-center text-muted-foreground">No students found.</p>}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          <StudentForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdateStudent}
            submitText="Update Student"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Reusable Student Form
function StudentForm({
  formData,
  onInputChange,
  onSubmit,
  submitText
}: {
  formData: Omit<Student, "_id">
  onInputChange: (field: keyof Omit<Student, "_id">, value: string) => void
  onSubmit: () => void
  submitText: string
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input value={formData.name} onChange={e => onInputChange("name", e.target.value)} />
        </div>
        <div>
          <Label>Username</Label>
          <Input value={formData.username} onChange={e => onInputChange("username", e.target.value)} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={formData.password} onChange={e => onInputChange("password", e.target.value)} />
        </div>
        <div>
          <Label>Role</Label>
          <Select value={formData.role} onValueChange={value => onInputChange("role", value as "student" | "teacher")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.role === "student" && (
          <div>
            <Label>School ID</Label>
            <Input value={formData.schoolId || ""} onChange={e => onInputChange("schoolId", e.target.value)} />
          </div>
        )}
        <div>
          <Label>UID</Label>
          <Input value={formData.uid || ""} onChange={e => onInputChange("uid", e.target.value)} />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full">
        {submitText}
      </Button>
    </div>
  )
}
