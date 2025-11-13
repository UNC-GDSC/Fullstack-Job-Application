# Job Application Portal

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

A modern, production-ready job application platform built with the MERN stack (MongoDB, Express, React, Node.js).

[Features](#features) • [Tech Stack](#technology-stack) • [Quick Start](#quick-start) • [API Docs](docs/API.md) • [Contributing](CONTRIBUTING.md)

</div>

---

## Overview

This is a fully customizable, enterprise-grade job application platform that provides a complete solution for managing job postings and candidate applications. Built with modern technologies and best practices, it's ready for production deployment while remaining easy to customize for your specific needs.

### Key Highlights

- **Full-Stack Solution:** Complete backend API and responsive frontend
- **Production-Ready:** Security hardening, rate limiting, input validation, and comprehensive error handling
- **Highly Customizable:** Easy branding and feature configuration via environment variables
- **Docker Support:** Containerized deployment with Docker Compose
- **API-First Design:** RESTful API with comprehensive documentation
- **Modern UI:** Built with Material UI for a polished, responsive experience
- **Developer-Friendly:** ESLint, Prettier, testing setup, and detailed documentation

---

## Features

### Core Functionality

- **Job Management**
  - Create, read, update, and delete job postings
  - Filter jobs by type and department
  - Pagination support for large datasets
  - Search and advanced filtering

- **Application Management**
  - Submit applications with resume links and cover letters
  - View and manage candidate applications
  - Application filtering by job
  - Email validation and URL verification

### Technical Features

- **Security**
  - Helmet.js for HTTP header security
  - CORS with configurable origins
  - Rate limiting (100 requests per 15 minutes)
  - MongoDB injection protection
  - Input validation and sanitization
  - Request size limits

- **Developer Experience**
  - Comprehensive API documentation
  - Jest and React Testing Library setup
  - ESLint and Prettier configuration
  - Hot reload in development
  - Docker and Docker Compose support
  - Sample test files included

- **Production Features**
  - Environment-based configuration
  - Request logging with Morgan
  - Graceful error handling
  - Health check endpoints
  - CI/CD pipeline with GitHub Actions
  - Graceful shutdown handling

---

## Technology Stack

### Backend
- **Runtime:** Node.js 20.x
- **Framework:** Express 4.x
- **Database:** MongoDB 7.x with Mongoose ODM
- **Security:** Helmet, CORS, express-rate-limit, express-mongo-sanitize
- **Validation:** express-validator
- **Logging:** Morgan
- **Testing:** Jest, Supertest

### Frontend
- **Framework:** React 18.x
- **UI Library:** Material UI 5.x
- **HTTP Client:** Axios
- **Build Tool:** Create React App
- **Testing:** Jest, React Testing Library

### DevOps
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

---

## Directory Structure

```
Fullstack-Job-Application/
├── backend/                  # Node.js backend
│   ├── config/              # Database configuration
│   │   └── db.js
│   ├── models/              # Mongoose models
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/              # API routes
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── __tests__/           # Backend tests
│   ├── .env.example         # Environment variables template
│   ├── Dockerfile           # Backend Docker configuration
│   ├── jest.config.js       # Jest configuration
│   ├── package.json
│   └── server.js            # Express server entry point
├── frontend/                # React frontend
│   ├── public/              # Static files
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── JobList.js
│   │   │   ├── JobForm.js
│   │   │   └── ApplicationForm.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.js
│   │   ├── config.js        # Frontend configuration
│   │   └── index.js
│   ├── .env.example         # Environment variables template
│   ├── Dockerfile           # Frontend Docker configuration
│   └── package.json
├── docs/                    # Documentation
│   └── API.md              # API documentation
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── docker-compose.yml       # Docker Compose configuration
├── package.json            # Root package.json for scripts
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **Docker** (optional, for containerized deployment)

### Option 1: Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/UNC-GDSC/Fullstack-Job-Application.git
cd Fullstack-Job-Application
```

#### 2. Install All Dependencies

```bash
npm run install:all
```

#### 3. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

**Backend Environment Variables:**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/job_applications_db
COMPANY_NAME=Your Company Name
COMPANY_LOGO_URL=https://example.com/logo.png
ALLOWED_ORIGINS=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### 4. Frontend Setup

In a new terminal:

```bash
cd frontend
cp .env.example .env
# Edit .env if needed
npm start
```

**Frontend Environment Variables:**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_COMPANY_NAME=Your Company Name
REACT_APP_COMPANY_LOGO_URL=https://example.com/logo.png
```

#### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

### Option 2: Docker Deployment

```bash
# Start all services (MongoDB, Backend, Frontend)
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

**Access after Docker deployment:**
- **Frontend:** http://localhost
- **Backend API:** http://localhost:5000

---

## Development

### Running Tests

```bash
# Run all tests
npm test

# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend

# Frontend tests with coverage
cd frontend && npm run test:coverage
```

### Code Quality

```bash
# Format all code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Available Scripts

From the root directory:

- `npm run install:all` - Install all dependencies
- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:backend` - Run backend only
- `npm run dev:frontend` - Run frontend only
- `npm test` - Run all tests
- `npm run lint` - Lint all code
- `npm run format` - Format all code
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers

---

## API Documentation

Comprehensive API documentation is available in [docs/API.md](docs/API.md).

### Quick API Reference

#### Jobs Endpoints

- `GET /api/jobs` - Get all jobs (with pagination and filtering)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

#### Applications Endpoints

- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get single application
- `POST /api/applications` - Submit application
- `DELETE /api/applications/:id` - Delete application

#### Health Check

- `GET /api/health` - API health status

---

## Customization

### Branding

Update environment variables in `.env` files:

**Backend (`backend/.env`):**
```env
COMPANY_NAME=Acme Corporation
COMPANY_LOGO_URL=https://acme.com/logo.png
```

**Frontend (`frontend/.env`):**
```env
REACT_APP_COMPANY_NAME=Acme Corporation
REACT_APP_COMPANY_LOGO_URL=https://acme.com/logo.png
```

### UI Customization

- Modify components in `frontend/src/components/`
- Update Material UI theme in `frontend/src/App.js`
- Adjust styles in `frontend/src/styles/main.css`

### Backend Customization

- Extend models in `backend/models/`
- Add new routes in `backend/routes/`
- Modify validation rules in route files
- Add middleware in `backend/server.js`

---

## Deployment

### Environment Setup

1. Set `NODE_ENV=production` in backend `.env`
2. Configure production MongoDB URI
3. Set proper CORS origins
4. Configure secure secrets

### Deployment Options

- **Heroku:** Deploy backend and frontend separately
- **Vercel/Netlify:** Frontend static hosting
- **AWS/Azure/GCP:** Full-stack deployment with managed MongoDB
- **Docker:** Use provided Docker Compose configuration
- **VPS:** Deploy using PM2 or similar process manager

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Testing

### Backend Tests

```bash
cd backend
npm test                 # Run tests
npm run test:watch      # Watch mode
```

### Frontend Tests

```bash
cd frontend
npm test                # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Generate coverage report
```

---

## Security

- Input validation on all endpoints
- Rate limiting to prevent abuse
- MongoDB injection protection
- Helmet.js for security headers
- CORS configuration
- Environment variable protection

**Note:** This application should have authentication/authorization implemented before production use.

---

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- For MongoDB Atlas, whitelist your IP

### Port Conflicts

- Change `PORT` in backend `.env`
- Update frontend API URL accordingly

### Docker Issues

```bash
# Restart containers
npm run docker:down
npm run docker:up

# View logs
npm run docker:logs

# Rebuild containers
docker-compose up --build
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Authors

Created and maintained by the **UNC-Chapel Hill Google Developer Student Club (GDSC)** team.

- **Organization:** [UNC GDSC](https://github.com/UNC-GDSC)
- **Website:** [GDSC UNC](https://gdsc.community.dev/university-of-north-carolina-at-chapel-hill/)

---

## Acknowledgments

- Material UI for the component library
- MongoDB for the database solution
- The open-source community for various packages and tools

---

## Support

- **Issues:** [GitHub Issues](https://github.com/UNC-GDSC/Fullstack-Job-Application/issues)
- **Documentation:** [API Docs](docs/API.md) | [Contributing Guide](CONTRIBUTING.md)
- **Community:** Join our GDSC community

---

<div align="center">

Made with ❤️ by UNC GDSC

[⬆ back to top](#job-application-portal)

</div>
