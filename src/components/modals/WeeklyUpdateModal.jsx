import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Send } from 'lucide-react';
import { MockAI } from '../../services/mockAI';
import { useApp } from '../../context/AppContext';

const WeeklyUpdateModal = ({ project, onClose }) => {
    const { addActivity, updateProject } = useApp();
    const [step, setStep] = useState('input'); // input, generating, review
    const [inputs, setInputs] = useState({ progress: '', nextSteps: '', risks: '', projectName: project.name });
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = async () => {
        setStep('generating');
        const result = await MockAI.generateWeeklyUpdate(inputs);
        setGeneratedContent(result);
        setStep('review');
        addActivity(`AI Generated weekly update draft for ${project.name}`, 'info');
    };

    const handleSend = () => {
        // Update project last update time
        updateProject(project.id, { lastUpdate: 'Just now' });
        addActivity(`Sent weekly update for ${project.name} to Client`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="text-cyan-400" size={20} /> AI Weekly Update
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>

                <div className="p-6">
                    {step === 'input' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Key Progress This Week</label>
                                <textarea
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    rows="3"
                                    placeholder="- Completed framing inspection&#10;- Installed roof trusses"
                                    value={inputs.progress}
                                    onChange={e => setInputs({ ...inputs, progress: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">What's Next?</label>
                                <textarea
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    rows="2"
                                    placeholder="- Begin electrical rough-in"
                                    value={inputs.nextSteps}
                                    onChange={e => setInputs({ ...inputs, nextSteps: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Risks / Delays</label>
                                <textarea
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    rows="2"
                                    placeholder="Lumber delivery delayed by 2 days"
                                    value={inputs.risks}
                                    onChange={e => setInputs({ ...inputs, risks: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={handleGenerate}
                                    disabled={!inputs.progress}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Sparkles size={18} /> Generate Draft
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'generating' && (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-cyan-400 font-bold animate-pulse">Analyzing project data & formulating update...</p>
                        </div>
                    )}

                    {step === 'review' && (
                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Review Draft</label>
                                <textarea
                                    className="w-full bg-transparent border-none text-slate-200 outline-none h-64 resize-none font-mono text-sm leading-relaxed"
                                    value={generatedContent}
                                    onChange={(e) => setGeneratedContent(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button onClick={() => setStep('input')} className="text-slate-400 hover:text-white px-4 py-2">Back to Edit</button>
                                <button onClick={handleSend} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                                    <Send size={18} /> Approve & Send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default WeeklyUpdateModal;
