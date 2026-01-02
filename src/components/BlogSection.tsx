"use client";

import React, { useEffect, useState } from 'react';
import { blogData } from '@/constants/BlogData';
import Link from 'next/link';

interface Blog {
    _id?: string;
    title: string;
    slug: string;
    description?: string;
    summary?: string;
    author: string;
    thumbnail?: string;
    imgUrl?: string;
    tags: string[];
    readingTime?: number;
    readTime?: string;
    createdAt?: string;
    date?: string;
}

function BlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
                const response = await fetch(`${baseUrl}/api/get-all-blogs?isPublished=true&page=1&limit=4`);

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.blogs.length > 0) {
                        setBlogs(data.blogs);
                    } else {
                        // Fallback to static data
                        setBlogs(blogData);
                    }
                } else {
                    // Fallback to static data
                    setBlogs(blogData);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                // Fallback to static data
                setBlogs(blogData);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className='container mx-auto px-4 sm:px-6 md:px-8'>
                <div className='flex flex-col items-center justify-center py-20'>
                    <p className='text-muted-foreground'>Loading blogs...</p>
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return null;
    }

    return (
        <div className='container mx-auto px-4 sm:px-6 md:px-8'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center pb-8 sm:pb-12 gap-4'>
                <span className='text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'>
                    Fresh Insights and ideas. <br className='hidden sm:block' />
                    <span className='text-muted-foreground'>From the Team.</span>
                </span>
                <Link
                    href="/blog"
                    className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg"
                >
                    View All Posts
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            <div className='p-3 sm:p-4 border rounded-3xl shadow-lg bg-accent/50 backdrop-blur-sm'>
                <div className='flex flex-col lg:flex-row justify-between gap-4 lg:gap-6'>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <Link href={`/blog/${blogs[0].slug}`} className='group'>
                            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 w-full gap-2'>
                                <div className='flex flex-row items-center gap-2'>
                                    <h2 className='text-base sm:text-lg lg:text-xl text-primary font-semibold'>{blogs[0].author}</h2>
                                    <p className='text-muted-foreground text-base sm:text-lg lg:text-xl'>
                                        {blogs[0].date || formatDate(blogs[0].createdAt)}
                                    </p>
                                </div>

                                <div className='flex flex-row items-center'>
                                    <p className='text-muted-foreground text-base sm:text-lg lg:text-xl'>
                                        {blogs[0].readTime || `${blogs[0].readingTime} min read`}
                                    </p>
                                </div>
                            </div>
                            <h1 className='text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-colors font-bold'>{blogs[0].title}</h1>
                            <div className='flex flex-row gap-2 sm:gap-3 items-center flex-wrap mb-4'>
                                {blogs[0].tags.map((item) => (
                                    <span className='text-sm sm:text-base lg:text-lg bg-card text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl border border-border shadow-sm' key={item}>{item}</span>
                                ))}
                            </div>
                            <div className='rounded-2xl sm:rounded-3xl p-2 bg-background border border-border overflow-hidden'>
                                <img
                                    src={blogs[0].thumbnail || blogs[0].imgUrl}
                                    alt={blogs[0].title}
                                    className='w-full h-auto rounded-[12px] sm:rounded-[16px] group-hover:scale-105 transition-transform duration-500'
                                />
                            </div>
                        </Link>
                    </div>

                    <div className='flex flex-col w-full lg:w-1/2 gap-4 sm:gap-6'>
                        {blogs.slice(1, 4).map((item) => (
                            <Link key={item.slug} href={`/blog/${item.slug}`} className='group'>
                                <div className='flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4'>
                                    <div className='rounded-2xl sm:rounded-3xl p-2 bg-background border border-border w-full sm:w-1/2 order-2 sm:order-1 overflow-hidden'>
                                        <img
                                            src={item.thumbnail || item.imgUrl}
                                            alt={item.title}
                                            className='w-full h-auto rounded-[12px] sm:rounded-[16px] group-hover:scale-105 transition-transform duration-500'
                                        />
                                    </div>
                                    <div className='w-full sm:w-2/3 flex flex-col order-1 sm:order-2'>
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 w-full gap-1 sm:gap-2'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <h2 className='text-sm sm:text-base lg:text-lg text-primary font-semibold'>{item.author}</h2>
                                                <p className='text-muted-foreground text-sm sm:text-base lg:text-lg'>
                                                    {item.date || formatDate(item.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <h3 className='text-lg sm:text-xl lg:text-2xl mb-2 text-foreground group-hover:text-primary transition-colors font-bold line-clamp-2'>{item.title}</h3>
                                        <div className='flex flex-row gap-2 items-center flex-wrap'>
                                            {item.tags.map((tag) => (
                                                <span className='text-xs sm:text-sm lg:text-base bg-card text-primary px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-3xl border border-border shadow-sm' key={tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogSection

