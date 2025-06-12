export type Role = 'admin' | 'creator' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Post {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt: string; // ISO date string
  likes: number;
  comments: number;
}
