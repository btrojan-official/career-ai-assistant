import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Star, Users } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "UX Design Fundamentals",
    description: "Learn the basics of user experience design and create intuitive interfaces",
    progress: 37.5,
    modules: 8,
    completedModules: 3,
    duration: "12 hours",
    level: "Beginner",
    students: 1245,
    rating: 4.8,
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Master HTML, CSS, and JavaScript to build responsive websites",
    progress: 50,
    modules: 10,
    completedModules: 5,
    duration: "20 hours",
    level: "Intermediate",
    students: 2130,
    rating: 4.7,
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Career Networking",
    description: "Build professional relationships that advance your career",
    progress: 0,
    modules: 6,
    completedModules: 0,
    duration: "8 hours",
    level: "All Levels",
    students: 987,
    rating: 4.5,
    category: "Career",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Interview Preparation",
    description: "Prepare for technical and behavioral interviews with confidence",
    progress: 0,
    modules: 7,
    completedModules: 0,
    duration: "10 hours",
    level: "Intermediate",
    students: 1567,
    rating: 4.9,
    category: "Career",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Data Analysis Basics",
    description: "Learn to analyze and visualize data to make informed decisions",
    progress: 0,
    modules: 9,
    completedModules: 0,
    duration: "15 hours",
    level: "Beginner",
    students: 1089,
    rating: 4.6,
    category: "Data",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Project Management",
    description: "Master the skills to lead projects from initiation to completion",
    progress: 0,
    modules: 8,
    completedModules: 0,
    duration: "14 hours",
    level: "Intermediate",
    students: 1342,
    rating: 4.7,
    category: "Management",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function LearningPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Learning Materials</h1>
        <p className="text-muted-foreground">Develop your skills with courses tailored to your career goals</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Course categories">
        <Badge
          className="bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500"
          role="tab"
          aria-selected="true"
        >
          All Courses
        </Badge>
        <Badge variant="outline" role="tab" aria-selected="false">
          Design
        </Badge>
        <Badge variant="outline" role="tab" aria-selected="false">
          Development
        </Badge>
        <Badge variant="outline" role="tab" aria-selected="false">
          Career
        </Badge>
        <Badge variant="outline" role="tab" aria-selected="false">
          Data
        </Badge>
        <Badge variant="outline" role="tab" aria-selected="false">
          Management
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={course.image || "/placeholder.svg"}
                alt={`${course.title} course thumbnail`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-lime-50 text-lime-700">
                  {course.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm" aria-label={`Rating: ${course.rating} out of 5`}>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <CardTitle className="mt-2 line-clamp-1 text-lg font-semibold">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1" aria-label={`Duration: ${course.duration}`}>
                  <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{course.duration}</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  aria-label={`${course.completedModules} of ${course.modules} modules completed`}
                >
                  <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>
                    {course.completedModules}/{course.modules} modules
                  </span>
                </div>
                <div className="flex items-center gap-1" aria-label={`${course.students} students enrolled`}>
                  <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{course.students}</span>
                </div>
              </div>
              {course.progress > 0 && (
                <div className="mt-3">
                  <div
                    className="h-1.5 w-full rounded-full bg-gray-100"
                    role="progressbar"
                    aria-valuenow={course.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Course progress: ${course.progress}%`}
                  >
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{course.progress}% complete</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className={
                  course.progress > 0
                    ? "w-full bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500"
                    : "w-full"
                }
              >
                <Link href={`/learning/${course.id}`}>
                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
