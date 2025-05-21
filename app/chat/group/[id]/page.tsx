"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, Info, Users, Phone, Video, Search, Paperclip, Smile, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getUserGradient } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
    role?: string
  }
  timestamp: Date
  isAI?: boolean
}

// Mock data for the Career Advice group chat
const groupInfo = {
  id: "career-advice",
  name: "Career Advice",
  description: "A group for sharing career advice and tips",
  members: [
    { id: "jane", name: "Jane Doe", role: "You", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "alex", name: "Alex Johnson", role: "UX Designer", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "sarah", name: "Sarah Williams", role: "Frontend Developer", avatar: "/placeholder.svg?height=32&width=32" },
    {
      id: "michael",
      name: "Michael Brown",
      role: "Technical Recruiter",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    { id: "emily", name: "Emily Davis", role: "Product Manager", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "david", name: "David Wilson", role: "Senior Developer", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "jessica", name: "Jessica Taylor", role: "UI Designer", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "ai", name: "Career AI", isAI: true, avatar: "/placeholder.svg?height=32&width=32" },
  ],
  created: new Date(2025, 3, 15),
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Welcome to the Career Advice group! This is a space for sharing career tips, asking questions, and supporting each other's professional growth.",
    sender: {
      id: "ai",
      name: "Career AI",
      role: "Assistant",
    },
    timestamp: new Date(2025, 4, 20, 9, 0),
    isAI: true,
  },
  {
    id: "2",
    content:
      "Hi everyone! I'm looking for advice on transitioning from UX design to product management. Has anyone here made a similar career change?",
    sender: {
      id: "alex",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    timestamp: new Date(2025, 4, 20, 9, 5),
  },
  {
    id: "3",
    content:
      "I made that transition about 2 years ago. The key is to highlight your user-centered approach and how your design skills inform product decisions. Happy to chat more about it!",
    sender: {
      id: "emily",
      name: "Emily Davis",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    timestamp: new Date(2025, 4, 20, 9, 10),
  },
  {
    id: "4",
    content:
      "From a recruiter's perspective, companies value designers who understand business goals. Try to get involved in strategy discussions and build those skills while still in your UX role.",
    sender: {
      id: "michael",
      name: "Michael Brown",
      role: "Technical Recruiter",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    timestamp: new Date(2025, 4, 20, 9, 15),
  },
  {
    id: "5",
    content:
      "Thanks for the advice! I've been trying to take on more product-focused responsibilities in my current role. Emily, I'd love to hear more about your experience.",
    sender: {
      id: "alex",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    timestamp: new Date(2025, 4, 20, 9, 20),
  },
]

export default function GroupChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
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
      sender: {
        id: "jane",
        name: "Jane Doe",
        role: "You",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great point about transitioning careers. Building a portfolio that showcases both design and product thinking can be very effective.",
        "Have you considered taking any product management courses? There are some excellent ones on platforms like Coursera and Udemy.",
        "Networking is crucial for career transitions. Try to connect with product managers in your industry to learn from their experiences.",
        "Don't forget to highlight transferable skills like user research, stakeholder management, and data analysis in your resume.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: {
          id: "ai",
          name: "Career AI",
          role: "Assistant",
        },
        timestamp: new Date(),
        isAI: true,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
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

  return (
    <div className="container mx-auto flex h-screen flex-col items-center p-6">
      <Card className="flex flex-1 flex-col overflow-hidden max-w-4xl w-full">
        <CardHeader className="border-b bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md bg-lime-100 text-lime-700"
                aria-hidden="true"
              >
                <Users className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">{groupInfo.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{groupInfo.members.length} members</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Group call">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Group Call</TooltipContent>
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
                    <Button variant="ghost" size="icon" aria-label="Group information">
                      <Info className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Group Info</TooltipContent>
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
                      <div key={message.id} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 overflow-hidden flex-shrink-0">
                          {message.isAI ? (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-sky-300"></div>
                              <AvatarFallback className="text-gray-700" aria-hidden="true">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </>
                          ) : (
                            <>
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${getUserGradient(message.sender.id)}`}
                              ></div>
                              <AvatarFallback className="text-gray-700 font-medium" aria-hidden="true">
                                {message.sender.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div className="flex-1" role="article" aria-label={`Message from ${message.sender.name}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{message.sender.name}</span>
                            {message.isAI && (
                              <Badge variant="outline" className="bg-cyan-50 text-cyan-700">
                                AI
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                          </div>
                          <p className="mt-1 text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3" aria-live="polite" aria-label="AI is typing">
                    <Avatar className="h-8 w-8 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-sky-300"></div>
                      <AvatarFallback className="text-gray-700" aria-hidden="true">
                        <Bot className="h-4 w-4" />
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
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                    aria-label="Type your message"
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
                <div className="text-xs text-muted-foreground">Press Enter to send, Shift+Enter for a new line</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
