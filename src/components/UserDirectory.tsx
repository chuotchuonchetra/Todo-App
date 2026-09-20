import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  AlertCircle,
  RefreshCw,
  Building2,
  MapPin,
  Mail,
  ArrowRight,
  UserX,
} from 'lucide-react';
import type { User } from '../types/user';

export const UserDirectory: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [retryKey, setRetryKey] = useState<number>(0);

  // Fetch users with cancellation flag to protect against race conditions
  useEffect(() => {
    let isCancelled = false;

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Failed to fetch users: HTTP ${response.status} ${response.statusText}`);
        }
        const data: User[] = await response.json();

        // Avoid race condition / updating state after unmount
        if (!isCancelled) {
          setUsers(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error ? err.message : 'An unexpected error occurred while fetching users.'
          );
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    // Cleanup: Set cancelled flag
    return () => {
      isCancelled = true;
    };
  }, [retryKey]);

  // Filtered users by search query
  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.company.name.toLowerCase().includes(q) ||
        u.address.city.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
            <Users className="w-4 h-4" />
            <span>Community Directory</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Users & Team</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real data from JSONPlaceholder with four async states and race-condition guards.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <button
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
            title="Refresh list"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 transition cursor-pointer flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* STATE 1: LOADING SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Loading users">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <div className="h-3 bg-slate-800/70 rounded w-4/5"></div>
                <div className="h-3 bg-slate-800/50 rounded w-3/5"></div>
              </div>
              <div className="h-8 bg-slate-800/50 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* STATE 2: ERROR STATE */}
      {!isLoading && error && (
        <div className="bg-rose-950/40 border border-rose-800/50 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-900/40 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-rose-200">Unable to Fetch Users</h3>
            <p className="text-sm text-rose-400/90 mt-1 max-w-md mx-auto">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        </div>
      )}

      {/* STATE 3: EMPTY STATE */}
      {!isLoading && !error && filteredUsers.length === 0 && (
        <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
            <UserX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-300">No Users Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No user matching "${searchQuery}" was found. Try a different query.`
              : 'There are currently no users in the directory.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4"
            >
              Clear Search Query
            </button>
          )}
        </div>
      )}

      {/* STATE 4: DATA LIST */}
      {!isLoading && !error && filteredUsers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-5 shadow-sm transition duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition">
                      {user.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{user.company.name}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{user.address.city}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2">
                <Link
                  to={`/users/${user.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl text-xs font-medium transition shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
