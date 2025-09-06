"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GradientButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "success" | "danger"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export function GradientButton({
  children,
  className,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: GradientButtonProps) {
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-in-out",
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
