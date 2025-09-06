"use client"

import { LoginForm } from "@/components/login-form"
import { GraduationCap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export default function LoginPage() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pa" : "en")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg card-hover">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold gradient-text">{t("school_portal")}</h1>
            <p className="text-muted-foreground text-lg">{t("rfid_attendance")}</p>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8 shadow-xl border border-border/50">
          <LoginForm />
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
          >
            <Globe className="w-4 h-4 mr-2" />
            {t("language_toggle")}
          </Button>
        </div>
      </div>
    </div>
  )
}
