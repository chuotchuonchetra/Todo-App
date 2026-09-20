import React, { useState, useEffect, useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import type { Todo, FilterType } from '../types/todo';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { FilterBar } from './FilterBar';
import { LiveMonitor } from './LiveMonitor';

const INITIAL_TODOS: Todo[] = [
  {
    id: '1',
    text: 'Lift TodoApp state (props down, callbacks up)',
    completed: true,
    createdAt: 'Today at 09:30 AM',
  },
  {
    id: '2',
    text: 'Add live resize/clock effect with cleanup listener',
    completed: true,
    createdAt: 'Today at 10:15 AM',
  },
  {
    id: '3',
    text: 'Build UserDirectory with all four async states',
    completed: false,
    createdAt: 'Today at 11:00 AM',
  },
  {
    id: '4',
    text: 'Configure React Router routes & navigation',
    completed: false,
    createdAt: 'Today at 12:45 PM',
  },
];

export const TodoApp: React.FC = () => {
  // Lifted state: TodoApp owns the single source of truth for todos and filter
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todoapp_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to initial todos
      }
    }
    return INITIAL_TODOS;
  });

  const [filter, setFilter] = useState<FilterType>('all');

  // Keep localStorage updated when todos change
  useEffect(() => {
    localStorage.setItem('todoapp_items', JSON.stringify(todos));
  }, [todos]);

  // Handler: Add new todo
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Handler: Toggle completion
  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler: Delete single todo
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Handler: Clear all completed todos
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Filtered todos calculation
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  // Counters
  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = todos.length - activeCount;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Live status effect component */}
      <LiveMonitor />

      {/* Main Todo Card */}
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/40 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Task Manager
              </h1>
              <p className="text-xs text-slate-400">
                Lifted state architecture with unidirectional data flow
              </p>
            </div>
          </div>

          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-indigo-300 border border-indigo-500/20">
            {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>

        {/* Add Todo Form */}
        <AddTodo onAdd={handleAddTodo} />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          totalCount={todos.length}
          activeFilter={filter}
        />

        {/* Filter & Action Bar */}
        {todos.length > 0 && (
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>
    </div>
  );
};
