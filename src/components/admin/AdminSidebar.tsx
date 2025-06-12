'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Logo from '@/components/icons/Logo';
import { LayoutDashboard, Users, Settings, BarChart3, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/content', label: 'Content Moderation', icon: ShieldAlert, disabled: true },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, disabled: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full fixed">
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Logo className="h-8 w-auto text-sidebar-primary" />
        </Link>
        <p className="text-xs text-sidebar-foreground/70 mt-1">Admin Panel</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {adminNavItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                "w-full justify-start font-headline",
                pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90" : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              asChild
              disabled={item.disabled}
            >
              <Link href={item.disabled ? "#" : item.href}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Button variant="outline" className="w-full font-headline" asChild>
            <Link href="/">Back to Site</Link>
        </Button>
      </div>
    </aside>
  );
}
