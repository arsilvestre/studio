import type { Post } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Heart, MessageSquare, Share2, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'NN';
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar>
          <AvatarImage src={post.creatorAvatarUrl} alt={post.creatorName} data-ai-hint="profile avatar" />
          <AvatarFallback>{getInitials(post.creatorName)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-headline">{post.creatorName}</CardTitle>
          <CardDescription className="text-xs">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </CardDescription>
        </div>
      </CardHeader>
      {post.mediaUrl && (
        <div className="relative w-full aspect-video bg-muted">
          <Image 
            src={post.mediaUrl} 
            alt="Post media" 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={post.mediaType === 'image' ? "social media" : "video content"}
          />
          {post.mediaType === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Video className="h-16 w-16 text-white/80" />
            </div>
          )}
        </div>
      )}
       {!post.mediaUrl && (
         <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
         </div>
       )}
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
      </CardContent>
      <CardFooter className="p-4 border-t border-border flex justify-between items-center">
        <div className="flex space-x-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-accent">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-accent">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="hover:text-accent">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
