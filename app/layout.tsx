import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AccessibilityProvider } from "@/components/accessibility-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Career AI Dashboard",
  description: "AI-powered career development platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AccessibilityProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main id="main-content" className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </AccessibilityProvider>
      </body>
    </html>
  )
}
