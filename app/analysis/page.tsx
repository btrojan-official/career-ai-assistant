import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Linkedin, Github } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Analysis - Career AI",
  description: "Analyze your professional profiles and documents",
}

const analysisOptions = [
  {
    title: "CV Analysis",
    description: "Get detailed feedback and suggestions to improve your CV",
    icon: FileText,
    href: "/analysis/cv",
    color: "from-green-500 to-emerald-700",
  },
  {
    title: "LinkedIn Analysis",
    description: "Optimize your LinkedIn profile to attract recruiters",
    icon: Linkedin,
    href: "/analysis/linkedin",
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "GitHub Analysis",
    description: "Evaluate your GitHub profile and project portfolio",
    icon: Github,
    href: "/analysis/github",
    color: "from-purple-500 to-violet-700",
  },
]

export default function AnalysisPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analysis Tools</h1>
        <p className="text-muted-foreground">
          Analyze your professional profiles and documents to get personalized feedback and improvement suggestions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {analysisOptions.map((option) => (
          <Card key={option.title} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${option.color} text-white mb-2`}
              >
                <option.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-0">
              <Button asChild>
                <Link href={option.href}>Start Analysis</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
