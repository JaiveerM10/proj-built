import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Bot, LineChart, Settings, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages - We'll define them in-line for simplicity if small, or imports
// But user wants "files", so I'll create separate page files in next steps.
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AITools from './pages/AITools';
import Insights from './pages/Insights';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app-container flex h-screen relative">
        <div className="app-bg"></div>

        {/* Sidebar */}
        <motion.aside
          initial={{ width: 260 }}
          animate={{ width: sidebarOpen ? 260 : 80 }}
          className="glass-panel z-20 flex flex-col transition-all duration-300 relative"
          style={{ borderRight: '1px solid var(--glass-border)' }}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-cyan-500/20">
                B
              </div>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-xl tracking-tight"
                >
                  BUILT
                </motion.span>
              )}
            </div>
            {/* Toggle Button */}
            {/* <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
               {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button> */}
          </div>

          <nav className="flex-1 px-3 py-4 flex flex-col gap-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Overview" isOpen={sidebarOpen} />
            <NavItem to="/projects" icon={<FolderKanban size={20} />} label="Projects" isOpen={sidebarOpen} />
            <NavItem to="/ai-tools" icon={<Bot size={20} />} label="AI Hub" isOpen={sidebarOpen} />
            <NavItem to="/insights" icon={<LineChart size={20} />} label="Analytics" isOpen={sidebarOpen} />
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-purple-500/20">
                AM
              </div>
              {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                  <span className="text-sm font-medium">Alex M.</span>
                  <span className="text-xs text-slate-400">Project Lead</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
          {/* Top Header */}
          <header className="h-16 glass-panel border-b-0 border-l border-white/5 flex items-center justify-between px-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-green-400 font-medium tracking-wide">SYSTEM ONLINE</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative cursor-pointer hover:text-cyan-400 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-black"></span>
              </div>
              <Settings size={20} className="cursor-pointer hover:text-cyan-400 transition-colors" />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="*" element={<div className="p-10 text-center text-slate-500">Module under construction</div>} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </Router>
  );
}

function NavItem({ to, icon, label, isOpen }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
        ${isActive ? 'bg-white/10 text-cyan-400 shadow-lg shadow-cyan-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
        ${!isOpen && 'justify-center'}
      `}
    >
      {({ isActive }) => (
        <>
          {isActive && <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-cyan-400 rounded-r-full" />}
          <div className="z-10">{icon}</div>
          {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 font-medium">{label}</motion.span>}
        </>
      )}
    </NavLink>
  );
}

export default App;
