import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Calendar, Filter, Download, TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';

const satData = [
    { name: 'Week 1', satisfaction: 4.2, responseTime: 24 },
    { name: 'Week 2', satisfaction: 4.3, responseTime: 22 },
    { name: 'Week 3', satisfaction: 4.5, responseTime: 18 },
    { name: 'Week 4', satisfaction: 4.8, responseTime: 14 },
];

const issueData = [
    { name: 'Permits', count: 12, resolved: 8 },
    { name: 'Materials', count: 8, resolved: 7 },
    { name: 'Labor', count: 5, resolved: 5 },
    { name: 'Inspections', count: 15, resolved: 14 },
];

const sentimentData = [
    { name: 'Positive', value: 65, color: '#10b981' },
    { name: 'Neutral', value: 25, color: '#f59e0b' },
    { name: 'Negative', value: 10, color: '#ef4444' },
];

const Insights = () => {
    const [timeRange, setTimeRange] = useState('30d');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
                    <p className="text-slate-400">Deep dive into operational metrics and customer sentiment.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500 transition-colors"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last Quarter</option>
                    </select>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 text-white transition-colors">
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Avg. Satisfaction" value="4.8/5" trend="+12%" icon={<TrendingUp />} color="green" />
                <MetricCard title="Active Customers" value="24" trend="+3" icon={<Users />} color="blue" />
                <MetricCard title="Avg. Response Time" value="1.2 hrs" trend="-30 mins" icon={<Clock />} color="purple" />
                <MetricCard title="Risk Flags" value="2" trend="Low" icon={<AlertTriangle />} color="yellow" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Satisfaction Trend */}
                <div className="glass-card p-6 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6">Customer Sentiment Trends</h3>
                    <div className="flex-1 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={satData}>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} domain={[0, 5]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff20', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="satisfaction" stroke="#38bdf8" strokeWidth={3} fill="url(#colorGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Issue Resolution */}
                <div className="glass-card p-6 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6">Issue Resolution by Category</h3>
                    <div className="flex-1 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={issueData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} width={80} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff20', color: '#fff' }} />
                                <Bar dataKey="count" fill="#334155" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="resolved" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-xs text-slate-400">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-slate-700 rounded-sm"></span> Total Issues</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-sm"></span> Resolved</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sentiment Breakdown */}
                <div className="glass-card p-6 h-[350px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">Sentiment Distribution</h3>
                    <div className="flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff20', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-3xl font-bold text-white">92%</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Positive</span>
                        </div>
                    </div>
                </div>

                {/* Recent Feedback Feed */}
                <div className="lg:col-span-2 glass-card p-6 h-[350px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4">Live Feedback Stream</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scroll">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-[10px] font-bold">JD</div>
                                        <span className="text-white text-sm font-medium">John Doe</span>
                                        <span className="text-xs text-slate-500">• Maplewood Lot 4</span>
                                    </div>
                                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Positive</span>
                                </div>
                                <p className="text-sm text-slate-300">"Really impressed with the weekly update. The transparency about the delay is appreciated, even if it's annoying!"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

const MetricCard = ({ title, value, trend, icon, color }) => {
    const colorMap = {
        green: 'text-green-400 bg-green-500/10',
        blue: 'text-blue-400 bg-blue-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
        yellow: 'text-yellow-400 bg-yellow-500/10',
    };

    return (
        <div className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${colorMap[color]}`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('-') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            <p className="text-sm text-slate-400">{title}</p>
        </div>
    );
};

export default Insights;
