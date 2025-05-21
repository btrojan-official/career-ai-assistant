import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Jane!</h1>
        <p className="text-muted-foreground">Here's an overview of your career development journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-lime-200 dark:border-lime-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Daily Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-lime-100 dark:bg-lime-900/60 p-2">
                  <Zap className="h-5 w-5 text-lime-500 dark:text-lime-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">75%</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 dark:from-lime-600 dark:to-cyan-600 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-background">
                  <span className="text-sm font-bold">3/4</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div
                className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800"
                role="progressbar"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Daily goal progress"
              >
                <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 dark:from-lime-600 dark:to-cyan-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-cyan-200 dark:border-cyan-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Career Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/60 p-2">
                  <TrendingUp className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This month</p>
                  <p className="text-2xl font-bold">+12%</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-lime-400 dark:from-cyan-600 dark:to-lime-600 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-background">
                  <span className="text-sm font-bold">↑</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div
                className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800"
                role="progressbar"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Career growth progress"
              >
                <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-lime-400 dark:from-cyan-600 dark:to-lime-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2" aria-label="Next steps">
              <li className="flex items-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-2">
                <div className="rounded-full bg-lime-100 dark:bg-lime-900/60 p-1" aria-hidden="true">
                  <BookOpen className="h-4 w-4 text-lime-500 dark:text-lime-400" />
                </div>
                <span className="text-sm">Complete UX Design course</span>
              </li>
              <li className="flex items-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-2">
                <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/60 p-1" aria-hidden="true">
                  <Users className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                </div>
                <span className="text-sm">Connect with 2 mentors</span>
              </li>
              <li className="flex items-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-2">
                <div className="rounded-full bg-lime-100 dark:bg-lime-900/60 p-1" aria-hidden="true">
                  <Calendar className="h-4 w-4 text-lime-500 dark:text-lime-400" />
                </div>
                <span className="text-sm">Schedule interview practice</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md bg-gradient-to-r from-lime-400 to-cyan-400 dark:from-lime-600 dark:to-cyan-600 p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">UX Design Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">Completed 3 of 8 modules</p>
                  <div
                    className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800"
                    role="progressbar"
                    aria-valuenow={37.5}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="UX Design Fundamentals progress"
                  >
                    <div className="h-1.5 w-[37.5%] rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 dark:from-lime-600 dark:to-cyan-600"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md bg-gradient-to-r from-cyan-400 to-lime-400 dark:from-cyan-600 dark:to-lime-600 p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Frontend Development</h3>
                  <p className="text-sm text-muted-foreground">Completed 5 of 10 modules</p>
                  <div
                    className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800"
                    role="progressbar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Frontend Development progress"
                  >
                    <div className="h-1.5 w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-lime-400 dark:from-cyan-600 dark:to-lime-600"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/learning">View All Courses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border-2 border-lime-200 dark:border-lime-900 bg-white dark:bg-background">
                  <span className="text-xs font-medium text-muted-foreground">MAY</span>
                  <span className="text-lg font-bold">24</span>
                </div>
                <div>
                  <h3 className="font-medium">Tech Career Fair</h3>
                  <p className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-lime-100 dark:bg-lime-900/60 px-2 py-0.5 text-xs font-medium text-lime-700 dark:text-lime-300">
                      Networking
                    </span>
                    <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/60 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                      Job Search
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border-2 border-cyan-200 dark:border-cyan-900 bg-white dark:bg-background">
                  <span className="text-xs font-medium text-muted-foreground">MAY</span>
                  <span className="text-lg font-bold">28</span>
                </div>
                <div>
                  <h3 className="font-medium">Resume Workshop</h3>
                  <p className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-lime-100 dark:bg-lime-900/60 px-2 py-0.5 text-xs font-medium text-lime-700 dark:text-lime-300">
                      Workshop
                    </span>
                    <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/60 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                      Career
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/calendar">View Calendar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
