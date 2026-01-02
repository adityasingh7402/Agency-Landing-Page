"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Twitter, Linkedin, Facebook } from 'lucide-react';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    author: string;
    thumbnail: string;
    tags: string[];
    readingTime: number;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    isFeatured: boolean;
    categoryId?: {
        name: string;
        slug: string;
    };
}

interface BlogDetailClientProps {
    blog: Blog;
}

export function BlogDetailClient({ blog }: BlogDetailClientProps) {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        // Get the current URL only on client-side
        setCurrentUrl(window.location.href);
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <article className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground truncate">{blog.title}</span>
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags.map((tag) => (
                                <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground leading-[1.1]">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-6 border-y border-border py-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-lg font-bold border border-primary/10">
                                    {blog.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">{blog.author}</p>
                                    <p className="text-xs text-muted-foreground">Author</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-border hidden sm:block"></div>

                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-foreground">{formatDate(blog.createdAt)}</p>
                                <p className="text-xs text-muted-foreground">Published</p>
                            </div>

                            <div className="h-10 w-px bg-border hidden sm:block"></div>

                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-foreground">{blog.readingTime} min read</p>
                                <p className="text-xs text-muted-foreground">Read Time</p>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative aspect-21/9 rounded-4xl overflow-hidden mb-12 shadow-2xl border border-border">
                        <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            className="blog-content-container"
                        />
                    </div>

                    {/* Footer of article */}
                    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-foreground">Share:</span>
                            <div className="flex gap-2">
                                {[
                                    { name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}` },
                                    { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
                                    { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
                                ].map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-accent hover:bg-primary text-foreground hover:text-primary-foreground transition-all border border-border flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <social.icon className="w-5 h-5" />
                                        <span className="sr-only">{social.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                        >
                            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </motion.div>
            </article>

            <style jsx global>{`
                .blog-content-container p {
                    margin-bottom: 1.5rem;
                    line-height: 1.8;
                    font-size: 1.125rem;
                }
                .blog-content-container h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    color: var(--foreground);
                }
                .blog-content-container h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: var(--foreground);
                }
                .blog-content-container code {
                    background: var(--accent);
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }
                .blog-content-container pre {
                    background: var(--accent);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
                .blog-content-container pre code {
                    background: transparent;
                    padding: 0;
                }
            `}</style>
        </>
    );
}
