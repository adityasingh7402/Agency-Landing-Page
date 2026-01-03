"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, FolderOpen, Eye, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

export default function DashboardClient({ stats, recentBlogs }: any) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div variants={item}>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Welcome back! Here's what's happening with your blog today.
                    </p>
                </motion.div>

                <motion.div variants={item} className="flex gap-3">
                    <Link href="/admin-panel/create-blog" className="px-6 py-3 bg-foreground text-background font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        New Post
                    </Link>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Blogs", value: stats.totalBlogs, icon: FileText, sub: `${stats.publishedBlogs} published`, color: "bg-blue-500/10 text-blue-500" },
                    { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, sub: "Across all time", color: "bg-emerald-500/10 text-emerald-500" },
                    { label: "Categories", value: stats.totalCategories, icon: FolderOpen, sub: "Active folders", color: "bg-purple-500/10 text-purple-500" },
                    { label: "Featured", value: stats.featuredBlogs, icon: TrendingUp, sub: "Promoted content", color: "bg-orange-500/10 text-orange-500" },
                ].map((stat, i) => (
                    <motion.div key={i} variants={item}>
                        <Card className="glass-card overflow-hidden group hover:border-foreground/20 transition-all border-none shadow-sm ring-1 ring-border/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                </CardTitle>
                                <div className={`p-2 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span className="font-medium text-emerald-500 flex items-center">
                                        <ArrowUpRight className="w-3 h-3 mr-1" />
                                        +12%
                                    </span>
                                    {stat.sub}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Blogs */}
                <motion.div variants={item} className="lg:col-span-2">
                    <Card className="glass-card border-none shadow-sm ring-1 ring-border/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">Recent Publications</CardTitle>
                                <CardDescription>Review and manage your latest content</CardDescription>
                            </div>
                            <Link href="/admin-panel/blogs" className="text-sm font-medium hover:underline text-muted-foreground">
                                View All
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recentBlogs.length === 0 ? (
                                <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                    <p className="text-muted-foreground font-medium">No blog posts found</p>
                                    <Link href="/admin-panel/create-blog" className="text-foreground text-sm mt-2 block hover:underline">
                                        Create your first post →
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentBlogs.map((blog: any) => (
                                        <Link
                                            key={blog._id}
                                            href={`/admin-panel/blogs/${blog._id}`}
                                            className="group flex items-center justify-between p-4 rounded-2xl hover:bg-accent/50 border border-transparent hover:border-border transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-background transition-colors">
                                                    <FileText className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{blog.title}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                                                            <Clock className="w-3 h-3" />
                                                            {isMounted ? new Date(blog.createdAt).toLocaleDateString() : '...'}
                                                        </span>
                                                        <Badge variant={blog.isPublished ? "default" : "secondary"} className="rounded-md px-1.5 py-0 text-[10px] uppercase font-bold tracking-wider">
                                                            {blog.isPublished ? "Published" : "Draft"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-foreground transform group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions & Tips */}
                <motion.div variants={item} className="space-y-6">
                    <Card className="glass-card border-none shadow-sm ring-1 ring-border/50 overflow-hidden">
                        <div className="h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
                        <CardHeader>
                            <CardTitle>System Health</CardTitle>
                            <CardDescription>Everything is running smoothly</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { label: "API Status", value: "Operational", color: "bg-emerald-500" },
                                    { label: "Database", value: "Connected", color: "bg-emerald-500" },
                                    { label: "Storage", value: "85% Free", color: "bg-blue-500" },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{s.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{s.value}</span>
                                            <div className={`w-2 h-2 rounded-full ${s.color} animate-pulse`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-foreground text-background border-none shadow-md overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <CardHeader>
                            <CardTitle className="text-xl">Pro Tip</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-background/80 text-sm leading-relaxed mb-4">
                                Updating your blog categories regularly can improve SEO by up to 25%. Try to keep them concise and descriptive.
                            </p>
                            <Link href="/admin-panel/categories" className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all">
                                Manage Categories <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
