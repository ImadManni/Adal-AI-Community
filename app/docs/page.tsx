import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Rocket, Wrench } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <BookOpen className="size-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Documentation</h1>
              <p className="text-lg text-muted-foreground">Everything you need to know to get started with Adal.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <Rocket className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Quick Start</h3>
                  <p className="text-sm text-muted-foreground">
                    Get up and running with Adal in minutes. Learn the basics and start building.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <Code className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">API Reference</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive API documentation for integrating Adal into your applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <BookOpen className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Guides</h3>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step tutorials for common tasks and advanced use cases.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <Wrench className="size-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Tools & SDKs</h3>
                  <p className="text-sm text-muted-foreground">
                    Libraries and tools to help you work with models, datasets, and spaces.
                  </p>
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
