import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BlogDetailClient } from './BlogDetailClient';


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

interface BlogResponse {
    success: boolean;
    blog?: Blog;
    message?: string;
}

async function getBlogBySlug(slug: string): Promise<BlogResponse> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/get-one-blog/${slug}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch blog:', response.statusText);
            return { success: false };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return { success: false };
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blogData = await getBlogBySlug(slug);

    if (!blogData.success || !blogData.blog) {
        return {
            title: 'Blog Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const blog = blogData.blog;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const blogUrl = `${baseUrl}/blog/${blog.slug}`;

    return {
        title: `${blog.title} | DesignLab Blog`,
        description: blog.description,
        keywords: blog.tags,
        authors: [{ name: blog.author }],
        openGraph: {
            title: blog.title,
            description: blog.description,
            type: 'article',
            url: blogUrl,
            siteName: 'DesignLab',
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt,
            authors: [blog.author],
            tags: blog.tags,
            images: [
                {
                    url: blog.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.description,
            images: [blog.thumbnail],
            creator: `@${blog.author.replace(/\s+/g, '')}`,
        },
        alternates: {
            canonical: blogUrl,
        },
    };
}


export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blogData = await getBlogBySlug(slug);

    if (!blogData.success || !blogData.blog) {
        notFound();
    }

    const blog = blogData.blog;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const blogUrl = `${baseUrl}/blog/${blog.slug}`;

    // JSON-LD structured data for rich results
    const jsonLd = {
        '@context': 'https://schema.org',
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
        publisher: {
            '@type': 'Organization',
            name: 'DesignLab',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': blogUrl,
        },
        keywords: blog.tags.join(', '),
        articleSection: blog.categoryId?.name || 'Blog',
        wordCount: blog.content.split(/\s+/).length,
        timeRequired: `PT${blog.readingTime}M`,
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
                <BlogDetailClient blog={blog} />
            </main>

            <Footer />
        </div>
    );
}

