import React from 'react'
import { blogData } from '@/constants/BlogData'

function BlogSection() {
  return (
    <div className='container mx-auto'>
        <div className='flex flex-row justify-between items-center pb-12'>
            <span className='text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                Fresh Insights and ideas. <br className='hidden sm:block' />
                <span className='text-muted-foreground'>From the Team.</span>
            </span>
        </div>

        <div className='p-4 border rounded-lg shadow-lg bg-accent'>
            <div className='flex flex-row justify-between gap-4'>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-row items-center justify-between mb-4 w-full'>
                        <div className='flex flex-row items-center gap-2'>
                            <h2 className='text-xl text-primary'>{blogData[0].author}</h2>
                            <p className='text-muted-foreground text-xl'>{blogData[0].date}</p>
                        </div>

                        <div className='flex flex-row items-center'>
                            <p className='text-muted-foreground text-xl'>{blogData[0].readTime}</p>
                        </div>
                    </div>  
                    <h1 className='text-4xl mb-4 text-primary'>{blogData[0].title}</h1>
                    <div className='flex flex-row gap-3 items-center'>
                        {blogData[0].tags.map((item) => (
                            <span className='text-lg bg-card text-primary px-4 py-2 rounded-3xl border-border shadow-md' key={item}>{item}</span>
                        ))}
                    </div>
                    <div className='rounded-3xl p-2 bg-background mt-6'>
                        <img src={blogData[0].imgUrl} alt={blogData[0].title} className='w-full h-auto rounded-[16px]'/>
                    </div>


                </div>
                <div className='flex flex-col w-1/2'>
                    {
                        [blogData[1], blogData[2], blogData[3]].map((item) => (
                            <div key={item.title} className='flex flex-row justify-between items-start mb-6 gap-4'>
                                <div className='rounded-3xl p-2 bg-background mt-6 w-1/2'>
                                    <img src={blogData[0].imgUrl} alt={blogData[0].title} className='w-full h-auto rounded-[16px]'/>
                                </div>
                                <div className='w-2/3 flex flex-col'>
                                    <div className='flex flex-row items-center justify-between mb-2 w-full'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <h2 className='text-lg text-primary'>{item.author}</h2>
                                            <p className='text-muted-foreground text-lg'>{item.date}</p>
                                        </div>

                                        {/* <div className='flex flex-row items-center'>
                                            <p className='text-muted-foreground text-lg'>{item.readTime}</p>
                                        </div> */}
                                    </div>  
                                    <h3 className='text-2xl mb-2 text-primary'>{item.title}</h3>
                                    <div className='flex flex-row gap-3 items-center'>
                                        {item.tags.map((item) => (
                                            <span className='text-lg bg-card text-primary px-4 py-2 rounded-3xl border-border shadow-md' key={item}>{item}</span>
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