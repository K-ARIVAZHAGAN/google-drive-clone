import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from '../../config';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.post(`${API_URL}/api/auth/verify-email`, { token });
                setStatus('success');
                toast.success('Email verified successfully!');
                // Auto-redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error(error);
                setStatus('error');
                toast.error(error.response?.data?.msg || 'Verification failed');
            }
        };

        if (token) {
            verify();
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                {status === 'verifying' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-green-600">Verified!</h2>
                        <p className="mb-6 text-gray-600">Your account has been successfully verified.</p>
                        <p className="text-sm text-gray-500 mb-6">Redirecting to login in 2 seconds...</p>
                        <Link to="/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Login Now
                        </Link>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
                        <p className="mb-6 text-gray-600">The verification link is invalid or has expired.</p>
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Back to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
