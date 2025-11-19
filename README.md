# 🌾 KrishiLink – Farmer’s Growth & Connection Platform

<div align="center">

[![Live Client](https://img.shields.io/badge/Live-Client-2ea44f?style=for-the-badge&logo=netlify)](https://stalwart-kitsune-8da5a7.netlify.app/)
[![Live Server](https://img.shields.io/badge/Live-Server-000000?style=for-the-badge&logo=vercel)](https://krishi-link-server-pi.vercel.app/)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

<br />

**KrishiLink** is a modern agricultural social networking platform that redefines how farmers, traders, and consumers interact. Instead of a traditional buyer–seller model, KrishiLink creates a **social agro-network** where users can showcase crops, collaborate, and build meaningful business connections.

---

## 🚀 Key Features

### 🌱 Agro-Social Networking
- **Post & Showcase:** Farmers can post crops they grow or sell with details.
- **Browse & Discover:** Advanced search and filtering for all available crops.
- **Connect:** Send "Interests" to crop owners to initiate a deal.
- **Smart Quantity Management:** Auto-updates crop quantity when an interest is accepted.

### 🔐 Security & User Experience
- **Authentication:** Firebase Email/Password & Google Sign-In.
- **Private Routes:** Protected dashboards for crop management.
- **SPA Optimized:** No route reload errors; smooth transitions.
- **Feedback:** Custom Toasts (SweetAlert2) replacing default browser alerts.
- **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.

### 🛠️ Management (CRUD)
- **Create:** Add new crop listings.
- **Read:** View details, price calculation, and owner info.
- **Update:** Edit crop details or profile information.
- **Delete:** Remove listings or cancel sent interests.

---

## 🛠️ Tech Stack

| **Category** | **Technologies Used** |
| :--- | :--- |
| **Frontend** | React, React Router, TailwindCSS, Axios, Swiper Slider, SweetAlert2 |
| **Backend** | Node.js, Express.js, JWT (Optional), Vercel Serverless Functions |
| **Database** | MongoDB (Native Driver / Mongoose) |
| **Auth** | Firebase Authentication |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/crops` | Add a new crop listing |
| `GET` | `/crops` | Retrieve all crop listings |
| `GET` | `/crops/:id` | Get specific crop details |
| `PUT` | `/crops/:id` | Update crop information |
| `DELETE` | `/crops/:id` | Remove a crop listing |
| `POST` | `/interests` | Send interest to a crop owner |
| `PUT` | `/interest/status` | Accept or Reject a received interest |

---

## 📂 Project Structure

```bash
/krishilink
├── /client             # React Frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /hooks
│   │   ├── /context
│   │   ├── /routes
│   │   └── firebase.js
├── /server             # Node/Express Backend
│   ├── /routes
│   ├── /controllers
│   ├── /configs
│   ├── index.js
│   └── package.json

## 🖥️ Local Setup Guide

Follow these steps to run the project locally.

### 1. Backend Setup (Server)

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
Configure Environment Variables: Create a .env file in the /server folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
npm start
# OR for development (if nodemon is installed)
nodemon index.js

Frontend Setup (Client)
cd client
npm install

Configure Environment Variables:Create a .env file in the /client folder:Code snippetVITE_apiUrl=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Start the Client:
npm run dev
Client runs at http://localhost:5173
📬 Contact
If you have any questions or feedback, feel free to reach out!

Live Demo: KrishiLink

API Server: KrishiLink Server
