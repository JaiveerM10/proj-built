import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, FileText, ArrowRight, DollarSign, Clock } from 'lucide-react';
import { MockAI } from '../../services/mockAI';
import { useApp } from '../../context/AppContext';

const ChangeOrderModal = ({ project, onClose }) => {
    const { addActivity } = useApp();
    const [step, setStep] = useState('input');
    const [inputs, setInputs] = useState({ description: '', reason: '', cost: '', time: '' });
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async () => {
        setStep('analyzing');
        const result = await MockAI.generateChangeOrder(inputs);
        setAnalysis(result);
        setStep('review');
        addActivity(`AI Analyzed Change Order impact for ${project.name}`, 'info');
    };

    const handleCreate = () => {
        addActivity(`Change Order created for ${project.name} ($${inputs.cost})`, 'warning');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-cyan-400" size={20} /> New Change Order
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>

                <div className="p-6">
                    {step === 'input' && (
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 space-y-4">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-1">What is changing?</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                        placeholder="e.g. Upgrade Kitchen Countertops"
                                        value={inputs.description}
                                        onChange={e => setInputs({ ...inputs, description: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-1">Reason for Change</label>
                                    <textarea
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                        rows="3"
                                        placeholder="Client requested Quartz instead of Granite."
                                        value={inputs.reason}
                                        onChange={e => setInputs({ ...inputs, reason: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Est. Cost Impact ($)</label>
                                <div className="relative">
                                    <DollarSign size={16} className="absolute left-3 top-3.5 text-slate-500" />
                                    <input
                                        type="number"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 p-3 text-white focus:border-cyan-500 outline-none"
                                        value={inputs.cost}
                                        onChange={e => setInputs({ ...inputs, cost: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Est. Time Impact (Days)</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-3.5 text-slate-500" />
                                    <input
                                        type="number"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 p-3 text-white focus:border-cyan-500 outline-none"
                                        value={inputs.time}
                                        onChange={e => setInputs({ ...inputs, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-span-2 pt-4 flex justify-end">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={!inputs.description || !inputs.cost}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Sparkles size={18} /> Analyze Impact
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'analyzing' && (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-cyan-400 font-bold animate-pulse">Calculating deltas & generating summary...</p>
                        </div>
                    )}

                    {step === 'review' && analysis && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800 p-4 rounded-xl border border-white/5">
                                    <h4 className="text-sm text-slate-400 mb-1">Cost Impact</h4>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <span className="text-red-400">+${inputs.cost}</span>
                                    </p>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-xl border border-white/5">
                                    <h4 className="text-sm text-slate-400 mb-1">Timeline Impact</h4>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <span className="text-yellow-400">+{inputs.time} Days</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs uppercase text-slate-500 font-bold mb-3">AI Summary Note</h4>
                                <div className="text-slate-200 text-sm whitespace-pre-wrap">{analysis.analysis}</div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button onClick={() => setStep('input')} className="text-slate-400 hover:text-white px-4 py-2">Edit Inputs</button>
                                <button onClick={handleCreate} className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                                    Create Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ChangeOrderModal;
