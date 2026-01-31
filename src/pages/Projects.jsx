import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Calendar, Home } from 'lucide-react';

const projects = [
    { id: 1, name: 'Maplewood Estate', lot: 'Lot 4', stage: 'Framing', progress: 45, status: 'On Track', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'Riverside Complex', lot: 'Building B', stage: 'Finishing', progress: 85, status: 'On Track', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Oakridge Heights', lot: 'Phase 2', stage: 'Permitting', progress: 10, status: 'Delayed', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'Sunset Valley', lot: 'Plot 12', stage: 'Foundation', progress: 25, status: 'On Track', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=600' },
];

const Projects = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Active Projects</h1>
                <button className="btn-primary">+ New Project</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                ))}
            </div>
        </motion.div>
    );
};

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-card overflow-hidden group"
    >
        <div className="h-40 relative">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <p className="text-sm text-slate-300 flex items-center gap-1"><Home size={12} /> {project.lot}</p>
            </div>
            <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold ${project.status === 'Delayed' ? 'bg-red-500' : 'bg-green-500'}`}>
                {project.status}
            </div>
        </div>

        <div className="p-5">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Stage: <span className="text-white">{project.stage}</span></span>
                <span>{project.progress}%</span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${project.status === 'Delayed' ? 'bg-red-500' : 'bg-cyan-500'}`}
                />
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-800"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-slate-800"></div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>
        </div>
    </motion.div>
);

export default Projects;
