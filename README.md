# GLB.Connect Job Posting Feature

A modern, responsive job posting platform built with React, Tailwind CSS, Express, and PostgreSQL.

## Features

- Browse job listings with advanced filtering options
- Post new job opportunities with a multi-step form
- Responsive design that works on mobile, tablet, and desktop
- Modern UI with clean aesthetics

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- React Quill for rich text editing

### Backend
- Express.js
- Prisma ORM
- PostgreSQL database
- REST API

## Quick Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/glb-connect.git
cd glb-connect
```

### 2. Install dependencies
```bash
npm run install-deps
```

### 3. Set up environment variables

#### Using automated scripts:
- **Windows**: Run `setup-env.bat` by double-clicking it or running it in the terminal
- **Mac/Linux**: Run `./setup-env.sh` (you may need to make it executable first with `chmod +x setup-env.sh`)

#### Manual setup:
- Create `.env` file in the backend directory using the template in `backend/ENV_SETUP.md`
- Create `.env` file in the frontend directory using the template in `frontend/ENV_SETUP.md`

### 4. Set up the database
```bash
# Make sure PostgreSQL is running and create a database named "glb_connect"
npm run setup-db
```

### 5. Start the application
```bash
npm run dev
```

This will start both the frontend and backend servers concurrently.
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── index.html          # HTML entry point
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
└── backend/                # Express backend
    ├── controllers/        # Request handlers
    ├── models/             # Database models (Prisma)
    ├── routes/             # API routes
    ├── config/             # Configuration files
    ├── middlewares/        # Express middlewares
    ├── schema.prisma       # Prisma schema
    ├── index.js            # Server entry point
    └── package.json        # Backend dependencies
```

## Individual Component Execution

### Frontend Only
```bash
npm run frontend
```

### Backend Only
```bash
npm run backend
```

## API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs with optional filters
- `GET /api/jobs/:id` - Get a specific job by ID
- `POST /api/jobs` - Create a new job posting
- `PUT /api/jobs/:id` - Update an existing job
- `DELETE /api/jobs/:id` - Delete a job posting

## License

This project is licensed under the MIT License - see the LICENSE file for details.