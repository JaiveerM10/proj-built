import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Recycle, Users, Activity, Sun, Battery, Droplets, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';

const energyData = [
    { name: 'Jan', kwh: 1200, saved: 450 },
    { name: 'Feb', kwh: 1100, saved: 480 },
    { name: 'Mar', kwh: 980, saved: 520 },
    { name: 'Apr', kwh: 850, saved: 600 },
];

const wasteData = [
    { name: 'Wood', tons: 12 },
    { name: 'Concrete', tons: 8 },
    { name: 'Metal', tons: 4 },
    { name: 'Plastic', tons: 2 },
];

const CSR = () => {
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">Sustainability & Impact</h1>
                    <p className="text-slate-400">Tracking our environmental footprint and community engagement.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/insights')}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Award size={18} /> View Certifications
                    </button>
                    <button
                        onClick={() => {
                            const btn = document.activeElement;
                            const originalText = btn.innerText;
                            btn.innerText = 'Downloading...';
                            setTimeout(() => { alert('CSR_Report_Q3.pdf downloaded successfully.'); btn.innerText = originalText; }, 1000);
                        }}
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-colors"
                    >
                        Export Report
                    </button>
                </div>
            </div>

            {/* Hero Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CSRCard title="Carbon Avoided" value="45.2 Tons" sub="This Quarter" icon={<Leaf />} color="green" trend="+12%" />
                <CSRCard title="Waste Recycled" value="88%" sub="Diversion Rate" icon={<Recycle />} color="blue" trend="+5%" />
                <CSRCard title="Avg. HERS Score" value="42" sub="Index (Lower is better)" icon={<Sun />} color="yellow" trend="-3 pts" />
                <CSRCard title="Community Hours" value="120" sub="Volunteer Work" icon={<Users />} color="purple" trend="+20" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Energy Savings Chart */}
                <div className="lg:col-span-2 glass-card p-6 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Battery size={20} className="text-emerald-400" /> Energy Performance Analysis
                    </h3>
                    <div className="flex-1 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={energyData}>
                                <defs>
                                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff20', color: '#fff' }} />
                                <Area type="monotone" dataKey="saved" stackId="1" stroke="#10b981" fill="url(#colorSaved)" />
                                <Area type="monotone" dataKey="kwh" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Waste Chart */}
                <div className="glass-card p-6 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6">Waste Diversion</h3>
                    <div className="flex-1 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={wasteData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} width={60} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#ffffff20', color: '#fff' }} />
                                <Bar dataKey="tons" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">A+</div>
                            <div>
                                <h4 className="text-sm font-bold text-emerald-400">Top Tier Performance</h4>
                                <p className="text-xs text-emerald-200/70">Exceeding local diversion mandates by 23%.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Community Feed / Snapshots */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Latest Sustainability Snapshots</h3>
                    <div className="space-y-4">
                        <SnapshotItem project="Maplewood Lot 4" feature="Solar Ready Install" impact="-1.2 Tons CO2/yr" />
                        <SnapshotItem project="Riverside B" feature="WaterSense Fixtures" impact="-4,000 Gal/yr" />
                        <SnapshotItem project="Oakridge Ph2" feature="Recycled Insulation" impact="Zero VOC" />
                    </div>
                </div>

                <div className="glass-card p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/20">
                    <h3 className="text-xl font-bold text-white mb-4">Community Impact Feed</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-2 h-full bg-indigo-500 rounded-full"></div>
                            <div>
                                <h4 className="text-indigo-300 font-bold text-sm">Site Clean-Up Day</h4>
                                <p className="text-sm text-slate-300">Team volunteered 40 hours to clean up local park trails.</p>
                                <span className="text-xs text-slate-500 mt-1 block">2 days ago</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-full bg-purple-500 rounded-full"></div>
                            <div>
                                <h4 className="text-purple-300 font-bold text-sm">Neighbor Notifications</h4>
                                <p className="text-sm text-slate-300">Automated notices sent to 24 neighbors regarding demolition schedule.</p>
                                <span className="text-xs text-slate-500 mt-1 block">5 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CSRCard = ({ title, value, sub, icon, color, trend }) => {
    const colorMap = {
        green: 'text-emerald-400 bg-emerald-500/10',
        blue: 'text-blue-400 bg-blue-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
        yellow: 'text-yellow-400 bg-yellow-500/10',
    };

    return (
        <div className="glass-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorMap[color]}`}>
                    {icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('-') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {trend}
                </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <div className="flex justify-between items-end">
                <p className="text-sm text-slate-400">{title}</p>
                <span className="text-xs text-slate-500">{sub}</span>
            </div>
        </div>
    );
};

const SnapshotItem = ({ project, feature, impact }) => (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
        <div>
            <h4 className="text-sm font-bold text-white">{project}</h4>
            <p className="text-xs text-slate-400">{feature}</p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
            {impact}
        </span>
    </div>
);

export default CSR;
