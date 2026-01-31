# Google Drive Clone - MERN Stack Project

**Deployed Application:** [Launch Google Drive Clone](https://google-drive-clone-three-alpha.vercel.app)
**Backend API:** [Render API Health Check](https://google-drive-clone-2ga6.onrender.com)

---

## 1. What is Google Drive?
Google Drive is a file storage and synchronization service developed by Google. It allows users to store files on their servers, synchronize files across devices, and share files. Ideally, this clone replicates the core functionality: **storing files in the cloud from any Internet-connected computer without downloading an app.**

---

## 2. Technical Implementation & Features

This application is a full-stack clone built using **React (Frontend)** and **Node.js (Backend)**. It implements the following core pillars:

### A. Authentication System
A complete, secure authentication flow is implemented to ensure data privacy.
*   **Registration:**
    *   Collects: `First Name`, `Last Name`, `Email`, `Password`.
    *   **Email Verification:** A two-step activation workflow. An inactive account is created upon sign-up. An email containing a verification link is sent via **Resend API** (bypassing cloud SMTP blocks). The user *must* click this link to activate the account.
    *   **Security:** Passwords are encrypted using `bcryptjs` before storage.
    *   **Validation:** Checks for unique email addresses. Unregistered/Unverified users cannot login.
*   **Login:**
    *   Secure login using JWT (JSON Web Tokens) for session management.
*   **Forgot Password:**
    *   Users can request a password reset link via email.
    *   Validates email existence -> Sends Token -> Updates Password in Database.

### B. Dashboard & File Management
The core application interface ("The Drive").
*   **S3 Integration:** All files uploaded are stored securely in an **AWS S3 Bucket** (Private).
*   **File Upload:** Drag & Drop interface (using `react-dropzone`) allows easy uploading of files.
*   **Folder System:** Users can create folders to organize content. Folder and file metadata is stored in **MongoDB Atlas**.
*   **Visualization:** Files and folders are displayed with timestamps.
*   **Navigation:** Breadcrumb navigation allows users to traverse their folder hierarchy.

---

## 3. Technology Stack

*   **Frontend:** React.js, Tailwind CSS (UI Design), React Router (Navigation), Axios (API Communication), React Hot Toast (Notifications).
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB Atlas ( Cloud Database for User & Metadata storage).
*   **File Storage:** AWS S3 (Amazon Simple Storage Service).
*   **Email Service:** Resend API (Transactional Emails for Verification/Reset).
*   **Deployment:**
    *   **Frontend:** Vercel
    *   **Backend:** Render

---

## 4. Setup & Installation

### Prerequisites
*   Node.js & npm installed
*   MongoDB Atlas Account
*   AWS S3 Bucket (Access Key & Secret Key)

### Local Development

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/K-Arivazhagan/google-drive-clone.git
    cd google-drive-clone
    ```

2.  **Backend Setup**
    ```bash
    cd googledrive-backend
    npm install
    # Create .env file with: MONGO_URI, JWT_SECRET, AWS_KEYS, CLIENT_URL, RESEND_API_KEY
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd googledrive-frontend
    npm install
    # Create .env file with: VITE_API_URL=http://localhost:5001
    npm run dev
    ```

---

## 5. Submission Details

**Frontend Repository:** `https://github.com/K-Arivazhagan/google-drive-clone` (Folder: googledrive-frontend)
**Backend Repository:** `https://github.com/K-Arivazhagan/google-drive-clone` (Folder: googledrive-backend)

**Live Frontend URL:** https://google-drive-clone-three-alpha.vercel.app
**Live Backend URL:** https://google-drive-clone-2ga6.onrender.com
