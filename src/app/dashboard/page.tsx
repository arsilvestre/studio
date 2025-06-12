'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostCard from '@/components/shared/PostCard';
import { mockPosts } from '@/lib/placeholder-data'; // Assuming you might want to show posts by the user
import type { Post } from '@/types';
import { Loader2, AlertTriangle, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl font-headline">Loading Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Or a redirect message, though useEffect handles redirect
  }
  
  // Filter posts created by the current user, relevant for creators
  const userPosts: Post[] = mockPosts.filter(post => post.creatorId === user.id);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Welcome to your Dashboard, {user.name}!</CardTitle>
          <CardDescription>Here's an overview of your NexusConnect activity. Your current role is: <span className="font-semibold text-accent">{user.role}</span></CardDescription>
        </CardHeader>
        <CardContent>
          {user.role === 'creator' && (
            <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-headline mb-2">Creator Tools</h3>
              <p className="text-muted-foreground mb-4">Share your latest work and connect with your audience.</p>
              <Button asChild className="font-headline">
                <Link href="/create-post"><PlusCircle className="mr-2 h-4 w-4" /> Create New Post</Link>
              </Button>
            </div>
          )}
          {user.role === 'user' && (
            <p className="text-lg text-foreground">Explore content, connect with creators, and enjoy NexusConnect!</p>
          )}
           {user.role === 'admin' && (
             <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-headline mb-2">Admin Access</h3>
              <p className="text-muted-foreground mb-4">You have admin privileges. Access the admin panel to manage users and content.</p>
              <Button asChild className="font-headline">
                <Link href="/admin/dashboard">Go to Admin Panel</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {user.role === 'creator' && userPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4">Your Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {user.role === 'creator' && userPosts.length === 0 && (
         <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-headline mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground mb-4">Start sharing your creations with the world!</p>
                 <Button asChild className="font-headline">
                    <Link href="/create-post"><PlusCircle className="mr-2 h-4 w-4" /> Create Your First Post</Link>
                </Button>
              </div>
            </CardContent>
         </Card>
      )}

    </div>
  );
}
