"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Mail, Phone, Briefcase, MapPin, Star, MoreHorizontal, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Contact = {
  id: number
  name: string
  role: string
  company: string
  email: string
  phone: string
  location: string
  category: "mentor" | "peer" | "recruiter" | "colleague"
  favorite: boolean
  avatar: string
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "UX Designer",
    company: "Design Co.",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    category: "mentor",
    favorite: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Frontend Developer",
    company: "Tech Solutions",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    location: "New York, NY",
    category: "peer",
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Technical Recruiter",
    company: "Talent Finders",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    location: "Chicago, IL",
    category: "recruiter",
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Product Manager",
    company: "Product Innovations",
    email: "emily@example.com",
    phone: "(555) 456-7890",
    location: "Austin, TX",
    category: "colleague",
    favorite: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Senior Developer",
    company: "Code Masters",
    email: "david@example.com",
    phone: "(555) 567-8901",
    location: "Seattle, WA",
    category: "mentor",
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    role: "UI Designer",
    company: "Creative Designs",
    email: "jessica@example.com",
    phone: "(555) 678-9012",
    location: "Portland, OR",
    category: "peer",
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const toggleFavorite = (id: number) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, favorite: !contact.favorite } : contact)))
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || contact.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mentor":
        return "bg-lime-100 text-lime-700"
      case "peer":
        return "bg-cyan-100 text-cyan-700"
      case "recruiter":
        return "bg-purple-100 text-purple-700"
      case "colleague":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">Manage your professional network and connections</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search contacts"
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter} aria-label="Filter by category">
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mentor">Mentors</SelectItem>
              <SelectItem value="peer">Peers</SelectItem>
              <SelectItem value="recruiter">Recruiters</SelectItem>
              <SelectItem value="colleague">Colleagues</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500"
            aria-label="Add new contact"
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add Contact
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt="" />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-medium">{contact.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleFavorite(contact.id)}
                    aria-label={contact.favorite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={contact.favorite}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        contact.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Contact</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className={`mb-3 ${getCategoryColor(contact.category)}`}>
                {contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
              </Badge>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2" aria-label="Company">
                  <Briefcase className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{contact.company}</span>
                </div>
                <div className="flex items-center gap-2" aria-label="Email">
                  <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <a href={`mailto:${contact.email}`} className="text-cyan-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2" aria-label="Phone">
                  <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <a href={`tel:${contact.phone}`} className="text-cyan-600 hover:underline">
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2" aria-label="Location">
                  <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{contact.location}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" aria-label={`Email ${contact.name}`}>
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Email
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500"
                  aria-label={`Call ${contact.name}`}
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div
          className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
          role="alert"
          aria-live="polite"
        >
          <div className="rounded-full bg-muted p-3">
            <Search className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No contacts found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          <Button
            className="mt-4 bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500"
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("all")
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
