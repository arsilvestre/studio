import type { User, Post, Role } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Usuario Admin', email: 'admin@comuniarte.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100.png?text=UA' },
  { id: '2', name: 'Usuario Creador', email: 'creator@comuniarte.com', role: 'creator', avatarUrl: 'https://placehold.co/100x100.png?text=UC' },
  { id: '3', name: 'Usuario Regular', email: 'user@comuniarte.com', role: 'user', avatarUrl: 'https://placehold.co/100x100.png?text=UR' },
  { id: '4', name: 'Alicia Maravillas', email: 'alicia@ejemplo.com', role: 'creator', avatarUrl: 'https://placehold.co/100x100.png?text=AM' },
  { id: '5', name: 'Roberto Constructor', email: 'roberto@ejemplo.com', role: 'user', avatarUrl: 'https://placehold.co/100x100.png?text=RC' },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    creatorId: '2',
    creatorName: 'Usuario Creador',
    creatorAvatarUrl: 'https://placehold.co/100x100.png?text=UC',
    content: '¡Acabo de lanzar mi nuevo proyecto! Miren esta increíble foto.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // Hace 2 horas
    likes: 15,
    comments: 3,
  },
  {
    id: 'p2',
    creatorId: '4',
    creatorName: 'Alicia Maravillas',
    creatorAvatarUrl: 'https://placehold.co/100x100.png?text=AM',
    content: 'Explorando la frontera digital. Este vídeo resume mis pensamientos.',
    mediaUrl: 'https://placehold.co/600x400.png', // Placeholder, imagina que es un vídeo
    mediaType: 'video',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Hace 1 día
    likes: 42,
    comments: 8,
  },
  {
    id: 'p3',
    creatorId: '2',
    creatorName: 'Usuario Creador',
    creatorAvatarUrl: 'https://placehold.co/100x100.png?text=UC',
    content: 'Un pensamiento para el día: La innovación distingue a un líder de un seguidor.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), // Hace 50 horas
    likes: 28,
    comments: 5,
  },
];
