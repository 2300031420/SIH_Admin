import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/hooks/use-language"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const geistSans = GeistSans.variable
const geistMono = GeistMono.variable

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans} ${geistMono} antialiased`} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
