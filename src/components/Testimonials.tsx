// 'use client'


// import React from 'react'
// import { motion } from 'motion/react'
// import { testimonialsData } from '@/constants/TestimonialsData'
// import Image from 'next/image'

// function Testimonials() {
//     return (
//         <section className='py-12'>
//             <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-3 gap-8 '>
                
//             </motion.div>
//         </section>
//     )
// }

// export default Testimonials

'use client'

import React from 'react'
import { motion } from 'motion/react'
import { testimonialsData } from '@/constants/TestimonialsData'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

function Testimonials() {
    return (
        <section className='py-12'>
            <motion.div className='text-center'>
                <p className='text-foreground text-sm sm:text-base font-medium mb-2 sm:mb-3'>Services</p>
            </motion.div>

            <motion.div className='text-center mb-10'>
                <motion.span className='text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    We are loved. <br className='hidden sm:block' />
                    <motion.span className='text-muted-foreground'>Just Success Stories.</motion.span>
                </motion.span>

                {/* <motion.button>
                    <motion.span className='text-primary text-lg sm:text-xl font-medium bg-primary/10 backdrop-blur-xl shadow-3xl transition-all duration-300 cursor-pointer px-8 py-3 border-2 border-border rounded-full hover:bg-primary/10'>
                        Start a Project
                        <IconArrowBarRight className='inline-block w-6 h-6 ml-4 -mt-1' />
                    </motion.span>
                </motion.button> */}
            </motion.div>
        <section className='p-4 container mx-auto bg-accent rounded-3xl'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr'>
                {/* First testimonial - Regular */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0 }}
                    viewport={{ once: true }}
                    className='bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow'
                >
                    <TestimonialCard data={testimonialsData[0]} />
                </motion.div>

                {/* Second testimonial - Regular */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className='bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow'
                >
                    <TestimonialCard data={testimonialsData[1]} />
                </motion.div>

                {/* Third testimonial - Spans 2 rows */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className='md:row-span-2 bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow'
                >
                    <TestimonialCard data={testimonialsData[2]} />
                </motion.div>

                {/* Fourth testimonial - Regular */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className='bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow'
                >
                    <TestimonialCard data={testimonialsData[3]} />
                </motion.div>


                {/* Custom CTA Card - Replaces 4th testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className='bg-accent rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group'
                >
                    {/* Dot pattern background */}
                    {/* <div className='absolute inset-0 opacity-100'>
                        <div className='absolute inset-0' style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '28px 28px'
                        }}></div>
                    </div> */}
                    <div className=" w-full bg-accent relative">
                    {/* Diagonal Fade Grid Background - Top Right */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                        backgroundImage: `
                            linear-gradient(to right, #404040 1px, transparent 1px),
                            linear-gradient(to bottom, #404040 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                        maskImage:
                            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                        }}
                    />
                        <div className='relative z-10 h-full flex flex-col justify-between'>
                        <div>
                            <h3 className='text-3xl md:text-4xl font-bold text-primary leading-tight'>
                                You focus <span className='text-foreground'>on</span>
                            </h3>
                            <h3 className='text-3xl md:text-4xl font-bold text-muted-foreground leading-tight'>
                                your company.
                            </h3>
                            <h3 className='text-3xl md:text-4xl font-bold text-foreground leading-tight mt-2'>
                                We make <span className='text-muted-foreground'>it happen.</span>
                            </h3>
                            <h2 className='text-4xl md:text-5xl font-bold text-foreground mt-4'>
                                Unstoppable Growth.
                            </h2>
                        </div>

                        <button className='mt-8 bg-background border-border border-2 text-primary rounded-full px-8 py-4 flex items-center justify-between shadow-lg w-full md:w-auto'>
                            <span className='font-semibold text-primary text-xl mr-4'>Book A Call</span>
                            <div className='bg-accent/10 rounded-full p-2'>
                                <ArrowRight className='w-8 h-8 text-primary' />
                            </div>
                        </button>
                    </div>
                    </div>

                    {/* <div className='relative z-10 h-full flex flex-col justify-between'>
                        <div>
                            <h3 className='text-3xl md:text-4xl font-bold text-primary leading-tight'>
                                You focus <span className='text-foreground'>on</span>
                            </h3>
                            <h3 className='text-3xl md:text-4xl font-bold text-muted-foreground leading-tight'>
                                your company.
                            </h3>
                            <h3 className='text-3xl md:text-4xl font-bold text-white leading-tight mt-2'>
                                We make <span className='text-muted-foreground'>it happen.</span>
                            </h3>
                            <h2 className='text-4xl md:text-5xl font-bold text-white mt-4'>
                                Unstoppable Growth.
                            </h2>
                        </div>

                        <button className='mt-8 bg-accent border-border border-2 text-black rounded-full px-8 py-4 flex items-center justify-between hover:bg-gray-100 transition-all group-hover:scale-105 shadow-lg w-full md:w-auto'>
                            <span className='font-semibold text-primary text-lg mr-4'>Book A Call</span>
                            <div className='bg-accent/10 rounded-full p-2'>
                                <ArrowRight className='w-5 h-5 text-primary' />
                            </div>
                        </button>
                    </div> */}
                </motion.div>
            </div>
        </section>
        </section>
    )
}

// Testimonial Card Component
function TestimonialCard({ data }: { data: any }) {
    return (
        <div className='flex flex-col h-full shadow-3xl'>
            {/* Metric */}
            <div className='mb-6'>
                <div className='text-5xl text-foreground mb-2'>
                    {data.number}
                </div>
                <div className='text-muted-foreground text-md'>
                    {data.subtitle}
                </div>
            </div>

            {/* Quote mark */}
            <div className='text-muted-foreground text-4xl font-serif mb-4'>"</div>

            {/* Description */}
            <p className='text-primary font-sans text-3xl leading-relaxed mb-8 flex-grow'>
                {data.description}
            </p>

            {/* Author info */}
            <div className='flex items-center gap-3 mt-auto'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden bg-gray-200'>
                    {data.image && (
                        <Image
                            src={data.image}
                            alt={data.name}
                            fill
                            className='object-cover'
                        />
                    )}
                </div>
                <div>
                    <div className='font-semibold text-gray-900'>{data.name}</div>
                    <div className='text-sm text-gray-500'>{data.position}</div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials