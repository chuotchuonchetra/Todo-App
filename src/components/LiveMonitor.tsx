import React, { useState, useEffect } from 'react';
import { Clock, Monitor } from 'lucide-react';

export const LiveMonitor: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString()
  );

  // Live Window Width Listener Effect with Cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup ensures listener is removed on unmount with zero memory leaks / warnings
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Live Digital Clock Timer Effect with Cleanup
  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup ensures interval timer is cleared on unmount
    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 px-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-400">
      <div className="flex items-center gap-1.5 font-mono">
        <Clock className="w-3.5 h-3.5 text-indigo-400" />
        <span>Live Time:</span>
        <span className="text-slate-200 font-semibold">{currentTime}</span>
      </div>

      <div className="flex items-center gap-1.5 font-mono">
        <Monitor className="w-3.5 h-3.5 text-emerald-400" />
        <span>Window Width:</span>
        <span className="text-slate-200 font-semibold">{windowWidth}px</span>
      </div>
    </div>
  );
};
