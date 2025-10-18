"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AdalLogo3D } from "@/components/adal-logo-3d"
import axios from "axios"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm Adal AI Assistant. I can help you explore models, datasets, and answer questions about the platform. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await axios.post("/api/claude", {
        messages: [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })

      if (response.data.error) {
        throw new Error(response.data.error)
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response || "I couldn't generate a response.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("Error details:", error.response?.data || error.message || error)
      
      let errorMessage = "Sorry, I encountered an error. "
      
      if (error.response?.data?.details) {
        errorMessage += `Details: ${error.response.data.details}`
      } else if (error.message) {
        errorMessage += `${error.message}`
      } else {
        errorMessage += "Please try again."
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    "What models are trending?",
    "How do I create a Space?",
    "Tell me about datasets",
    "What is Adal?",
  ]

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 w-[380px] sm:w-[400px]"
          >
            <Card className="shadow-2xl border-2">
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Adal AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Powered by Claude</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="size-8"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="size-4 animate-spin" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {messages.length === 1 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">Quick questions:</p>
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3 text-xs"
                        onClick={() => {
                          setInput(question)
                          setTimeout(() => handleSend(), 100)
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI responses may contain errors. Verify important info.
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="size-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl transition-all"
        >
          {isOpen ? (
            <X className="size-6" />
          ) : (
            <div className="relative">
              <AdalLogo3D className="size-6" />
              <span className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
          )}
        </Button>
      </motion.div>
    </>
  )
}