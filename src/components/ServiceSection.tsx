'use client'

import React, {useState} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { servicesData } from '@/constants/ServiceData'
import Image from 'next/image'
import { IconChevronDown, IconArrowBarRight } from '@tabler/icons-react';


function ServiceSection() {
    const [expandedService, setExpandedService] = useState<number | null>(null);

    return (
        <motion.div className='flex flex-col gap-5 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24'>
            <motion.div>
                <p className='text-foreground text-sm sm:text-base font-medium mb-2 sm:mb-3'>Services</p>
            </motion.div>

            <motion.div className='flex flex-row justify-between items-center'>
                <motion.span className='text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    From idea to scale. <br className='hidden sm:block' />
                    <motion.span className='text-muted-foreground'>We master our craft.</motion.span>
                </motion.span>

                <motion.button>
                    <motion.span className='text-primary text-lg sm:text-xl font-medium bg-primary/10 backdrop-blur-xl shadow-3xl transition-all duration-300 cursor-pointer px-8 py-3 border-2 border-border rounded-full hover:bg-primary/10'>
                        Start a Project
                        <IconArrowBarRight className='inline-block w-6 h-6 ml-4 -mt-1' />
                    </motion.span>
                </motion.button>


            </motion.div>

            <motion.div className='flex flex-row gap-10'>
            
                <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className='w-1/2'>
                {servicesData.map((item,idx) => (
                        <motion.div key={item.id} className='flex flex-col bg-card mb-5 w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 mx-2'>
                            
                            <motion.div className=''>
                                <motion.div className='flex flex-row items-center justify-between w-full gap-4'>
                                    <motion.section className='flex flex-row justify-between w-full gap-4'>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row items-center gap-4'>
                                                <div>{item.svg}</div>
                                                <p className='text-foreground text-xl sm:text-2xl md:text-3xl font-light'>{item.title}</p>
                                            </div>
                                            <AnimatePresence>
                                                {expandedService === item.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        className='overflow-hidden'
                                                    >
                                                        <motion.div className='pt-4'>
                                                            <p className='text-muted-foreground text-lg sm:text-xl md:text-2xl pl-10'>{item.description}</p>
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div>
                                            <button
                                            onClick={() => setExpandedService(expandedService === item.id ? null : item.id)}
                                            className='p-2 rounded-full hover:bg-accent/20 transition-colors duration-300'
                                            aria-label={expandedService === item.id ? 'Collapse service details' : 'Expand service details'}
                                            >
                                            <IconChevronDown
                                                className={`w-6 h-6 text-foreground transition-transform duration-300 ${expandedService === item.id ? 'transform rotate-180' : ''}`}
                                            />
                                            </button>
                                        </div>
                                    </motion.section>
                                </motion.div>
                            </motion.div>
                            
                        </motion.div>
                ))}
                </motion.div>

                <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className='w-1/2 bg-white/50 rounded-xl p-3 h-[600px]'>
                    <motion.div className='flex items-center justify-center h-full'>
                        <motion.img
                            key={expandedService}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.9 }}
                            src={expandedService ? servicesData.find(service => service.id === expandedService)?.imgSrc || '/herodesign1.png' : '/herodesign1.png'}
                            alt='Services Illustration'
                            className='w-full h-full rounded-xl object-cover'
                        />
                    </motion.div>
                </motion.div>

            </motion.div>

        </motion.div>
    )
}

export default ServiceSection
