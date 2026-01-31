import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Copy, RefreshCw } from 'lucide-react';

const AITools = () => {
    const [activeTab, setActiveTab] = useState('update');
    const [loading, setLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = () => {
        setLoading(true);
        setGeneratedContent('');

        // Simulate AI Stream
        setTimeout(() => {
            setLoading(false);
            const text = activeTab === 'update'
                ? `Subject: Weekly Project Update - Maplewood Lot 4\n\nHi [Client Name],\n\nHere is the latest progress on your home:\n\n• Framing is now 100% complete.\n• Structural inspection was passed successfully today.\n• Windows are scheduled for delivery next Tuesday.\n\nEverything is moving along on schedule!\n\nBest,\nAlex M.`
                : `*** CHANGE ORDER ANALYSIS ***\n\nImpact Summary:\n• Cost Increase: $450.00\n• Timeline Delay: 0 Days\n• Recommendation: Approve (Material is superior)\n\nDetailed breakdown attached.`;

            let i = 0;
            const interval = setInterval(() => {
                setGeneratedContent(prev => prev + text.charAt(i));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 15);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto"
        >
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">AI Generator Hub</h1>
                <p className="text-slate-400">Select a tool to automate your workflow.</p>
            </div>

            <div className="flex gap-4 justify-center mb-8">
                <TabButton id="update" label="Weekly Update" icon={<RefreshCw size={18} />} active={activeTab} onClick={setActiveTab} />
                <TabButton id="change" label="Change Order Explainer" icon={<AlertTriangleIcon size={18} />} active={activeTab} onClick={setActiveTab} />
                <TabButton id="csr" label="CSR Snapshot" icon={<LeafIcon size={18} />} active={activeTab} onClick={setActiveTab} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                {/* Input Panel */}
                <div className="glass-card p-8 flex flex-col">
                    <h3 className="text-xl font-semibold mb-6 text-white">Input Parameters</h3>

                    <div className="space-y-6 flex-1">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Project Context</label>
                            <select className="input-glass bg-slate-800/50">
                                <option>Maplewood Estate - Lot 4</option>
                                <option>Riverside Complex - B</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Key Data Points</label>
                            <textarea
                                className="input-glass bg-slate-800/50 h-48 resize-none"
                                placeholder={activeTab === 'update' ? "- Framing done\n- Passed inspection\n- Windows coming Tuesday" : "Describe the change..."}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="btn-primary w-full mt-6 flex items-center justify-center gap-2 group"
                    >
                        {loading ? <Sparkles className="animate-spin" /> : <Sparkles className="group-hover:rotate-12 transition-transform" />}
                        {loading ? 'AI Processing...' : 'Generate Content'}
                    </button>
                </div>

                {/* Output Panel */}
                <div className="glass-card p-1 relative flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none"></div>

                    <div className="flex-1 bg-black/40 rounded-xl m-1 p-6 font-mono text-sm text-slate-300 overflow-y-auto whitespace-pre-wrap border border-white/5 shadow-inner">
                        {generatedContent || <span className="text-slate-600 italic">Waiting for input...</span>}
                        {loading && <span className="animate-pulse">|</span>}
                    </div>

                    <div className="h-16 flex items-center justify-end px-6 gap-3">
                        <button className="text-slate-400 hover:text-white transition-colors" title="Copy"><Copy size={20} /></button>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                            <Send size={16} /> Send to Manager
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
            ${active === id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'}
        `}
    >
        {icon}
        {label}
    </button>
);

// Icons
const AlertTriangleIcon = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
const LeafIcon = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>;

export default AITools;
