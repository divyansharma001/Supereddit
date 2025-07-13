# Reddit Post Management SaaS - API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Health Check](#health-check)
- [Authentication APIs](#authentication-apis)
- [Post Management APIs](#post-management-apis)
- [AI APIs](#ai-apis)
- [Data Models](#data-models)
- [Testing Examples](#testing-examples)

## 🌐 Overview

This API provides a complete backend for managing Reddit posts with AI-assisted content generation, secure token storage, and automated scheduling.

**Features:**
- User authentication with JWT
- Multi-tenant client management
- Reddit OAuth integration
- AI-powered content generation
- Automated post scheduling
- Secure token encryption

## 🔗 Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## 🔐 Authentication

Most endpoints require authentication using JWT tokens.

**Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

**Getting a Token:**
1. Register a user: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Use the returned token in subsequent requests

## ⚠️ Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## 🏥 Health Check

### GET `/health`

Check if the server is running.

**No authentication required**

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "environment": "development"
}
```

---

## 🔑 Authentication APIs

### POST `/api/auth/register`

Register a new user and create a client organization.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "clientName": "My Company"
}
```

**Validation:**
- Email must be valid format
- Password minimum 6 characters
- Client name is required

**Response (201):**
```json
{
  "message": "User registered successfully",
  "clientId": "cl_abc123...",
  "userId": "user_xyz789..."
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - Email already exists

### POST `/api/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_xyz789...",
    "email": "user@example.com",
    "role": "CLIENT_USER",
    "clientId": "cl_abc123...",
    "clientName": "My Company"
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

### POST `/api/auth/reddit/oauth/connect`

Get Reddit OAuth URL for connecting Reddit account.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "authUrl": "https://www.reddit.com/api/v1/authorize?client_id=...&response_type=code&state=...&redirect_uri=...&duration=permanent&scope=identity,submit,read"
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Reddit OAuth not configured

### GET `/api/auth/reddit/oauth/callback`

Handle Reddit OAuth callback and save tokens.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `code` - Authorization code from Reddit
- `state` - State parameter for security

**Response (200):**
```json
{
  "message": "Reddit account connected successfully",
  "redditUsername": "my_reddit_username"
}
```

**Error Responses:**
- `400` - Missing authorization code
- `401` - Unauthorized
- `500` - Failed to connect Reddit account

---

## 📝 Post Management APIs

### POST `/api/posts`

Create a new post.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "My Reddit Post Title",
  "body": "This is the content of my post. It can be multiple paragraphs long.",
  "subreddit": "programming",
  "scheduled_at": "2024-01-15T15:00:00Z"
}
```

**Validation:**
- Title, body, and subreddit are required
- scheduled_at is optional

**Response (201):**
```json
{
  "message": "Post created successfully",
  "post": {
    "id": "post_abc123...",
    "title": "My Reddit Post Title",
    "body": "This is the content of my post...",
    "subreddit": "programming",
    "status": "Draft",
    "scheduled_at": "2024-01-15T15:00:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "author": {
      "email": "user@example.com"
    }
  }
}
```

### GET `/api/posts`

Get all posts for the authenticated user's client.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)
- `status` (optional) - Filter by status (Draft, Scheduled, Posted, Error)

**Response (200):**
```json
{
  "posts": [
    {
      "id": "post_abc123...",
      "title": "My Reddit Post",
      "body": "Post content...",
      "subreddit": "programming",
      "status": "Draft",
      "scheduled_at": null,
      "posted_at": null,
      "reddit_post_id": null,
      "error_message": null,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z",
      "author": {
        "email": "user@example.com"
      },
      "redditAccount": {
        "reddit_username": "my_reddit_username"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### GET `/api/posts/:id`

Get a specific post by ID.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "post": {
    "id": "post_abc123...",
    "title": "My Reddit Post",
    "body": "Post content...",
    "subreddit": "programming",
    "status": "Draft",
    "scheduled_at": null,
    "posted_at": null,
    "reddit_post_id": null,
    "error_message": null,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "author": {
      "email": "user@example.com"
    },
    "redditAccount": {
      "reddit_username": "my_reddit_username"
    }
  }
}
```

**Error Responses:**
- `400` - Post ID is required
- `404` - Post not found

### PUT `/api/posts/:id`

Update a post.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Updated Title",
  "body": "Updated content",
  "subreddit": "technology",
  "status": "Scheduled"
}
```

**Validation:**
- Cannot update posted posts
- All fields are optional

**Response (200):**
```json
{
  "message": "Post updated successfully",
  "post": {
    "id": "post_abc123...",
    "title": "Updated Title",
    "body": "Updated content",
    "subreddit": "technology",
    "status": "Scheduled",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "author": {
      "email": "user@example.com"
    }
  }
}
```

**Error Responses:**
- `400` - Post ID is required / Cannot update posted post
- `404` - Post not found

### DELETE `/api/posts/:id`

Delete a post.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

**Error Responses:**
- `400` - Post ID is required / Cannot delete posted post
- `404` - Post not found

### POST `/api/posts/:id/schedule`

Schedule a post for posting.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "scheduled_at": "2024-01-15T16:00:00Z",
  "redditAccountId": "account_xyz789..."
}
```

**Validation:**
- scheduled_at is required
- redditAccountId is optional
- Cannot schedule posted posts

**Response (200):**
```json
{
  "message": "Post scheduled successfully",
  "post": {
    "id": "post_abc123...",
    "title": "My Post",
    "body": "Post content...",
    "subreddit": "programming",
    "status": "Scheduled",
    "scheduled_at": "2024-01-15T16:00:00.000Z",
    "redditAccountId": "account_xyz789...",
    "author": {
      "email": "user@example.com"
    },
    "redditAccount": {
      "reddit_username": "my_reddit_username"
    }
  }
}
```

---

## 🤖 AI APIs

### GET `/api/ai/tones`

Get available AI generation tones.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "tones": [
    {
      "value": "story",
      "label": "Personal Story",
      "description": "Share a personal anecdote or experience"
    },
    {
      "value": "question",
      "label": "Discussion Question",
      "description": "Ask an engaging question to the community"
    },
    {
      "value": "experience",
      "label": "Experience Share",
      "description": "Share an observation or experience for others to relate to"
    }
  ]
}
```

### POST `/api/ai/draft`

Generate AI-powered post content.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "keywords": "programming tips for beginners",
  "tone": "story"
}
```

**Validation:**
- keywords and tone are required
- tone must be: "story", "question", or "experience"

**Response (200):**
```json
{
  "title": "How I Learned Programming: A Beginner's Journey",
  "body": "When I first started learning to code, I was completely overwhelmed...",
  "keywords": "programming tips for beginners",
  "tone": "story"
}
```

**Error Responses:**
- `400` - Missing keywords or tone / Invalid tone
- `500` - Failed to generate content / OpenAI API error

---

## 📊 Data Models

### Post Status Enum
```typescript
enum PostStatus {
  Draft = "Draft"
  Scheduled = "Scheduled"
  Posted = "Posted"
  Error = "Error"
}
```

### User Role Enum
```typescript
enum Role {
  ADMIN = "ADMIN"
  CLIENT_USER = "CLIENT_USER"
}
```

### Post Object
```typescript
interface Post {
  id: string
  title: string
  body: string
  subreddit: string
  status: PostStatus
  scheduled_at?: Date
  posted_at?: Date
  reddit_post_id?: string
  error_message?: string
  createdAt: Date
  updatedAt: Date
  authorId: string
  clientId: string
  redditAccountId?: string
}
```

---

## 🧪 Testing Examples

### Using cURL

**1. Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "clientName": "Test Company"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**3. Create a post:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Post",
    "body": "This is my first Reddit post!",
    "subreddit": "programming"
  }'
```

**4. Generate AI content:**
```bash
curl -X POST http://localhost:3000/api/ai/draft \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "keywords": "programming tips",
    "tone": "story"
  }'
```

### Using Postman

1. **Create a new collection**
2. **Set up environment variables:**
   - `base_url`: `http://localhost:3000`
   - `token`: (will be set after login)
3. **Use `{{base_url}}` and `{{token}}` in requests**

### Using JavaScript/Fetch

```javascript
// Login
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
});

const { token } = await loginResponse.json();

// Create post
const postResponse = await fetch('http://localhost:3000/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Post',
    body: 'Post content',
    subreddit: 'programming'
  })
});
```

---

## 🔧 Environment Variables

Required environment variables for the API to function:

```bash
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database"

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_32_byte_encryption_key
ENCRYPTION_IV=your_16_byte_encryption_iv

# Reddit OAuth
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_REDIRECT_URI=http://localhost:3000/api/auth/reddit/oauth/callback

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- IDs are CUID format for security
- Passwords are hashed with bcryptjs
- Reddit tokens are encrypted with AES-256-CBC
- The scheduler runs every minute to process scheduled posts
- Multi-tenant architecture ensures data isolation between clients 