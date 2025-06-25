import React, { createContext, useContext, useState, useEffect } from 'react';

// API url
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // set up axios with token for authenticated requests
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    // login function
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                email,
                password,
            });
            const { token, data } = response.data;
            setToken(token);
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // signup function
    const signup = async (name, email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/users/signup`, {
                name,
                email,
                password,
            });
            const { token, data } = response.data;
            setToken(token);
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // logout function
    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    // Context value
    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}