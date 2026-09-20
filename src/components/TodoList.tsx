import React from 'react';
import { ClipboardList, CheckCircle2 } from 'lucide-react';
import type { Todo, FilterType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  totalCount: number;
  activeFilter: FilterType;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  totalCount,
  activeFilter,
}) => {
  if (todos.length === 0) {
    return (
      <div className="py-10 px-4 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
        {totalCount === 0 ? (
          <>
            <ClipboardList className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-400">No tasks added yet</p>
            <p className="text-xs text-slate-600 mt-1">
              Type your task above and press Enter or click Add.
            </p>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-400">
              No {activeFilter} tasks found
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Try switching your filter in the bar below.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
