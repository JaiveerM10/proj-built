import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Send } from 'lucide-react';
import { MockAI } from '../../services/mockAI';
import { useApp } from '../../context/AppContext';

const PhaseExplainerModal = ({ project, onClose }) => {
    const { addActivity } = useApp();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            const text = await MockAI.generatePhaseExplainer(project.stage);
            setContent(text);
            setLoading(false);
        };
        loadContent();
    }, [project.stage]);

    const handleSend = () => {
        addActivity(`Sent Phase Explainer (${project.stage}) to Client for ${project.name}`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <BookOpen className="text-purple-400" size={20} /> Phase Explainer
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>

                <div className="p-6">
                    <div className="mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Phase</span>
                        <h3 className="text-2xl font-bold text-white">{project.stage}</h3>
                    </div>

                    {loading ? (
                        <div className="h-32 flex items-center justify-center text-slate-500">
                            Loading educational content...
                        </div>
                    ) : (
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-6">
                            <p className="text-slate-200 leading-relaxed text-sm">
                                {content}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="text-slate-400 hover:text-white px-4 py-2">Cancel</button>
                        <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                            <Send size={18} /> Send to Client
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PhaseExplainerModal;
