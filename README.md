# KeyBag - Password Manager

KeyBag is a full-stack password management application built with React (Frontend) and Node.js (Backend) with MongoDB database integration.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Project Structure

```
KeyBag/
├── Frontend/          # React application
│   ├── src/          # Source files
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
└── Backend/          # Node.js server
    ├── server.js     # Main server file
    └── package.json  # Backend dependencies
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-Uzair-2611/Keybag
cd KeyBag
```

### 2. Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory and add your MongoDB connection string:
```
DB_URI=your_mongodb_connection_string
```

4. Start the backend server:
```bash
npm start
```
The server will run on http://localhost:2611

### 3. Frontend Setup

1. Open a new terminal and navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The frontend will run on http://localhost:5173 (or another port if 5173 is in use)

## Features

- Store and manage passwords securely
- MongoDB database integration
- RESTful API endpoints for CRUD operations
- Modern React frontend with Vite
- CORS enabled for cross-origin requests

## API Endpoints

- `GET /` - Retrieve all passwords
- `POST /` - Save a new password
- `DELETE /` - Delete a password

## Technologies Used

- Frontend:
  - React
  - Vite
  - Modern JavaScript (ES6+)
  
- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongodb Node.js Driver

## Security Notes

- Ensure your MongoDB connection string is kept secure and not committed to version control
- The application uses environment variables for sensitive data
- CORS is enabled for development purposes

## Contributing

Feel free to submit issues and enhancement requests! 