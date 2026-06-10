import api from './axiosInstance';
import type { User, AuthResponse } from '@/shared/types';

export const authApi = {
  login: (email: string, password: string) => api.post<AuthResponse>('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) => api.post<AuthResponse>('/auth/register', { name, email, password }),
  me: () => api.get<User>('/auth/me')
};
