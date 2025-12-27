"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { blogData } from '@/constants/BlogData';
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Twitter, Linkedin, Facebook } from 'lucide-react';

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const blog = blogData.find((b) => b.slug === slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen font-sans">
            <NavbarDemo />
            <ThemeSwitcher />

            <main className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-20">
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
                                    <p className="text-sm font-bold text-foreground">{blog.date}</p>
                                    <p className="text-xs text-muted-foreground">Published</p>
                                </div>

                                <div className="h-10 w-px bg-border hidden sm:block"></div>

                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-foreground">{blog.readTime}</p>
                                    <p className="text-xs text-muted-foreground">Read Time</p>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative aspect-21/9 rounded-4xl overflow-hidden mb-12 shadow-2xl border border-border">
                            <img
                                src={blog.imgUrl}
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
                                        { name: 'Twitter', icon: Twitter, href: '#' },
                                        { name: 'LinkedIn', icon: Linkedin, href: '#' },
                                        { name: 'Facebook', icon: Facebook, href: '#' },
                                    ].map((social) => (
                                        <Link
                                            key={social.name}
                                            href={social.href}
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
            </main>

            <Footer />

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
      `}</style>
        </div>
    );
}
