'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login?redirect=/admin/dashboard');
      } else if (user.role !== 'admin') {
        router.push('/dashboard'); // O una página dedicada de "acceso denegado"
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-2xl font-headline text-foreground">Verificando acceso...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
       <div className="flex flex-col items-center justify-center h-screen bg-background p-8 text-center">
        <ShieldAlert className="h-24 w-24 text-destructive mb-6" />
        <h1 className="text-4xl font-headline text-destructive mb-3">Acceso Denegado</h1>
        <p className="text-lg text-foreground mb-8">No tienes permiso para ver esta página.</p>
        <button onClick={() => router.push('/dashboard')} className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-headline">
          Ir al Panel
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8 bg-background">
        {children}
      </div>
    </div>
  );
}
