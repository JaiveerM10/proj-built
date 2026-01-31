import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Calendar, Home, X, Clock, MapPin, FileText, CheckCircle2 } from 'lucide-react';

const projects = [
    { id: 1, name: 'Maplewood Estate', lot: 'Lot 4', stage: 'Framing', progress: 45, status: 'On Track', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', location: '123 Maple Dr, Springfield', manager: 'Alex M.' },
    { id: 2, name: 'Riverside Complex', lot: 'Building B', stage: 'Finishing', progress: 85, status: 'On Track', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', location: '45 River Rd, Hartford', manager: 'Sarah L.' },
    { id: 3, name: 'Oakridge Heights', lot: 'Phase 2', stage: 'Permitting', progress: 10, status: 'Delayed', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600', location: '88 Oak Ln, Shelbyville', manager: 'Mike R.' },
    { id: 4, name: 'Sunset Valley', lot: 'Plot 12', stage: 'Foundation', progress: 25, status: 'On Track', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=600', location: '101 Sun Way, Ogdenville', manager: 'Alex M.' },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Active Projects</h1>
                <button className="btn-primary">+ New Project</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelectedProject(p)} />
                ))}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-white/20 transition-colors z-10">
                                <X size={20} />
                            </button>

                            <div className="h-48 relative">
                                <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                <div className="absolute bottom-5 left-6">
                                    <h2 className="text-3xl font-bold text-white">{selectedProject.name}</h2>
                                    <p className="text-slate-300 flex items-center gap-2 mt-1"><MapPin size={16} /> {selectedProject.location}</p>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-xl text-center">
                                        <div className="text-slate-400 text-xs uppercase font-bold mb-1">Stage</div>
                                        <div className="text-white font-bold">{selectedProject.stage}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl text-center">
                                        <div className="text-slate-400 text-xs uppercase font-bold mb-1">Status</div>
                                        <div className={`font-bold ${selectedProject.status === 'On Track' ? 'text-green-400' : 'text-red-400'}`}>{selectedProject.status}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl text-center">
                                        <div className="text-slate-400 text-xs uppercase font-bold mb-1">Manager</div>
                                        <div className="text-white font-bold">{selectedProject.manager}</div>
                                    </div>
                                </div>

                                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Clock size={18} /> Recent Timeline</h3>
                                <div className="space-y-6 relative border-l border-white/10 ml-2 pl-6 pb-2">
                                    <TimelineItem date="Today, 9:00 AM" text="Weekly inspection passed." active />
                                    <TimelineItem date="Yesterday" text="Framing completed by subcontractor." />
                                    <TimelineItem date="2 days ago" text="Material delivery accepted (Lumber package)." />
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
                                    <button onClick={() => setSelectedProject(null)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Close</button>
                                    <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold transition-colors">View Full Dashboard</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ProjectCard = ({ project, index, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="glass-card overflow-hidden group cursor-pointer hover:ring-2 hover:ring-cyan-500/50 transition-all"
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
                <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                    <ChevronRight size={18} />
                </div>
            </div>
        </div>
    </motion.div>
);

const TimelineItem = ({ date, text, active }) => (
    <div className="relative">
        <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 ${active ? 'bg-cyan-500 border-cyan-500' : 'bg-slate-900 border-slate-600'}`}></div>
        <p className="text-sm font-bold text-white">{text}</p>
        <p className="text-xs text-slate-500">{date}</p>
    </div>
);

// Helper for icon
const ChevronRight = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>;

export default Projects;
