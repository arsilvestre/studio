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
    // Simular la carga de publicaciones
    setPosts(mockPosts);
  }, []);

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-card rounded-lg shadow-lg">
        <h1 className="text-5xl font-headline font-bold text-primary mb-4">Bienvenido a ComuniArte</h1>
        <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
          La plataforma principal para que creadores e innovadores compartan, conecten y crezcan.
        </p>
        {!user && (
          <div className="space-x-4">
            <Button asChild size="lg" className="font-headline">
              <Link href="/signup">Empezar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-headline">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-3xl font-headline font-semibold mb-6 text-center">Actividad Reciente</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Aún no hay publicaciones. ¡Sé el primero en compartir!</p>
        )}
      </section>
    </div>
  );
}
