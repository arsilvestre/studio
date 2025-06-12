'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { mockUsers } from '@/lib/placeholder-data';
import UserManagementTable from '@/components/admin/UserManagementTable';
import CreateUserDialog from '@/components/admin/CreateUserDialog';
import EditUserDialog from '@/components/admin/EditUserDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching users
    setUsers(mockUsers);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleUserCreated = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditUserDialogOpen(true);
  };
  
  const handleUserUpdated = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  const handleDeleteUserConfirmation = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) setUserToDelete(user);
  }

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
    toast({ title: "User Deleted", description: `${userToDelete.name} has been removed.`});
    setUserToDelete(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-headline font-bold text-primary">User Management</h1>
        <CreateUserDialog onUserCreated={handleUserCreated} 
          triggerButton={
            <Button className="font-headline">
              <UserPlus className="mr-2 h-5 w-5" /> Add New User
            </Button>
          }
        />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
        />
      </div>

      <UserManagementTable 
        users={filteredUsers} 
        setUsers={setUsers} 
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUserConfirmation}
      />

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={isEditUserDialogOpen}
          onOpenChange={setIsEditUserDialogOpen}
          onUserUpdated={handleUserUpdated}
        />
      )}

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline">Are you sure you want to delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user <span className="font-semibold">{userToDelete?.name}</span> and remove their data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
