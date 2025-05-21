"use client"

import { useState } from "react"
import { Moon, Sun, Type, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function AccessibilityMenu() {
  const { setTheme, theme } = useTheme()
  const [fontSize, setFontSize] = useState("normal")

  const changeFontSize = (size: string) => {
    setFontSize(size)
    document.documentElement.classList.remove("text-sm", "text-base", "text-lg", "text-xl")
    document.documentElement.classList.add(`text-${size}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Accessibility options">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark Mode</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Font Size</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => changeFontSize("sm")}>
          <Type className="mr-2 h-3 w-3" />
          <span>Small</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("base")}>
          <Type className="mr-2 h-4 w-4" />
          <span>Medium</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("lg")}>
          <Type className="mr-2 h-5 w-5" />
          <span>Large</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
