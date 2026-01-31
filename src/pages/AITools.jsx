import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, RefreshCw, MessageSquare, Zap, Clock, CheckCircle2, AlertTriangle, Calendar, ChevronRight, X, Edit3, Check } from 'lucide-react';

const AITools = () => {
    // TABS: 'interactive' (Manual tools), 'scheduled' (Auto-runs)
    const [mainView, setMainView] = useState('scheduled');

    // Interactive State
    const [activeTool, setActiveTool] = useState('update');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState('');
    const [prompt, setPrompt] = useState('');

    // Scheduled State (Mock Data)
    const [scheduledItems, setScheduledItems] = useState([
        { id: 1, project: 'Maplewood Estate - Lot 4', type: 'Weekly Update', status: 'Pending Review', due: 'Today, 5:00 PM', urgency: 'high', content: "Subject: Weekly Update\n\nHi [Client],\n\nThis week we completed the framing stage. Inspections are set for tomorrow. Everything stays on track!" },
        { id: 2, project: 'Riverside B', type: 'Weekly Update', status: 'Pending Review', due: 'Today, 5:00 PM', urgency: 'high', content: "Subject: Weekly Update\n\nHi [Client],\n\nFoundation work is proceeding. Concrete pour is scheduled for Thursday pending weather." },
        { id: 3, project: 'Oakridge Ph2', type: 'CSR Report', status: 'Draft Ready', due: 'Tomorrow', urgency: 'medium', content: "Community Impact Report:\n\n- Zero noise complaints\n- 40% waste diversion achieved\n- Newsletter distributed to HOA." },
    ]);

    const [selectedDraft, setSelectedDraft] = useState(null);

    const streamText = (text) => {
        let i = 0;
        setGeneratedContent('');
        const interval = setInterval(() => {
            setGeneratedContent(prev => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 10);
    };

    const handleGenerate = () => {
        setLoading(true);
        setStep(1);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            const responses = {
                update: `Subject: Weekly Project Update\n\nHi [Client Name],\n\nHere is the latest progress:\n\n✅ COMPLETED:\n• Task A Complete\n• Task B Complete\n\nEverything is on schedule.`,
                change: `*** CHANGE ORDER ***\n\nSummary of changes...`,
                csr: `*** CSR REPORT ***\n\nSustainability metrics...`
            };
            streamText(responses[activeTool] || "Generating...");
        }, 2000);
    };

    const reset = () => { setStep(0); setGeneratedContent(''); };

    // Helper to approve draft
    const approveDraft = (id) => {
        setScheduledItems(prev => prev.filter(i => i.id !== id));
        setSelectedDraft(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col relative"
        >
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        AI Hub
                    </h1>
                    <p className="text-slate-400 mt-1">Manage automated workflows and on-demand agents.</p>
                </div>

                {/* Main View Toggle */}
                <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setMainView('scheduled')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mainView === 'scheduled' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Calendar size={16} /> Scheduled Runs
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">{scheduledItems.length}</span>
                    </button>
                    <button
                        onClick={() => setMainView('interactive')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mainView === 'interactive' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Zap size={16} /> Interactive Tools
                    </button>
                </div>
            </div>

            {mainView === 'scheduled' ? (
                <ScheduledView items={scheduledItems} onReview={(item) => setSelectedDraft(item)} />
            ) : (
                <InteractiveView
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    step={step}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    handleGenerate={handleGenerate}
                    loading={loading}
                    reset={reset}
                    generatedContent={generatedContent}
                />
            )}

            {/* Review Modal */}
            <AnimatePresence>
                {selectedDraft && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedDraft(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Review Draft</h3>
                                    <p className="text-sm text-slate-400">{selectedDraft.type} for {selectedDraft.project}</p>
                                </div>
                                <button onClick={() => setSelectedDraft(null)}><X size={20} className="text-slate-400 hover:text-white" /></button>
                            </div>

                            <div className="p-6 bg-slate-950/50 font-mono text-sm text-slate-300 min-h-[200px] whitespace-pre-wrap">
                                {selectedDraft.content}
                            </div>

                            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-slate-800/50">
                                <button className="px-4 py-2 text-slate-400 hover:text-white flex items-center gap-2">
                                    <Edit3 size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => approveDraft(selectedDraft.id)}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/20"
                                >
                                    <Check size={18} /> Approve & Send
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

const ScheduledView = ({ items, onReview }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 overflow-y-auto"
    >
        <div className="glass-card p-8 border-0 ring-1 ring-white/10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white">Pending Approvals</h2>
                    <p className="text-slate-400 text-sm">Automated drafts generated this week requiring your review.</p>
                </div>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">No pending items. You're all caught up!</div>
                ) : items.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.type === 'Weekly Update' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                {item.type === 'Weekly Update' ? <RefreshCw size={20} /> : <MessageSquare size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{item.project}</h3>
                                <div className="flex gap-3 text-xs text-slate-400 mt-1">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {item.due}</span>
                                    <span className="w-1 h-3 border-r border-slate-600"></span>
                                    <span>{item.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                                {item.status}
                            </span>
                            <button
                                onClick={() => onReview(item)}
                                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Review Draft
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer with timer included in original component, kept here for consistency if needed or removed if too cluttered */}
            <div className="mt-12 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-white">Next Auto-Run</h3>
                    <p className="text-sm text-slate-400">Scheduled for Friday at 9:00 AM</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={20} />
                    <span className="font-mono">42h : 12m : 30s</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const InteractiveView = ({ activeTool, setActiveTool, step, prompt, setPrompt, handleGenerate, loading, reset, generatedContent }) => (
    <div className="flex-1 glass-card overflow-hidden flex flex-col md:flex-row border-0 ring-1 ring-white/10 shadow-2xl">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-900/50 border-r border-white/5 p-4 flex flex-col gap-2">
            <ToolButton id="update" label="Pro Update" icon={<RefreshCw size={18} />} active={activeTool} onClick={() => { setActiveTool('update'); reset(); }} />
            <ToolButton id="change" label="Change Order" icon={<Zap size={18} />} active={activeTool} onClick={() => { setActiveTool('change'); reset(); }} />
            <ToolButton id="csr" label="CSR Report" icon={<MessageSquare size={18} />} active={activeTool} onClick={() => { setActiveTool('csr'); reset(); }} />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 relative flex flex-col">
            {step === 0 && (
                <div className="max-w-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Manual Generation</h3>
                    <textarea
                        className="w-full h-32 bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white resize-none outline-none focus:border-cyan-500"
                        placeholder="Enter details..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    ></textarea>
                    <button onClick={handleGenerate} className="mt-4 w-full bg-cyan-600 text-white p-3 rounded-xl font-bold hover:bg-cyan-500 transition-colors">Generate</button>
                </div>
            )}
            {step === 1 && <div className="flex-1 flex items-center justify-center text-cyan-400 animate-pulse">AI is thinking...</div>}
            {step === 2 && (
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-slate-950/50 p-6 rounded-xl font-mono text-sm text-slate-300 whitespace-pre-wrap overflow-y-auto">
                        {generatedContent}
                    </div>
                    <button onClick={reset} className="mt-4 text-slate-400 hover:text-white text-sm">Reset</button>
                </div>
            )}
        </div>
    </div>
);

const ToolButton = ({ id, label, icon, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${active === id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
        {icon} {label}
    </button>
);

export default AITools;
