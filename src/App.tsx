import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TodoApp } from './components/TodoApp';
import { UserDirectory } from './components/UserDirectory';
import { UserDetail } from './components/UserDetail';
import { NotFound } from './components/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/todos" element={<TodoApp />} />
            <Route path="/users" element={<UserDirectory />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500">
          Built with React 19, Tailwind CSS v4, and React Router
        </footer>
      </div>
    </BrowserRouter>
  );
}
