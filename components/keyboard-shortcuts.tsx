"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function KeyboardShortcuts() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger shortcuts when not in input, textarea, or contentEditable elements
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return
      }

      // Ctrl/Cmd + / to show keyboard shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault()
        toast({
          title: "Keyboard Shortcuts",
          description: (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>g + d</div>
              <div>Go to Dashboard</div>
              <div>g + l</div>
              <div>Go to Learning</div>
              <div>g + c</div>
              <div>Go to Contacts</div>
              <div>g + e</div>
              <div>Go to Calendar</div>
              <div>g + m</div>
              <div>Go to Chat</div>
              <div>?</div>
              <div>Show this help</div>
            </div>
          ),
          duration: 5000,
        })
        return
      }

      // Show keyboard shortcuts with ?
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        e.preventDefault()
        toast({
          title: "Keyboard Shortcuts",
          description: (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>g + d</div>
              <div>Go to Dashboard</div>
              <div>g + l</div>
              <div>Go to Learning</div>
              <div>g + c</div>
              <div>Go to Contacts</div>
              <div>g + e</div>
              <div>Go to Calendar</div>
              <div>g + m</div>
              <div>Go to Chat</div>
              <div>?</div>
              <div>Show this help</div>
            </div>
          ),
          duration: 5000,
        })
        return
      }

      // Navigation shortcuts with g prefix
      if (e.key === "g") {
        // Set a timeout to wait for the next key
        const timeoutId = setTimeout(() => {
          // Reset after timeout
        }, 1000)

        // Listen for the next key
        const handleNextKey = (e2: KeyboardEvent) => {
          clearTimeout(timeoutId)
          window.removeEventListener("keydown", handleNextKey)

          switch (e2.key) {
            case "d":
              router.push("/dashboard")
              break
            case "l":
              router.push("/learning")
              break
            case "c":
              router.push("/contacts")
              break
            case "e":
              router.push("/calendar")
              break
            case "m":
              router.push("/chat")
              break
          }
        }

        window.addEventListener("keydown", handleNextKey, { once: true })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, toast])

  return null
}
