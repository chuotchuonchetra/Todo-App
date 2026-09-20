import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition shadow-inner"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="inline-flex items-center gap-1.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition shadow-md shadow-indigo-600/20 hover:shadow-indigo-500/30 flex-shrink-0 cursor-pointer"
        aria-label="Add Todo"
      >
        <PlusCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
};
