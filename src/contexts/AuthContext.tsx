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
  switchUserRole: (role: Role) => void; // Para fines de demostración
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simular la comprobación de una sesión existente
    const storedUser = localStorage.getItem('comuniarteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, roleOverride?: Role) => {
    setIsLoading(true);
    // Simular llamada a la API y encontrar usuario
    let foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser && email === 'nuevo@usuario.com') { // Simular registro
      foundUser = { id: Date.now().toString(), name: 'Nuevo Usuario', email, role: 'user' };
      mockUsers.push(foundUser);
    } else if (!foundUser) {
      // Por defecto, un usuario genérico si no se encuentra, para facilitar pruebas sin correos específicos
      foundUser = { id: 'invitado', name: 'Usuario Invitado', email: 'invitado@ejemplo.com', role: 'user' };
    }

    if (foundUser) {
      const userToLogin = { ...foundUser, role: roleOverride || foundUser.role };
      setUser(userToLogin);
      localStorage.setItem('comuniarteUser', JSON.stringify(userToLogin));
      if (userToLogin.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } else {
      // Manejar fallo de inicio de sesión (ej., mostrar un toast)
      console.error('Inicio de sesión fallido: Usuario no encontrado');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('comuniarteUser');
    router.push('/login');
  };
  
  // Para fines de demostración: permitir cambiar roles de usuario fácilmente
  const switchUserRole = (role: Role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('comuniarteUser', JSON.stringify(updatedUser));
      // Navegar al panel apropiado después del cambio de rol para mejor UX
      if (role === 'admin') router.push('/admin/dashboard');
      else router.push('/dashboard');
    } else {
      // Si no hay usuario conectado, iniciar sesión como usuario por defecto con el rol especificado
      const defaultUser = mockUsers.find(u => u.role === role) || mockUsers[0]; // Recurrir al primer usuario mock
      const userToLogin = { ...defaultUser, role };
      setUser(userToLogin);
      localStorage.setItem('comuniarteUser', JSON.stringify(userToLogin));
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
