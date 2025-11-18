import React from 'react'
import Image from 'next/image'
import { motion } from "motion/react"

function HeroSection() {
  return (
    <div className='flex flex-col'>

        <div className='flex items-center justify-end relative max-h-screen overflow-hidden mask-b-from-30%'>
            <div className='z-10 absolute sm:left-20'>
                <h1 className="text-2xl md:text-7xl text-white dark:text-white bg-transparent bg-clip-text">
                    The Ultimate <br /> <span className='italic'>development</span> studio
                </h1>
                <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200 dark:text-neutral-200">
                    We build beautiful products with the latest technologies and frameworks.
                    We are a team of passionate developers and designers that love to build
                    amazing products.
                </p>
                
            </div>
            <div className='flex flex-row gap-5 rotate-x-50 rotate-z-45'>
                <motion.div
                    initial={{ y: 500 }}
                    animate={{ y: [-1000, 1000] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className='flex flex-col space-y-10 mb-20 opacity-30'
                    >
                    {[...new Array(2)].fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                        <Image
                            src="https://aceternity.com/images/products/thumbnails/new/cursor.png"
                            alt="Hero Image"
                            width={600}
                            height={400}
                        />
                        <Image
                            src="https://aceternity.com/images/products/thumbnails/new/rogue.png"
                            alt="Hero Image"
                            width={600}
                            height={400}
                        />
                        <Image
                            src="https://aceternity.com/images/products/thumbnails/new/rogue.png"
                            alt="Hero Image"
                            width={600}
                            height={400}
                        />
                        </React.Fragment>
                    ))}
                </motion.div>

                <motion.div
                initial={{ y: -500 }}
                animate={{ y: [1000, -1000] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className='flex flex-col space-y-10 mb-20 opacity-30'>
                {[...new Array(2)].fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        <Image
                            src="https://aceternity.com/images/products/thumbnails/new/cursor.png"
                            alt="Hero Image"
                            width={600}
                            height={400}
                        />
                        <Image
                            src="https://aceternity.com/images/products/thumbnails/new/rogue.png"
                            alt="Hero Image"
                            width={600}
                            height={400}
                        />
                        <Image
                            src="https://aceternity.com/images/products/thumbnails/new/rogue.png"
                            alt="Hero Image"
                            width={600}
                            height={400}
                        />
                    </React.Fragment>
                ))}
                </motion.div>

                <motion.div
                initial={{ y: 500 }}
                animate={{ y: [-1000, 1000] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className='flex flex-col space-y-10 mb-20 opacity-30'>
                {[...new Array(2)].fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                    <Image
                        src="https://aceternity.com/images/products/thumbnails/new/cursor.png"
                        alt="Hero Image"
                        width={600}
                        height={400}
                    />
                    <Image
                        src="https://aceternity.com/images/products/thumbnails/new/rogue.png"
                        alt="Hero Image"
                        width={600}
                        height={400}
                    />
                    <Image
                        src="https://aceternity.com/images/products/thumbnails/new/cursor.png"
                        alt="Hero Image"
                        width={600}
                        height={400}
                    />
                    </React.Fragment>
                ))}
                </motion.div>

            </div>
        </div>

        <div>

        </div>
    </div>
  )
}

export default HeroSection