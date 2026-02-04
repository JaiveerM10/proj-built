import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Initial seeded data
    const [projects, setProjects] = useState([
        { id: 1, name: 'Maplewood Estate', lot: 'Lot 4', stage: 'Framing', progress: 45, status: 'On Track', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', location: '123 Maple Dr, Springfield', manager: 'Alex M.', lastUpdate: '2023-10-25' },
        { id: 2, name: 'Riverside Complex', lot: 'Building B', stage: 'Finishing', progress: 85, status: 'On Track', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', location: '45 River Rd, Hartford', manager: 'Sarah L.', lastUpdate: '2023-10-28' },
        { id: 3, name: 'Oakridge Heights', lot: 'Phase 2', stage: 'Permitting', progress: 10, status: 'Delayed', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600', location: '88 Oak Ln, Shelbyville', manager: 'Mike R.', lastUpdate: '2023-10-20' },
        { id: 4, name: 'Sunset Valley', lot: 'Plot 12', stage: 'Foundation', progress: 25, status: 'On Track', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=600', location: '101 Sun Way, Ogdenville', manager: 'Alex M.', lastUpdate: 'Never' },
    ]);

    const [activityLog, setActivityLog] = useState([
        { id: 1, time: '10:42 AM', text: "Generated weekly update for 'Riverside B'", type: 'success' },
        { id: 2, time: '10:30 AM', text: "Detected negative sentiment in survey #442", type: 'warning' },
        { id: 3, time: '09:15 AM', text: "Summarized Change Order #29 impacts", type: 'info' },
    ]);

    const addActivity = (text, type = 'info') => {
        const newLog = {
            id: Date.now(),
            time: 'Just now',
            text,
            type
        };
        setActivityLog(prev => [newLog, ...prev]);
    };

    const updateProject = (projectId, newData) => {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...newData } : p));
    };

    return (
        <AppContext.Provider value={{ projects, activityLog, addActivity, updateProject }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
