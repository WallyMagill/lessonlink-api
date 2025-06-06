# LessonLink API

This is the backend API for the LessonLink platform, a modern web application designed to streamline lesson planning for K-12 educators.

Hosted Link: https://project-api-lessonlink.onrender.com

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
