# TaskApp Backend

This is the backend API for the TaskApp project, built with Node.js, Express, and MongoDB (Mongoose).

## Features

- User authentication (JWT-based)
- Secure password hashing (bcrypt)
- Task CRUD (Create, Read, Update, Delete)
- User-specific task management
- Environment variable support via `.env`
- Helmet for security headers

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd TaskApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```env
   SALT_ROUNDS=10
   PORT=3000
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   MONGODB_URI=mongodb://127.0.0.1:27017/taskapp
   ```
   Replace secrets with your own secure values.

### Running the Server

- For development (with auto-reload):
  ```sh
  npm run dev
  ```
- For production:
  ```sh
  npm start
  ```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive JWT
- `POST /auth/logout` — Logout (if implemented)

### Tasks

- `GET /tasks` — Get all tasks for the logged-in user
- `POST /tasks` — Create a new task
- `GET /tasks/:id` — Get a single task
- `PUT /tasks/:id` — Update a task
- `DELETE /tasks/:id` — Delete a task

## Project Structure

```
TaskApp/
  Controllers/
  models/
  Routes/
  index.js
  .env
  package.json
  ...
```

## Security

- Passwords are hashed with bcrypt
- JWT is used for authentication
- Helmet is used for HTTP header security

## License

MIT
