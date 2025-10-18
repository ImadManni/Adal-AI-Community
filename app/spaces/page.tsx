import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Boxes, Heart, Eye } from "lucide-react"

export default function SpacesPage() {
  const spaces = [
    {
      name: "Stable Diffusion XL",
      author: "stabilityai",
      description: "Generate high-quality images from text prompts",
      likes: "45.2K",
      views: "2.1M",
      tags: ["Image Generation", "Diffusion", "SDXL"],
    },
    {
      name: "ChatGPT Clone",
      author: "openai-community",
      description: "Interactive chatbot powered by GPT-4",
      likes: "38.7K",
      views: "1.8M",
      tags: ["Chat", "GPT-4", "Conversational"],
    },
    {
      name: "Whisper Transcription",
      author: "openai",
      description: "Transcribe audio to text in multiple languages",
      likes: "29.3K",
      views: "890K",
      tags: ["Audio", "Transcription", "Multilingual"],
    },
    {
      name: "Image Segmentation",
      author: "facebook",
      description: "Segment anything in images with SAM",
      likes: "22.1K",
      views: "654K",
      tags: ["Computer Vision", "Segmentation", "SAM"],
    },
    {
      name: "Music Generation",
      author: "meta",
      description: "Generate music from text descriptions",
      likes: "18.9K",
      views: "523K",
      tags: ["Audio", "Music", "Generation"],
    },
    {
      name: "Code Assistant",
      author: "bigcode",
      description: "AI-powered code completion and generation",
      likes: "31.5K",
      views: "1.2M",
      tags: ["Code", "Programming", "Assistant"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 border-b bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Spaces</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover ML apps made by the community. Build, share, and deploy your own.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search spaces by name or task..." className="pl-10 h-12" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Boxes className="size-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Spaces</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {spaces.map((space, i) => (
                <Card key={i} className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{space.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">by {space.author}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{space.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {space.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="size-3" />
                        <span>{space.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="size-3" />
                        <span>{space.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Spaces</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
