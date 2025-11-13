# API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents

- [Authentication](#authentication)
- [Jobs API](#jobs-api)
- [Applications API](#applications-api)
- [Health Check](#health-check)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## Authentication

Currently, the API is public. Authentication should be implemented before production deployment.

## Jobs API

### Get All Jobs

Retrieve a paginated list of all job postings with optional filtering.

**Endpoint:** `GET /api/jobs`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | Filter by job type (Full-time, Part-time, Contract, Internship) |
| `department` | string | No | Filter by department |
| `limit` | integer | No | Number of results per page (default: 50) |
| `page` | integer | No | Page number (default: 1) |

**Response:**
```json
{
  "status": "success",
  "results": 10,
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Software Engineer",
      "description": "We are looking for a talented software engineer...",
      "location": "San Francisco, CA",
      "type": "Full-time",
      "department": "Engineering",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Single Job

Retrieve details of a specific job posting.

**Endpoint:** `GET /api/jobs/:id`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | MongoDB ObjectId of the job |

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Software Engineer",
    "description": "We are looking for a talented software engineer...",
    "location": "San Francisco, CA",
    "type": "Full-time",
    "department": "Engineering",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Job not found"
}
```

### Create Job

Create a new job posting.

**Endpoint:** `POST /api/jobs`

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "We are looking for a talented software engineer with 3+ years of experience...",
  "location": "San Francisco, CA",
  "type": "Full-time",
  "department": "Engineering"
}
```

**Validation Rules:**
- `title`: Required, 3-200 characters
- `description`: Required, minimum 10 characters
- `location`: Optional
- `type`: Optional, must be one of: Full-time, Part-time, Contract, Internship
- `department`: Optional

**Response:**
```json
{
  "status": "success",
  "message": "Job created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Software Engineer",
    "description": "We are looking for a talented software engineer...",
    "location": "San Francisco, CA",
    "type": "Full-time",
    "department": "Engineering",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Update Job

Update an existing job posting.

**Endpoint:** `PUT /api/jobs/:id`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | MongoDB ObjectId of the job |

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "description": "Updated description...",
  "location": "Remote",
  "type": "Full-time",
  "department": "Engineering"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Job updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Senior Software Engineer",
    "description": "Updated description...",
    "location": "Remote",
    "type": "Full-time",
    "department": "Engineering",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Delete Job

Delete a job posting.

**Endpoint:** `DELETE /api/jobs/:id`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | MongoDB ObjectId of the job |

**Response:**
```json
{
  "status": "success",
  "message": "Job deleted successfully",
  "data": null
}
```

## Applications API

### Get All Applications

Retrieve a paginated list of all job applications with optional filtering.

**Endpoint:** `GET /api/applications`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job` | string | No | Filter by job ID |
| `limit` | integer | No | Number of results per page (default: 50) |
| `page` | integer | No | Page number (default: 1) |

**Response:**
```json
{
  "status": "success",
  "results": 5,
  "total": 12,
  "page": 1,
  "totalPages": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "job": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Software Engineer",
        "department": "Engineering",
        "location": "San Francisco, CA"
      },
      "candidateName": "John Doe",
      "candidateEmail": "john.doe@example.com",
      "resumeUrl": "https://example.com/resumes/john-doe.pdf",
      "coverLetter": "I am excited to apply...",
      "createdAt": "2024-01-16T14:20:00.000Z"
    }
  ]
}
```

### Get Single Application

Retrieve details of a specific application.

**Endpoint:** `GET /api/applications/:id`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | MongoDB ObjectId of the application |

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "job": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Software Engineer",
      "description": "Full job description...",
      "location": "San Francisco, CA",
      "type": "Full-time",
      "department": "Engineering"
    },
    "candidateName": "John Doe",
    "candidateEmail": "john.doe@example.com",
    "resumeUrl": "https://example.com/resumes/john-doe.pdf",
    "coverLetter": "I am excited to apply...",
    "createdAt": "2024-01-16T14:20:00.000Z"
  }
}
```

### Submit Application

Submit a new job application.

**Endpoint:** `POST /api/applications`

**Request Body:**
```json
{
  "job": "507f1f77bcf86cd799439011",
  "candidateName": "John Doe",
  "candidateEmail": "john.doe@example.com",
  "resumeUrl": "https://example.com/resumes/john-doe.pdf",
  "coverLetter": "I am excited to apply for this position because..."
}
```

**Validation Rules:**
- `job`: Required, valid MongoDB ObjectId
- `candidateName`: Required, 2-100 characters
- `candidateEmail`: Required, valid email address
- `resumeUrl`: Required, valid URL
- `coverLetter`: Optional, maximum 5000 characters

**Response:**
```json
{
  "status": "success",
  "message": "Application submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "job": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Software Engineer",
      "department": "Engineering"
    },
    "candidateName": "John Doe",
    "candidateEmail": "john.doe@example.com",
    "resumeUrl": "https://example.com/resumes/john-doe.pdf",
    "coverLetter": "I am excited to apply...",
    "createdAt": "2024-01-16T14:20:00.000Z"
  }
}
```

### Delete Application

Delete an application.

**Endpoint:** `DELETE /api/applications/:id`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | MongoDB ObjectId of the application |

**Response:**
```json
{
  "status": "success",
  "message": "Application deleted successfully",
  "data": null
}
```

## Health Check

Check the API health status.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "success",
  "message": "API is healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

## Error Handling

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Common Error Codes

| Status Code | Description |
|------------|-------------|
| 400 | Bad Request - Validation failed or invalid input |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error occurred |

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Window:** 15 minutes
- **Max Requests:** 100 requests per IP per window
- **Headers:** Rate limit info included in response headers

When rate limit is exceeded:
```json
{
  "status": "error",
  "message": "Too many requests from this IP, please try again later."
}
```

## Best Practices

1. **Always handle errors** in your client application
2. **Use pagination** for list endpoints to avoid large responses
3. **Validate data** on the client side before sending requests
4. **Cache responses** when appropriate to reduce API calls
5. **Respect rate limits** to ensure service availability

## Support

For API support or questions:
- Open an issue on GitHub
- Contact the development team
- Check the project documentation

---

**Last Updated:** 2024-01-15
