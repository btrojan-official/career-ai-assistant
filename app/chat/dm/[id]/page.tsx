"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, Info, Phone, Video, Search, Paperclip, Smile, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getUserGradient } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "contact" | "ai"
  timestamp: Date
}

// Mock data for direct messages
const contacts = {
  "alex-johnson": {
    id: "alex-johnson",
    name: "Alex Johnson",
    role: "UX Designer",
    status: "online",
    avatar: "/placeholder.svg?height=32&width=32",
    messages: [
      {
        id: "1",
        content: "Hi Jane! I saw your portfolio and was really impressed with your work.",
        sender: "contact",
        timestamp: new Date(2025, 4, 20, 10, 0),
      },
      {
        id: "2",
        content: "Thanks Alex! I've been working hard on improving my design skills.",
        sender: "user",
        timestamp: new Date(2025, 4, 20, 10, 5),
      },
      {
        id: "3",
        content:
          "It shows! I'm working on a new project and could use some feedback. Would you be interested in collaborating?",
        sender: "contact",
        timestamp: new Date(2025, 4, 20, 10, 10),
      },
      {
        id: "4",
        content: "I'd love to! What kind of project is it?",
        sender: "user",
        timestamp: new Date(2025, 4, 20, 10, 15),
      },
      {
        id: "5",
        content:
          "It's a mobile app for fitness tracking with a focus on mental wellbeing. I'm designing the UX flow now.",
        sender: "contact",
        timestamp: new Date(2025, 4, 21, 9, 0),
      },
    ],
  },
  "sarah-williams": {
    id: "sarah-williams",
    name: "Sarah Williams",
    role: "Frontend Developer",
    status: "offline",
    avatar: "/placeholder.svg?height=32&width=32",
    messages: [
      {
        id: "1",
        content: "Hey Jane, do you have any recommendations for learning React?",
        sender: "contact",
        timestamp: new Date(2025, 4, 19, 14, 0),
      },
      {
        id: "2",
        content: "Hi Sarah! Yes, I found the React docs and a course on Frontend Masters really helpful.",
        sender: "user",
        timestamp: new Date(2025, 4, 19, 14, 10),
      },
      {
        id: "3",
        content: "Thanks! I'll check those out. How long did it take you to feel comfortable with it?",
        sender: "contact",
        timestamp: new Date(2025, 4, 19, 14, 15),
      },
      {
        id: "4",
        content: "About a month of consistent practice. Building small projects helped a lot.",
        sender: "user",
        timestamp: new Date(2025, 4, 19, 14, 20),
      },
    ],
  },
  "michael-brown": {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Technical Recruiter",
    status: "away",
    avatar: "/placeholder.svg?height=32&width=32",
    messages: [
      {
        id: "1",
        content: "Hello Jane, I came across your profile and wanted to discuss a potential opportunity with you.",
        sender: "contact",
        timestamp: new Date(2025, 4, 18, 11, 0),
      },
      {
        id: "2",
        content: "Hi Michael, I'd be interested in hearing more about it.",
        sender: "user",
        timestamp: new Date(2025, 4, 18, 11, 30),
      },
      {
        id: "3",
        content:
          "Great! I'm recruiting for a UX/UI position at a fintech startup. They're looking for someone with your skill set. Would you be available for a quick call this week?",
        sender: "contact",
        timestamp: new Date(2025, 4, 18, 11, 35),
      },
      {
        id: "4",
        content: "Yes, I could do Thursday afternoon or Friday morning. What's the company name?",
        sender: "user",
        timestamp: new Date(2025, 4, 18, 11, 40),
      },
      {
        id: "5",
        content: "Friday morning works! The company is FinanceFlow. I'll send you more details via email.",
        sender: "contact",
        timestamp: new Date(2025, 4, 18, 11, 45),
      },
    ],
  },
}

