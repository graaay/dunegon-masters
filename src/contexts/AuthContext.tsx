import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../services/types';
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext<{ 
    user: User | null; 
    login: (userData: User | null) => void; 
    logout: () => void 
}>({ 
    user: null, 
    login: () => { }, 
    logout: () => { } 
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    // const navigate = useNavigate();

    const login = (userData: User | null) => {
        setUser(userData);
        // navigate(`/Home`);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}