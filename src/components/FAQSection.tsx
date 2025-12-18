'use client'

import React, { useState } from 'react'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqData } from '../constants/FAQItems'

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number>(0) // Second item open by default

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index)
    }

    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Heading */}
                    <div className="lg:sticky lg:top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex gap-1">
                                <div className="w-0.5 h-6 bg-red-500 transform -skew-x-12"></div>
                                <div className="w-0.5 h-6 bg-red-500 transform -skew-x-12"></div>
                            </div>
                            <span className="text-sm font-medium text-primary uppercase tracking-wider">FAQ</span>
                            <div className="flex gap-1">
                                <div className="w-0.5 h-6 bg-red-500 transform skew-x-12"></div>
                                <div className="w-0.5 h-6 bg-red-500 transform skew-x-12"></div>
                            </div>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold text-primary mb-3">
                            Got a question?
                        </h2>
                        <p className="text-4xl md:text-5xl text-muted-foreground">
                            We've got answers.
                        </p>

                        <section className="py-12 mt-48 px-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="relative bg-accent rounded-[3rem] p-6 md:p-8 overflow-hidden">
                                    {/* Dot pattern background */}
                                    <div className='absolute inset-0 opacity-100'>
                                        <div className='absolute inset-0' style={{
                                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                                            backgroundSize: '24px 24px'
                                        }}></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 text-center">
                                        <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-primary mb-6">
                                            Still have questions?
                                        </h2>

                                        <button className="bg-background text-primary rounded-full px-8 py-6 flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-105 shadow-lg mx-auto max-w-md w-full">
                                            <span className="font-semibold text-2xl flex-1 text-center">Contact Us</span>
                                            {/* <div className="bg-gray-100 rounded-full p-3 ml-4">
                                                <ArrowRight className="w-6 h-6" />
                                            </div> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Side - Accordion */}
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-accent rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                >
                                    <span className="text-base md:text-lg text-foreground font-medium pr-4">
                                        {item.question}
                                    </span>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <Minus className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-5 pt-0">
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQSection