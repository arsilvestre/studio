'use client';

import { useState, useEffect } from 'react';
import type { User, Role } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EditUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUserUpdated: (updatedUser: User) => void;
}

export default function EditUserDialog({ user, isOpen, onOpenChange, onUserUpdated }: EditUserDialogProps) {
  const [formData, setFormData] = useState<Partial<User>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value as Role }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      toast({ title: "Missing Fields", description: "Name, email, and role are required.", variant: "destructive" });
      return;
    }
    
    const updatedUser: User = {
      id: formData.id!,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      avatarUrl: user?.avatarUrl // Keep original avatar or logic to update it
    };
    onUserUpdated(updatedUser);
    toast({ title: 'User Updated', description: `${updatedUser.name}'s details have been updated.` });
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Edit User: {user.name}</DialogTitle>
          <DialogDescription>Modify the user's details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" name="name" value={formData.name || ''} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" name="email" type="email" value={formData.email || ''} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="edit-role">Role</Label>
            <Select name="role" onValueChange={handleRoleChange} value={formData.role || 'user'}>
              <SelectTrigger id="edit-role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
