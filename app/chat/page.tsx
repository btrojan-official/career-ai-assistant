import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, User, Plus } from "lucide-react"
import Link from "next/link"
import { getUserGradient } from "@/lib/utils"

export default function ChatPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        <p className="text-muted-foreground">Connect with mentors, peers, and career advisors</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-lime-500" />
              Group Chats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-lime-100 text-lime-700">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Career Advice</h3>
                    <p className="text-sm text-muted-foreground">8 members • 3 unread messages</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/chat/group/career-advice">Open</Link>
                </Button>
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Group Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-500" />
              Direct Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className={`h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r ${getUserGradient("alex-johnson")}`}
                    >
                      <div className="flex h-full w-full items-center justify-center text-gray-700 font-medium">AJ</div>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-lime-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Alex Johnson</h3>
                    <p className="text-sm text-muted-foreground">UX Designer • 2 unread messages</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/chat/dm/alex-johnson">Open</Link>
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className={`h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r ${getUserGradient("sarah-williams")}`}
                    >
                      <div className="flex h-full w-full items-center justify-center text-gray-700 font-medium">SW</div>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sarah Williams</h3>
                    <p className="text-sm text-muted-foreground">Frontend Developer • Last active 3h ago</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/chat/dm/sarah-williams">Open</Link>
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className={`h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r ${getUserGradient("michael-brown")}`}
                    >
                      <div className="flex h-full w-full items-center justify-center text-gray-700 font-medium">MB</div>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Michael Brown</h3>
                    <p className="text-sm text-muted-foreground">Technical Recruiter • Last active 1h ago</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/chat/dm/michael-brown">Open</Link>
                </Button>
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Start New Conversation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
