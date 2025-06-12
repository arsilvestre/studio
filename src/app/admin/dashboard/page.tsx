'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart2 } from "lucide-react";
import Link from "next/link";

const overviewStats = [
  { title: "Total Users", value: "1,234", icon: Users, color: "text-primary", link: "/admin/users" },
  { title: "Active Creators", value: "287", icon: FileText, color: "text-accent", link: "#" },
  { title: "Pending Approvals", value: "12", icon: FileText, color: "text-destructive", link: "#" },
  { title: "Site Visits (24h)", value: "5,678", icon: BarChart2, color: "text-green-500", link: "#" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline font-bold text-primary">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <Link href={stat.link} key={stat.title} passHref>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold font-headline ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  {/* You can add a subtitle here, e.g., +20.1% from last month */}
                  View Details
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>Overview of recent user registrations and content submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity feed placeholder...</p>
            {/* Placeholder for an activity feed or chart */}
            <div className="h-64 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Recent Activity Chart/List Area</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
             <Link href="/admin/users/new" className="block w-full px-4 py-2 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-headline">Create New User</Link>
             <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-headline opacity-50 cursor-not-allowed" disabled>Manage Content</button>
             <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-headline opacity-50 cursor-not-allowed" disabled>View Reports</button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
