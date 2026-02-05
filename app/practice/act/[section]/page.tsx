"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { sendChatMessage, Message, GatewayError } from "@/lib/aiGateway"

export default function PracticeSectionPage() {
  const params = useParams()
  const section = (params.section as string)?.charAt(0).toUpperCase() +
    (params.section as string)?.slice(1) as
    | "English"
    | "Math"
    | "Reading"
    | "Science"

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [traceId, setTraceId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load first question on mount
  useEffect(() => {
    const loadFirstQuestion = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await sendChatMessage(
          section,
          `Start ACT practice. Give me the first question for ${section}.`,
          []
        )
        setMessages([
          {
            role: "assistant",
            content: response.message.content,
          },
        ])
        setTraceId(response.trace_id)
      } catch (err) {
        const gatewayError = err instanceof GatewayError ? err : null
        setError(
          gatewayError
            ? `Error loading question (${gatewayError.status}). Please try again.`
            : "Failed to load question. Please try again."
        )
        if (gatewayError?.traceId) {
          setTraceId(gatewayError.traceId)
        }
        console.error("Error loading first question:", err)
      } finally {
        setLoading(false)
      }
    }

    loadFirstQuestion()
  }, [section])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || loading) return

    const userMessage = inputValue.trim()
    setInputValue("")

    // Add user message to UI
    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ]
    setMessages(updatedMessages)

    try {
      setLoading(true)
      setError(null)

      // Send message with conversation history (excluding the new user message we just added)
      const response = await sendChatMessage(section, userMessage, messages)

      // Add assistant response
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: response.message.content,
        },
      ])
      setTraceId(response.trace_id)
    } catch (err) {
      const gatewayError = err instanceof GatewayError ? err : null
      const errorMsg = gatewayError
        ? `Error (${gatewayError.status}): ${gatewayError.message}`
        : "Failed to get response. Please try again."
      setError(errorMsg)
      if (gatewayError?.traceId) {
        setTraceId(gatewayError.traceId)
      }
      console.error("Error sending message:", err)

      // Remove the user message if we couldn't get a response
      setMessages(messages)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col p-4 py-8">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-screen gap-4">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold text-foreground">{section} Practice</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Work through this section at your own pace
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto border border-border rounded-lg bg-card p-6 space-y-4">
          {loading && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading question...</p>
              </div>
            </div>
          ) : error && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-6 max-w-md text-center space-y-3">
                <p className="text-destructive font-semibold">{error}</p>
                {traceId && (
                  <p className="text-xs text-muted-foreground break-all">
                    Trace ID: {traceId}
                  </p>
                )}
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {loading && messages.length > 0 && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              {error && messages.length > 0 && (
                <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4">
                  <p className="text-destructive text-sm font-semibold">{error}</p>
                  {traceId && (
                    <p className="text-xs text-muted-foreground break-all mt-2">
                      Trace ID: {traceId}
                    </p>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Form */}
        {messages.length > 0 && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer or question..."
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send
            </Button>
          </form>
        )}

        {/* Footer */}
        <div className="text-center">
          <a href="/practice/act">
            <Button variant="link" className="text-muted-foreground">
              Back to Section Selection
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
