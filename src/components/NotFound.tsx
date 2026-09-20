import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto my-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-5">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
          Error 404
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The route you are trying to visit does not exist or has been moved.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <Link
          to="/todos"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition"
        >
          <Home className="w-4 h-4" />
          <span>Go to Todos</span>
        </Link>
        <Link
          to="/users"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700/60 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Users</span>
        </Link>
      </div>
    </div>
  );
};
