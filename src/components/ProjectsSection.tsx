'use client';

import React from 'react';
import { ProjectsData } from '../constants/ProjectsData';
import {motion} from 'motion/react'
import { IconArrowRight } from '@tabler/icons-react';


export const ProjectsSection: React.FC = () => {

  return (
    <div className='flex flex-col gap-8 pb-20 container mx-auto'>
        <div className='flex flex-col items-center justify-center'>
            <p className='text-foreground text-sm sm:text-base font-medium mb-2 sm:mb-3'>Impact</p>
            <div className='flex flex-col space-y-2 sm:space-y-3 md:space-y-4 text-center'>
                <motion.span className='text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    Here's what, <br className='hidden sm:block' />
                    <motion.span className='text-muted-foreground'>the momentum looks like.</motion.span>
                </motion.span>
            </div>
        </div>

       <motion.div className="min-h-screen">
            <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-400 rounded-3xl p-2">
                {ProjectsData.map((project, index) => (
                    <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}  // Pass index here
                    />
                ))}
            </motion.div>
        </motion.div>

        <div className=' w-full flex justify-end'>
            <motion.button className='mt-4'>
                <motion.span className='text-primary text-lg sm:text-xl font-medium bg-primary/10 backdrop-blur-xl shadow-3xl transition-all duration-300 cursor-pointer px-8 py-3 border-2 border-border rounded-full hover:bg-primary/10'>
                    View All Projects
                    <IconArrowRight className='inline-block w-6 h-6 ml-4 -mt-1' />
                </motion.span>
            </motion.button>
        </div>
    </div>
  );
};


type Project = {
  id: string | number;
  title: string;
  link: string;
  technologies: string[];
  img: string;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ 
      duration: 0.9, 
      delay: index * 0.2, 
    }}
    className="bg-card rounded-3xl p-8 shadow-sm hover:shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary border border-border rounded-full text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-900 transition-all duration-300"
        >
          View
          <IconArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex gap-3 mb-6 flex-wrap">
        {project.technologies.map((tech, index) => (
          <span key={index} className="px-4 py-2 bg-primary rounded-full text-sm text-muted-foreground font-medium">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="relative">
        <div className={`w-full h-96 rounded-2xl overflow-hidden`}>
          <div className="absolute inset-0">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};