import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Download, Heart } from "lucide-react"

export default function ModelsPage() {
  const models = [
    {
      name: "meta-llama/Llama-3.1-405B",
      author: "Meta",
      description: "The most capable openly available LLM to date",
      downloads: "2.5M",
      likes: "12.3K",
      tags: ["Text Generation", "Transformers", "PyTorch"],
    },
    {
      name: "Qwen/Qwen-2.5-72B-Instruct",
      author: "Alibaba",
      description: "Powerful instruction-tuned model for chat and reasoning",
      downloads: "1.8M",
      likes: "8.9K",
      tags: ["Text Generation", "Conversational", "Instruct"],
    },
    {
      name: "mistralai/Mistral-7B-v0.3",
      author: "Mistral AI",
      description: "Efficient 7B parameter model with strong performance",
      downloads: "3.2M",
      likes: "15.1K",
      tags: ["Text Generation", "Efficient", "Open Source"],
    },
    {
      name: "openai/whisper-large-v3",
      author: "OpenAI",
      description: "State-of-the-art speech recognition model",
      downloads: "1.5M",
      likes: "9.2K",
      tags: ["Audio", "Speech Recognition", "Multilingual"],
    },
    {
      name: "stabilityai/stable-diffusion-xl",
      author: "Stability AI",
      description: "High-resolution text-to-image generation",
      downloads: "4.1M",
      likes: "18.7K",
      tags: ["Image Generation", "Diffusion", "Text-to-Image"],
    },
    {
      name: "google/gemma-2-9b",
      author: "Google",
      description: "Lightweight open model from Google DeepMind",
      downloads: "1.1M",
      likes: "6.7K",
      tags: ["Text Generation", "Efficient", "Gemma"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 border-b bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Models</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover and explore over 100,000 machine learning models for various tasks.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search models by name, task, or author..." className="pl-10 h-12" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="size-5 text-primary" />
              <h2 className="text-2xl font-bold">Trending Models</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {models.map((model, i) => (
                <Card key={i} className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{model.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">by {model.author}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{model.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {model.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="size-3" />
                        <span>{model.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="size-3" />
                        <span>{model.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Models</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
