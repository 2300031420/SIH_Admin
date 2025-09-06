"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Users, Search, Filter, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { toast } from "react-hot-toast"

interface Student {
  id: number
  name: string
  rollNumber: string
  email: string
  phone: string
  class: string
  section: string
  parentName: string
  parentPhone: string
  address: string
  dateOfBirth: string
  admissionDate: string
  rfidCardId: string
  rfidStatus: 'assigned' | 'unassigned' | 'lost' | 'damaged'
  rfidAssignedDate: string
  rfidLastUsed: string
}

// Mock data - in real app this would come from API
const initialStudents: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "001",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    class: "10",
    section: "A",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98765 43211",
    address: "123 Main Street, Delhi",
    dateOfBirth: "2008-05-15",
    admissionDate: "2023-04-01",
    rfidCardId: "RFID001234",
    rfidStatus: "assigned",
    rfidAssignedDate: "2023-04-01",
    rfidLastUsed: "2024-01-15 08:30:00"
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "002",
    email: "priya.patel@email.com",
    phone: "+91 98765 43212",
    class: "10",
    section: "A",
    parentName: "Sunita Patel",
    parentPhone: "+91 98765 43213",
    address: "456 Park Avenue, Mumbai",
    dateOfBirth: "2008-08-22",
    admissionDate: "2023-04-01",
    rfidCardId: "RFID001235",
    rfidStatus: "assigned",
    rfidAssignedDate: "2023-04-01",
    rfidLastUsed: "2024-01-15 08:25:00"
  },
  {
    id: 3,
    name: "Rahul Kumar",
    rollNumber: "003",
    email: "rahul.kumar@email.com",
    phone: "+91 98765 43214",
    class: "10",
    section: "B",
    parentName: "Vikram Kumar",
    parentPhone: "+91 98765 43215",
    address: "789 Garden Road, Bangalore",
    dateOfBirth: "2008-03-10",
    admissionDate: "2023-04-01",
    rfidCardId: "",
    rfidStatus: "unassigned",
    rfidAssignedDate: "",
    rfidLastUsed: ""
  }
]

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    class: "",
    section: "",
    parentName: "",
    parentPhone: "",
    address: "",
    dateOfBirth: "",
    admissionDate: "",
    rfidCardId: "",
    rfidStatus: "unassigned" as const,
    rfidAssignedDate: "",
    rfidLastUsed: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddStudent = () => {
    if (!formData.name || !formData.rollNumber || !formData.class || !formData.section) {
      toast.error("Please fill in all required fields")
      return
    }

    const newStudent: Student = {
      id: students.length + 1,
      ...formData
    }

    setStudents(prev => [...prev, newStudent])
    setFormData({
      name: "",
      rollNumber: "",
      email: "",
      phone: "",
      class: "",
      section: "",
      parentName: "",
      parentPhone: "",
      address: "",
      dateOfBirth: "",
      admissionDate: "",
      rfidCardId: "",
      rfidStatus: "unassigned" as const,
      rfidAssignedDate: "",
      rfidLastUsed: ""
    })
    setIsAddDialogOpen(false)
    toast.success("Student added successfully!")
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      phone: student.phone,
      class: student.class,
      section: student.section,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
      admissionDate: student.admissionDate,
      rfidCardId: student.rfidCardId,
      rfidStatus: student.rfidStatus,
      rfidAssignedDate: student.rfidAssignedDate,
      rfidLastUsed: student.rfidLastUsed
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateStudent = () => {
    if (!editingStudent) return

    setStudents(prev => prev.map(student => 
      student.id === editingStudent.id 
        ? { ...student, ...formData }
        : student
    ))
    
    setIsEditDialogOpen(false)
    setEditingStudent(null)
    setFormData({
      name: "",
      rollNumber: "",
      email: "",
      phone: "",
      class: "",
      section: "",
      parentName: "",
      parentPhone: "",
      address: "",
      dateOfBirth: "",
      admissionDate: "",
      rfidCardId: "",
      rfidStatus: "unassigned" as const,
      rfidAssignedDate: "",
      rfidLastUsed: ""
    })
    toast.success("Student updated successfully!")
  }

  const handleDeleteStudent = (studentId: number) => {
    setStudents(prev => prev.filter(student => student.id !== studentId))
    toast.success("Student deleted successfully!")
  }

  const handleAssignRFID = (studentId: number, rfidCardId: string) => {
    if (!rfidCardId.trim()) {
      toast.error("Please enter a valid RFID card ID")
      return
    }

    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            rfidCardId: rfidCardId.trim(),
            rfidStatus: "assigned",
            rfidAssignedDate: new Date().toISOString().split('T')[0],
            rfidLastUsed: ""
          }
        : student
    ))
    toast.success("RFID card assigned successfully!")
  }

  const handleUpdateRFIDStatus = (studentId: number, status: 'assigned' | 'unassigned' | 'lost' | 'damaged') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            rfidStatus: status,
            rfidCardId: status === 'unassigned' ? "" : student.rfidCardId,
            rfidAssignedDate: status === 'unassigned' ? "" : student.rfidAssignedDate
          }
        : student
    ))
    toast.success(`RFID status updated to ${status}`)
  }

  const getRFIDStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'unassigned':
        return <XCircle className="w-4 h-4 text-gray-400" />
      case 'lost':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case 'damaged':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getRFIDStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return "bg-green-100 text-green-800 border-green-200"
      case 'unassigned':
        return "bg-gray-100 text-gray-600 border-gray-200"
      case 'lost':
        return "bg-orange-100 text-orange-800 border-orange-200"
      case 'damaged':
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesClass = classFilter === "all" || student.class === classFilter
    const matchesSection = sectionFilter === "all" || student.section === sectionFilter
    
    return matchesSearch && matchesClass && matchesSection
  })

  const uniqueClasses = [...new Set(students.map(s => s.class))].sort()
  const uniqueSections = [...new Set(students.map(s => s.section))].sort()

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <Card className="border-border/50 shadow-lg glass-effect">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
                <Users className="w-6 h-6" />
                Student Management
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Manage your class students - add, edit, and organize student information
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <StudentForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleAddStudent}
                  submitText="Add Student"
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card className="border-border/50 shadow-lg glass-effect">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input/50 border-border/50 focus:ring-2 focus:ring-ring rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-32 bg-input/50 border-border/50 rounded-xl">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {uniqueClasses.map(cls => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-32 bg-input/50 border-border/50 rounded-xl">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {uniqueSections.map(section => (
                    <SelectItem key={section} value={section}>Section {section}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="border-border/50 shadow-lg glass-effect">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/5 transition-all duration-200 hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-chart-1 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Roll: {student.rollNumber} | Class: {student.class}-{student.section}
                    </p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <CreditCard className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        RFID: {student.rfidCardId || "Not assigned"}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-0.5 rounded-full ${getRFIDStatusColor(student.rfidStatus)}`}
                      >
                        <div className="flex items-center space-x-1">
                          {getRFIDStatusIcon(student.rfidStatus)}
                          <span className="capitalize">{student.rfidStatus}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="rounded-full">
                    Class {student.class}-{student.section}
                  </Badge>
                  
                  {/* RFID Management */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <CreditCard className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>RFID Management - {student.name}</DialogTitle>
                      </DialogHeader>
                      <RFIDManagement 
                        student={student}
                        onAssignRFID={handleAssignRFID}
                        onUpdateStatus={handleUpdateRFIDStatus}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditStudent(student)}
                    className="rounded-xl"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-xl text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Student</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {student.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteStudent(student.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No students found</h3>
                <p>Try adjusting your search criteria or add a new student.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
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

function StudentForm({ 
  formData, 
  onInputChange, 
  onSubmit, 
  submitText 
}: {
  formData: any
  onInputChange: (field: string, value: string) => void
  onSubmit: () => void
  submitText: string
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Student Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="Enter student name"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rollNumber">Roll Number *</Label>
          <Input
            id="rollNumber"
            value={formData.rollNumber}
            onChange={(e) => onInputChange("rollNumber", e.target.value)}
            placeholder="Enter roll number"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            placeholder="Enter email address"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="class">Class *</Label>
          <Select value={formData.class} onValueChange={(value) => onInputChange("class", value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                <SelectItem key={num} value={num.toString()}>Class {num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="section">Section *</Label>
          <Select value={formData.section} onValueChange={(value) => onInputChange("section", value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {['A', 'B', 'C', 'D', 'E'].map(section => (
                <SelectItem key={section} value={section}>Section {section}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="parentName">Parent Name</Label>
          <Input
            id="parentName"
            value={formData.parentName}
            onChange={(e) => onInputChange("parentName", e.target.value)}
            placeholder="Enter parent name"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parentPhone">Parent Phone</Label>
          <Input
            id="parentPhone"
            value={formData.parentPhone}
            onChange={(e) => onInputChange("parentPhone", e.target.value)}
            placeholder="Enter parent phone"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onInputChange("address", e.target.value)}
            placeholder="Enter address"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onInputChange("dateOfBirth", e.target.value)}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admissionDate">Admission Date</Label>
          <Input
            id="admissionDate"
            type="date"
            value={formData.admissionDate}
            onChange={(e) => onInputChange("admissionDate", e.target.value)}
            className="rounded-xl"
          />
        </div>
        
        {/* RFID Fields */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            RFID Card Information
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rfidCardId">RFID Card ID</Label>
          <Input
            id="rfidCardId"
            value={formData.rfidCardId}
            onChange={(e) => onInputChange("rfidCardId", e.target.value)}
            placeholder="Enter RFID card ID (e.g., RFID001234)"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rfidStatus">RFID Status</Label>
          <Select value={formData.rfidStatus} onValueChange={(value) => onInputChange("rfidStatus", value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select RFID status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Close dialog logic would be handled by parent
          }}
          className="rounded-xl"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          className="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white rounded-xl"
        >
          {submitText}
        </Button>
      </div>
    </div>
  )
}

function RFIDManagement({ 
  student, 
  onAssignRFID, 
  onUpdateStatus 
}: {
  student: Student
  onAssignRFID: (studentId: number, rfidCardId: string) => void
  onUpdateStatus: (studentId: number, status: 'assigned' | 'unassigned' | 'lost' | 'damaged') => void
}) {
  const [rfidCardId, setRfidCardId] = useState(student.rfidCardId)
  const { t } = useLanguage()

  const handleAssignRFID = () => {
    onAssignRFID(student.id, rfidCardId)
  }

  return (
    <div className="space-y-6">
      {/* Current RFID Status */}
      <div className="p-4 rounded-xl border border-border/50 bg-accent/5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Current RFID Status
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Card ID:</span>
            <span className="font-mono text-sm">{student.rfidCardId || "Not assigned"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge className={`${getRFIDStatusColor(student.rfidStatus)}`}>
              <div className="flex items-center space-x-1">
                {getRFIDStatusIcon(student.rfidStatus)}
                <span className="capitalize">{student.rfidStatus}</span>
              </div>
            </Badge>
          </div>
          {student.rfidAssignedDate && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assigned Date:</span>
              <span className="text-sm">{student.rfidAssignedDate}</span>
            </div>
          )}
          {student.rfidLastUsed && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Used:</span>
              <span className="text-sm">{student.rfidLastUsed}</span>
            </div>
          )}
        </div>
      </div>

      {/* Assign New RFID */}
      <div className="space-y-4">
        <h3 className="font-semibold">Assign New RFID Card</h3>
        <div className="space-y-2">
          <Label htmlFor="newRfidCardId">RFID Card ID</Label>
          <Input
            id="newRfidCardId"
            value={rfidCardId}
            onChange={(e) => setRfidCardId(e.target.value)}
            placeholder="Enter RFID card ID (e.g., RFID001234)"
            className="rounded-xl"
          />
        </div>
        <Button
          onClick={handleAssignRFID}
          className="w-full bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white rounded-xl"
        >
          Assign RFID Card
        </Button>
      </div>

      {/* Update Status */}
      <div className="space-y-4">
        <h3 className="font-semibold">Update RFID Status</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => onUpdateStatus(student.id, 'assigned')}
            className="rounded-xl"
            disabled={student.rfidStatus === 'assigned'}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Assigned
          </Button>
          <Button
            variant="outline"
            onClick={() => onUpdateStatus(student.id, 'unassigned')}
            className="rounded-xl"
            disabled={student.rfidStatus === 'unassigned'}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Mark as Unassigned
          </Button>
          <Button
            variant="outline"
            onClick={() => onUpdateStatus(student.id, 'lost')}
            className="rounded-xl text-orange-600"
            disabled={student.rfidStatus === 'lost'}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Mark as Lost
          </Button>
          <Button
            variant="outline"
            onClick={() => onUpdateStatus(student.id, 'damaged')}
            className="rounded-xl text-red-600"
            disabled={student.rfidStatus === 'damaged'}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Mark as Damaged
          </Button>
        </div>
      </div>
    </div>
  )
}
