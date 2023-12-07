# MERN Stack Blog App

This project is a full-stack blog application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to publish and manage blog content.

## Features

- **User Authentication:** Users can sign up, log in, and access their accounts to create and manage blog posts.
- **Create and Edit Posts:** Authenticated users can create new blog posts and edit existing ones.
- **Rich Text Editing:** Utilizes React Quill for a user-friendly rich text editing experience.
- **Responsive Design:** The frontend is designed to be responsive and accessible on various devices.
- **RESTful API:** Implements a RESTful API architecture for communication between the frontend and backend.

## Technologies Used

### Server-side

- **Express**: Handles HTTP requests and API routes.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: For user authentication and token generation.
- **multer**: Middleware for handling file uploads.
- **cors**: Express middleware for enabling CORS (Cross-Origin Resource Sharing).
- **cookie-parser**: Parses cookies attached to the client request.

### Client-side

- **React**: Frontend library for building user interfaces.
- **React Router DOM**: For routing within the React application.
- **axios**: HTTP client for making requests to the backend API.
- **React Quill**: Used for rich text editing.
- **date-fns**: Library for date manipulation and formatting.
- **js-cookie**: Library for handling browser cookies.
- **universal-cookie**: Provides universal access to cookies on both the client and server.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Running the Application

1. Clone this repository to your local machine.
2. Navigate to the `server` directory and run `npm install` to install server-side dependencies.
3. Start the server by running `nodemon index.js`.
4. Navigate to the `client` directory and run `npm install` to install client-side dependencies.
5. Start the client by running `npm start`.
6. Access the application in your browser at `http://localhost:3000`.

## Usage

1. Create an account or log in to access the blog features.
2. Create, edit, and manage your blog posts.
3. Enjoy writing and publishing your content!
