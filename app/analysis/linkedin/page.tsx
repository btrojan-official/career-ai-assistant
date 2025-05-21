import type { Metadata } from "next"
import { Linkedin, Search, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "LinkedIn Analysis - Career AI",
  description: "Optimize your LinkedIn profile to attract recruiters",
}

export default function LinkedInAnalysisPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">LinkedIn Profile Analysis</h1>
        <p className="text-muted-foreground">
          Analyze your LinkedIn profile to get personalized recommendations for improvement.
        </p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white mb-2">
            <Linkedin className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle>Enter your LinkedIn profile URL</CardTitle>
          <CardDescription>
            We'll analyze your public profile information to provide personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
              <div className="flex gap-2">
                <Input
                  id="linkedin-url"
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  className="flex-1"
                  aria-label="LinkedIn profile URL"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Example: https://www.linkedin.com/in/johndoe</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            Analyze Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
