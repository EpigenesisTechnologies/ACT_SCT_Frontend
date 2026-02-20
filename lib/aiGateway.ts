/**
 * AI Gateway client for YourNextSteps practice.
 * Calls the AI Gateway (port 8000) via documented contract.
 * Base URL read from NEXT_PUBLIC_AI_GATEWAY_URL env var.
 */

export interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

export interface ChatRequest {
  metadata: {
    app: "yournextsteps"
    task: string
    input: {
      messages: Message[]
      exam: "ACT"
      section: "English" | "Math" | "Reading" | "Science"
      mode: "practice"
    }
  }
}

export interface ChatResponse {
  raw: {
    request_id: string
    task: string
    output: {
      question?: any
    }
    trace: {
      provider: string
      model: string
      latency_ms: number
    }
  }
  trace_id?: string
  message?: {
    role: "assistant"
    content: string
  }
}

export class GatewayError extends Error {
  constructor(
    public status: number,
    public traceId?: string,
    message?: string
  ) {
    super(message || `Gateway error: ${status}`)
    this.name = "GatewayError"
  }
}

/**
 * Send a chat message to the AI Gateway.
 * Maintains conversation history; caller should append user message to history before calling.
 *
 * @param section Section: English, Math, Reading, or Science
 * @param userMessage Latest user message to send
 * @param history Full conversation history (excluding the new user message)
 * @returns Gateway response with assistant message
 * @throws GatewayError on non-OK response (includes status and trace_id if present)
 */
export async function sendChatMessage(
  section: "English" | "Math" | "Reading" | "Science",
  userMessage: string,
  history: Message[] = []
): Promise<ChatResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_AI_GATEWAY_URL
  console.log("[AI Gateway] Base URL:", baseUrl)
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_AI_GATEWAY_URL env var not set. Gateway base URL required."
    )
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 60000) // 60s timeout

  const messages: Message[] = [
    {
      role: "system",
      content:
        "You are an ACT tutor providing practice questions and feedback. Be concise and educational.",
    },
    ...history,
    {
      role: "user",
      content: userMessage,
    },
  ]

  const request: ChatRequest = {
    metadata: {
      app: "yournextsteps",
      task: `practice_act_${section.toLowerCase()}`,
      input: {
        messages,
        exam: "ACT",
        section,
        mode: "practice",
      },
    },
  }

  try {
    console.log("[AI Gateway] Sending request to:", `${baseUrl}/v1/ai/chat`)
    console.log("[AI Gateway] Request body:", JSON.stringify(request, null, 2))
    
    const response = await fetch(`${baseUrl}/v1/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    })

    console.log("[AI Gateway] Response status:", response.status)
    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorBody: { trace_id?: string } = {}
      try {
        errorBody = await response.json()
      } catch {
        // Response not JSON; continue with empty body
      }

      const traceId = errorBody.trace_id
      const error = new GatewayError(
        response.status,
        traceId,
        `Gateway returned ${response.status}`
      )

      // Log for debugging
      console.error(
        `[AI Gateway Error] Status: ${response.status}, TraceID: ${traceId || "N/A"}, Endpoint: POST ${baseUrl}/chat`
      )

      throw error
    }

    const data: ChatResponse = await response.json()
    console.log("[AI Gateway] Full response object:", data)
    
    // Map gateway response to expected format
    const mappedResponse: ChatResponse = {
      ...data,
      trace_id: data.raw?.request_id,
      message: {
        role: "assistant",
        content: JSON.stringify(data.raw?.output?.question || {})
      }
    }
    
    console.log("[AI Gateway] Mapped response:", mappedResponse)
    
    if (!mappedResponse.message?.content) {
      console.error("[AI Gateway] Invalid response - no question data:", JSON.stringify(data, null, 2))
      throw new GatewayError(0, mappedResponse.trace_id, "Invalid response structure from gateway")
    }
    
    return mappedResponse
  } catch (error) {
    console.error("[AI Gateway] Caught error:", error)
    clearTimeout(timeoutId)

    // Re-throw GatewayError
    if (error instanceof GatewayError) {
      throw error
    }

    // Handle abort (timeout)
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[AI Gateway Error] Request timeout (60s)")
      throw new GatewayError(
        408,
        undefined,
        "Request timeout. Gateway took too long to respond."
      )
    }

    // Handle other fetch errors
    console.error("[AI Gateway Error] Fetch failed:", error)
    throw new GatewayError(0, undefined, `Network error: ${String(error)}`)
  }
}
