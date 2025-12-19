const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface RequestCodeResponse {
  success: boolean
  message: string
}

export interface VerifyCodeResponse {
  success: boolean
  student_id: string
  current_step: "intake" | "in_session" | "summary"
  section: "math" | "rw" | null
}

export interface SessionStartResponse {
  session_id: string
  section: "math" | "rw"
  total_questions: number
  time_limit_seconds: number
}

export interface QuestionData {
  question_id: string
  question_text: string
  question_type: "multiple_choice" | "grid"
  options?: string[]
  image_url?: string
}

export interface SessionQuestionResponse {
  success: boolean
  question: QuestionData
  remaining_time: number
  questions_completed: number
}

export interface SubmitAnswerResponse {
  success: boolean
  is_correct: boolean
  correct_answer?: string
  explanation: string
  micro_lesson_url?: string
  next_question?: QuestionData
  remaining_time: number
  session_complete?: boolean
}

export interface SummaryResponse {
  success: boolean
  session_id: string
  section: "math" | "rw"
  total_questions: number
  correct_answers: number
  skill_level: number
  skill_gaps: string[]
  recommendations: string[]
}

// Auth API calls
export async function requestAccessCode(email: string): Promise<RequestCodeResponse> {
  const res = await fetch("/api/auth/request-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    throw new Error("Failed to request access code")
  }

  return res.json()
}

export async function verifyAccessCode(code: string, email?: string): Promise<VerifyCodeResponse> {
  const res = await fetch("/api/auth/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, email }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Invalid or expired code")
  }

  return res.json()
}

// Session API calls
export async function startSession(section: "math" | "rw"): Promise<SessionStartResponse> {
  const studentId = localStorage.getItem("student_id")
  const accessCode = localStorage.getItem("access_code")

  const res = await fetch("/api/session/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
      access_code: accessCode,
      section,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to start session")
  }

  return res.json()
}

export async function getNextQuestion(sessionId: string): Promise<SessionQuestionResponse> {
  const res = await fetch("/api/session/next-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
  })

  if (!res.ok) {
    throw new Error("Failed to get next question")
  }

  return res.json()
}

export async function submitAnswer(
  sessionId: string,
  questionId: string,
  answer: string,
): Promise<SubmitAnswerResponse> {
  const res = await fetch("/api/session/submit-answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      question_id: questionId,
      answer,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to submit answer")
  }

  return res.json()
}

export async function getSummary(sessionId: string): Promise<SummaryResponse> {
  const res = await fetch("/api/progress/summary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Id": sessionId,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to get summary")
  }

  return res.json()
}
