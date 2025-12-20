import React from 'react'
import { blogData } from '@/constants/BlogData'

function BlogSection() {
    return (
        <div className='container mx-auto px-4 sm:px-6 md:px-8'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center pb-8 sm:pb-12 gap-4'>
                <span className='text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'>
                    Fresh Insights and ideas. <br className='hidden sm:block' />
                    <span className='text-muted-foreground'>From the Team.</span>
                </span>
            </div>

            <div className='p-3 sm:p-4 border rounded-lg shadow-lg bg-accent'>
                <div className='flex flex-col lg:flex-row justify-between gap-4 lg:gap-6'>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 w-full gap-2'>
                            <div className='flex flex-row items-center gap-2'>
                                <h2 className='text-base sm:text-lg lg:text-xl text-primary'>{blogData[0].author}</h2>
                                <p className='text-muted-foreground text-base sm:text-lg lg:text-xl'>{blogData[0].date}</p>
                            </div>

                            <div className='flex flex-row items-center'>
                                <p className='text-muted-foreground text-base sm:text-lg lg:text-xl'>{blogData[0].readTime}</p>
                            </div>
                        </div>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-primary'>{blogData[0].title}</h1>
                        <div className='flex flex-row gap-2 sm:gap-3 items-center flex-wrap'>
                            {blogData[0].tags.map((item) => (
                                <span className='text-sm sm:text-base lg:text-lg bg-card text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl border-border shadow-md' key={item}>{item}</span>
                            ))}
                        </div>
                        <div className='rounded-2xl sm:rounded-3xl p-2 bg-background mt-4 sm:mt-6'>
                            <img src={blogData[0].imgUrl} alt={blogData[0].title} className='w-full h-auto rounded-[12px] sm:rounded-[16px]' />
                        </div>


                    </div>
                    <div className='flex flex-col w-full lg:w-1/2 gap-4 sm:gap-6'>
                        {
                            [blogData[1], blogData[2], blogData[3]].map((item) => (
                                <div key={item.title} className='flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4'>
                                    <div className='rounded-2xl sm:rounded-3xl p-2 bg-background w-full sm:w-1/2 order-2 sm:order-1'>
                                        <img src={blogData[0].imgUrl} alt={blogData[0].title} className='w-full h-auto rounded-[12px] sm:rounded-[16px]' />
                                    </div>
                                    <div className='w-full sm:w-2/3 flex flex-col order-1 sm:order-2'>
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 w-full gap-1 sm:gap-2'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <h2 className='text-sm sm:text-base lg:text-lg text-primary'>{item.author}</h2>
                                                <p className='text-muted-foreground text-sm sm:text-base lg:text-lg'>{item.date}</p>
                                            </div>

                                            {/* <div className='flex flex-row items-center'>
                                            <p className='text-muted-foreground text-lg'>{item.readTime}</p>
                                        </div> */}
                                        </div>
                                        <h3 className='text-lg sm:text-xl lg:text-2xl mb-2 text-primary line-clamp-2'>{item.title}</h3>
                                        <div className='flex flex-row gap-2 items-center flex-wrap'>
                                            {item.tags.map((item) => (
                                                <span className='text-xs sm:text-sm lg:text-base bg-card text-primary px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-3xl border-border shadow-md' key={item}>{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}

export default BlogSection