"use client"
import { useLanguage } from "@/hooks/use-language"
import { Users, FileText, Bell, LayoutDashboard, UserPlus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const translations = {
  en: {
    dashboard: "Dashboard",
    attendance: "Attendance",
    students: "Students",
    reports: "Reports",
    alerts: "Alerts",
  },
  pa: {
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    attendance: "ਹਾਜ਼ਰੀ",
    students: "ਵਿਦਿਆਰਥੀ",
    reports: "ਰਿਪੋਰਟਾਂ",
    alerts: "ਚੇਤਾਵਨੀਆਂ",
  },
}

export function ModernNavigation() {
  const { language } = useLanguage()
  const t = translations[language]
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex space-x-1 bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-200 animate-pulse">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const navItems = [
    {
      name: t.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: t.attendance,
      href: "/manual-override",
      icon: Users,
      active: pathname === "/manual-override",
    },
    {
      name: t.students,
      href: "/students",
      icon: UserPlus,
      active: pathname === "/students",
    },
    {
      name: t.reports,
      href: "/reports",
      icon: FileText,
      active: pathname === "/reports",
    },
    {
      name: t.alerts,
      href: "/notifications",
      icon: Bell,
      active: pathname === "/notifications",
    },
  ]

  return (
    <div
      className="flex space-x-1 bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 overflow-x-auto no-scrollbar"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap
              ${
                item.active ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
