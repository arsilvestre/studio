'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '@/components/icons/Logo';
import { ChevronDown, LogIn, LogOut, UserCircle, Edit3, LayoutDashboard, PlusCircle, Shield } from 'lucide-react';
import type { Role } from '@/types';

export default function Header() {
  const { user, logout, isLoading, switchUserRole } = useAuth();

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'C A';
  };
  
  const handleRoleSwitch = (role: Role) => {
    switchUserRole(role);
  };

  const roleTranslations: Record<Role, string> = {
    user: "Usuario",
    creator: "Creador",
    admin: "Admin"
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-primary hover:text-accent transition-colors">
          <Logo className="h-8 w-auto text-primary" />
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="font-headline">Inicio</Button>
          </Link>
          {user && (
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="font-headline">Panel</Button>
            </Link>
          )}
          {user?.role === 'creator' && (
            <Link href="/create-post" passHref>
              <Button variant="ghost" className="font-headline">
                <PlusCircle className="mr-2 h-4 w-4" /> Crear Publicación
              </Button>
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link href="/admin/dashboard" passHref>
              <Button variant="ghost" className="font-headline">
                <Shield className="mr-2 h-4 w-4" /> Panel de Admin
              </Button>
            </Link>
          )}

          {isLoading ? (
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-headline">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi Cuenta ({user.role ? roleTranslations[user.role] : ''})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref>
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Cambiar Rol (Demo)</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => handleRoleSwitch('user')}>
                  <UserCircle className="mr-2 h-4 w-4" /> Como Usuario
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleRoleSwitch('creator')}>
                  <Edit3 className="mr-2 h-4 w-4" /> Como Creador
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleRoleSwitch('admin')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Como Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" passHref>
              <Button className="font-headline">
                <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
