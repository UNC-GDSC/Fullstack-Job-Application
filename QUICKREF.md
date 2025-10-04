# Quick Reference - Hiring Pipeline Feature

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
# Configure .env with MongoDB URI and optional SMTP
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📋 Key API Endpoints

### Get Applications (with filters)
```bash
GET /api/applications?jobId=XXX&stage=phone_screen&minRating=4
```

### Update Application Status
```bash
PATCH /api/applications/:id/status
Body: { "to": "phone_screen", "note": "Moving forward" }
```

### Update Scorecard
```bash
PATCH /api/applications/:id/scorecard
Body: {
  "rating": 4,
  "competencies": [...],
  "summary": "Great candidate"
}
```

## 🎯 Main Features

### 1. Kanban Pipeline Board
- **Location**: Click "Pipeline" on any job
- **Features**: 
  - 6 customizable stage columns
  - Drag-and-drop between stages
  - Real-time search
  - Application count per stage

### 2. Scorecards
- **Location**: Click card → Scorecard tab
- **Features**:
  - Overall rating (1-5 stars)
  - 4 competencies with individual ratings
  - Free-text summary
  - Auto-saved timestamps

### 3. Timeline
- **Location**: Click card → Timeline tab
- **Features**:
  - Complete stage history
  - Timestamps for each transition
  - Optional notes per transition

### 4. Email Notifications
- **Setup**: Configure SMTP in `.env`
- **Triggers**: Stage changes with enabled templates
- **Variables**: `{{candidateName}}`, `{{jobTitle}}`

## 🔧 Configuration

### SMTP Email (Optional)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Pipeline Stages (Default)
```javascript
['applied', 'phone_screen', 'onsite', 'offer', 'hired', 'rejected']
```

### Default Competencies
```javascript
['Communication', 'Problem-Solving', 'Technical Skills', 'Culture Fit']
```

## 📁 New Files Created

### Backend
- `backend/models/Application.js` - Extended with status, scorecard, history
- `backend/models/Job.js` - Extended with stages, email templates
- `backend/routes/applications.js` - New endpoints
- `backend/utils/email.js` - Email service
- `backend/.env.example` - Configuration template

### Frontend
- `frontend/src/components/PipelineBoard.js` - Main board
- `frontend/src/components/ApplicationCard.js` - Draggable cards
- `frontend/src/components/ApplicationDetailDialog.js` - Detail view
- `frontend/src/components/ScorecardForm.js` - Rating form
- `frontend/src/components/TimelineList.js` - History view
- `frontend/src/components/DroppableStage.js` - Column wrapper

### Documentation
- `README.md` - Updated with new features
- `TESTING.md` - Comprehensive testing guide
- `IMPLEMENTATION.md` - Implementation details
- `ARCHITECTURE.md` - System architecture
- `QUICKREF.md` - This file

## 🎨 UI Components

### Pipeline Board Layout
```
┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Applied │ Phone   │ Onsite  │ Offer   │ Hired   │Rejected │
│   (3)   │Screen(2)│   (1)   │   (0)   │   (1)   │   (0)   │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ [Card1] │ [Card3] │ [Card6] │         │ [Card7] │         │
│ [Card2] │ [Card4] │         │         │         │         │
│ [Card5] │         │         │         │         │         │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

### Application Card
```
┌──────────────────────────┐
│ John Doe                 │
│ john@example.com         │
│ ★★★★☆ (4.0)             │
│ [Resume]                 │
└──────────────────────────┘
```

### Detail Dialog Tabs
```
┌─────────────────────────────────────────┐
│ John Doe - PHONE_SCREEN                 │
├─────────────────────────────────────────┤
│ [Overview] [Scorecard] [Timeline]       │
├─────────────────────────────────────────┤
│                                         │
│ Tab Content Here                        │
│                                         │
└─────────────────────────────────────────┘
```

## 🔍 Search & Filter

### Search Box
Filters by:
- Candidate name (case-insensitive)
- Email address (case-insensitive)

### API Filters
- `jobId` - Filter by job ID
- `stage` - Filter by current status
- `q` - Text search in name/cover letter
- `minRating` - Minimum scorecard rating (1-5)

## 🧪 Testing Checklist

### Backend
- [ ] Create application with default 'applied' status
- [ ] Update status and verify stage history
- [ ] Save scorecard and retrieve it
- [ ] Filter applications by various criteria
- [ ] Send test email (if SMTP configured)

### Frontend
- [ ] View pipeline board for a job
- [ ] Drag card between columns
- [ ] Search for candidates
- [ ] Open application detail dialog
- [ ] Fill and save scorecard
- [ ] View timeline history

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify .env file exists with MONGO_URI
- Check port 5000 is available

### Emails not sending
- Verify SMTP credentials in .env
- Check email template is enabled in job
- Review backend logs for errors

### Drag-and-drop not working
- Clear browser cache
- Check browser console for errors
- Verify backend API is accessible
- Try different browser

### Build errors
- Delete node_modules and package-lock.json
- Run `npm install` again
- Check Node.js version (v14+ required)

## 📊 Data Models

### Application Status
```javascript
enum: ['applied', 'phone_screen', 'onsite', 'offer', 'hired', 'rejected']
default: 'applied'
```

### Scorecard Structure
```javascript
{
  rating: Number (1-5),
  competencies: [{
    key: String,
    rating: Number (1-5),
    notes: String
  }],
  summary: String,
  updatedAt: Date
}
```

### Stage History Entry
```javascript
{
  from: String,
  to: String,
  changedAt: Date,
  note: String
}
```

## 🎯 Acceptance Criteria (from issue)

All met! ✅

- [x] Drag candidate card → updates status, adds history, UI refreshes
- [x] Scorecard saves and persists with metadata
- [x] Pipeline filters by stage and text search
- [x] Email sent when template enabled and stage changes
- [x] All endpoints documented with proper HTTP codes

## 📚 Learn More

- See `TESTING.md` for detailed testing instructions
- See `IMPLEMENTATION.md` for implementation details
- See `ARCHITECTURE.md` for system architecture
- See `README.md` for complete documentation

## 🙋 Need Help?

Common commands:
```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Start development
cd backend && npm run dev
cd frontend && npm start

# Build frontend
cd frontend && npm run build

# Test backend syntax
cd backend && node -c server.js
```

For issues, check:
1. MongoDB is running
2. .env file is configured
3. Dependencies are installed
4. Ports 5000 and 3000 are available
5. Browser console for errors
