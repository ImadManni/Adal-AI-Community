"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Database, Boxes, Users, TrendingUp, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/adal-assistant"
import dynamic from "next/dynamic"

const AdalLogo3D = dynamic(() => import("@/components/adal-logo-3d").then(m => m.AdalLogo3D), { ssr: false })
const SponsorLogo3D = dynamic(() => import("@/components/sponsor-logo-3d").then(m => m.SponsorLogo3D), { ssr: false })
import Image from "next/image"

export default function HomePage() {
  const trendingModels = [
    { name: "Llama-3.1-405B", downloads: "2.5M", likes: "12.3K" },
    { name: "Qwen-2.5-72B-Instruct", downloads: "1.8M", likes: "8.9K" },
    { name: "Mistral-7B-v0.3", downloads: "3.2M", likes: "15.1K" },
    { name: "Alibaba-NLP-Turbo", downloads: "890K", likes: "4.2K" },
    { name: "google/gemma-2-9b", downloads: "1.1M", likes: "6.7K" },
  ]

  const trendingDatasets = [
    { name: "HuggingFaceFW/fineweb", size: "15TB", downloads: "234K" },
    { name: "OpenOrca/FLAN-Reason-v1", size: "2.3TB", downloads: "156K" },
    { name: "HuggingFaceFW/fineweb-edu", size: "5.4TB", downloads: "189K" },
    { name: "allenai/c4", size: "800GB", downloads: "445K" },
  ]

  const features = [
    {
      icon: <Sparkles className="size-6" />,
      title: "Explore AI Models",
      description: "Access thousands of pre-trained models for NLP, computer vision, audio, and more.",
      href: "/models",
    },
    {
      icon: <Database className="size-6" />,
      title: "Discover Datasets",
      description: "Find and share datasets to train and evaluate your machine learning models.",
      href: "/datasets",
    },
    {
      icon: <Boxes className="size-6" />,
      title: "Build Spaces",
      description: "Create and deploy ML demos and applications with just a few clicks.",
      href: "/spaces",
    },
    {
      icon: <Users className="size-6" />,
      title: "Join Community",
      description: "Collaborate with ML practitioners and researchers from around the world.",
      href: "/community",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "ML Research Lead",
      company: "DeepMind",
      avatar: "/professional-ai-researcher.png",
      content:
        "Adal has transformed how our team collaborates on ML projects. The platform's ease of use and comprehensive model library have accelerated our research significantly.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "AI Engineering Director",
      company: "OpenAI",
      avatar: "/professional-ai-engineer.png",
      content:
        "The best platform for sharing and discovering AI models. Adal's community-driven approach makes it incredibly easy to find exactly what you need.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Data Science Manager",
      company: "Meta AI",
      avatar: "/professional-woman-data-scientist.png",
      content:
        "We've deployed dozens of models through Adal. The seamless integration and robust infrastructure have made it our go-to platform for ML deployment.",
      rating: 5,
    },
  ]

  const sponsors = [
    { name: "Google", color: "#4285F4" },
    { name: "Microsoft", color: "#00A4EF" },
    { name: "AWS", color: "#FF9900" },
    { name: "Meta", color: "#0668E1" },
    { name: "NVIDIA", color: "#76B900" },
    { name: "IBM", color: "#0F62FE" },
    { name: "Intel", color: "#0071C5" },
    { name: "Anthropic", color: "#D4A574" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto"
            >
              <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32">
                <AdalLogo3D />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                The AI community building the future.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
                The platform where the machine learning community collaborates on models, datasets, and applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/spaces">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore AI Apps
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="/models">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse AI Models
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="w-full py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Trending on <span className="text-primary">🤖</span> this week
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="size-5 text-primary" />
                  <h3 className="text-lg font-bold">Models</h3>
                </div>
                <div className="space-y-3">
                  {trendingModels.map((model, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{model.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {model.downloads} downloads · {model.likes} likes
                            </p>
                          </div>
                          <TrendingUp className="size-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Link href="/models">
                  <Button variant="link" className="mt-3 md:mt-4 text-primary">
                    Browse 100k+ models →
                  </Button>
                </Link>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Database className="size-5 text-primary" />
                  <h3 className="text-lg font-bold">Datasets</h3>
                </div>
                <div className="space-y-3">
                  {trendingDatasets.map((dataset, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{dataset.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {dataset.size} · {dataset.downloads} downloads
                            </p>
                          </div>
                          <TrendingUp className="size-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Link href="/datasets">
                  <Button variant="link" className="mt-3 md:mt-4 text-primary">
                    Browse 200k+ datasets →
                  </Button>
                </Link>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Boxes className="size-5 text-primary" />
                  <h3 className="text-lg font-bold">Spaces</h3>
                </div>
                <Card className="h-[200px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-center p-6">
                    <Boxes className="size-12 text-primary mx-auto mb-4" />
                    <p className="text-sm font-medium mb-2">Create ML-powered apps</p>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Explore Spaces
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Home of Machine Learning</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create, discover, and collaborate on ML better.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={feature.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                      <CardContent className="p-4 md:p-6">
                        <div className="size-10 md:size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="bg-primary text-primary-foreground mb-4">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by AI Leaders</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what industry experts are saying about Adal
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-5 md:p-6">
                      <Quote className="size-8 text-primary/20 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="size-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-muted-foreground">Powering AI innovation at the world's leading organizations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {sponsors.map((sponsor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300"
                >
                  <SponsorLogo3D name={sponsor.name} color={sponsor.color} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
            >
              <Badge className="bg-primary text-primary-foreground">Join the Community</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Accelerate your ML journey</h2>
              <p className="text-lg text-muted-foreground">
                We provide gold Compute and Enterprise solutions for teams and organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  Getting Started
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* AI Assistant - Floating Chat Widget */}
      <AIAssistant />
    </div>
  )
}