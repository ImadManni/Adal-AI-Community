import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Database, Download } from "lucide-react"

export default function DatasetsPage() {
  const datasets = [
    {
      name: "HuggingFaceFW/fineweb",
      description: "15 trillion tokens of clean and deduplicated English web data",
      size: "15TB",
      downloads: "234K",
      tags: ["Text", "English", "Web Data"],
    },
    {
      name: "OpenOrca/FLAN-Reason-v1",
      description: "High-quality reasoning dataset for instruction tuning",
      size: "2.3TB",
      downloads: "156K",
      tags: ["Instruction", "Reasoning", "QA"],
    },
    {
      name: "HuggingFaceFW/fineweb-edu",
      description: "Educational subset of FineWeb for training language models",
      size: "5.4TB",
      downloads: "189K",
      tags: ["Text", "Educational", "Filtered"],
    },
    {
      name: "allenai/c4",
      description: "Colossal Clean Crawled Corpus for language model pretraining",
      size: "800GB",
      downloads: "445K",
      tags: ["Text", "Pretraining", "Multilingual"],
    },
    {
      name: "laion/laion-5b",
      description: "5 billion image-text pairs for vision-language models",
      size: "240TB",
      downloads: "89K",
      tags: ["Image", "Text", "Multimodal"],
    },
    {
      name: "mozilla-foundation/common_voice",
      description: "Multilingual speech dataset with 20,000+ hours",
      size: "120GB",
      downloads: "312K",
      tags: ["Audio", "Speech", "Multilingual"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 border-b bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Datasets</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Access over 200,000 datasets for training and evaluating machine learning models.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search datasets by name, task, or modality..." className="pl-10 h-12" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="size-5 text-primary" />
              <h2 className="text-2xl font-bold">Popular Datasets</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {datasets.map((dataset, i) => (
                <Card key={i} className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{dataset.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{dataset.size}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dataset.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dataset.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Download className="size-3" />
                      <span>{dataset.downloads} downloads</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Datasets</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
