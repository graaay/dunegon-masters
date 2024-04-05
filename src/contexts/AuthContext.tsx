import { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User } from '../services/types';
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext<{ 
    user: User | null; 
    login: (userData: User | null) => void; 
    logout: () => void ;
    getToken: () => string | undefined;
}>({ 
    user: null, 
    login: () => { }, 
    logout: () => { } ,
    getToken: () => undefined
});

export function useAuth() {
    return useContext(AuthContext);
}

function saveToken(token: string) {
    Cookies.set('jwtDungeonMasters', token, { expires: 7, secure: false, sameSite: 'strict' });
    // 'expires' define a validade do cookie em dias
    // 'secure' garante que o cookie seja enviado apenas em solicitações HTTPS
    // 'sameSite' protege contra ataques CSRF
}

function removeToken() {
    Cookies.remove('jwtDungeonMasters');
  }

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User | null) => {
        setUser(userData);
        saveToken(userData!.token!)
    };

    const logout = () => {
        setUser(null);
        removeToken();
    };

    const getToken = (): string | undefined => {
        return Cookies.get('jwtDungeonMasters');
    }

    const value = {
        user,
        login,
        logout,
        getToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}