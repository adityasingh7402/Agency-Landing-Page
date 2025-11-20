'use client'

import React from 'react'
import { motion } from 'motion/react'
import impactData from '@/constants/Impactdata'
import trustlogo from '@/constants/TrustLogo'
import Image from 'next/image'

function ImpactSection() {
    return (
        <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24'>
            <motion.div className='flex flex-col'>
                <p className='text-foreground text-sm sm:text-base font-medium mb-2 sm:mb-3'>Impact</p>
                <div className='flex flex-col space-y-2 sm:space-y-3 md:space-y-4'>
                    <motion.span className='text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                        Lamosa makes it simple, <br className='hidden sm:block' />
                        and <motion.span className='text-muted-foreground'>delivers results.</motion.span>
                    </motion.span>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10 cursor-pointer'>
                    {impactData.map((item) => (
                        <motion.div key={item.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: item.id * 0.3 }}
                            className='bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                            <motion.h2 className='text-2xl sm:text-3xl md:text-4xl text-card-foreground font-bold mb-2 sm:mb-3 md:mb-4'>{item.title}</motion.h2>
                            <motion.h3 className='text-base sm:text-lg md:text-xl text-muted-foreground font-semibold mb-1 sm:mb-2'>{item.name}</motion.h3>
                            <motion.p className='text-sm sm:text-base text-muted-foreground opacity-80 leading-relaxed'>{item.description}</motion.p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div className='flex flex-col lg:flex-row items-center justify-center pt-8 sm:pt-10 md:pt-12 lg:pt-16 gap-6 sm:gap-8 md:gap-10'>
                <motion.div className='text-center lg:text-left'>
                    <motion.h2 className='text-2xl sm:text-3xl md:text-4xl text-foreground font-sans font-bold'>Trusted by top founders</motion.h2>
                </motion.div>
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

            </motion.div>

        </div>
    )
}

export default ImpactSection