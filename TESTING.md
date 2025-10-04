# Hiring Pipeline Feature - Testing Guide

## Overview

This document provides instructions for testing the new hiring pipeline feature, including the Kanban board, scorecards, timeline, and email notifications.

## Prerequisites

- MongoDB running locally or remotely
- Backend server running on port 5000
- Frontend development server running on port 3000

## Backend Testing

### 1. Test Application Creation

```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "job": "YOUR_JOB_ID",
    "candidateName": "John Doe",
    "candidateEmail": "john@example.com",
    "resumeUrl": "https://example.com/resume.pdf",
    "coverLetter": "I am excited to apply..."
  }'
```

### 2. Test Status Update

```bash
curl -X PATCH http://localhost:5000/api/applications/YOUR_APP_ID/status \
  -H "Content-Type: application/json" \
  -d '{
    "to": "phone_screen",
    "note": "Moving to phone screen stage"
  }'
```

### 3. Test Scorecard Update

```bash
curl -X PATCH http://localhost:5000/api/applications/YOUR_APP_ID/scorecard \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "competencies": [
      {
        "key": "Communication",
        "rating": 5,
        "notes": "Excellent communication skills"
      },
      {
        "key": "Technical Skills",
        "rating": 4,
        "notes": "Strong technical background"
      }
    ],
    "summary": "Great candidate overall"
  }'
```

### 4. Test Filtering

```bash
# Filter by job
curl http://localhost:5000/api/applications?jobId=YOUR_JOB_ID

# Filter by stage
curl http://localhost:5000/api/applications?stage=phone_screen

# Search by name/email
curl http://localhost:5000/api/applications?q=john

# Filter by minimum rating
curl http://localhost:5000/api/applications?minRating=4
```

## Frontend Testing

### 1. Access Pipeline Board

1. Navigate to the job listings page
2. Click "Pipeline" button on any job card
3. Verify the Kanban board displays with 6 default columns:
   - Applied
   - Phone Screen
   - Onsite
   - Offer
   - Hired
   - Rejected

### 2. Test Drag and Drop

1. Create a few test applications for a job
2. Open the pipeline board for that job
3. Drag an application card from one column to another
4. Verify the card moves to the new column
5. Verify the stage history is updated (check in the timeline tab)

### 3. Test Search Functionality

1. Enter a candidate name or email in the search box
2. Verify only matching applications are displayed
3. Clear the search to show all applications again

### 4. Test Application Detail Dialog

1. Click on any application card
2. Verify the dialog opens with three tabs:
   - Overview: Shows candidate details and cover letter
   - Scorecard: Shows rating and competency form
   - Timeline: Shows stage history

### 5. Test Scorecard

1. In the application detail dialog, go to the Scorecard tab
2. Set an overall rating (1-5 stars)
3. Rate each competency and add notes
4. Add an overall summary
5. Click "Save Scorecard"
6. Verify the scorecard is saved and displayed in the Overview tab

### 6. Test Timeline

1. Move an application through multiple stages
2. Open the application detail dialog
3. Go to the Timeline tab
4. Verify all stage transitions are listed with timestamps

## Email Notifications Testing

### 1. Configure SMTP

1. Edit `backend/.env` and add SMTP credentials:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

2. Restart the backend server

### 2. Configure Email Templates

Currently, email templates need to be configured directly in the database. You can add email templates to a job document:

```javascript
{
  emailTemplates: {
    phone_screen: {
      subject: "Interview Invitation - {{jobTitle}}",
      body: "Dear {{candidateName}},\n\nWe would like to invite you for a phone interview...",
      enabled: true
    }
  }
}
```

### 3. Test Email Sending

1. Move an application to a stage with an enabled email template
2. Check the response for `emailSent: true`
3. Verify the candidate receives the email

## Expected Results

### Successful Backend Tests

- ✓ Applications can be created with default 'applied' status
- ✓ Status can be updated to any valid stage
- ✓ Stage history is recorded with each status change
- ✓ Scorecards can be saved and retrieved
- ✓ Filtering works for all query parameters
- ✓ Email notifications are sent when configured

### Successful Frontend Tests

- ✓ Pipeline board displays all stages as columns
- ✓ Applications are grouped by their current stage
- ✓ Drag and drop updates application status
- ✓ Search filters applications in real-time
- ✓ Application detail dialog shows all information
- ✓ Scorecard can be edited and saved
- ✓ Timeline shows complete stage history

## Troubleshooting

### Backend Issues

**MongoDB Connection Errors:**
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify network connectivity

**Email Not Sending:**
- Check SMTP credentials in .env
- Verify email template is enabled in database
- Check application logs for errors

### Frontend Issues

**Drag and Drop Not Working:**
- Clear browser cache
- Check browser console for errors
- Verify backend API is accessible

**Components Not Rendering:**
- Check that all dependencies are installed
- Verify Material-UI and dnd-kit versions
- Check browser console for errors

## Clean Up

After testing, you can:

1. Delete test applications via the API or database
2. Reset job stages to defaults if modified
3. Disable email notifications if not needed

## Notes

- The email notification feature requires proper SMTP configuration
- Stage transitions are recorded with timestamps but not user attribution (as there's no auth system yet)
- The default competencies in scorecards are: Communication, Problem-Solving, Technical Skills, Culture Fit
- Custom competencies can be added by modifying the ScorecardForm component
