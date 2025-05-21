import type { Metadata } from "next"
import { CalendarIcon, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "News - Career AI",
  description: "Latest career news, trends, and opportunities",
}

const newsCategories = [
  { id: "all", name: "All News" },
  { id: "tech", name: "Tech Industry" },
  { id: "career", name: "Career Development" },
  { id: "jobs", name: "Job Market" },
  { id: "education", name: "Education" },
]

const newsItems = [
  {
    id: 1,
    title: "Tech Industry Sees Surge in AI-Related Job Openings",
    excerpt:
      "Companies are increasingly looking for professionals with AI and machine learning skills as the technology becomes more mainstream.",
    date: "May 20, 2025",
    readTime: "5 min read",
    category: "tech",
    source: "TechCrunch",
    sourceIcon: "/placeholder.svg?height=40&width=40",
    link: "#",
  },
  {
    id: 2,
    title: "Remote Work Trends Continue to Shape the Job Market",
    excerpt:
      "Despite some companies calling employees back to the office, remote work opportunities continue to grow in certain sectors.",
    date: "May 19, 2025",
    readTime: "4 min read",
    category: "jobs",
    source: "Forbes",
    sourceIcon: "/placeholder.svg?height=40&width=40",
    link: "#",
  },
  {
    id: 3,
    title: "New Study Reveals Most In-Demand Skills for 2025",
    excerpt:
      "A recent study highlights the skills employers are looking for, with data analysis and digital literacy topping the list.",
    date: "May 18, 2025",
    readTime: "6 min read",
    category: "career",
    source: "Harvard Business Review",
    sourceIcon: "/placeholder.svg?height=40&width=40",
    link: "#",
  },
  {
    id: 4,
    title: "Universities Adapting Curricula to Meet Industry Demands",
    excerpt:
      "Educational institutions are revamping their programs to better prepare students for the rapidly evolving job market.",
    date: "May 17, 2025",
    readTime: "3 min read",
    category: "education",
    source: "Education Weekly",
    sourceIcon: "/placeholder.svg?height=40&width=40",
    link: "#",
  },
  {
    id: 5,
    title: "The Rise of Micro-Credentials in Professional Development",
    excerpt:
      "Shorter, focused learning programs are gaining popularity as professionals seek to quickly acquire specific skills.",
    date: "May 16, 2025",
    readTime: "4 min read",
    category: "education",
    source: "LinkedIn News",
    sourceIcon: "/placeholder.svg?height=40&width=40",
    link: "#",
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "tech":
      return "bg-cyan-100 text-cyan-800"
    case "career":
      return "bg-purple-100 text-purple-800"
    case "jobs":
      return "bg-green-100 text-green-800"
    case "education":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function NewsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Career News</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest career news, industry trends, and job market insights.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          {newsCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {newsCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-6">
              {newsItems
                .filter((item) => category.id === "all" || item.category === category.id)
                .map((news) => (
                  <Card key={news.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={news.sourceIcon || "/placeholder.svg"} alt={news.source} />
                            <AvatarFallback>{news.source[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{news.source}</span>
                        </div>
                        <Badge className={getCategoryColor(news.category)}>
                          {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{news.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <span>{news.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{news.readTime}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={news.link} target="_blank" rel="noopener noreferrer">
                          Read More
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
