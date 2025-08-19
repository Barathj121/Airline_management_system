import type { User } from '../data/dummyData';
import { dummyUsers } from '../data/dummyData';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message: string;
  token?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  // Login function
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    await delay(1000); // Simulate network delay
    
    const user = dummyUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      return {
        success: true,
        user: user,
        message: 'Login successful',
        token: `fake-jwt-token-${user.id}`
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }
  },

  // Logout function
  logout: async (): Promise<{ success: boolean; message: string }> => {
    await delay(500);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('auth-token') !== null;
  },

  // Save user session
  saveSession: (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('auth-token', token);
  }
};
