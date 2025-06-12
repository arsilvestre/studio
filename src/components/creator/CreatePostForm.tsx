'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ImageUp, Video, Send } from 'lucide-react';

export default function CreatePostForm() {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const { toast } = useToast();

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      if (file.type.startsWith('image/')) {
        setMediaType('image');
      } else if (file.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType(null);
        toast({
          title: "Unsupported File Type",
          description: "Please upload an image or video file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !mediaFile) {
      toast({
        title: "Empty Post",
        description: "Please add some content or media to your post.",
        variant: "destructive",
      });
      return;
    }

    // Simulate post creation
    console.log('Creating post:', { content, mediaFile, mediaType });
    toast({
      title: 'Post Submitted!',
      description: 'Your post is being processed.',
    });
    setContent('');
    setMediaFile(null);
    setMediaType(null);
    // Optionally, clear the file input if you store its ref
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="post-content" className="text-lg font-headline">Your Message</Label>
        <Textarea
          id="post-content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="media-upload" className="text-lg font-headline">Upload Media (Optional)</Label>
        <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {mediaType === 'image' && <ImageUp className="mx-auto h-12 w-12 text-muted-foreground" />}
            {mediaType === 'video' && <Video className="mx-auto h-12 w-12 text-muted-foreground" />}
            {!mediaType && <ImageUp className="mx-auto h-12 w-12 text-muted-foreground" />} {/* Default Icon */}
            <div className="flex text-sm text-muted-foreground">
              <Label
                htmlFor="media-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring"
              >
                <span>Upload a file</span>
                <Input id="media-upload" name="media-upload" type="file" className="sr-only" onChange={handleMediaChange} accept="image/*,video/*" />
              </Label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB; MP4, MOV up to 50MB</p>
            {mediaFile && <p className="text-sm text-accent pt-2">Selected: {mediaFile.name}</p>}
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full font-headline">
        <Send className="mr-2 h-5 w-5" /> Post
      </Button>
    </form>
  );
}
