# Notes App - Project Overview

Welcome to the **Notes App** repository! This document covers the core features, RESTful endpoints, database setup, and an honest look at the pros and cons of the project based on recent development changes.

---

## Endpoints

### Authentication
- `POST /api/auth/login`  
  Log in using email/password or via OAuth (Google, GitHub).
- `POST /api/auth/register`  
  Register a new user.
- `POST /api/auth/logout`  
  Log out current user.
- `GET /api/auth/session`  
  Get current authenticated user session info.

### Notes
- `GET /api/notes`  
  Get all notes for the logged in user.
- `POST /api/notes`  
  Create a new note (`title`, `content` required).
- `GET /api/notes/:id`  
  Get a single note by ID.
- `PATCH /api/notes/:id`  
  Update note with new info.
- `DELETE /api/notes/:id`  
  Delete a note by ID.

---

## Database

**Primary Databases:**
- **MongoDB Atlas** — Used for storing all notes, users, and session data.
  - Connection via `MONGODB_URL` in `.env`
- **Neon Serverless Postgres** — (Optional/Upcoming) Prepared for more scalable, relational data needs.  
  See `DATABASE_URL` in `.env`.

**Collections/Tables:**
- `users` — Auth credentials and basic profile.
- `notes` — Each note with a `userId` reference.
- `sessions` — For tracking logins and tokens.

---

## Features

- **User Authentication:**  
  Email/password & third-party (Google, GitHub) OAuth flows.

- **CRUD Notes:**  
  Create, read, update, delete notes tied to users.

- **Secure API:**  
  Passwords are never stored in plain text; session tokens are validated for every request.

- **Modern Tech Stack:**  
  Next.js frontend, API routes backend, Mongoose ODM (for MongoDB), Neon Postgres integration planned.

- **Environment-driven Config:**  
  All credentials and URLs are kept out of source code in `.env`.

---

## Advantages

- **Quick Start:** Out-of-the-box, fully working notes backend with auth and RESTful routes.
- **Flexible Auth:** Convenient login options using either social accounts or traditional credentials.
- **Cloud Ready:** Uses free-tier managed databases for quick deployment and scaling.
- **Extensible:** Structure accommodates switching to (or integrating with) relational/Postgres DB.

---

## Disadvantages

- **Complexity for Beginners:** Multi-provider auth and dual-database support can add learning overhead.
- **Extra Config Needed:** Requires setup of MongoDB Atlas, Neon Postgres, and OAuth app credentials.
- **Free-Tier Limitations:** Performance and data storage may be constrained by free database tiers in production-likes settings.
- **Current Redundancy:** Some features are duplicated across MongoDB and Postgres as integration is tested/refined.

---

## Summary

This project enables rapid development of secure, full-stack note-taking apps. While the blend of technologies offers power and extensibility, new users should be aware of the configuration steps required to enable all its features.

---

https://docs.google.com/document/d/1rL9gCCu6Aj94cHpRm5WKb-PDx05V_DS00kVfxrUGQEo/edit?tab=t.0
