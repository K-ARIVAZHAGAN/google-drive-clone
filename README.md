# Google Drive Clone

A full-stack storage application inspired by Google Drive, built with the MERN stack (MongoDB, Express, React, Node.js). It features secure user authentication, file uploads to AWS S3, folder management, and a responsive UI.

![Project Status](https://img.shields.io/badge/status-completed-green)
![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)

## 🚀 Features

*   **User Authentication**:
    *   Secure Registration & Login (JWT Auth).
    *   **Email Verification** using Nodemailer.
    *   **Forgot/Reset Password** functionality.
*   **File Management**:
    *   **Upload**: Drag & Drop or Button upload to **AWS S3**.
    *   **Download**: Secure file access via AWS Presigned URLs.
    *   **Organize**: Create folders and navigate through breadcrumbs.
    *   **File Types**: Supports images, documents, and more with dynamic icons.
*   **Modern UI/UX**:
    *   Built with **Tailwind CSS** for a clean, responsive design.
    *   Toast notifications for user feedback.

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite), Tailwind CSS, Axios, React Router, React Icons.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB Atlas (Cloud).
*   **Storage**: AWS S3 (Cloud Object Storage).
*   **Security**: BCrypt (Password Hashing), JWT (Sessions).
*   **Tools**: Git, Nodemailer.

## ⚙️ Environment Configuration

The application requires environment variables for both Client and Server.

### Backend (`googledrive-backend/.env`)
```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region
# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=*
```

### Frontend (`googledrive-frontend/.env`)
```env
# URL of the deployed backend (or localhost for development)
VITE_API_URL=https://your-backend-url.onrender.com
# OR for local: http://localhost:5001
```

## 📦 Startup Guide

### 1. Install Dependencies
```bash
# Backend
cd googledrive-backend
npm install

# Frontend
cd googledrive-frontend
npm install
```

### 2. Run Locally
```bash
# Start Backend (Port 5001)
cd googledrive-backend
npm run dev

# Start Frontend (Port 5173)
cd googledrive-frontend
npm run dev
```

## ☁️ Deployment

*   **Frontend**: Deployed on Vercel.
*   **Backend**: Deployed on Render.
*   **Database**: MongoDB Atlas.

## 📝 Author
**K-ARIVAZHAGAN** - [GitHub Profile](https://github.com/K-ARIVAZHAGAN)
