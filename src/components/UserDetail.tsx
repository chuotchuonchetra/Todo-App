import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building2,
  MapPin,
  AlertCircle,
  RefreshCw,
  Compass,
} from 'lucide-react';
import type { User } from '../types/user';

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState<number>(0);

  useEffect(() => {
    let isCancelled = false;

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? `User #${id} was not found.`
              : `Server error: HTTP ${response.status}`
          );
        }

        const data: User = await response.json();
        if (!isCancelled) {
          setUser(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch user details.');
          setIsLoading(false);
        }
      }
    };

    if (id) {
      fetchUser();
    }

    return () => {
      isCancelled = true;
    };
  }, [id, retryKey]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/users"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition group py-1"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          <span>Back to Users Directory</span>
        </Link>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-slate-800 rounded w-1/3"></div>
              <div className="h-4 bg-slate-800/60 rounded w-1/4"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="h-24 bg-slate-800/50 rounded-xl"></div>
            <div className="h-24 bg-slate-800/50 rounded-xl"></div>
          </div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-8 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <div>
            <h3 className="text-base font-semibold text-rose-200">Error Loading User</h3>
            <p className="text-xs text-rose-400/90 mt-1">{error}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-xl transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
            <Link
              to="/users"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition"
            >
              Return to Directory
            </Link>
          </div>
        </div>
      )}

      {/* User Details card */}
      {!isLoading && !error && user && (
        <div className="bg-slate-900/95 border border-slate-800/90 rounded-2xl p-7 shadow-2xl space-y-6">
          {/* User profile header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-600/30">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">{user.name}</h1>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    ID #{user.id}
                  </span>
                </div>
                <p className="text-sm text-indigo-400">@{user.username}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-300 transition underline underline-offset-2"
              >
                {user.website}
              </a>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Details */}
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contact Information
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <a href={`mailto:${user.email}`} className="hover:text-white transition">
                    {user.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Company & Role
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-medium text-white">
                  <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{user.company.name}</span>
                </div>
                <p className="text-slate-400 italic">"{user.company.catchPhrase}"</p>
                <p className="text-[11px] text-slate-500">{user.company.bs}</p>
              </div>
            </div>

            {/* Address Details */}
            <div className="md:col-span-2 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Office Address & Location
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">
                      {user.address.street}, {user.address.suite}
                    </p>
                    <p className="text-slate-400">
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400">Coordinates:</p>
                    <p className="font-mono text-slate-300">
                      Lat: {user.address.geo.lat} | Lng: {user.address.geo.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
