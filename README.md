# Warranty Keeper

A MERN stack application for keeping personal devices and their warranty details in one place. Users can create an account, manage their own devices, and see which warranties are active, expiring soon, or expired.

## Features

- Register and log in with email and password.
- Keep each user's device collection separate through backend ownership checks.
- Add, view, edit, and delete devices, with confirmation before deletion.
- Record device name, brand, category, purchase date, warranty end date, and notes.
- View total devices and counts for active, expiring soon, and expired warranties.
- Search by device name, brand, or category.
- Filter by category and warranty status.
- Sort by date added, warranty end date, or device name.
- Use a responsive React interface styled with Tailwind CSS utility classes.
- Sign out and restore an unexpired login after refreshing the page.

## Technologies Used

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, JavaScript, Fetch API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, bcrypt, express-rate-limit |
| Development | Git, GitHub, Nodemon, ESLint, Prettier, Code0 |

## Setup and Installation

### Prerequisites

- Node.js 22.12 or newer and npm.
- MongoDB running locally, or a MongoDB Atlas connection string.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/Nitin-yadav2804/Warrenty-Tracker.git
cd Warrenty-Tracker
```

### 2. Install backend dependencies

```bash
cd Backend
npm ci
```

Create a file named `.env` inside `Backend`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/warranty-tracker
JWT_SECRET_KEY=replace_with_a_generated_secret
```

For MongoDB Atlas, replace `MONGODB_URI` with your connection string and configure database access for your machine.

Generate a JWT secret with this command and use its output as `JWT_SECRET_KEY`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

The `.env` file is ignored by Git. Keep database credentials and the JWT secret out of the repository.

### 3. Install frontend dependencies

From the project root:

```bash
cd Frontend
npm ci
```

The frontend uses a Vite development proxy to forward `/api` requests to `http://localhost:3000`. No frontend environment file is needed for this default setup.

If the backend runs on another port, create `Frontend/.env`:

```env
API_PROXY_TARGET=http://localhost:5000
```

Restart the frontend after changing this value.

## How to Run the Application

Run the backend and frontend in separate terminals.

**Terminal 1 — from the project root:**

```bash
cd Backend
npm run dev
```

**Terminal 2 — from the project root:**

```bash
cd Frontend
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

1. Create an account using a password of at least 12 characters.
2. Sign in and select **Add device**.
3. Enter the device details and warranty dates.
4. View coverage, search or filter the collection, and edit or delete devices as needed.

## Warranty Calculation

The backend calculates warranty status whenever it returns device data:

| Status | Rule |
| --- | --- |
| Active | More than 30 days remain |
| Expiring soon | The warranty ends today or within 30 days |
| Expired | The warranty end date is before today |

A warranty remains valid through its end date. Calculations use the current calendar day in `Asia/Kolkata`. Expired devices return zero days remaining. Warranty end dates cannot be earlier than purchase dates.

## Project Structure

```text
Backend/
  scripts/                # Maintenance for obsolete user indexes
  src/
    config/               # MongoDB connection
    controllers/          # Authentication and device operations
    middlewares/          # Authentication checks
    models/               # User and Device schemas
    routes/               # API routes
    services/             # User lookup
    utils/                # JWT verification and warranty calculations
    index.js              # Server entry point
Frontend/
  src/
    components/           # Device cards and dialogs
    pages/                # Login/register page and dashboard
    services/             # API requests
    utils/                # Session handling, dates, and filters
    App.jsx
    main.jsx
    index.css             # Tailwind import and base styles
```

## API Routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register an account |
| POST | `/api/auth/login` | Log in and receive a token |
| GET | `/api/devices` | List the logged-in user's devices |
| POST | `/api/devices` | Add a device |
| PATCH | `/api/devices/:id` | Update an owned device |
| DELETE | `/api/devices/:id` | Delete an owned device |

Protected device routes require the login token in the `x-access-token` header. The backend sets device ownership from the authenticated user and checks ownership when updating or deleting a device.

## Build and Code Checks

Inside `Frontend`:

```bash
npm run lint
npm run build
```

The build output is generated in `Frontend/dist`. A production deployment must also provide access to the backend API; Vite's development proxy is not included in the production build.

## AI Development Experience

**AI development tool used: Code0.**

Code0 was used mainly for debugging, identifying errors, generating basic code snippets, and investigating MongoDB connection issues.

Specific tasks where Code0 helped:

1. **Debugging:** Used Code0 to investigate problems encountered while developing the application and work through possible fixes.
2. **Error identification:** Used Code0 to help identify mistakes in the code and understand the errors reported during development.
3. **Basic code snippets:** Used Code0 to generate small code examples to support implementation of the application.
4. **MongoDB connection errors:** Used Code0 to help identify connection problems and understand their possible causes.

## Current Scope

The application supports personal device and warranty management. Login tokens expire after one hour. Sign-out clears the browser session; it does not revoke an already issued token on the server. Email reminders, receipt uploads, password recovery, and repair history are not implemented.