export default function DirectMessagePage({ params }: { params: { id: string } }) {
  const contactId = params.id
  const contact = contacts[contactId as keyof typeof contacts]

  const [messages, setMessages] = useState<Message[]>(contact?.messages || [])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate response based on contact
    setIsLoading(true)
    setTimeout(() => {
      let responseContent = ""

      if (contactId === "alex-johnson") {
        responseContent =
          "That sounds great! I'd love to see your ideas. Can we schedule a time to discuss the details?"
      } else if (contactId === "sarah-williams") {
        responseContent = "Thanks for the advice! I'll start with those resources and reach out if I have questions."
      } else if (contactId === "michael-brown") {
        responseContent =
          "Perfect! I've just sent you an email with the job description and company details. Looking forward to our call on Friday."
      }

      const contactMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "contact",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, contactMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {}
  messages.forEach((message) => {
    const dateKey = message.timestamp.toDateString()
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = []
    }
    groupedMessages[dateKey].push(message)
  })

  if (!contact) {
    return <div className="container mx-auto p-6">Contact not found</div>
  }

  const contactGradient = getUserGradient(contactId)
  const userGradient = "from-lime-200 to-cyan-300" // Jane's gradient

  return (
    <div className="container mx-auto flex h-screen flex-col items-center p-6">
      <Card className="flex flex-1 flex-col overflow-hidden max-w-4xl w-full">
        <CardHeader className="border-b bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${contactGradient}`}></div>
                  <AvatarFallback className="text-gray-700 font-medium" aria-label={contact.name}>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                    contact.status === "online"
                      ? "bg-lime-500"
                      : contact.status === "away"
                        ? "bg-amber-500"
                        : "bg-gray-300"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">{contact.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {contact.role} •{" "}
                  <span aria-live="polite">
                    {contact.status === "online" ? "Online" : contact.status === "away" ? "Away" : "Offline"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Call">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Video call">
                      <Video className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Video Call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Search messages">
                      <Search className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search Messages</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Contact information">
                      <Info className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Contact Info</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="flex h-full flex-col justify-between">
            <div className="flex-1 overflow-y-auto p-4" aria-label="Message history" role="log">
              <div className="space-y-6">
                {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
                  <div key={dateKey} className="space-y-4">
                    <div className="relative flex items-center justify-center py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative bg-white px-3 text-sm text-gray-500">
                        {formatDate(new Date(dateKey))}
                      </div>
                    </div>

                    {dateMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-lime-200 to-cyan-300"
                              : message.sender === "ai"
                                ? "bg-cyan-50"
                                : "bg-muted"
                          }`}
                          role="article"
                          aria-label={`Message from ${message.sender === "user" ? "you" : message.sender === "ai" ? "AI assistant" : contact.name}`}
                        >
                          {message.sender !== "user" && (
                            <Avatar className="h-8 w-8 overflow-hidden">
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${
                                  message.sender === "contact" ? contactGradient : "from-blue-200 to-sky-300"
                                }`}
                              ></div>
                              <AvatarFallback className="text-gray-700" aria-hidden="true">
                                {message.sender === "ai" ? (
                                  <Bot className="h-4 w-4" />
                                ) : (
                                  contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                )}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {message.sender === "ai" && (
                                <Badge variant="outline" className="bg-cyan-50 text-cyan-700">
                                  AI
                                </Badge>
                              )}
                              <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                            </div>
                            <p className="mt-1 text-sm">{message.content}</p>
                          </div>
                          {message.sender === "user" && (
                            <Avatar className="h-8 w-8 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-lime-200 to-cyan-300"></div>
                              <AvatarFallback className="text-gray-700 font-medium" aria-label="You">
                                JD
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3" aria-live="polite" aria-label="Contact is typing">
                    <Avatar className="h-8 w-8 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${contactGradient}`}></div>
                      <AvatarFallback className="text-gray-700 font-medium" aria-hidden="true">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2" role="group" aria-label="Message input">
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Attach file">
                    <Paperclip className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Attach image">
                    <ImageIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${contact.name}...`}
                    className="flex-1"
                    disabled={isLoading}
                    aria-label={`Message to ${contact.name}`}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Add emoji">
                    <Smile className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-lime-200 to-cyan-300 hover:from-lime-300 hover:to-cyan-400"
                    size="icon"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4 text-gray-700" aria-hidden="true" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground" aria-live="polite">
                  {contact.status === "online"
                    ? "Online • Messages will be delivered instantly"
                    : contact.status === "away"
                      ? "Away • May respond with delay"
                      : "Offline • Will receive messages when online"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
