import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="group flex items-center justify-between gap-3 p-3.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-xl transition duration-150 shadow-sm">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
            todo.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30'
              : 'border-2 border-slate-600 hover:border-indigo-400 bg-slate-800/50'
          }`}
          aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <div className="flex flex-col min-w-0">
          <span
            className={`text-sm break-words transition select-none ${
              todo.completed
                ? 'line-through text-slate-500'
                : 'text-slate-200'
            }`}
          >
            {todo.text}
          </span>
          <span className="text-[10px] text-slate-500">
            {todo.createdAt}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition opacity-80 group-hover:opacity-100 cursor-pointer flex-shrink-0"
        aria-label={`Delete ${todo.text}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </li>
  );
};
