"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "next-themes"
import { useAccessibility } from "@/components/accessibility-provider"
import { Moon, Sun, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const {
    isDyslexiaMode,
    toggleDyslexiaMode,
    isHighContrastMode,
    toggleHighContrastMode,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
  } = useAccessibility()

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Accessibility Settings</h1>
        <p className="text-muted-foreground">Customize your experience to meet your accessibility needs</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Display Preferences</CardTitle>
            <CardDescription>Adjust how content appears on screen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle">Color Theme</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <Switch
                  id="theme-toggle"
                  checked={theme === "dark"}
                  onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                />
                <Moon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="contrast-toggle">High Contrast</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <Switch
                id="contrast-toggle"
                checked={isHighContrastMode}
                onCheckedChange={toggleHighContrastMode}
                aria-label={`${isHighContrastMode ? "Disable" : "Enable"} high contrast mode`}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-0.5">
                <Label htmlFor="font-size">Text Size ({fontSize}%)</Label>
                <p className="text-sm text-muted-foreground">Adjust the size of text throughout the application</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  aria-label="Decrease font size"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Slider
                  id="font-size"
                  value={[fontSize]}
                  min={80}
                  max={200}
                  step={10}
                  onValueChange={(value) => {
                    document.documentElement.style.fontSize = `${value[0]}%`
                    localStorage.setItem("fontSize", value[0].toString())
                  }}
                  aria-label="Adjust font size"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 200}
                  aria-label="Increase font size"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFontSize}
                  disabled={fontSize === 100}
                  aria-label="Reset font size"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reading Preferences</CardTitle>
            <CardDescription>Customize text display for easier reading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dyslexia-toggle">Dyslexia-Friendly Font</Label>
                <p className="text-sm text-muted-foreground">Use a font designed to be easier to read with dyslexia</p>
              </div>
              <Switch
                id="dyslexia-toggle"
                checked={isDyslexiaMode}
                onCheckedChange={toggleDyslexiaMode}
                aria-label={`${isDyslexiaMode ? "Disable" : "Enable"} dyslexia-friendly font`}
              />
            </div>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Font Preview</h3>
              <p className="mb-4 text-muted-foreground">This is how text will appear throughout the application.</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Heading Text Example</p>
                <p>
                  This is a paragraph of text that demonstrates how the content will look with your current settings.
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="motion-toggle">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
              </div>
              <Switch
                id="motion-toggle"
                aria-label="Toggle reduced motion"
                checked={window.matchMedia("(prefers-reduced-motion: reduce)").matches}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Keyboard Navigation</CardTitle>
            <CardDescription>Keyboard shortcuts to navigate the application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    g
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    d
                  </kbd>
                </div>
                <p className="text-sm text-muted-foreground">Go to Dashboard</p>
              </div>

              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    g
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    l
                  </kbd>
                </div>
                <p className="text-sm text-muted-foreground">Go to Learning</p>
              </div>

              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    g
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    c
                  </kbd>
                </div>
                <p className="text-sm text-muted-foreground">Go to Contacts</p>
              </div>

              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    g
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    e
                  </kbd>
                </div>
                <p className="text-sm text-muted-foreground">Go to Calendar</p>
              </div>

              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    g
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    m
                  </kbd>
                </div>
                <p className="text-sm text-muted-foreground">Go to Chat</p>
              </div>

              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                    ?
                  </kbd>
                </div>
                <p className="text-sm text-muted-foreground">Show keyboard shortcuts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
