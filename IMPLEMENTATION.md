# Implementation Summary: ACT Practice Flow

## Files Changed & Why

### 1. **lib/aiGateway.ts** (NEW)
- **Purpose**: Centralized Gateway client replacing hardcoded URLs
- **Key Features**:
  - Reads `NEXT_PUBLIC_AI_GATEWAY_URL` env var (required at runtime)
  - Implements 20s timeout via `AbortController`
  - Robust error handling: includes HTTP status and `trace_id` in `GatewayError`
  - Follows documented Gateway contract: `POST /chat` with ACT exam, section, and message history
  - Function signature `sendChatMessage(section, userMessage, history)` appends user message internally (Approach A)
  - Logs actionable errors to console with endpoint, status, and trace_id

### 2. **app/practice/page.tsx** (NEW)
- **Purpose**: Exam selection page
- **Features**:
  - SAT option: disabled button with "Coming soon" label
  - ACT option: clickable card leading to `/practice/act`
  - Reuses existing Button and styling (primary color, card layout, responsive grid)
  - Navigation back to home

### 3. **app/practice/act/page.tsx** (NEW)
- **Purpose**: ACT section selection
- **Features**:
  - Four section buttons: English, Math, Reading, Science
  - Each links to `/practice/act/[section]`
  - Uses existing Button component and styling (primary bg, hover states)
  - Navigation breadcrumb back to practice page

### 4. **app/practice/act/[section]/page.tsx** (NEW)
- **Purpose**: Dynamic practice page with chat UI
- **Features**:
  - On page load: calls `sendChatMessage(section, "Start ACT practice...", [])` to get first question
  - Chat interface with:
    - Message history (user on right, assistant on left)
    - Real-time scrolling to latest message
    - Loading indicator (spinner for initial load, bounce dots for follow-up messages)
    - Error display with trace_id (if available)
  - Form input for user messages
  - Maintains conversation history; appends user message, sends to Gateway
  - Error handling: displays friendly message + trace_id + "Try Again" button
  - Reuses existing Button, input, and card styling

### 5. **components/cta.tsx** (MODIFIED)
- **Change**: Updated "Start Practicing" button link from `/access` to `/practice`
- **Why**: Routes users into the new exam/section selection flow

## How to Run Locally

### Prerequisites
- Node.js 18+
- AI Gateway running on `http://localhost:8000`

### Installation & Setup

```bash
cd sct_act_frontend
npm install
```

### Environment Variables

Create or update your `.env.local` file:

```
NEXT_PUBLIC_AI_GATEWAY_URL=http://localhost:8000
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Test: Complete Flow

### Test Path
1. **Home page**: Click "Start Practicing" button
   - ✓ Navigates to `/practice`

2. **Exam Selection** (`/practice`):
   - ✓ SAT button is visible but disabled with "Coming Soon"
   - ✓ ACT button is clickable with primary styling

3. **ACT Section Selection** (`/practice/act`):
   - ✓ Four section buttons visible: English, Math, Reading, Science
   - ✓ Each is clickable

4. **Practice Section** (`/practice/act/[section]`):
   - ✓ Page loads with spinner
   - ✓ First question appears (from Gateway)
   - ✓ Chat messages display correctly (assistant on left, user on right)

5. **Chat Interaction**:
   - ✓ Type a response in input field
   - ✓ Click "Send" button
   - ✓ User message appears in chat (right side)
   - ✓ Loading indicator appears
   - ✓ Assistant response appears (left side)
   - ✓ Can continue conversation

6. **Error Handling**:
   - Stop Gateway to test error display
   - ✓ Error message appears with status
   - ✓ Trace ID displayed (if present)
   - ✓ "Try Again" button available

7. **Navigation**:
   - ✓ "Back to Section Selection" link returns to `/practice/act`
   - ✓ "Back to Exam Selection" link returns to `/practice`

## Contract Assumptions & Confirmation

### Gateway Chat Endpoint Contract (Source of Truth)
```
POST {NEXT_PUBLIC_AI_GATEWAY_URL}/chat

Request:
{
  "project": "yournextsteps",
  "mode": "practice",
  "exam": "ACT",
  "section": "English" | "Math" | "Reading" | "Science",
  "messages": [
    {"role": "system|user|assistant", "content": string},
    ...
  ],
  "options": { "stream": boolean, "temperature": number } (optional)
}

Response:
{
  "trace_id": string,
  "message": {
    "role": "assistant",
    "content": string
  },
  "provider": string,
  "model": string
}
```

### Implementation Decisions
- **Message History Approach**: Used Approach A (function appends user message internally)
  - `sendChatMessage(section, userMessage, history)` 
  - `history` parameter does NOT include the new user message
  - Function constructs full `messages` array for the request
  - Cleaner UI code; fewer duplicate messages

- **Timeout**: 20 seconds via `AbortController` (standard practice for web APIs)

- **Error Handling**: 
  - Non-OK responses throw `GatewayError` with status and trace_id
  - Network errors caught and converted to GatewayError
  - Timeout errors result in 408 status with friendly message
  - All errors logged to console with endpoint context

- **No New Dependencies**: Used built-in `AbortController`, `fetch`, React hooks

## Files Not Modified
- `lib/api-client.ts`: Kept separate (handles auth/session APIs, not chat)
- `app/layout.tsx`: No changes needed
- `app/globals.css`: No new styles needed (reused existing)
- `package.json`: No new dependencies

## Testing Notes
- Initial load spinner ensures Gateway response renders before chat is interactive
- Conversation history preserved in state (ephemeral; lost on page reload)
- Section name normalized (URL param lowercase → capitalized for Gateway)
- Error state clears on retry, allowing fresh attempt
- All styling matches existing site (primary color, card borders, spacing)
