"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider } from "next-themes"
import { SkipToContent } from "@/components/skip-to-content"

type AccessibilityContextType = {
  isDyslexiaMode: boolean
  toggleDyslexiaMode: () => void
  isHighContrastMode: boolean
  toggleHighContrastMode: () => void
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  resetFontSize: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false)
  const [isHighContrastMode, setIsHighContrastMode] = useState(false)
  const [fontSize, setFontSize] = useState(100)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedDyslexiaMode = localStorage.getItem("dyslexiaMode") === "true"
    const storedHighContrastMode = localStorage.getItem("highContrastMode") === "true"
    const storedFontSize = Number.parseInt(localStorage.getItem("fontSize") || "100")

    setIsDyslexiaMode(storedDyslexiaMode)
    setIsHighContrastMode(storedHighContrastMode)
    setFontSize(storedFontSize)
  }, [])

  // Apply accessibility classes to document
  useEffect(() => {
    if (isDyslexiaMode) {
      document.documentElement.classList.add("dyslexia-mode")
    } else {
      document.documentElement.classList.remove("dyslexia-mode")
    }
    localStorage.setItem("dyslexiaMode", isDyslexiaMode.toString())
  }, [isDyslexiaMode])

  useEffect(() => {
    if (isHighContrastMode) {
      document.documentElement.classList.add("high-contrast-mode")
    } else {
      document.documentElement.classList.remove("high-contrast-mode")
    }
    localStorage.setItem("highContrastMode", isHighContrastMode.toString())
  }, [isHighContrastMode])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    localStorage.setItem("fontSize", fontSize.toString())
  }, [fontSize])

  const toggleDyslexiaMode = () => setIsDyslexiaMode((prev) => !prev)
  const toggleHighContrastMode = () => setIsHighContrastMode((prev) => !prev)

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 200))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 80))
  const resetFontSize = () => setFontSize(100)

  return (
    <AccessibilityContext.Provider
      value={{
        isDyslexiaMode,
        toggleDyslexiaMode,
        isHighContrastMode,
        toggleHighContrastMode,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SkipToContent />
        {children}
      </ThemeProvider>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
