# Google Drive Clone - MERN Stack Project

**Live Frontend (Vercel):** [https://google-drive-clone-three-alpha.vercel.app](https://google-drive-clone-three-alpha.vercel.app)
**Live Backend (Render):** [https://google-drive-clone-2ga6.onrender.com](https://google-drive-clone-2ga6.onrender.com)

---

## 1. What is Google Drive?

Google Drive is a file storage and synchronization service developed by Google. It allows users to store files on their servers, synchronize files across devices, and share files.
**In this application:** We have replicated this core functionality, allowing users to store, manage, and retrieve files from any internet-connected device without downloading a desktop application.

---

## 2. How do I Develop a Google Drive Application?

This project implements the complete development lifecycle as requested:

### A. Authentication System
We designed a complete system covering Login, Registration, and Forgot Password.

*   **User Data:** Stored in MongoDB Atlas.
    *   `firstName` & `lastName`: Collected during registration.
    *   `email`: Used as the unique Username.
    *   `password`: Encrypted using **bcryptjs** before storage.
*   **Two-Step Activation Workflow:**
    1.  **Sign Up:** User enters details. An account is created with `isVerified: false`.
    2.  **Email Activation:** We use **Resend API** to send a verification link with a randomized token.
    3.  **Activation:** Clicking the link verifies the token and updates the user to `isVerified: true`.
    4.  **Login Guard:** Unverified users are blocked from logging in with a specific error message.
*   **Forgot Password Flow:**
    1.  User clicks "Forgot Password" and enters their email.
    2.  System validates email and sends a reset link (with a temporary token).
    3.  User clicks link, enters new password.
    4.  System updates password (hashed) and invalidates the token.

### B. Dashboard & Application Logic

*   **Dashboard Design:**
    *   Built with **React** and **Tailwind CSS**.
    *   Displays Folders and Files in a grid layout.
    *   Shows creation timestamps for all items.
*   **Folder Management:**
    *   (+) Button allows users to create nested folders.
    *   Folder hierarchy is managed via `parentFolderId` in MongoDB.
*   **File Upload & Storage (AWS S3):**
    *   **Drag & Drop:** Implemented using `react-dropzone`.
    *   **Storage:** Files are uploaded effectively to a **private AWS S3 Bucket**.
    *   **Security:** Users can only view/download their *own* files.
    *   **Metadata:** File path, size, type, and ownership linked in MongoDB.

---

## 3. Technology Stack

*   **Frontend:** React.js, Tailwind CSS, Axios, React Router, React Hot Toast.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB Atlas (Cloud NoSQL Database).
*   **Storage:** AWS S3 (Amazon Simple Storage Service).
*   **Email:** Resend API (Transactional Email Service).
*   **Deployment:** Vercel (Frontend) & Render (Backend).

---

## 4. Setup & Submission Details

**Github Repositories:**
*   Frontend: `https://github.com/K-Arivazhagan/google-drive-clone/tree/master/googledrive-frontend`
*   Backend: `https://github.com/K-Arivazhagan/google-drive-clone/tree/master/googledrive-backend`

**Last Committed Hash ID:**
`109b8b0ca2c83ee57ae572207938de81b76fa42e7` (Refer to `submission.txt` for latest)

### How to Run Locally

1.  **Clone Repo:** `git clone https://github.com/K-Arivazhagan/google-drive-clone.git`
2.  **Backend:**
    *   `cd googledrive-backend`
    *   `npm install`
    *   Configure `.env` (MONGO_URI, AWS_KEYS, RESEND_KEY)
    *   `npm run dev`
3.  **Frontend:**
    *   `cd googledrive-frontend`
    *   `npm install`
    *   `npm run dev`
