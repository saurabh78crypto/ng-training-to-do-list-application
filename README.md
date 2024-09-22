# To-Do List Application

This project is a Full Stack To-Do List Application, which allows users to manage tasks by adding, updating, deleting, and searching tasks. It includes a backend (Node.js with Express and MongoDB) and a frontend (React) with full CRUD functionality and pagination for task management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running Tests](#running-tests)

## Features

### Backend
- Create, Read, Update, Delete (CRUD) API for tasks.
- Uses MongoDB to persist task data.
- REST API endpoints for task management.
- Basic error handling and validations.
  
### Frontend
- Responsive React application.
- Task listing with filtering and pagination.
- Ability to create new tasks, edit existing tasks, and delete tasks.
- Modal forms for creating and editing tasks.
- Search functionality to filter tasks by assigned person, status, due date, or priority.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for backend development.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for task data storage.
- **Mongoose**: ODM for MongoDB.
- **CORS**: Cross-Origin Resource Sharing for API access.

### Frontend
- **React**: JavaScript library for building the user interface.
- **React-Bootstrap**: Bootstrap components for React.
- **Axios**: Promise-based HTTP client for API communication.
- **React-Toastify**: Provides toast notifications.
- **Jest & React Testing Library**: Unit testing framework.

## Architecture

This project uses a RESTful API architecture. The backend handles the API requests for task management, and the frontend communicates with the API to display, manage, and update tasks.

- **Frontend**: React (with React-Bootstrap for UI components and Axios for API communication).
- **Backend**: Node.js with Express (provides RESTful API endpoints).
- **Database**: MongoDB (stores task data).
  
## Getting Started

### Prerequisites

To run this project, you will need:

- **Node.js** (version >= 14.x)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** (for package management)

### Environment Variables

Before running the application, you need to set up environment variables for the backend.

Create a `.env` file in the root of the `backend` directory with the following:
```
PORT=5000
Mongo_URI=mongodb://localhost:27017/todo-app
```

Make sure to replace `mongodb://localhost:27017/todo-app` with your actual MongoDB connection string if you're using a cloud instance.

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd todo-app-backend

2. Install dependencies:
    ```
    npm install

3. Start the backend server:
    ```
    npm start
    

The server should now be running on http://localhost:5000.

The following REST API endpoints are available:
- GET /api/tasks - Fetch all tasks.
- POST /api/tasks - Create a new task.
- PUT /api/tasks/:id - Update a task.
- DELETE /api/tasks/:id - Delete a task.

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd todo-app-frontend

2. Install dependencies:
    ```
    npm install

3. Start the frontend application:
    ```
    npm start
    
The server should now be running on http://localhost:3000.

It will communicate with the backend API at http://localhost:5000/api/tasks.

## Running Both Backend and Frontend Together
To run both the frontend and backend at the same time, open two terminal windows:
- In the first window, navigate to the `backend` directory and run:
    ```
    npm start

- In the second window, navigate to the `frontend` directory and run:
    ```
    npm start

Now both the backend and frontend will be running concurrently.

## Running Tests

### Backend Tests
The backend uses Jest for testing. To run the tests, navigate to the `backend` directory and run:
```
npm test
```

### Frontend Tests
The frontend uses Jest and React Testing Library. To run the tests, navigate to the frontend directory and run:
```
npm test
```
You can find the test files in the src/tests/ directory.