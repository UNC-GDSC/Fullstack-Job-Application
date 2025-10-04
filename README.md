# Job Application Portal

This is a fully customizable, production‑ready job application platform built for companies that need an alternative to enterprise systems. The platform includes:

- **Backend:** Node.js, Express, MongoDB (Mongoose) with endpoints to manage job postings and candidate applications.
- **Frontend:** A React application styled with Material UI (MUI) for a modern, responsive design.
- **High Customizability:** Easily change branding (company name, logo, etc.) via environment variables and configuration files; adjust UI components and backend logic as needed.
- **Security & Best Practices:** Uses Helmet for security headers, CORS for cross-origin support, and environment variables to protect sensitive data.

---

## Features

- **Job Postings:** Create, update, delete, and list job postings.
- **Candidate Applications:** Submit applications with resume URLs and cover letters.
- **Hiring Pipeline:** Move candidates through customizable stages using a drag-and-drop Kanban board.
- **Scorecards:** Structured feedback with ratings and competency evaluations for each candidate.
- **Stage Timeline:** Track candidate progression through different stages with timestamps and notes.
- **Email Notifications:** Automated email notifications on stage changes (configurable via templates).
- **Search & Filter:** Search candidates by name/email and filter by stage or rating.
- **Customizable UI & Backend:** Modify company branding and functionality with ease.
- **Modern, Responsive Design:** Built with Material UI to ensure a polished look across devices.
- **Security:** Implements Helmet and CORS for added security.

---

## Technology Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, dotenv, helmet, cors.
- **Frontend:** React, Material UI (MUI), @mui/lab, @dnd-kit, Axios.
- **Database:** MongoDB

---

## Directory Structure

```
job-application-app/
├── backend/
│   ├── package.json
│   ├── .env
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Job.js
│   │   └── Application.js
│   └── routes/
│       ├── jobs.js
│       └── applications.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── config.js
│       ├── components/
│       │   ├── Header.js
│       │   ├── Footer.js
│       │   ├── JobList.js
│       │   ├── JobForm.js
│       │   ├── ApplicationForm.js
│       │   ├── PipelineBoard.js
│       │   ├── ApplicationCard.js
│       │   ├── ApplicationDetailDialog.js
│       │   ├── ScorecardForm.js
│       │   ├── TimelineList.js
│       │   └── DroppableStage.js
│       └── styles/
│           └── main.css
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local instance or hosted)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the backend directory with the following content (adjust as needed):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/job_applications_db
   COMPANY_NAME=YourCompanyName
   COMPANY_LOGO_URL=https://example.com/logo.png
   
   # Optional: SMTP Configuration for Email Notifications
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
   
   See `backend/.env.example` for a complete example.

4. **Start the backend server:**
  - For development:
    ```bash
    npm run dev
    ```
  - For production:
    ```bash
    npm start
    ```

5. **API Endpoints:**
  - Health Check: `GET http://localhost:5000/api/health`
  - Jobs: `http://localhost:5000/api/jobs`
  - Applications: `http://localhost:5000/api/applications`

---

## API Documentation

### Jobs

- **GET /api/jobs** - Get all jobs
- **GET /api/jobs/:id** - Get a single job by ID
- **POST /api/jobs** - Create a new job
  - Body: `{ title, description, location, type, department }`
- **PUT /api/jobs/:id** - Update a job
- **DELETE /api/jobs/:id** - Delete a job

### Applications

- **GET /api/applications** - Get all applications (with optional filters)
  - Query params: `jobId`, `stage`, `q` (search), `minRating`
- **GET /api/applications/:id** - Get a single application by ID
- **POST /api/applications** - Create a new application
  - Body: `{ job, candidateName, candidateEmail, resumeUrl, coverLetter }`
- **PATCH /api/applications/:id/status** - Update application stage
  - Body: `{ to, note? }`
  - Returns: Application with email notification status
- **PATCH /api/applications/:id/scorecard** - Update application scorecard
  - Body: `{ rating, competencies[], summary }`

### Pipeline Stages

Default stages (customizable per job):
- `applied` - Initial application received
- `phone_screen` - Phone screening scheduled/completed
- `onsite` - Onsite interview scheduled/completed
- `offer` - Offer extended
- `hired` - Candidate accepted offer
- `rejected` - Application rejected

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Customize settings:**  
   Open `src/config.js` and update:
  - `backendUrl` (if different)
  - `companyName`
  - `companyLogoUrl`

4. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The application will run at [http://localhost:3000](http://localhost:3000).

---

## Production Build

### Backend

- Ensure your environment variables are set correctly and run:
  ```bash
  npm start
  ```

### Frontend

1. **Build the React app:**
   ```bash
   npm run build
   ```
2. **Deploy:**  
   Serve the contents of the `build` folder using your preferred hosting solution, or integrate with your backend server.

---

## Customization

- **Branding:**  
  Update the company name and logo in `backend/.env` and `frontend/src/config.js`.

- **UI Customization:**  
  Modify Material UI components in `frontend/src/components/` and adjust global styles in `frontend/src/styles/main.css` as needed.

- **Backend Customization:**  
  Adjust models in `backend/models/` and API routes in `backend/routes/` to extend functionality or add new features.

---

## Contributing

Feel free to fork the repository and submit pull requests with improvements or customizations. For any issues or feature requests, please open an issue on the repository.

---

## License

This project is licensed under the MIT License.

---

## Authors

The UNC-Chapel Hill's Google Developer Student Club (GDSC) team is behind this project. For more information, visit [GDSC UNC GitHub Page](https://github.com/UNC-GDSC).

---
