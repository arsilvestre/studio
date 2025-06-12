'use client';

import type { User, Role } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { MoreHorizontal, Edit, Trash2, ShieldCheck, UserCog, UserIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Dispatch, SetStateAction } from 'react';

interface UserManagementTableProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const RoleIcon = ({ role }: { role: Role }) => {
  switch (role) {
    case 'admin': return <ShieldCheck className="h-4 w-4 text-destructive" />;
    case 'creator': return <UserCog className="h-4 w-4 text-accent" />;
    case 'user': return <UserIcon className="h-4 w-4 text-primary" />;
    default: return null;
  }
};

const RoleBadge = ({ role }: { role: Role }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let roleText = role.charAt(0).toUpperCase() + role.slice(1);

  if (role === 'admin') {
    variant = 'destructive';
    roleText = 'Admin';
  } else if (role === 'creator') {
    variant = 'secondary';
    roleText = 'Creador';
  } else {
    roleText = 'Usuario';
  }
  
  return <Badge variant={variant} className="capitalize">{roleText}</Badge>;
};


export default function UserManagementTable({ users, setUsers, onEditUser, onDeleteUser }: UserManagementTableProps) {
  
  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'NU';
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="avatar usuario" />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-headline">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <RoleIcon role={user.role} />
                    <RoleBadge role={user.role} />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEditUser(user)}>
                        <Edit className="mr-2 h-4 w-4" /> Editar Usuario
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDeleteUser(user.id)}
                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar Usuario
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from '@/components/ui/card';
