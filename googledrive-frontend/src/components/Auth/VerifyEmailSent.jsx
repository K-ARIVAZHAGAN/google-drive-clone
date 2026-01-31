import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmailSent = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center space-y-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>

                <p className="text-gray-600">
                    We've sent a verification link to your email address. Please check your inbox (and spam folder) and click the link to activate your account.
                </p>

                <div className="pt-4">
                    <Link to="/login" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Back to Login
                    </Link>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    Did not receive the email? <Link to="/register" className="text-blue-600 hover:underline">Try registering again</Link> or contact support.
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailSent;
