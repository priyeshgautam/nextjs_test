# Notes App - Project Overview

Welcome to the **Notes App** repository! This document provides an overview of core features, RESTful endpoints, database architecture, and recent enhancements—including support for LLM API integration with Google Gemini.

---

## Endpoints

### Authentication
- `POST /api/auth/login`  
  Log in with email/password or via OAuth (Google, GitHub).
- `POST /api/auth/register`  
  Register a new user.
- `POST /api/auth/logout`  
  Log out the current user.
- `GET /api/auth/session`  
  Retrieve the authenticated user's session info.

### Notes
- `GET /api/notes`  
  Fetch all notes for the logged-in user.
- `POST /api/notes`  
  Add a new note (`title`, `content` required).
- `GET /api/notes/:id`  
  Get a single note by ID.
- `PATCH /api/notes/:id`  
  Update an existing note.
- `DELETE /api/notes/:id`  
  Remove a note by ID.

### LLM Integration
- `POST /api/gemini`  
  Submit a prompt and receive a language model generated response using the Gemini API.  
  > Used internally by the "Ask Gemini" page—see below.

---

## Database

**Primary Databases:**
- **MongoDB Atlas** — Primary storage for notes, users, and session data.  
  - Connection: `MONGODB_URL` in `.env`
- **Neon Serverless Postgres** — (Optional/Upcoming) Future-ready for scalable, relational data needs.  
  - Connection: `DATABASE_URL` in `.env`

**Collections/Tables:**
- `users` — Auth credentials and user profiles.
- `notes` — Notes data, each associated with a `userId`.
- `sessions` — Tracks user sessions and tokens.

---

## Features

- **User Authentication:**  
  Email/password & third-party OAuth (Google, GitHub).

- **CRUD Notes:**  
  Create, read, update, and delete user-specific notes.

- **Secure API:**  
  Passwords are securely hashed; session tokens are validated for every request.

- **Modern Tech Stack:**  
  Next.js frontend, API routes backend, Mongoose ODM for MongoDB, with Neon Postgres preparation.

- **Environment-driven Config:**  
  All credentials and URLs are handled via `.env`—never committed to source control.

- **LLM API Integration – Ask Gemini:**  
  Seamless integration with Google Gemini LLM.  
  - The `/ask-gemini` page allows users to submit prompts and get responses from the Gemini language model via the `/api/gemini` endpoint.
  - Implementation uses the official Google GenAI SDK and is designed for extensibility (e.g., to expand LLM-powered features).
  - The Gemini API key is managed securely through environment variables.

---

_For further details, refer to respective API files and the `/ask-gemini` page implementation._

