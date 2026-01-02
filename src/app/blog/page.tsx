import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BlogClient } from './BlogClient';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Blog | Latest Insights on Design & Development',
    description: 'Explore our latest insights, design trends, and technical guides. We share our thoughts on the future of design and development, best practices, and industry innovations.',
    keywords: ['design blog', 'development blog', 'web design', 'UI/UX', 'frontend development', 'design trends', 'tech insights'],
    authors: [{ name: 'DesignLab Team' }],
    openGraph: {
        title: 'Blog | Latest Insights on Design & Development',
        description: 'Explore our latest insights, design trends, and technical guides. We share our thoughts on the future of design and development.',
        type: 'website',
        url: '/blog',
        siteName: 'DesignLab',
        images: [
            {
                url: '/og-blog.jpg',
                width: 1200,
                height: 630,
                alt: 'DesignLab Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Latest Insights on Design & Development',
        description: 'Explore our latest insights, design trends, and technical guides.',
        images: ['/og-blog.jpg'],
    },
    alternates: {
        canonical: '/blog',
    },
};

// Define the Blog interface
interface Blog {
    _id: string;
    title: string;
    slug: string;
    description: string;
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

interface BlogsResponse {
    success: boolean;
    blogs: Blog[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalBlogs: number;
        hasMore: boolean;
    };
}

async function getBlogs(): Promise<BlogsResponse> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/get-all-blogs?isPublished=true&page=1&limit=100`, {
            cache: 'no-store', // Always get fresh data
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch blogs:', response.statusText);
            return {
                success: false,
                blogs: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 0,
                    totalBlogs: 0,
                    hasMore: false,
                },
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return {
            success: false,
            blogs: [],
            pagination: {
                currentPage: 1,
                totalPages: 0,
                totalBlogs: 0,
                hasMore: false,
            },
        };
    }
}

export default async function BlogListingPage() {
    const blogsData = await getBlogs();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // JSON-LD structured data for blog listing
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'DesignLab Blog',
        description: 'Explore our latest insights, design trends, and technical guides. We share our thoughts on the future of design and development.',
        url: `${baseUrl}/blog`,
        publisher: {
            '@type': 'Organization',
            name: 'DesignLab',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
            },
        },
        ...(blogsData.success && blogsData.blogs.length > 0 && {
            blogPost: blogsData.blogs.slice(0, 10).map((blog) => ({
                '@type': 'BlogPosting',
                headline: blog.title,
                description: blog.description,
                image: blog.thumbnail,
                datePublished: blog.createdAt,
                dateModified: blog.updatedAt,
                author: {
                    '@type': 'Person',
                    name: blog.author,
                },
                url: `${baseUrl}/blog/${blog.slug}`,
            })),
        }),
    };

    return (
        <div className="bg-background min-h-screen font-sans">
            {/* JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <NavbarDemo />
            <ThemeSwitcher />

            <main className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-20">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                        Our <span className="text-primary italic">Blog</span>
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl">
                        Explore our latest insights, design trends, and technical guides. We share our thoughts on the future of design and development.
                    </p>
                </div>

                {!blogsData.success || blogsData.blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No blogs found. Check back soon!</p>
                    </div>
                ) : (
                    <BlogClient blogs={blogsData.blogs} />
                )}
            </main>

            <Footer />
        </div>
    );
}

