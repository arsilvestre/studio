'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostCard from '@/components/shared/PostCard';
import { mockPosts } from '@/lib/placeholder-data';
import type { Post, Role } from '@/types';
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
        <p className="ml-4 text-xl font-headline">Cargando Panel...</p>
      </div>
    );
  }

  if (!user) {
    return null; // O un mensaje de redirección, aunque useEffect maneja la redirección
  }
  
  const userPosts: Post[] = mockPosts.filter(post => post.creatorId === user.id);

  const roleTranslations: Record<Role, string> = {
    user: "Usuario",
    creator: "Creador",
    admin: "Administrador"
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">¡Bienvenido a tu Panel, {user.name}!</CardTitle>
          <CardDescription>Aquí tienes un resumen de tu actividad en ComuniArte. Tu rol actual es: <span className="font-semibold text-accent">{user.role ? roleTranslations[user.role] : ''}</span></CardDescription>
        </CardHeader>
        <CardContent>
          {user.role === 'creator' && (
            <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-headline mb-2">Herramientas de Creador</h3>
              <p className="text-muted-foreground mb-4">Comparte tu último trabajo y conecta con tu audiencia.</p>
              <Button asChild className="font-headline">
                <Link href="/create-post"><PlusCircle className="mr-2 h-4 w-4" /> Crear Nueva Publicación</Link>
              </Button>
            </div>
          )}
          {user.role === 'user' && (
            <p className="text-lg text-foreground">¡Explora contenido, conecta con creadores y disfruta de ComuniArte!</p>
          )}
           {user.role === 'admin' && (
             <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-headline mb-2">Acceso de Administrador</h3>
              <p className="text-muted-foreground mb-4">Tienes privilegios de administrador. Accede al panel de administración para gestionar usuarios y contenido.</p>
              <Button asChild className="font-headline">
                <Link href="/admin/dashboard">Ir al Panel de Admin</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {user.role === 'creator' && userPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4">Tus Publicaciones Recientes</h2>
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
                <h3 className="text-xl font-headline mb-2">Aún no hay Publicaciones</h3>
                <p className="text-muted-foreground mb-4">¡Empieza a compartir tus creaciones con el mundo!</p>
                 <Button asChild className="font-headline">
                    <Link href="/create-post"><PlusCircle className="mr-2 h-4 w-4" /> Crea tu Primera Publicación</Link>
                </Button>
              </div>
            </CardContent>
         </Card>
      )}

    </div>
  );
}
