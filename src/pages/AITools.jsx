import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, RefreshCw, MessageSquare, ArrowRight, Zap, Check, ChevronRight } from 'lucide-react';

const AITools = () => {
    const [activeTab, setActiveTab] = useState('update');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0); // 0: input, 1: generating, 2: complete
    const [generatedContent, setGeneratedContent] = useState('');
    const [prompt, setPrompt] = useState('');

    // Streaming simulation
    const streamText = (text) => {
        let i = 0;
        setGeneratedContent('');
        const interval = setInterval(() => {
            setGeneratedContent(prev => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 10); // Faster typing
    };

    const handleGenerate = () => {
        if (!prompt && activeTab !== 'chat') return;

        setLoading(true);
        setStep(1); // switch to loading view

        // Simulate multi-step thinking process
        setTimeout(() => {
            setLoading(false);
            setStep(2); // show result

            const responses = {
                update: `Subject: Weekly Project Update - Maplewood Lot 4\n\nHi [Client Name],\n\nHere is the latest progress on your home for the week of Jan 30th:\n\n✅ COMPLETED THIS WEEK:\n• Framing is now 100% complete.\n• Structural inspection was passed successfully today.\n\n📅 UPCOMING NEXT WEEK:\n• Windows are scheduled for delivery next Tuesday (Feb 4th).\n• HVAC rough-in begins on Wednesday.\n\nEverything is moving along on schedule! Let me know if you have any questions.\n\nBest,\nAlex M.\nProject Manager`,
                change: `*** CHANGE ORDER ANALYSIS ***\n\nISSUE: Original tile selection discontinued.\n\nPROPOSED SOLUTION: Switch to 'Venetian Slate' Italian Porcelain.\n\nIMPACT ANALYSIS:\n• Cost Increase: $450.00 (Material difference)\n• Timeline Delay: 0 Days (In stock locally)\n• Quality: Upgrade (Class 4 vs Class 3 rating)\n\nRECOMMENDATION:\nApprove. This material is superior and available immediately, preventing a 2-week delay.`,
                csr: `*** SUSTAINABILITY SNAPSHOT ***\n\nProject: Riverside Complex B\n\nRecent Eco-Features Installed:\n• High-efficiency heat pump system (SEER 21)\n• R-60 Attic Insulation\n• Low-VOC Interior Paints\n\nEnvironmental Impact:\nSaved approx. 1,200 lbs of CO2 annually compared to standard code build.\n\nCommunity Note:\nNotifications sent to 12 neighbors regarding upcoming crane work. No noise complaints received.`
            };

            const responseText = responses[activeTab] || "I'm not sure how to handle that request.";
            streamText(responseText);

        }, 2500);
    };

    const reset = () => {
        setStep(0);
        setGeneratedContent('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col"
        >
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        AI Workflows
                    </h1>
                    <p className="text-slate-400 mt-1">Select a specialized agent to automate your tasks.</p>
                </div>
            </div>

            <div className="flex-1 glass-card overflow-hidden flex flex-col md:flex-row border-0 ring-1 ring-white/10 shadow-2xl">
                {/* Sidebar for Tools */}
                <div className="w-full md:w-64 bg-slate-900/50 border-r border-white/5 p-4 flex flex-col gap-2">
                    <ToolButton id="update" label="Weekly Update" icon={<RefreshCw size={18} />} active={activeTab} onClick={() => { setActiveTab('update'); reset(); }} />
                    <ToolButton id="change" label="Change Order" icon={<Zap size={18} />} active={activeTab} onClick={() => { setActiveTab('change'); reset(); }} />
                    <ToolButton id="csr" label="CSR Report" icon={<MessageSquare size={18} />} active={activeTab} onClick={() => { setActiveTab('csr'); reset(); }} />

                    <div className="mt-auto px-4 py-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                        <h4 className="text-sm font-bold text-indigo-300 mb-1">Pro Tip</h4>
                        <p className="text-xs text-indigo-200/70">Use specific bullet points for better results. The AI knows project context.</p>
                    </div>
                </div>

                {/* Main Interface Area */}
                <div className="flex-1 relative flex flex-col">

                    {/* Conditional Views based on Step */}
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex-1 p-8 flex flex-col"
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {activeTab === 'update' && "Generate Client Update"}
                                    {activeTab === 'change' && "Explain Change Order"}
                                    {activeTab === 'csr' && "Generate Sustainability Report"}
                                </h2>

                                <div className="space-y-6 max-w-2xl">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Select Project</label>
                                        <select className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors">
                                            <option>Maplewood Estate - Lot 4</option>
                                            <option>Riverside Complex - Building B</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {activeTab === 'update' ? 'Key Progress Points' : 'Details'}
                                        </label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full h-40 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-colors resize-none"
                                            placeholder={activeTab === 'update' ? "- Framing complete\n- Passed inspection\n- Windows arriving Tuesday" : "Describe the change..."}
                                        />
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={20} /> Generate Draft
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                                    <div className="absolute inset-4 rounded-full bg-cyan-500/20 flex items-center justify-center animate-pulse">
                                        <Sparkles size={32} className="text-cyan-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">AI is analyzing project data...</h3>
                                <p className="text-slate-400">Comparing with historical timelines and tone guidelines.</p>

                                <div className="mt-8 flex gap-2">
                                    <StepIndicator label="Context" active />
                                    <StepIndicator label="Drafting" activeDelay={1} />
                                    <StepIndicator label="Refining" activeDelay={2} />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 flex flex-col p-6 h-full"
                            >
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <button onClick={reset} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                                        <ChevronRight className="rotate-180" size={16} /> Back to Edit
                                    </button>
                                    <div className="flex gap-2">
                                        <button className="btn-secondary text-sm px-3 py-1.5 flex items-center gap-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300">
                                            <Copy size={14} /> Copy
                                        </button>
                                        <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-4 py-1.5 flex items-center gap-2 rounded-lg font-medium transition-colors">
                                            <Send size={14} /> Send
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 bg-slate-950/50 rounded-xl p-6 font-mono text-sm leading-relaxed text-slate-200 overflow-y-auto border border-white/5 shadow-inner">
                                    {generatedContent}
                                    <span className="animate-pulse inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle"></span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </motion.div>
    );
};

const ToolButton = ({ id, label, icon, active, onClick }) => (
    <button
        onClick={onClick}
        className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left
            ${active === id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}
        `}
    >
        {icon}
        {label}
        {active === id && <ChevronRight size={16} className="ml-auto" />}
    </button>
);

const StepIndicator = ({ label, active, activeDelay = 0 }) => (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5">
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-cyan-500 animate-pulse' : 'bg-slate-600'}`}></div>
        <span className="text-xs font-medium text-slate-300">{label}</span>
    </div>
);

export default AITools;
