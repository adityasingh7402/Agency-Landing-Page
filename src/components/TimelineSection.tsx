'use client'

import React from 'react'
import { useMotionValueEvent, useScroll, useTransform, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { timelineData } from '@/constants/TimelineData'


function TimelineSection() {
    const ref = useRef<HTMLDivElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
const [height, setHeight] = useState(0);

useEffect(() => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    setHeight(rect.height);
  }
}, [ref]);

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start 10%", "end 50%"],
});

const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);


    return (
        <div className='flex flex-row container mx-auto gap-10'>
        <div className='w-1/2 flex items-center justify-center'>
            <motion.span className='text-muted-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                Here's, <br className='hidden sm:block' />
                <motion.span className='text-foreground'>How we launch your project.</motion.span>
            </motion.span>

        </div>
        {/* <div className=' w-1/2'>
        <div className='w-full flex flex-col items-start justify-start'>
            <div className="relative">
                
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                <ul className="space-y-8">
                    {timelineData.map((item, index) => (
                    <li key={index} className="relative flex items-start gap-6">
                        
                        <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 text-gray-700"
                        >
                            <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </div>
                        
                       
                        <div className="flex-1 min-h-[6rem] w-[600px] h-[500px] bg-neutral-700 rounded-xl border border-amber-100 p-4">
                        <time className="font-mono italic text-sm">{item.year}</time>
                        <div className="text-lg font-black mt-1">{item.title}</div>
                        <p className="mt-2 text-sm">{item.description}</p>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </div> */}
        <div className='w-1/2' ref={containerRef}>
            <div className='w-full flex flex-col items-start justify-start'>
                <div className="relative" ref={ref}>
                {/* Static background line */}
                <div 
                    className="absolute left-6 top-0 w-[2px] bg-gradient-to-b from-transparent via-gray-300 to-transparent"
                    style={{ height: height + "px" }}
                >
                    {/* Animated line that grows on scroll */}
                    <motion.div
                    style={{
                        height: heightTransform,
                        opacity: opacityTransform,
                    }}
                    className="absolute inset-x-0 top-0 w-[2px] bg-red-600 rounded-full"
                    />
                </div>
                
                <ul className="space-y-1">
                    {timelineData.map((item, index) => (
                    <motion.li
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.8 }}
                    key={index} className="relative flex items-start gap-2 pt-10 min-h-[60vh]">
                        {/* Icon */}
                        <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-neutral-200 border border-border p-2" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative flex-1 w-[600px] h-[200px] bg-card rounded-xl border border-border p-4">
                        <div className="text-4xl text-primary mt-1">{item.title}</div>
                        <p className="mt-2 text-lg text-muted-foreground">{item.description}</p>
                        </div>
                    </motion.li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
        
        </div>
    )
}

export default TimelineSection