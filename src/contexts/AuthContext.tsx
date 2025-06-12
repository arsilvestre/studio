'use client';

import type { User, Role } from '@/types';
import { mockUsers } from '@/lib/placeholder-data';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, roleOverride?: Role) => void;
  logout: () => void;
  isLoading: boolean;
  switchUserRole: (role: Role) => void; // For demo purposes
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUser = localStorage.getItem('nexusUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, roleOverride?: Role) => {
    setIsLoading(true);
    // Simulate API call & find user
    let foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser && email === 'new@user.com') { // Simulate signup
      foundUser = { id: Date.now().toString(), name: 'New User', email, role: 'user' };
      mockUsers.push(foundUser);
    } else if (!foundUser) {
      // Default to a generic user if not found, for easier testing without specific emails
      foundUser = { id: 'guest', name: 'Guest User', email: 'guest@example.com', role: 'user' };
    }

    if (foundUser) {
      const userToLogin = { ...foundUser, role: roleOverride || foundUser.role };
      setUser(userToLogin);
      localStorage.setItem('nexusUser', JSON.stringify(userToLogin));
      if (userToLogin.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } else {
      // Handle login failure (e.g., show a toast)
      console.error('Login failed: User not found');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexusUser');
    router.push('/login');
  };
  
  // For demo purposes: allow switching user roles easily
  const switchUserRole = (role: Role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('nexusUser', JSON.stringify(updatedUser));
      // Navigate to appropriate dashboard after role switch for better UX
      if (role === 'admin') router.push('/admin/dashboard');
      else router.push('/dashboard');
    } else {
      // If no user is logged in, log in as a default user with the specified role
      const defaultUser = mockUsers.find(u => u.role === role) || mockUsers[0]; // Fallback to first mock user
      const userToLogin = { ...defaultUser, role };
      setUser(userToLogin);
      localStorage.setItem('nexusUser', JSON.stringify(userToLogin));
      if (role === 'admin') router.push('/admin/dashboard');
      else router.push('/dashboard');
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, switchUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
