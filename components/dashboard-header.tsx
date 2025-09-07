"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Settings, LogOut, Globe, Bell, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const date = new Date().toLocaleDateString(language === "pa" ? "pa-IN" : "en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setCurrentDate(date)
  }, [language])

  // Mock notification count - in real app this would come from API
  const unreadNotifications = 2

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pa" : "en")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    try {
      // Clear any stored auth/session data
      if (typeof window !== "undefined") {
        window.localStorage.clear()
        window.sessionStorage.clear()
      }
    } catch (_) {
      // ignore storage errors
    }
    // Navigate to login page
    router.push("/")
  }

  if (!mounted) {
    return (
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">{t("teacher_portal")}</h1>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">{t("teacher_portal")}</h1>
              <p className="text-sm text-muted-foreground">{currentDate}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 transition-all duration-200">
                {t("dashboard")}
              </Button>
            </Link>
            <Link href="/manual-override">
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 transition-all duration-200">
                {t("manual_override")}
              </Button>
            </Link>
            <Link href="/students">
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 transition-all duration-200">
                {t("students")}
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 transition-all duration-200">
                {t("reports")}
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="relative hover:bg-accent/10 transition-all duration-200">
                <Bell className="w-4 h-4 mr-2" />
                {t("notifications")}
                {unreadNotifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center p-0 animate-pulse"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hover:bg-accent/10 transition-all duration-200"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "en" ? "EN" : "ਪਾ"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover:bg-accent/10 transition-all duration-200"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-accent/10 transition-all duration-200">
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-destructive/10 text-destructive transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
