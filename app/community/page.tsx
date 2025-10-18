import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Calendar, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Users className="size-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Join the Community</h1>
              <p className="text-lg text-muted-foreground">
                Connect with ML practitioners, researchers, and enthusiasts from around the world.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <MessageSquare className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Discussions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ask questions, share insights, and learn from the community.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Discussions
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Calendar className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Events</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Attend workshops, webinars, and meetups with ML experts.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Events
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <TrendingUp className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Compete in challenges and showcase your ML skills.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Leaderboards
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
