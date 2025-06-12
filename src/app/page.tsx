'use client';

import PostCard from '@/components/shared/PostCard';
import { mockPosts } from '@/lib/placeholder-data';
import type { Post } from '@/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate fetching posts
    setPosts(mockPosts);
  }, []);

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-card rounded-lg shadow-lg">
        <h1 className="text-5xl font-headline font-bold text-primary mb-4">Welcome to NexusConnect</h1>
        <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
          The premier platform for creators and innovators to share, connect, and grow.
        </p>
        {!user && (
          <div className="space-x-4">
            <Button asChild size="lg" className="font-headline">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-headline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-3xl font-headline font-semibold mb-6 text-center">Latest Activity</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No posts yet. Be the first to share!</p>
        )}
      </section>
    </div>
  );
}
