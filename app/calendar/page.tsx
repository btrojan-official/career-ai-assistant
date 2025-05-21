"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Event = {
  id: number
  title: string
  date: Date
  startTime: string
  endTime: string
  type: "workshop" | "meeting" | "networking" | "interview" | "webinar"
  location: string
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Tech Career Fair",
    date: new Date(2025, 4, 24),
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    type: "networking",
    location: "Convention Center",
  },
  {
    id: 2,
    title: "Resume Workshop",
    date: new Date(2025, 4, 28),
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    type: "workshop",
    location: "Online",
  },
  {
    id: 3,
    title: "Interview with Design Agency",
    date: new Date(2025, 4, 21),
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "interview",
    location: "Design Agency HQ",
  },
  {
    id: 4,
    title: "Frontend Development Webinar",
    date: new Date(2025, 4, 22),
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    type: "webinar",
    location: "Online",
  },
  {
    id: 5,
    title: "Mentorship Meeting",
    date: new Date(2025, 4, 23),
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    type: "meeting",
    location: "Coffee Shop",
  },
  {
    id: 6,
    title: "Portfolio Review",
    date: new Date(2025, 4, 25),
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    type: "meeting",
    location: "Online",
  },
  {
    id: 7,
    title: "Networking Mixer",
    date: new Date(2025, 4, 26),
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    type: "networking",
    location: "Downtown Lounge",
  },
  {
    id: 8,
    title: "Job Interview Prep",
    date: new Date(2025, 4, 27),
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    type: "workshop",
    location: "Online",
  },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 21)) // May 21, 2025
  const [view, setView] = useState<"month" | "week" | "day">("week")

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-lime-100 text-lime-700"
      case "meeting":
        return "bg-cyan-100 text-cyan-700"
      case "networking":
        return "bg-purple-100 text-purple-700"
      case "interview":
        return "bg-orange-100 text-orange-700"
      case "webinar":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getWeekDates = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day
    const weekStart = new Date(date)
    weekStart.setDate(diff)

    const dates = []
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(weekStart)
      nextDate.setDate(weekStart.getDate() + i)
      dates.push(nextDate)
    }
    return dates
  }

  const weekDates = getWeekDates(currentDate)

  const getEventsForDate = (date: Date) => {
    return initialEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateToday = () => {
    setCurrentDate(new Date(2025, 4, 21)) // May 21, 2025
  }

  const renderWeekView = () => {
    return (
      <div className="grid grid-cols-7 gap-4" role="grid" aria-label="Week calendar view">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className="flex flex-col"
            role="gridcell"
            aria-label={`${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`}
          >
            <div
              className={`mb-2 flex flex-col items-center rounded-md p-2 ${
                date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth()
                  ? "bg-gradient-to-r from-lime-400 to-cyan-400 text-white"
                  : "bg-muted"
              }`}
            >
              <span className="text-xs font-medium">{daysOfWeek[date.getDay()]}</span>
              <span className="text-lg font-bold">{date.getDate()}</span>
            </div>
            <div className="space-y-2">
              {getEventsForDate(date).map((event) => (
                <div key={event.id} className="rounded-md border p-2 text-sm shadow-sm">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{event.startTime}</span>
                  </div>
                  <p className="mt-1 font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">Manage your schedule and upcoming career events</p>
      </div>

      <Card>
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={navigatePrevious} aria-label="Previous">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" onClick={navigateNext} aria-label="Next">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" onClick={navigateToday}>
                Today
              </Button>
              <CardTitle className="text-lg font-medium">
                {view === "month"
                  ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : view === "week"
                    ? `${months[weekDates[0].getMonth()]} ${weekDates[0].getDate()} - ${
                        months[weekDates[6].getMonth()]
                      } ${weekDates[6].getDate()}, ${weekDates[0].getFullYear()}`
                    : `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={view} onValueChange={(v) => setView(v as any)} aria-label="Calendar view">
                <SelectTrigger className="w-[120px]">
                  <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500"
                aria-label="Add new event"
              >
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add Event
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {view === "week" && renderWeekView()}
          {view === "month" && (
            <div className="text-center">
              <p className="text-muted-foreground">Month view is under development</p>
            </div>
          )}
          {view === "day" && (
            <div className="text-center">
              <p className="text-muted-foreground">Day view is under development</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold" id="upcoming-events">
          Upcoming Events
        </h2>
        <div className="space-y-4" aria-labelledby="upcoming-events">
          {initialEvents
            .filter(
              (event) => event.date >= new Date(2025, 4, 21), // Today or future events
            )
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 3)
            .map((event) => (
              <Card key={event.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className="flex h-14 w-14 flex-col items-center justify-center rounded-md border-2 border-lime-200 bg-white"
                    aria-label={`${months[event.date.getMonth()]} ${event.date.getDate()}`}
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {months[event.date.getMonth()].substring(0, 3)}
                    </span>
                    <span className="text-lg font-bold">{event.date.getDate()}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {event.startTime} - {event.endTime}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="mt-1">
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" aria-label={`View details for ${event.title}`}>
                    Details
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
