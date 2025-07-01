# LessonLink API

⚠️ **This is a public copy of a collaborative academic project. Intended for portfolio review only.**

This is the backend API for the LessonLink platform, a modern web application designed to streamline lesson planning for K-12 educators.

**Hosted Demo:** https://project-api-lessonlink.onrender.com

## Tech Stack
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT tokens with Passport.js
- **Deployment:** Render.com
- **Environment:** Environment variables for configuration

## Team Contributions

This project was developed collaboratively with the following contributions:

- **Wally Magill:** API route architecture, frontend-backend integration, authentication flow, and lesson filtering logic
- **[Teammate A]:** MongoDB data modeling, database schemas, and standards endpoints
- **[Teammate B]:** Authentication middleware, JWT token implementation, and security logic
- **[Teammate C]:** User management endpoints and data validation

## Project Structure
- `src/`: Source code directory;
    - `config/`: Database and environment configuration;
    - `controllers/`: Logic for handling API requests;
    - `middlewares/`: Authentication middleware;
    - `models/`: MongoDB schemas for Users, Lessons, and Lesson Standards;
    - `routes/`: Express route definitions for API endpoints;
    - `services/`: Handles authentication related logic;
    - `server.js`: Server entry point;

## Setup Instructions

1. Install dependencies: `npm install`
2. Create a `.env` file with required environment variables.
3. Start the development server: `npm run dev`

## API Endpoints

- `/api/auth`: Authentication routes (login, signup);
- `/api/users`: User management routes;
- `/api/lessons`: Lesson plan CRUD operations;
- `/api/standards`: Standard related routes;

## Key Features (what we serve)
- Serves lessons based on lesson visibility;
- Serves User data based on user;
- Serves Standards;
- Handles authentication related logic;
