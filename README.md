# Reflect — Frontend

Reflect is a calm, journaling web application designed to help users write, reflect, and track their thoughts in a peaceful, distraction-free environment.

This repository contains the frontend of the Reflect application, built with React.

---

## Features
- User authentication (sign up / sign in)
- Daily inspirational quote display
- Create, edit, and delete journal entries
- Mood tracking and tag support
- Responsive design for mobile and desktop
- Modal-based forms with validation and error handling
- Persistent login using JWT

---

## Tech Stack
- React
- JavaScript (ES6+)
- CSS (custom styling, responsive layout)
- React Router
- Fetch API

---

## Getting Started

### Prerequisites
Node.js
npm or yarn

### Installation

git clone <https://github.com/lizmary0209/reflect-frontend.git>
cd reflect-frontend
npm install
npm run dev

The app will run locally at
http://localhost:5173

---

### Authentication Flow
-JWT is stored in localStorage
-Token is automatically attached to API requests
-User remains logged in after page refresh

---

### API Integration
The frontend communicates with the backend via REST API calls for:
-Authentication
-Journal entry CRUD operations
-Daily quote retrieval

---

### Frontend Demo Video
https://drive.google.com/file/d/1JlC-p9ySAa8aapVgu3yQoe7SNLADsIqL/view?usp=drive_link

---

Submission PR created for TripleTen review

---

### Author
Lizmary Chardon
Software Engineering Student — TripleTen
