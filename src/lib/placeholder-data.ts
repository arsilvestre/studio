import type { User, Post, Role } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@nexusconnect.com', role: 'admin', avatarUrl: 'https://placehold.co/100x100.png?text=AU' },
  { id: '2', name: 'Creator User', email: 'creator@nexusconnect.com', role: 'creator', avatarUrl: 'https://placehold.co/100x100.png?text=CU' },
  { id: '3', name: 'Regular User', email: 'user@nexusconnect.com', role: 'user', avatarUrl: 'https://placehold.co/100x100.png?text=RU' },
  { id: '4', name: 'Alice Wonderland', email: 'alice@example.com', role: 'creator', avatarUrl: 'https://placehold.co/100x100.png?text=AW' },
  { id: '5', name: 'Bob The Builder', email: 'bob@example.com', role: 'user', avatarUrl: 'https://placehold.co/100x100.png?text=BB' },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    creatorId: '2',
    creatorName: 'Creator User',
    creatorAvatarUrl: 'https://placehold.co/100x100.png?text=CU',
    content: 'Just launched my new project! Check out this amazing photo.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 15,
    comments: 3,
  },
  {
    id: 'p2',
    creatorId: '4',
    creatorName: 'Alice Wonderland',
    creatorAvatarUrl: 'https://placehold.co/100x100.png?text=AW',
    content: 'Exploring the digital frontier. This video sums up my thoughts.',
    mediaUrl: 'https://placehold.co/600x400.png', // Placeholder, imagine it's a video
    mediaType: 'video',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likes: 42,
    comments: 8,
  },
  {
    id: 'p3',
    creatorId: '2',
    creatorName: 'Creator User',
    creatorAvatarUrl: 'https://placehold.co/100x100.png?text=CU',
    content: 'A thought for the day: Innovation distinguishes between a leader and a follower.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), // 50 hours ago
    likes: 28,
    comments: 5,
  },
];
