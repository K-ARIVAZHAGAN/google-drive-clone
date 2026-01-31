import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import VerifyEmail from './components/Auth/VerifyEmail';
import VerifyEmailSent from './components/Auth/VerifyEmailSent';
import Dashboard from './pages/Dashboard';

// Placeholder components
// const Login = () => <div className="p-4">Login Page (To be implemented)</div>;
// const Register = () => <div className="p-4">Register Page (To be implemented)</div>;
// const Dashboard = () => <div className="p-4">Dashboard (To be implemented)</div>;

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/verify-email/:token" element={<VerifyEmail />} />
                        <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    </Routes>
                    <Toaster position="top-right" />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
