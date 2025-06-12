'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CreatePostForm from '@/components/creator/CreatePostForm';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreatePostPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'creator') {
        router.push('/dashboard'); // Or an access denied page
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'creator') {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl font-headline">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Create a New Post</CardTitle>
          <CardDescription>Share your latest thoughts, images, or videos with the NexusConnect community.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </div>
  );
}
