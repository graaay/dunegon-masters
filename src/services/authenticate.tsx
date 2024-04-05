import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validadeAuth } from './api';

function AuthService({ children }: any) {
    const { getToken, login, logout } = useAuth();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getToken();
            if (token) {
                try {
                    const response = await validadeAuth(token);
                    console.log('Autenticando como', response);
                    if (response) {
                        login(response); // Certifique-se de que isso ajusta o estado de autenticação conforme esperado
                    } else {
                        logout(); // Token inválido ou expirado
                    }
                } catch (error) {
                    console.error('Erro ao validar token:', error);
                    logout();
                }
            }
        };

        initializeAuth();
    }, []);

    return <>{children}</>;
}
export { AuthService }