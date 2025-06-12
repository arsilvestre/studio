'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Mail, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Contraseña no usada en mock, pero útil para UI
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      // Validación básica, en una app real usar react-hook-form & zod
      alert('Por favor, introduce un correo electrónico.');
      return;
    }
    // Para fines de demostración, puedes iniciar sesión con correos específicos de mockUsers
    // ej., admin@comuniarte.com, creator@comuniarte.com, user@comuniarte.com
    // O cualquier correo para iniciar sesión como usuario genérico si no se encuentra.
    login(email);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Inicia Sesión en ComuniArte</CardTitle>
          <CardDescription>Introduce tus credenciales para acceder a tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
               <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full font-headline" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <p className="text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Button variant="link" asChild className="text-accent p-0 h-auto">
              <Link href="/signup">Regístrate</Link>
            </Button>
          </p>
           <p className="text-xs text-muted-foreground mt-4">
            Inicios de sesión demo: admin@comuniarte.com, creator@comuniarte.com, user@comuniarte.com. Cualquier otro correo inicia sesión como 'user'.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
