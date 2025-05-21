"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Calendar,
  BookOpen,
  MessageSquare,
  Users,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Hash,
  Plus,
  ChevronDown,
  BarChart3,
  Newspaper,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn, getUserGradient } from "@/lib/utils"

const mainMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Analysis",
    icon: BarChart3,
    href: "/analysis",
  },
  {
    title: "Learning",
    icon: BookOpen,
    href: "/learning",
  },
  {
    title: "Contacts",
    icon: Users,
    href: "/contacts",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "News",
    icon: Newspaper,
    href: "/news",
  },
]

const groupChats = [
  {
    id: "career-advice",
    name: "Career Advice",
    members: 8,
    lastActive: "2h ago",
    unread: 3,
  },
]

const directMessages = [
  {
    id: "alex-johnson",
    name: "Alex Johnson",
    role: "UX Designer",
    status: "online",
    lastActive: "Just now",
    unread: 2,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    role: "Frontend Developer",
    status: "offline",
    lastActive: "3h ago",
    unread: 0,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Technical Recruiter",
    status: "away",
    lastActive: "1h ago",
    unread: 0,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 p-1">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold">Career AI</span>
        </div>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu aria-label="Main Navigation">
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                tooltip={item.title}
                aria-current={
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "page" : undefined
                }
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/chat" || pathname.startsWith("/chat/")}
              tooltip="Chat"
              aria-current={pathname === "/chat" || pathname.startsWith("/chat/") ? "page" : undefined}
            >
              <Link href="/chat">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                <span>Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-2">
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger
                  className="flex w-full items-center justify-between"
                  aria-label="Toggle group chats"
                >
                  <span>Group Chats</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0" aria-hidden="true">
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1 h-5 w-5 p-0"
                aria-label="Add new group chat"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {groupChats.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton asChild isActive={pathname === `/chat/group/${chat.id}`}>
                          <Link href={`/chat/group/${chat.id}`} className="relative flex items-center">
                            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-lime-100 text-lime-700">
                              <Hash className="h-3 w-3" />
                            </div>
                            <span className="flex-1 truncate">{chat.name}</span>
                            {chat.unread > 0 && (
                              <div className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-500 px-1.5 text-xs font-medium text-white">
                                <span className="sr-only">{chat.unread} unread messages</span>
                                {chat.unread}
                              </div>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible mt-2">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger
                  className="flex w-full items-center justify-between"
                  aria-label="Toggle direct messages"
                >
                  <span>Direct Messages</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0" aria-hidden="true">
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1 h-5 w-5 p-0"
                aria-label="Start new conversation"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {directMessages.map((dm) => (
                      <SidebarMenuItem key={dm.id}>
                        <SidebarMenuButton asChild isActive={pathname === `/chat/dm/${dm.id}`}>
                          <Link href={`/chat/dm/${dm.id}`} className="relative flex items-center">
                            <div className="relative mr-2">
                              <Avatar className="h-6 w-6 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-r ${getUserGradient(dm.id)}`}></div>
                                <AvatarFallback className="text-gray-700 font-medium text-xs">
                                  {dm.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={cn(
                                  "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background",
                                  dm.status === "online"
                                    ? "bg-lime-500"
                                    : dm.status === "away"
                                      ? "bg-amber-500"
                                      : "bg-gray-300",
                                )}
                                aria-hidden="true"
                              />
                            </div>
                            <span className="flex-1 truncate">{dm.name}</span>
                            <span className="sr-only">, Status: {dm.status}</span>
                            {dm.unread > 0 && (
                              <div className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-xs font-medium text-white">
                                <span className="sr-only">{dm.unread} unread messages</span>
                                {dm.unread}
                              </div>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-md bg-background border border-border p-2">
            <Avatar className="h-9 w-9 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-200 to-cyan-300"></div>
              <AvatarFallback className="text-gray-700 font-medium">JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">Jane Doe</span>
              <span className="text-xs text-muted-foreground truncate">jane.doe@example.com</span>
            </div>
            <div className="flex shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="/settings" aria-label="Settings">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
