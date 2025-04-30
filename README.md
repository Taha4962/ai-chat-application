# AI Chat Application (LAMA AI)

Welcome to the **AI Chat Application**, also known as **LAMA AI**. This project is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with additional integrations for **Clerk Authentication**, **ImageKit for media uploads**, and **Google Generative AI (Gemini)** for AI-powered chat functionality.

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Environment Variables](#environment-variables)
7. [How to Use](#how-to-use)
8. [API Endpoints](#api-endpoints)
9. [Key Components](#key-components)
10. [Future Enhancements](#future-enhancements)
11. [License](#license)

---

## About the Project

The **AI Chat Application** is designed to provide users with an intuitive and interactive chat experience powered by **Google Generative AI (Gemini)**. Users can:

- Create and manage chats.
- Upload images for analysis.
- Receive AI-generated responses to their queries.
- Seamlessly authenticate using **Clerk**.
- Access a sleek and responsive user interface.

This project is ideal for exploring the integration of AI with modern web technologies.

---

## Features

- **AI-Powered Chat**: Real-time responses generated using Google Generative AI.
- **User Authentication**: Secure authentication and session management using Clerk.
- **Image Upload and Analysis**: Upload images via ImageKit for AI processing.
- **Chat Management**: Create, view, and manage chat histories.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- **Role-Based Messages**: Differentiates between user and AI messages visually.

---

## Tech Stack

### Frontend:

- **React.js**: For building the user interface.
- **React Router**: For routing and navigation.
- **Clerk React**: For authentication and user management.
- **React Query**: For state management and API data fetching.
- **ImageKit React**: For image uploads and transformations.
- **Markdown Renderer**: For rendering AI responses.

### Backend:

- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database management.
- **Mongoose**: For object modeling and schema validation.
- **Google Generative AI (Gemini)**: For AI-powered chat responses.

### Tools & Libraries:

- **ImageKit**: For media storage and delivery.
- **Clerk**: For authentication and user management.
- **dotenv**: For managing environment variables.
- **Nodemon**: For automatic server restarts during development.

---

## Folder Structure

# Frontend Structure

frontend/
└── src/
├── components/ # Reusable components (ChatList, Upload, NewPrompt, etc.)
├── layouts/ # Layouts for different pages (RootLayout, DashboardLayout)
├── pages/ # Pages like HomePage, ChatPage, Dashboard
├── lib/ # Utility functions (gemini.js for AI integration)
├── App.jsx # Main App component
├── main.jsx # React entry point
└── index.css # Global styles

# Backend Structure

backend/
└── src/
├── config/ # Configuration files (e.g., database connection setup)
├── controllers/ # Controllers for business logic (chat, image upload)
├── models/ # MongoDB models (Chat, UserChat)
├── routes/ # API route definitions
└── index.js # Server entry point

---

## Setup and Installation

### Prerequisites:

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **ImageKit Account**
- **Clerk Account**
- **Google Generative AI API Key**

### Steps:

1. Clone the repository:
   git clone https://github.com/your-repo/ai-chat-application.git
   cd ai-chat-application

# Backend

cd backend
npm install

# Frontend

cd ../frontend
npm install

# Set up environment variables:

Create .env files in both the backend and frontend folders.

Refer to the Environment Variables section.

# Start backend

cd backend
npm run dev

# Start frontend (in a new terminal)

cd ../frontend
npm run dev

# Open your browser and go to:

http://localhost:5173

#### Environment Variables

# Backend (backend/.env):

PORT=5000
MONGODB_URI=your_mongo_uri
GOOGLE_API_KEY=your_google_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Frontend (frontend/.env):

VITE_SERVER_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

---

## How to Use

1. Sign up or log in using your Clerk credentials.
2. On the dashboard, start a new chat or continue a previous one.
3. Type a prompt and submit it to get AI responses.
4. Optionally upload an image for AI analysis.
5. View and manage chat history in the sidebar.

---

## API Endpoints

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/api/v1/chats`     | Create a new chat           |
| GET    | `/api/v1/chats`     | Retrieve all user chats     |
| GET    | `/api/v1/chats/:id` | Get specific chat by ID     |
| POST   | `/api/v1/images`    | Upload and analyze an image |

---

## Key Components

- **ChatPage.jsx** – Displays chat UI and responses.
- **NewPrompt.jsx** – Input component to enter messages.
- **Upload.jsx** – Handles image upload via ImageKit.
- **gemini.js** – Integrates with Google Generative AI.
- **authMiddleware.js** – Middleware for verifying Clerk JWT tokens.

---

## Future Enhancements

- Add support for voice input using Web Speech API.
- Add message reactions and feedback collection.
- Include email login as alternative to Clerk.
- Add dark/light theme toggle.
- Deploy backend with serverless functions.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
