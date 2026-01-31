# Google Drive Clone

A full-stack implementation of a cloud storage service, built with the MERN stack (MongoDB, Express, React, Node.js) and AWS S3. This application replicates core Google Drive functionalities, allowing users to store, organize, and access files securely from any device.

**Live Frontend:** [https://google-drive-clone-three-alpha.vercel.app](https://google-drive-clone-three-alpha.vercel.app)
**Live Backend:** [https://google-drive-clone-2ga6.onrender.com](https://google-drive-clone-2ga6.onrender.com)

> [!IMPORTANT]
> **Free Tier Cold Start:** The Backend is hosted on Render's Free Tier, which "sleeps" after inactivity.
> **PLEASE CLICK THE BACKEND LINK ABOVE FIRST** and wait for it to say "Google Drive Clone API is running" before using the Frontend.
> This ensures the server is awake and ready to handle requests.

---

## 🚀 System Features & Architecture

This system is designed with a focus on Security, Scalability, and User Experience.

### 🔐 1. Advanced Authentication System
Complete user lifecycle management with security best practices.
*   **Secure Registration:** User data (Name, Email, Password) is validated and passwords are securely hashed using **bcryptjs**.
*   **Two-Step Verification Workflow:**
    *   **Inactive State:** Upon signup, accounts are created as `inactive`.
    *   **Email Activation:** Integrated with **Resend API** to send a unique, time-sensitive verification link.
    *   **Login Guard:** The system strictly prevents unverified users from authenticating.
*   **Forgot Password:** Secure token-based flow allowing users to reset credentials via email verification.

### 📂 2. Core Application & Dashboard
*   **Responsive UI:** Built with **React** and **Tailwind CSS**, featuring a fluid grid layout that adapts to all screen sizes (Desktop, Tablet, Mobile).
*   **Mobile-First Design:** Includes a slide-out Hamburger Menu for seamless mobile navigation.
*   **Folder Management:** Users can create limitless nested folders to organize content. The hierarchy is maintained via recursive parent references in MongoDB.
*   **Real-time Feedback:** Integrated notifications (Toast) for all actions (Uploads, Deletions, Errors).

### ☁️ 3. Cloud Storage Engine (AWS S3)
*   **Drag & Drop Uploads:** Intuitive interface for uploading files directly to the cloud.
*   **Private Bucket Storage:** Files are stored in a **private AWS S3 bucket**.
*   **Security Policies:** Strict IAM policies ensure users can only view or download their *own* files.
*   **Metadata Sync:** While the binary file lives in AWS, its metadata (paths, timestamps, ownership) is indexed in MongoDB Atlas for fast retrieval.

---

## 🛠️ Technology Stack

*   **Frontend:** React.js, Tailwind CSS, Axios, React Router, React Hot Toast.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB Atlas (Cloud NoSQL).
*   **Storage:** AWS S3 (Amazon Simple Storage Service).
*   **Email:** Resend API (Transactional Email).
*   **Deployment:** Vercel (Client) & Render (Server).

---

## 📸 Demo Output
*Screenshots of the system functionalities are available in the `demo output screen shots` folder.*

---

## ⚙️ Local Development Setup

1.  **Clone Repository:**
    ```bash
    git clone https://github.com/K-Arivazhagan/google-drive-clone.git
    ```

2.  **Backend Setup:**
    ```bash
    cd googledrive-backend
    npm install
    # Create .env with: MONGO_URI, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, RESEND_API_KEY
    npm run dev
    ```

3.  **Frontend Setup:**
    ```bash
    cd googledrive-frontend
    npm install
    npm run dev
    ```

