
# Seekly AI — Project Workflow (Frontend + Backend)

This file provides a concise, structured overview of the application so you can quickly understand the current architecture, packages, key files, methods, and how data flows between frontend and backend.

## Tech stack
- Frontend: React, Vite, Tailwind CSS, React Router, Redux Toolkit, Axios
- Backend: Node.js, Express, Mongoose (MongoDB), Redis (caching), Socket.io
- Utilities / Services: JWT, bcrypt, nodemailer, LangChain & Google GenAI bindings

## Frontend — structure & key files
- Project root: `Frontend/`
- Entry: `src/main.jsx` — app bootstrap and router provider
- App shell & routes: `src/app/App.jsx`, `src/app/app.routes.jsx` — define top-level routes (`/login`, `/register`, chat pages)
- Auth pages: `src/features/auth/pages/login.jsx`, `src/features/auth/pages/Register.jsx` — forms with two-way binding and submit handlers (email/password and username/email/password)
- Styling: Tailwind CSS classes used across components; ensure Tailwind is configured in the project
- State & network: `@reduxjs/toolkit` + `react-redux` for app state; `axios` for HTTP requests to backend

Frontend packages (from `package.json`): `react`, `react-dom`, `react-router-dom`, `@reduxjs/toolkit`, `react-redux`, `axios`, `tailwindcss`, `vite`, plus ESLint dev deps.

## Backend — structure & key files
- Project root: `Backend/`
- Server bootstrap: `server.js` and `src/app.js` — Express app creation and middleware mounting
- Configuration: `src/config/database.js` (MongoDB connection), `src/config/cache.js` (Redis)
- Routes: `src/routes/auth.route.js` — auth endpoints
- Controllers: `src/controllers/auth.controller.js` — implementation for register/login and token issuance
- Middleware: `src/middleware/auth.middleware.js` — JWT protection for private routes
- Models: `src/models/user.model.js`, `src/models/chat.model.js`, `src/models/message.model.js`
- Services: `src/services/ai.service.js` (LangChain/GenAI wrapper), `src/services/mail.service.js` (nodemailer email sending)
- Validators: `src/validators/auth.validator.js` — request validation using `express-validator`

Backend packages (from `package.json`): `express`, `mongoose`, `ioredis`/`redis`, `socket.io`, `jsonwebtoken`, `bcrypt`, `nodemailer`, `express-validator`, `cors`, `dotenv`, `langchain`, `@langchain/google-genai`.

## Core API endpoints (current surface)
- POST `/api/auth/register` — register new user (validate, hash password, create user, optional email send)
- POST `/api/auth/login` — authenticate user (validate, compare password, return JWT)
- Socket.io endpoints — realtime chat message exchange; messages persisted via `message.model`
- Protected REST endpoints — require `Authorization: Bearer <token>` and are verified by `auth.middleware`

## Typical request flows (short)
- Register flow:
	- Frontend `Register` form -> `POST /api/auth/register`
	- `auth.controller.register` runs validators, hashes password (`bcrypt`), saves `User` model, calls `mail.service` (optional), returns success or token
- Login flow:
	- Frontend `Login` form -> `POST /api/auth/login`
	- `auth.controller.login` validates, compares password, issues JWT (`jsonwebtoken`), returns token
- Chat / AI flow:
	- Frontend sends message via Socket.io or HTTP -> backend saves message (`message.model`), optionally calls `ai.service` (LangChain / GenAI) to generate reply, saves reply, emits events back to client

## Environment variables (common)
- `PORT` — server port
- `MONGO_URI` — MongoDB connection string
- `REDIS_URL` — Redis connection string
- `JWT_SECRET` — secret for signing tokens
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — email credentials for `nodemailer`
- `OPENAI_KEY` or provider keys for LangChain / GenAI integration (if used)

## Quick setup & run
1. Install backend deps
```bash
cd Backend
npm install
```
2. Install frontend deps
```bash
cd Frontend
npm install
```
3. Run backend (development)
```bash
cd Backend
npm run dev
```
4. Run frontend (development)
```bash
cd Frontend
npm run dev
```

## Notes & next steps
- Tailwind: make sure Tailwind is configured in `Frontend` (postcss/tailwind config + imports in `index.css`) for the dark-blue theme to apply.
- Router: `react-router-dom` is used by the components; mount routes in `src/app/app.routes.jsx` for `/login` and `/register`.
- Auth integration: current forms have placeholder `handleSubmit` functions — wire them to `axios` calls to the backend endpoints and handle JWT storage (e.g., in Redux or secure cookies).
- Chat & AI: `ai.service.js` is present as a wrapper for LangChain/GenAI — integrate carefully and secure API keys.



