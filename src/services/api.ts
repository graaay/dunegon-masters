import { create } from 'apisauce';
import { Mesa, PersonagemRequest, Personagem, User } from './types';

const api = create({
  baseURL: 'http://localhost:9090',
  headers: { 'Content-Type': 'application/json' },
});

// Usuários

export const socialLogin = (user: User): Promise<User> =>
  api.post<User>('/user/social-login', user).then((response) => response.data!);

export const registerUser = (user: User): Promise<User> =>
  api.post<User>('/user/register', user).then((response) => response.data!);

// Mesas

export const fetchMesas = (): Promise<Mesa[]> =>
  api.get<Mesa[]>('/mesas').then((response) => response.data!);

export const fetchMesaById = (id: string): Promise<Mesa[]> =>
  api.get<Mesa[]>('/mesas/by-id', {id: id}).then((response) => response.data!);

export const addMesa = (mesaData: Mesa): Promise<Mesa> =>
  api.post<Mesa>('/mesas', mesaData).then((response) => response.data!);

export const editMesa = (id: string, mesaData: Mesa): Promise<Mesa> =>
  api.put<Mesa>('/mesas', mesaData).then((response) => response.data!);

// Personagens

export const fetchPersonagens = (idMesa: string): Promise<Personagem[]> =>
  api.get<Personagem[]>('/personagens', {idMesa: idMesa}).then((response) => response.data!);
  
export const fetchPersonagensById = (mesaId: string, id: string): Promise<Personagem> =>
  api.get<Personagem>('/personagens/by-id', {mesaId: mesaId, id: id}).then((response) => response.data!);

export const addPersonagem = (personagemData: PersonagemRequest): Promise<Personagem> =>
  api.post<Personagem>('/personagens', personagemData).then((response) => response.data!);

export const editPersonagem = (id: string, personagemData: PersonagemRequest): Promise<Mesa> =>
  api.put<Mesa>('/personagens', personagemData).then((response) => response.data!);

export const abrirFichaPersonagem = (id: string, idPersonagem: string): Promise<Personagem[]> =>
  api.get<Personagem[]>('/personagens/ficha', {id: id, idPersonagem: idPersonagem}).then((response) => response.data!);

export default api;
