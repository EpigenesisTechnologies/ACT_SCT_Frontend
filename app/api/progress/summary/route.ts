import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.headers.get("X-Session-Id")

    if (!sessionId) {
      return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 })
    }

    const response = await fetch(`${API_BASE_URL}/progress/summary?session_id=${encodeURIComponent(sessionId)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[v0] summary error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
