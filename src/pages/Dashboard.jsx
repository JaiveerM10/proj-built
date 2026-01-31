import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, AlertCircle, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';

const data = [
    { name: 'Mon', satisfaction: 4.2 },
    { name: 'Tue', satisfaction: 4.5 },
    { name: 'Wed', satisfaction: 4.3 },
    { name: 'Thu', satisfaction: 4.8 },
    { name: 'Fri', satisfaction: 4.7 },
    { name: 'Sat', satisfaction: 4.9 },
    { name: 'Sun', satisfaction: 4.8 },
];

const Dashboard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Mission Control
                    </h1>
                    <p className="text-slate-400 mt-2">Welcome back, Alex. System operating at 98% efficiency.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-primary flex items-center gap-2">
                        <Zap size={18} /> Quick Action
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Client Sentiment" value="98.5%" trend="+2.4%" icon={<CheckCircle2 className="text-green-500" />} color="green" />
                <KPICard title="Active Permits" value="12" trend="-1" icon={<FileTextIcon className="text-blue-500" />} color="blue" />
                <KPICard title="AI Time Saved" value="48h" trend="+12h" icon={<Clock className="text-purple-500" />} color="purple" />
                <KPICard title="Pending Issues" value="3" trend="Urgent" icon={<AlertCircle className="text-red-500" />} color="red" />
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6 h-[400px] flex flex-col">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-400" /> Live Satisfaction Trends
                    </h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff20', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSat)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Feed */}
                <div className="glass-card p-6 h-[400px] flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">AI Activity Log</h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll">
                        <LogItem time="10:42 AM" text="Generated weekly update for 'Riverside B'" type="success" />
                        <LogItem time="10:30 AM" text="Detected negative sentiment in survey #442" type="warning" />
                        <LogItem time="09:15 AM" text="Summarized Change Order #29 impacts" type="info" />
                        <LogItem time="09:00 AM" text="System scheduled 3 neighbor notices" type="info" />
                        <LogItem time="Yesterday" text="Monthly report compiled successfully" type="success" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const KPICard = ({ title, value, trend, icon, color }) => {
    const colorMap = {
        green: 'bg-green-500/10 text-green-400',
        blue: 'bg-blue-500/10 text-blue-400',
        purple: 'bg-purple-500/10 text-purple-400',
        red: 'bg-red-500/10 text-red-400',
    };

    const trendColor = trend.includes('-') || trend === 'Urgent' ? 'text-red-400' : 'text-green-400';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6 relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity rounded-bl-2xl ${colorMap[color]}`}>
                {icon}
            </div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
            <div className="mt-4 flex items-end justify-between">
                <h2 className="text-3xl font-bold text-white">{value}</h2>
                <span className={`text-sm font-medium ${trendColor} flex items-center`}>
                    {trend.includes('+') && <ArrowUpRight size={14} className="mr-1" />}
                    {trend}
                </span>
            </div>
        </motion.div>
    );
};

const LogItem = ({ time, text, type }) => {
    const colors = {
        success: 'bg-green-500/20 text-green-300 border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        info: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    };

    return (
        <div className={`p-3 rounded-lg border text-sm ${colors[type]} flex gap-3`}>
            <span className="opacity-70 text-xs py-1 whitespace-nowrap font-mono">{time}</span>
            <span>{text}</span>
        </div>
    );
};

// Mock Icon for convenience
const FileTextIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
);

export default Dashboard;
