import axios from 'axios';
import { 
  LoginCredentials, 
  LoginResponse, 
  User, 
  UserUpdate, 
  UsersResponse 
} from '../types';

const API_URL = 'https://reqres.in/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', credentials);
  return response.data;
};

// Users
export const getUsers = async (page: number = 1): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(`/users?page=${page}`);
  return response.data;
};

export const getUserById = async (id: number): Promise<{ data: User }> => {
  const response = await api.get<{ data: User }>(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: number, userData: UserUpdate): Promise<User> => {
  const response = await api.put<{ data: User }>(`/users/${id}`, userData);
  return response.data.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export default api;