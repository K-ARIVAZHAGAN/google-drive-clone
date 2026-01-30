import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Configure axios defaults
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

    // Check valid token on load
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // You might want an endpoint /api/auth/me to get user data from token
                    // For now, we will decode or just assume valid if we have user data stored
                    // Or just wait for a 401 to logout.
                    // Let's implement a simple user persistence if we had the endpoint.
                    // For this MVP, we'll trust the token until an API call fails.
                    const savedUser = JSON.parse(localStorage.getItem('user'));
                    if (savedUser) setUser(savedUser);
                } catch (error) {
                    console.error("Auth load error", error);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                msg: error.response?.data?.msg || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, userData);
            return { success: true, msg: res.data.msg };
        } catch (error) {
            return {
                success: false,
                msg: error.response?.data?.msg || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['x-auth-token'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
