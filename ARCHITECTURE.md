# Hiring Pipeline Feature - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React + MUI)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                          App.js (Main)                           │  │
│  │  - Job Listings                                                  │  │
│  │  - Job Details                                                   │  │
│  │  - Application Form                                              │  │
│  │  - Pipeline Board (NEW)                                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Pipeline Components (NEW)                     │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌────────────────────┐  ┌────────────────────────────────────┐ │  │
│  │  │  PipelineBoard     │  │  ApplicationDetailDialog          │ │  │
│  │  │  - Kanban Layout   │  │  - Overview Tab                   │ │  │
│  │  │  - Drag & Drop     │  │  - Scorecard Tab (NEW)            │ │  │
│  │  │  - Search Filter   │  │  - Timeline Tab (NEW)             │ │  │
│  │  └────────────────────┘  └────────────────────────────────────┘ │  │
│  │           │                          │                          │  │
│  │           ├──────────────┬───────────┴────────────┬─────────────┤  │
│  │           │              │                        │             │  │
│  │  ┌────────────────┐  ┌───────────────┐  ┌─────────────────┐   │  │
│  │  │ DroppableStage │  │ ScorecardForm │  │  TimelineList   │   │  │
│  │  │ (6 columns)    │  │ - Ratings     │  │  - History      │   │  │
│  │  └────────────────┘  │ - Competencies│  │  - Timestamps   │   │  │
│  │           │          └───────────────┘  └─────────────────┘   │  │
│  │           │                                                    │  │
│  │  ┌────────────────┐                                           │  │
│  │  │ApplicationCard │                                           │  │
│  │  │ - Draggable    │                                           │  │
│  │  │ - Rating Badge │                                           │  │
│  │  └────────────────┘                                           │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/REST
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js + Express)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                       API Routes (Express)                       │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Jobs Routes                  Applications Routes (EXTENDED)    │  │
│  │  ============                 ==============================    │  │
│  │  GET    /api/jobs             GET    /api/applications         │  │
│  │  GET    /api/jobs/:id         GET    /api/applications/:id     │  │
│  │  POST   /api/jobs             POST   /api/applications         │  │
│  │  PUT    /api/jobs/:id         PATCH  /api/applications/:id/    │  │
│  │  DELETE /api/jobs/:id               status (NEW)               │  │
│  │                               PATCH  /api/applications/:id/    │  │
│  │                                     scorecard (NEW)             │  │
│  │                                                                  │  │
│  │  Query Filters (NEW):                                           │  │
│  │  - jobId: Filter by job                                         │  │
│  │  - stage: Filter by current status                             │  │
│  │  - q: Search by name/cover letter                              │  │
│  │  - minRating: Filter by scorecard rating                       │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      Utils & Services (NEW)                      │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Email Service (utils/email.js)                                 │  │
│  │  - Nodemailer integration                                       │  │
│  │  - Template variable replacement                                │  │
│  │  - SMTP configuration                                           │  │
│  │  - Graceful degradation                                         │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     Data Models (Mongoose)                       │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Application Model (EXTENDED)   Job Model (EXTENDED)            │  │
│  │  =========================       ====================            │  │
│  │  - job (ref)                     - title                        │  │
│  │  - candidateName                 - description                  │  │
│  │  - candidateEmail                - location                     │  │
│  │  - resumeUrl                     - type                         │  │
│  │  - coverLetter                   - department                   │  │
│  │  - appliedAt                     - createdAt                    │  │
│  │  - status (NEW)                  - stages[] (NEW)               │  │
│  │  - scorecard (NEW)               - emailTemplates (NEW)         │  │
│  │    - rating                        - phone_screen               │  │
│  │    - competencies[]                - onsite                     │  │
│  │    - summary                       - offer                      │  │
│  │    - updatedAt                     - rejected                   │  │
│  │  - stageHistory[] (NEW)                                         │  │
│  │    - from                                                        │  │
│  │    - to                                                          │  │
│  │    - changedAt                                                   │  │
│  │    - note                                                        │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Mongoose
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                           MongoDB Database                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────┐         ┌──────────────────────────────────┐ │
│  │   Jobs Collection    │         │   Applications Collection        │ │
│  │                      │         │   (with new fields)              │ │
│  └──────────────────────┘         └──────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                      External Services (Optional)                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      SMTP Email Service                          │  │
│  │  (Gmail, SendGrid, Mailgun, etc.)                                │  │
│  │                                                                  │  │
│  │  Triggered when:                                                 │  │
│  │  - Application status changes                                    │  │
│  │  - Email template is configured and enabled                      │  │
│  │  - Candidate has valid email address                             │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════
                            DATA FLOW EXAMPLE
═════════════════════════════════════════════════════════════════════════

1. User drags application card from "Applied" to "Phone Screen"
   ↓
2. Frontend (PipelineBoard) updates local state optimistically
   ↓
3. Frontend sends PATCH /api/applications/:id/status
   Body: { to: "phone_screen", note: "Moving to interview" }
   ↓
4. Backend validates stage against job.stages[]
   ↓
5. Backend updates application.status
   ↓
6. Backend adds entry to application.stageHistory[]
   ↓
7. Backend checks if job.emailTemplates.phone_screen.enabled
   ↓
8. If enabled, backend sends email via Nodemailer
   ↓
9. Backend returns updated application + email status
   ↓
10. Frontend refreshes data to get updated stageHistory
   ↓
11. User can click card to view timeline with new entry


═════════════════════════════════════════════════════════════════════════
                         TECHNOLOGY STACK
═════════════════════════════════════════════════════════════════════════

Backend Dependencies (NEW/UPDATED):
- nodemailer: ^6.9.0          → Email sending

Frontend Dependencies (NEW):
- @mui/lab: latest             → Timeline components
- @mui/icons-material: latest  → Icons for UI
- @dnd-kit/core: latest        → Drag and drop core
- @dnd-kit/sortable: latest    → Sortable items
- @dnd-kit/utilities: latest   → DnD utilities

Existing Dependencies (Used):
- react: ^18.0.0
- @mui/material: latest
- axios: ^0.27.2
- mongoose: ^6.0.12
- express: ^4.17.1
- cors: ^2.8.5
- dotenv: ^10.0.0


═════════════════════════════════════════════════════════════════════════
                         PIPELINE STAGES
═════════════════════════════════════════════════════════════════════════

Default Stages (Customizable per Job):
1. applied        → Initial application received
2. phone_screen   → Phone interview scheduled/completed
3. onsite         → Onsite interview scheduled/completed
4. offer          → Offer extended to candidate
5. hired          → Candidate accepted offer
6. rejected       → Application rejected


═════════════════════════════════════════════════════════════════════════
                      SCORECARD COMPETENCIES
═════════════════════════════════════════════════════════════════════════

Default Competencies (Each rated 1-5):
1. Communication       → Verbal and written communication skills
2. Problem-Solving     → Analytical and critical thinking
3. Technical Skills    → Job-specific technical abilities
4. Culture Fit         → Alignment with company values

Plus:
- Overall Rating (1-5 stars)
- Free-text Summary
- Timestamp tracking
