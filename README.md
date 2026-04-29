# Dallaty — Lost & Found Platform

A full-stack PERN (PostgreSQL, Express, React, Node.js) web application that connects people who have lost belongings with those who have found them. The platform supports bilingual (Arabic / English) interfaces with full RTL support, secure payment processing through PayTabs, an admin dashboard for matching reports, and automated email notifications.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Security](#security)
- [License](#license)

---

## Overview

Dallaty allows users to:

- Submit a **Lost Item** report (with image, description, and location).
- Submit a **Found Item** report.
- Pay a small reporting fee through PayTabs (SAR currency, Saudi market).
- Receive automated email notifications (via Zapier webhooks) when a match is confirmed.

Administrators can:

- Log into a secure dashboard (JWT-protected).
- Browse, filter, and manage all reports through an interactive data grid.
- Manually confirm matches between lost and found reports.
- Trigger automated email delivery to both parties upon a confirmed match.

---

## Tech Stack

### Frontend ([client/](client/))

- **React 19** with React Router v7
- **Material UI v7** (MUI Core, Icons, Data Grid, Date Pickers)
- **i18next** for internationalization (Arabic / English with RTL via `stylis-plugin-rtl`)
- **Axios** with private/public instance separation and JWT refresh interceptors
- **Framer Motion** for UI animations
- **JWT Decode** for client-side token handling

### Backend ([server/](server/))

- **Node.js** with **Express 5** (ES Modules)
- **PostgreSQL** via the `pg` driver
- **JWT** authentication (access + refresh token rotation via httpOnly cookies)
- **bcrypt** for password hashing
- **Multer** for image upload handling
- **express-rate-limit** for login and form abuse protection
- **PayTabs SDK** (`paytabs_pt2`) for payment gateway integration
- **Axios** for outbound Zapier webhook calls
- **ngrok** (development only) for local webhook testing

### Infrastructure

- **Nginx** as reverse proxy and static file server ([nginx.conf](nginx.conf))
- **PM2** process manager ([server/ecosystem.config.cjs](server/ecosystem.config.cjs))

---

## Project Structure

```
Dallaty-Website-dhallaty-v1/
├── client/                          # React frontend
│   ├── public/
│   └── src/
│       ├── api/                     # Axios instances (public & private)
│       ├── components/              # Shared UI (Navbar, Footer, AuthGuards…)
│       ├── contexts/                # AuthProvider, Snackbar, form contexts
│       ├── hooks/                   # useAuth, useAxiosPrivate, useRefreshToken…
│       ├── pages/                   # LandingPage, LostForm, FoundForm,
│       │                            # PaymentPage, AdminMatchDashboard…
│       ├── themes/                  # MUI theme + RTL configuration
│       ├── i18n.js                  # Translation setup
│       └── App.js
│
├── server/                          # Express backend
│   ├── config/
│   │   ├── corsOptions.js           # CORS allowlist
│   │   ├── allowedOrigins.js
│   │   ├── dp.js                    # PostgreSQL pool
│   │   ├── initBD.js                # Auto-creates tables on startup
│   │   ├── paytabs.js               # PayTabs SDK config
│   │   ├── rateLimiter.js           # Login & form rate limiters
│   │   └── appConfig.js
│   ├── controllers/                 # Route handlers
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification
│   ├── routes/                      # admin, lostForm, foundForm, payment, matchedItem
│   ├── services/
│   │   ├── paymentService.js        # PayTabs request/verify
│   │   └── zapiermail.js            # Zapier webhook dispatch
│   ├── uploads/                     # Multer disk storage (lost/, found/)
│   ├── seedAdmin.js                 # Admin account seeder
│   ├── seedData.js                  # Sample data seeder
│   ├── ecosystem.config.cjs         # PM2 configuration
│   └── index.js                     # App entry point
│
├── schema.sql                       # Reference SQL schema
├── nginx.conf                       # Nginx reverse-proxy config
└── README.md
```

---

## Features

- **Bilingual UI** with automatic RTL/LTR switching (Arabic / English).
- **Lost & Found report submission** with image upload (max 5 MB, image MIME types only).
- **PayTabs payment integration** with server-to-server webhook verification.
- **JWT authentication** with access + refresh token rotation stored as httpOnly cookies.
- **Persistent login** via silent refresh on app load.
- **Admin dashboard** with MUI Data Grid for browsing, filtering, and deleting records.
- **Match confirmation flow** that triggers Zapier-driven email notifications to both parties.
- **Rate limiting** on the login endpoint (brute-force protection) and form submissions.
- **Auto-initializing database** — tables are created on server startup if they don't exist.
- **Health check endpoint** at `GET /health` for uptime monitoring.

---

## Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 14
- **npm** ≥ 9
- (Optional) **ngrok** account — for testing PayTabs webhooks against a local server
- (Optional) **PayTabs** merchant account — for payment functionality
- (Optional) **Zapier** account — for email notification webhooks

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Dallaty-Website-dhallaty-v1
```

### 2. Set up the database

Create a PostgreSQL database (default name: `dhallaty`):

```bash
createdb dhallaty
```

Tables are created automatically when the server starts (see [server/config/initBD.js](server/config/initBD.js)). The reference schema is also available in [schema.sql](schema.sql) if you prefer to apply it manually.

### 3. Configure the backend

```bash
cd server
cp .env.example .env
# Fill in the values in .env (database password, JWT secrets, PayTabs keys, etc.)
npm install
npm run seed        # Seeds the admin account from ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev         # Starts the dev server with nodemon (port 5000)
```

### 4. Configure the frontend

In a second terminal:

```bash
cd client
cp .env.example .env
# Set REACT_APP_API_URL to your backend URL (e.g. http://localhost:5000)
npm install
npm start           # Starts the React dev server (port 3000)
```

The app will be available at `http://localhost:3000` and the API at `http://localhost:5000`.

---

## Environment Variables

### Server ([server/.env.example](server/.env.example))

| Variable                          | Description                                   |
| --------------------------------- | --------------------------------------------- |
| `NODE_ENV`                        | `development` or `production`                 |
| `PORT`                            | Backend port (default `5000`)                 |
| `DB_NAME`                         | PostgreSQL database name                      |
| `POSTGRESQL_PASSWORD`             | PostgreSQL user password                      |
| `PROD_FRONTEND_URL`               | Frontend URL (used for CORS allowlist)        |
| `PROD_BACKEND_URL`                | Backend URL (used for PayTabs callbacks)      |
| `ACCESS_TOKEN_SECRET`             | JWT access-token signing secret               |
| `REFRESH_TOKEN_SECRET`            | JWT refresh-token signing secret              |
| `PAYTABS_PROFILE_ID`              | PayTabs profile ID                            |
| `PAYTABS_SERVER_KEY`              | PayTabs server key                            |
| `PAYTABS_BASE_URL`                | PayTabs API endpoint                          |
| `ZAPIER_PAYMENT_WEBHOOK_URL`      | Webhook for payment confirmation emails       |
| `ZAPIER_ITEM_DETAILS_WEBHOOK_URL` | Webhook for item-match confirmation emails    |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`   | Seeded admin credentials                      |
| `NGROK_AUTHTOKEN`                 | (Dev only) ngrok token for exposing localhost |

> **Tip:** Generate secure JWT secrets with:
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### Client ([client/.env.example](client/.env.example))

| Variable                 | Description                           |
| ------------------------ | ------------------------------------- |
| `REACT_APP_API_URL`      | Backend base URL                      |
| `REACT_APP_FRONTEND_URL` | Frontend public URL                   |
| `REACT_APP_WEBSITE_URL`  | Public website URL (used in metadata) |

---

## Available Scripts

### Server

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm start`         | Start the production server                  |
| `npm run dev`       | Start the dev server with nodemon hot-reload |
| `npm run seed`      | Seed the admin account                       |
| `npm run seed:data` | Seed sample lost/found reports for testing   |

### Client

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm start`     | Start the React dev server  |
| `npm run build` | Build the production bundle |
| `npm test`      | Run the test suite          |

---

## API Reference

### Public

| Method | Endpoint                         | Description                                                   |
| ------ | -------------------------------- | ------------------------------------------------------------- |
| `GET`  | `/health`                        | Service health check                                          |
| `POST` | `/form/lost`                     | Submit a lost-item report (multipart/form-data with `image`)  |
| `POST` | `/form/found`                    | Submit a found-item report (multipart/form-data with `image`) |
| `POST` | `/api/create-payment`            | Initiate a PayTabs payment session                            |
| `POST` | `/api/webhook`                   | PayTabs server-to-server callback                             |
| `GET`  | `/api/payment-status/:reportId`  | Poll payment status for a given report                        |
| `GET`  | `/payment-details/:paymentToken` | Fetch payment summary by token                                |
| `GET`  | `/api/item-details/:reportId`    | Fetch matched-item details                                    |

### Admin (auth)

| Method   | Endpoint                     | Description                                          |
| -------- | ---------------------------- | ---------------------------------------------------- |
| `POST`   | `/admin/login`               | Authenticate admin (rate-limited)                    |
| `GET`    | `/admin/refresh`             | Issue a new access token from a refresh-token cookie |
| `POST`   | `/admin/logout`              | Clear refresh-token cookie                           |
| `GET`    | `/admin/table/:tableName`    | Fetch rows from any managed table                    |
| `DELETE` | `/admin/table/:tableName`    | Delete one or more rows                              |
| `POST`   | `/admin/confirm-match-lost`  | Confirm a match from the lost side and notify users  |
| `POST`   | `/admin/confirm-match-found` | Confirm a match from the found side and notify users |

---

## Database Schema

Four core tables are managed by the application (see [schema.sql](schema.sql) and [server/config/initBD.js](server/config/initBD.js)):

- **`lostreports`** — submissions from people searching for lost items.
- **`foundreports`** — submissions from people who found items.
- **`matched_items`** — confirmed matches linking a lost and a found report.
- **`payments`** — PayTabs transactions, tied to a `report_id` and `payment_token`.

An additional `admins` table stores hashed admin credentials (created by `npm run seed`).

---

## Deployment

The production setup uses Nginx as a reverse proxy in front of the Express backend, with the React build served as static assets.

### 1. Build the frontend

```bash
cd client && npm run build
```

### 2. Configure Nginx

The reference config is at [nginx.conf](nginx.conf). It:

- Serves the React build from `/var/www/dallaty/client/build`.
- Proxies `/api/`, `/admin/`, `/form/`, and `/payment-details/` to `localhost:5000`.
- Serves uploaded images from `/var/www/dallaty/server/uploads/` with a 7-day cache.
- Adds standard security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`).

### 3. Run the backend with PM2

```bash
cd server
pm2 start ecosystem.config.cjs
pm2 save
```

The PM2 config ([server/ecosystem.config.cjs](server/ecosystem.config.cjs)) sets `NODE_ENV=production`, capped memory at 500 MB, and writes logs to `/var/log/pm2/`.

---

## Security

- **Passwords** are hashed with bcrypt before storage.
- **JWTs** are split into a short-lived access token and a long-lived refresh token, with the refresh token stored as an httpOnly cookie.
- **Rate limiting** is applied to login and form-submission endpoints to mitigate brute-force and abuse.
- **CORS** is restricted to an explicit allowlist ([server/config/allowedOrigins.js](server/config/allowedOrigins.js)).
- **File uploads** are constrained to image MIME types and a 5 MB size cap.
- **PayTabs callbacks** are verified server-to-server before any payment record is updated.
- **Security headers** are added at the Nginx layer.

> Always rotate JWT secrets, database credentials, and payment-gateway keys before deploying to production. Never commit a real `.env` file to version control.

---

## License

ISC — see individual `package.json` files for details.
