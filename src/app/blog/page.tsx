"use client";

import React from 'react';
import Link from 'next/link';
import { blogData } from '@/constants/BlogData';
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { motion } from "framer-motion";

export default function BlogListingPage() {
    return (
        <div className="bg-background min-h-screen font-sans">
            <NavbarDemo />
            <ThemeSwitcher />

            <main className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                        Our <span className="text-primary italic">Blog</span>
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl">
                        Explore our latest insights, design trends, and technical guides. We share our thoughts on the future of design and development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/blog/${blog.slug}`} className="block h-full">
                                <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative aspect-16/10 overflow-hidden">
                                        <img
                                            src={blog.imgUrl}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {blog.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="bg-background/80 backdrop-blur-md text-primary text-xs font-medium px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col grow">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-xs text-muted-foreground">{blog.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                            <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                                        </div>

                                        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 grow">
                                            {blog.summary}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                                                    {blog.author.charAt(0)}
                                                </div>
                                                <span className="text-xs font-medium text-foreground">{blog.author}</span>
                                            </div>
                                            <span className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                                Read More
                                                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
