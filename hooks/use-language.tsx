"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "pa"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Login Page
    school_portal: "School Portal",
    rfid_attendance: "RFID Attendance System",
    username: "Username",
    password: "Password",
    login: "Login",
    language_toggle: "English | ਪੰਜਾਬੀ",

    // Dashboard
    teacher_portal: "Teacher Portal",
    dashboard: "Dashboard",
    manual_override: "Manual Override",
    students: "Students",
    reports: "Reports",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Logout",

    // Attendance Summary
    todays_attendance: "Today's Attendance",
    total_students: "Total Students",
    present: "Present",
    absent: "Absent",
    attendance_rate: "Attendance Rate",

    // Student List
    student_list: "Student List",
    search_students: "Search students...",
    roll_number: "Roll Number",
    student_name: "Student Name",
    status: "Status",
    time: "Time",

    // Manual Override
    manual_attendance: "Manual Attendance Correction",
    search_student: "Search Student",
    current_status: "Current Status",
    new_status: "New Status",
    reason: "Reason",
    save_changes: "Save Changes",
    recent_overrides: "Recent Overrides",

    // Reports
    attendance_reports: "Attendance Reports",
    report_type: "Report Type",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    export_csv: "Export CSV",
    export_pdf: "Export PDF",
    attendance_trends: "Attendance Trends",

    // Notifications
    low_attendance_alerts: "Low Attendance Alerts",
    send_alert: "Send Alert",
    quick_message: "Quick Message",
    parent_contact: "Parent Contact",

    // Student Management
    student_management: "Student Management",
    add_new_student: "Add New Student",
    edit_student: "Edit Student",
    delete_student: "Delete Student",
    student_name: "Student Name",
    roll_number: "Roll Number",
    student_email: "Student Email",
    student_phone: "Student Phone",
    class_section: "Class & Section",
    parent_name: "Parent Name",
    parent_phone: "Parent Phone",
    student_address: "Student Address",
    date_of_birth: "Date of Birth",
    admission_date: "Admission Date",
    student_details: "Student Details",
    no_students_found: "No students found",
    search_students_by: "Search students by name, roll number, or email...",
    all_classes: "All Classes",
    all_sections: "All Sections",
    class: "Class",
    section: "Section",
    required_fields: "Please fill in all required fields",
    student_added: "Student added successfully!",
    student_updated: "Student updated successfully!",
    student_deleted: "Student deleted successfully!",
    confirm_delete: "Are you sure you want to delete this student?",
    delete_action: "This action cannot be undone.",

    // RFID Management
    rfid_card_info: "RFID Card Information",
    rfid_card_id: "RFID Card ID",
    rfid_status: "RFID Status",
    rfid_assigned: "Assigned",
    rfid_unassigned: "Unassigned",
    rfid_lost: "Lost",
    rfid_damaged: "Damaged",
    assign_rfid_card: "Assign RFID Card",
    update_rfid_status: "Update RFID Status",
    mark_as_assigned: "Mark as Assigned",
    mark_as_unassigned: "Mark as Unassigned",
    mark_as_lost: "Mark as Lost",
    mark_as_damaged: "Mark as Damaged",
    current_rfid_status: "Current RFID Status",
    assigned_date: "Assigned Date",
    last_used: "Last Used",
    not_assigned: "Not assigned",
    enter_rfid_id: "Enter RFID card ID (e.g., RFID001234)",
    rfid_assigned_success: "RFID card assigned successfully!",
    rfid_status_updated: "RFID status updated successfully!",
    enter_valid_rfid: "Please enter a valid RFID card ID",
  },
  pa: {
    // Login Page
    school_portal: "ਸਕੂਲ ਪੋਰਟਲ",
    rfid_attendance: "RFID ਹਾਜ਼ਰੀ ਸਿਸਟਮ",
    username: "ਯੂਜ਼ਰਨੇਮ",
    password: "ਪਾਸਵਰਡ",
    login: "ਲਾਗਇਨ",
    language_toggle: "ਪੰਜਾਬੀ | English",

    // Dashboard
    teacher_portal: "ਅਧਿਆਪਕ ਪੋਰਟਲ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    manual_override: "ਮੈਨੁਅਲ ਓਵਰਰਾਈਡ",
    students: "ਵਿਦਿਆਰਥੀ",
    reports: "ਰਿਪੋਰਟਾਂ",
    notifications: "ਸੂਚਨਾਵਾਂ",
    settings: "ਸੈਟਿੰਗਾਂ",
    logout: "ਲਾਗਆਉਟ",

    // Attendance Summary
    todays_attendance: "ਅੱਜ ਦੀ ਹਾਜ਼ਰੀ",
    total_students: "ਕੁੱਲ ਵਿਦਿਆਰਥੀ",
    present: "ਹਾਜ਼ਰ",
    absent: "ਗੈਰਹਾਜ਼ਰ",
    attendance_rate: "ਹਾਜ਼ਰੀ ਦਰ",

    // Student List
    student_list: "ਵਿਦਿਆਰਥੀ ਸੂਚੀ",
    search_students: "ਵਿਦਿਆਰਥੀ ਖੋਜੋ...",
    roll_number: "ਰੋਲ ਨੰਬਰ",
    student_name: "ਵਿਦਿਆਰਥੀ ਦਾ ਨਾਮ",
    status: "ਸਥਿਤੀ",
    time: "ਸਮਾਂ",

    // Manual Override
    manual_attendance: "ਮੈਨੁਅਲ ਹਾਜ਼ਰੀ ਸੁਧਾਰ",
    search_student: "ਵਿਦਿਆਰਥੀ ਖੋਜੋ",
    current_status: "ਮੌਜੂਦਾ ਸਥਿਤੀ",
    new_status: "ਨਵੀਂ ਸਥਿਤੀ",
    reason: "ਕਾਰਨ",
    save_changes: "ਤਬਦੀਲੀਆਂ ਸੇਵ ਕਰੋ",
    recent_overrides: "ਹਾਲ ਦੇ ਓਵਰਰਾਈਡਸ",

    // Reports
    attendance_reports: "ਹਾਜ਼ਰੀ ਰਿਪੋਰਟਾਂ",
    report_type: "ਰਿਪੋਰਟ ਦੀ ਕਿਸਮ",
    daily: "ਰੋਜ਼ਾਨਾ",
    weekly: "ਹਫ਼ਤਾਵਾਰੀ",
    monthly: "ਮਹੀਨਾਵਾਰੀ",
    export_csv: "CSV ਐਕਸਪੋਰਟ",
    export_pdf: "PDF ਐਕਸਪੋਰਟ",
    attendance_trends: "ਹਾਜ਼ਰੀ ਰੁਝਾਨ",

    // Notifications
    low_attendance_alerts: "ਘੱਟ ਹਾਜ਼ਰੀ ਅਲਰਟ",
    send_alert: "ਅਲਰਟ ਭੇਜੋ",
    quick_message: "ਤੁਰੰਤ ਸੁਨੇਹਾ",
    parent_contact: "ਮਾਤਾ-ਪਿਤਾ ਸੰਪਰਕ",

    // Student Management
    student_management: "ਵਿਦਿਆਰਥੀ ਪ੍ਰਬੰਧਨ",
    add_new_student: "ਨਵਾਂ ਵਿਦਿਆਰਥੀ ਸ਼ਾਮਲ ਕਰੋ",
    edit_student: "ਵਿਦਿਆਰਥੀ ਸੰਪਾਦਿਤ ਕਰੋ",
    delete_student: "ਵਿਦਿਆਰਥੀ ਮਿਟਾਓ",
    student_name: "ਵਿਦਿਆਰਥੀ ਦਾ ਨਾਮ",
    roll_number: "ਰੋਲ ਨੰਬਰ",
    student_email: "ਵਿਦਿਆਰਥੀ ਈਮੇਲ",
    student_phone: "ਵਿਦਿਆਰਥੀ ਫੋਨ",
    class_section: "ਕਲਾਸ ਅਤੇ ਸੈਕਸ਼ਨ",
    parent_name: "ਮਾਤਾ-ਪਿਤਾ ਦਾ ਨਾਮ",
    parent_phone: "ਮਾਤਾ-ਪਿਤਾ ਫੋਨ",
    student_address: "ਵਿਦਿਆਰਥੀ ਪਤਾ",
    date_of_birth: "ਜਨਮ ਦੀ ਤਾਰੀਖ",
    admission_date: "ਦਾਖਲੇ ਦੀ ਤਾਰੀਖ",
    student_details: "ਵਿਦਿਆਰਥੀ ਵੇਰਵੇ",
    no_students_found: "ਕੋਈ ਵਿਦਿਆਰਥੀ ਨਹੀਂ ਮਿਲਿਆ",
    search_students_by: "ਨਾਮ, ਰੋਲ ਨੰਬਰ, ਜਾਂ ਈਮੇਲ ਦੁਆਰਾ ਵਿਦਿਆਰਥੀ ਖੋਜੋ...",
    all_classes: "ਸਾਰੀਆਂ ਕਲਾਸਾਂ",
    all_sections: "ਸਾਰੇ ਸੈਕਸ਼ਨ",
    class: "ਕਲਾਸ",
    section: "ਸੈਕਸ਼ਨ",
    required_fields: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲਾਜ਼ਮੀ ਖੇਤਰ ਭਰੋ",
    student_added: "ਵਿਦਿਆਰਥੀ ਸਫਲਤਾਪੂਰਵਕ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ!",
    student_updated: "ਵਿਦਿਆਰਥੀ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ!",
    student_deleted: "ਵਿਦਿਆਰਥੀ ਸਫਲਤਾਪੂਰਵਕ ਮਿਟਾਇਆ ਗਿਆ!",
    confirm_delete: "ਕੀ ਤੁਸੀਂ ਇਸ ਵਿਦਿਆਰਥੀ ਨੂੰ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    delete_action: "ਇਸ ਕਾਰਵਾਈ ਨੂੰ ਵਾਪਸ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ।",

    // RFID Management
    rfid_card_info: "RFID ਕਾਰਡ ਜਾਣਕਾਰੀ",
    rfid_card_id: "RFID ਕਾਰਡ ID",
    rfid_status: "RFID ਸਥਿਤੀ",
    rfid_assigned: "ਸੌਂਪਿਆ ਗਿਆ",
    rfid_unassigned: "ਬਿਨਾਂ ਸੌਂਪਿਆ",
    rfid_lost: "ਗੁਆਚਿਆ",
    rfid_damaged: "ਖਰਾਬ",
    assign_rfid_card: "RFID ਕਾਰਡ ਸੌਂਪੋ",
    update_rfid_status: "RFID ਸਥਿਤੀ ਅਪਡੇਟ ਕਰੋ",
    mark_as_assigned: "ਸੌਂਪਿਆ ਗਿਆ ਮਾਰਕ ਕਰੋ",
    mark_as_unassigned: "ਬਿਨਾਂ ਸੌਂਪਿਆ ਮਾਰਕ ਕਰੋ",
    mark_as_lost: "ਗੁਆਚਿਆ ਮਾਰਕ ਕਰੋ",
    mark_as_damaged: "ਖਰਾਬ ਮਾਰਕ ਕਰੋ",
    current_rfid_status: "ਮੌਜੂਦਾ RFID ਸਥਿਤੀ",
    assigned_date: "ਸੌਂਪਿਆ ਗਿਆ ਦਿਨ",
    last_used: "ਆਖਰੀ ਵਰਤੋਂ",
    not_assigned: "ਸੌਂਪਿਆ ਨਹੀਂ ਗਿਆ",
    enter_rfid_id: "RFID ਕਾਰਡ ID ਦਰਜ ਕਰੋ (ਜਿਵੇਂ, RFID001234)",
    rfid_assigned_success: "RFID ਕਾਰਡ ਸਫਲਤਾਪੂਰਵਕ ਸੌਂਪਿਆ ਗਿਆ!",
    rfid_status_updated: "RFID ਸਥਿਤੀ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਕੀਤੀ ਗਈ!",
    enter_valid_rfid: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ RFID ਕਾਰਡ ID ਦਰਜ ਕਰੋ",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load language from localStorage if available
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pa')) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
