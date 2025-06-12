'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/PostCard';
import { mockPosts } from '@/lib/placeholder-data';
import type { Post, Role } from '@/types';
import { Loader2, Edit, Mail, UserCircle, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importar locale español

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // Mock de fecha de registro
  const [joinDate, setJoinDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (user) {
      if (user.role === 'creator') {
        setUserPosts(mockPosts.filter(post => post.creatorId === user.id));
      }
      // Simular fecha de registro
      setJoinDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 365))); // Fecha aleatoria en el último año
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl font-headline">Cargando Perfil...</p>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'C A';
  };

  const roleTranslations: Record<Role, string> = {
    user: "Usuario",
    creator: "Creador",
    admin: "Administrador"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary to-accent data-ai-hint='fondo abstracto'">
          {/* Espacio para imagen de portada */}
        </div>
        <CardHeader className="flex flex-col items-center text-center -mt-20">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg mb-2">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="foto perfil"/>
            <AvatarFallback className="text-4xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline text-primary">{user.name}</CardTitle>
          <CardDescription className="text-md text-muted-foreground">@{user.name.toLowerCase().replace(/\s+/g, '')} &bull; {user.role ? roleTranslations[user.role] : ''}</CardDescription>
          <Button variant="outline" size="sm" className="mt-4 font-headline">
            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm border-t border-border pt-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <UserCircle className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">
                {joinDate ? `Se unió el ${format(joinDate, "d 'de' MMMM 'de' yyyy", { locale: es })}` : 'Cargando fecha...'}
              </span>
            </div>
            {user.role === 'creator' && (
               <div className="flex items-center space-x-3 md:col-span-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">Creador con {userPosts.length} publicaciones</span>
              </div>
            )}
          </div>
          
          <p className="mt-6 text-center text-foreground italic">
            "Conectando ideas e inspirando creatividad en ComuniArte. ¡Sigue mi viaje!"
          </p>
        </CardContent>
      </Card>

      {user.role === 'creator' && (
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-6">Mis Publicaciones</h2>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Aún no has creado ninguna publicación.</p>
          )}
        </section>
      )}
    </div>
  );
}
