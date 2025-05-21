import type { Metadata } from "next"
import { Upload, FileUp, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "CV Analysis - Career AI",
  description: "Get detailed feedback and suggestions to improve your CV",
}

export default function CVAnalysisPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">CV Analysis</h1>
        <p className="text-muted-foreground">
          Upload your CV to get detailed feedback and suggestions for improvement.
        </p>
      </div>

      <Tabs defaultValue="upload" className="max-w-3xl">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload CV</TabsTrigger>
          <TabsTrigger value="paste">Paste Content</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload your CV</CardTitle>
              <CardDescription>Upload your CV in PDF, DOCX, or TXT format to analyze.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-10 text-center">
                <FileUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  Drag and drop your CV file here, or click to browse
                </p>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  aria-label="Upload CV file"
                />
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" disabled>
                Analyze CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="paste">
          <Card>
            <CardHeader>
              <CardTitle>Paste CV Content</CardTitle>
              <CardDescription>Paste the text content of your CV for analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cv-content">CV Content</Label>
                  <textarea
                    id="cv-content"
                    className="min-h-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Paste your CV content here..."
                    aria-label="CV content"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                Analyze CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
