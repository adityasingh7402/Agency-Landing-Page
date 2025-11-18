'use client'

import React from 'react'
import { motion } from 'motion/react'
import impactData from '@/constants/Impactdata'
import trustlogo from '@/constants/TrustLogo'
import Image from 'next/image'

function ImpactSection() {
  return (
    <div className='container mx-auto py-20'>
        <motion.div className='flex flex-col'>
            <p className='text-white'>Impact</p>
            <div className='flex flex-col space-y-2'>
                <motion.span className='text-white text-6xl'>Lamosa makes it simple, <br/>and <motion.span className='text-neutral-400'>delivers results.</motion.span></motion.span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 cursor-pointer'>
                {impactData.map((item) => (
                    <motion.div key={item.id} 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: item.id * 0.3 }}
                    className='bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                        <motion.h2 className='text-4xl text-white font-bold mb-4'>{item.title}</motion.h2>
                        <motion.h3 className='text-xl text-neutral-400 font-semibold mb-2'>{item.name}</motion.h3>
                        <motion.p className='text-neutral-500'>{item.description}</motion.p>
                    </motion.div>
                ))}
            </div>
        </motion.div>

        <motion.div className='flex items-center justify-center pt-10 gap-10'>
            <motion.div>
                <motion.h2 className='text-4xl text-white font-sans'>Trusted by top founders</motion.h2>
            </motion.div>
            <motion.div className='flex items-center justify-center mask-l-from-30% mask-r-from-30%' >
                <div className="overflow-hidden">
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
                                className='flex items-center justify-center mx-5 grayscale hover:grayscale-0 transition-all duration-300'
                            >
                                <Image
                                src={logo.src}
                                height={120}
                                width={120}
                                alt={logo.alt}
                                className='text-white invert'
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