import { create } from 'apisauce';
import { Mesa, Personagem, User } from './types';
import { useAuth } from '../contexts/AuthContext';

const api = create({
  baseURL: 'http://localhost:9090',
  headers: { 'Content-Type': 'application/json' },
});

// Usuários

const defaultHeader = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,

  }
}

export const socialLogin = (user: User): Promise<User> =>
  api.post<User>('/user/social-login', user).then((response) => response.data!);

export const validadeAuth = (token: string): Promise<User> =>
  api.post<User>('/user/signed', {}, { headers: defaultHeader(token)}).then((response) => response.data!);

export const registerUser = (user: User): Promise<User> =>
  api.post<User>('/user/register', user).then((response) => response.data!);

// Mesas

export const fetchMesas = (token: string): Promise<Mesa[]> =>
  api.get<Mesa[]>
  ('/mesas', {}, { headers: defaultHeader(token) })
  .then((response) => response.data!);

export const fetchMesaById = (id: string, token: string): Promise<Mesa[]> =>
  api.get<Mesa[]>
  ('/mesas/by-id', { id: id }, { headers: defaultHeader(token) })
  .then((response) => response.data!);

export const addMesa = (mesaData: Mesa, token: string): Promise<Mesa> =>
  api.post<Mesa>
  ('/mesas', mesaData, { headers: defaultHeader(token) })
  .then((response) => response.data!);

export const editMesa = (id: string, mesaData: Mesa, token: string): Promise<Mesa> =>
  api.put<Mesa>
  ('/mesas', mesaData, { headers: defaultHeader(token) })
  .then((response) => response.data!);

// Personagens

export const fetchPersonagens = (idMesa: string, token: string): Promise<Personagem[]> =>
  api.get<Personagem[]>
  ('/personagens', { idMesa: idMesa }, { headers: defaultHeader(token) })
  .then((response) => response.data!);

export const fetchPersonagensById = (mesaId: string, id: string, token: string): Promise<Personagem> =>
  api.get<Personagem>
  ('/personagens/by-id', { mesaId: mesaId, id: id }, { headers: defaultHeader(token) })
  .then((response) => response.data!);

export const addPersonagem = (personagemData: Personagem, token: string): Promise<Personagem> =>
  api.post<Personagem>
  ('/personagens', personagemData, { headers: defaultHeader(token) })
  .then((response) => response.data!);

export const editPersonagem = (personagemData: Personagem, token: string): Promise<Mesa> =>
  api.put<Mesa>
  ('/personagens', personagemData, { headers: defaultHeader(token) })
  .then((response) => response.data!);


export default api;
