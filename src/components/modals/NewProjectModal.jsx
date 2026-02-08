import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Home, MapPin, User, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NewProjectModal = ({ onClose }) => {
    const { addProject, addActivity } = useApp();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        lot: '',
        location: '',
        manager: '',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' // Default
    });

    const handleSubmit = () => {
        const newProject = {
            id: Date.now(),
            ...formData,
            stage: 'Preparation',
            progress: 0,
            status: 'On Track',
            lastUpdate: 'Just created'
        };
        addProject(newProject);
        addActivity(`New project created: ${formData.name}`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Plus className="text-cyan-400" size={20} /> Initialize Project
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors group">
                        <X size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mb-4">
                        <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-700'}`} />
                        <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-700'}`} />
                    </div>

                    {step === 1 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1">Project Name</label>
                                <div className="relative">
                                    <Home className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500/50 focus:bg-cyan-500/5 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="e.g. Skyline Heights"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1">Lot / Unit Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500/50 focus:bg-cyan-500/5 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="e.g. Lot 43, Phase 2"
                                    value={formData.lot}
                                    onChange={e => setFormData({ ...formData, lot: e.target.value })}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1">Location Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500/50 focus:bg-cyan-500/5 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="123 Builder Lane"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase font-bold text-slate-500 ml-1">Project Manager</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500/50 focus:bg-cyan-500/5 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="e.g. Alex M."
                                        value={formData.manager}
                                        onChange={e => setFormData({ ...formData, manager: e.target.value })}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 pt-2 flex justify-between">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
                            Back
                        </button>
                    ) : <div></div>}

                    {step < 2 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={!formData.name}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} /> Create Project
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default NewProjectModal;
