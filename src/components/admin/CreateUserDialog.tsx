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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

interface CreateUserDialogProps {
  onUserCreated: (newUser: User) => void;
  triggerButton?: React.ReactNode;
}

const initialFormState = { name: '', email: '', role: 'user' as Role, password: '' };

export default function CreateUserDialog({ onUserCreated, triggerButton }: CreateUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState); // Reset form when dialog opens
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value as Role }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    // Simulate API call & user creation
    const newUser: User = {
      id: Date.now().toString(), // Mock ID
      name: formData.name,
      email: formData.email,
      role: formData.role,
      avatarUrl: `https://placehold.co/100x100.png?text=${formData.name.substring(0,2).toUpperCase()}`
    };
    onUserCreated(newUser);
    toast({ title: 'User Created', description: `${newUser.name} has been added.` });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton ? triggerButton : (
          <Button className="font-headline">
            <PlusCircle className="mr-2 h-4 w-4" /> Create User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Create New User</DialogTitle>
          <DialogDescription>Fill in the details to add a new user to the platform.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select name="role" onValueChange={handleRoleChange} value={formData.role}>
              <SelectTrigger id="role">
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
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
