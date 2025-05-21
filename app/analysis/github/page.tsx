import type { Metadata } from "next"
import { Github, Search, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "GitHub Analysis - Career AI",
  description: "Evaluate your GitHub profile and project portfolio",
}

export default function GitHubAnalysisPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">GitHub Profile Analysis</h1>
        <p className="text-muted-foreground">
          Analyze your GitHub profile to evaluate your projects and contributions.
        </p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-violet-700 text-white mb-2">
            <Github className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle>Enter your GitHub username</CardTitle>
          <CardDescription>
            We'll analyze your public repositories, contributions, and activity to provide insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="github-username">GitHub Username</Label>
              <div className="flex gap-2">
                <Input id="github-username" placeholder="username" className="flex-1" aria-label="GitHub username" />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Example: octocat</p>
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
