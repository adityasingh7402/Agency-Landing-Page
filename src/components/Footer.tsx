'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import trustlogo from '@/constants/TrustLogo'
import Image from 'next/image'

function Footer() {
    return (
        <footer className="bg-accent mt-10">
            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
                        Trusted by 1,200+ founders.
                    </h2>
                    <p className="text-3xl md:text-4xl text-foreground mb-6">
                        Turning ideas into bold brands.
                    </p>
                    <p className="text-foreground mb-8 max-w-2xl mx-auto">
                        Book a free discovery call to discuss strategy, set goals, and see how we can help you grow.
                    </p>

                    {/* Open for work badge */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Open for work</span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        <button className="bg-background text-primary rounded-full px-8 py-4 flex items-center gap-3 transition-colors">
                            <span className="font-medium">Book A Call</span>
                            <div className="bg-accent rounded-full p-2">
                                <ArrowRight className="w-4 h-4 text-primary" />
                            </div>
                        </button>
                        {/* <button className="bg-white text-black border border-gray-200 rounded-full px-8 py-4 hover:bg-gray-50 transition-colors">
                            <span className="font-medium">View Plans</span>
                        </button> */}
                    </div>

                    {/* Company Logos */}
                    {/* <div className="flex items-center justify-center gap-8 opacity-40">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="w-16 h-8 bg-gray-300 rounded-lg"></div>
                        <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
                        <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
                    </div> */}
                    <motion.div className='flex items-center justify-center mask-l-from-30% mask-r-from-30% w-full lg:w-auto overflow-hidden' >
                    <div className="overflow-hidden max-w-full">
                        <motion.div
                            className="flex"
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            {[...new Array(2)].fill(0).map((_, index) => (
                                <React.Fragment key={index}>
                                    {trustlogo.map((logo, idx) => (
                                        <div
                                            key={idx}
                                            className='flex items-center justify-center mx-3 sm:mx-4 md:mx-5 grayscale hover:grayscale-0 transition-all duration-300'
                                        >
                                            <Image
                                                src={logo.src}
                                                height={80}
                                                width={80}
                                                alt={logo.alt}
                                                className='text-foreground opacity-70 dark:invert w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'
                                            />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </motion.div>
                    </div>

                </motion.div>
                </div>
            </section>

            {/* Footer Content */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Newsletter Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-2xl font-bold text-primary">Lamosa</span>
                            </div>

                            <h3 className="text-lg font-semibold text-primary mb-3">
                                Join our newsletter
                            </h3>
                            <p className="text-sm text-foreground mb-6 leading-relaxed">
                                Stay ahead with strategies uniting design, technology, and marketing to deliver measurable growth.
                            </p>

                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="flex-1 px-4 py-3 rounded-full border border-border focus:outline-none focus:border-border/90 text-sm"
                                />
                                <button 
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="text-base font-semibold text-primary mb-4">Company</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                        Contact us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2">
                                        Career
                                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            Hiring
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2">
                                        Blog
                                        <span className="bg-red-500 text-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            8
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-base font-semibold text-primary mb-4">Socials</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                        X
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                        </svg>
                                        Framer
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"/>
                                        </svg>
                                        Dribbble
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer