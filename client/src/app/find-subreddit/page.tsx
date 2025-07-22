"use client";
import React, { useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Subreddit {
  name: string;
  title: string;
  description: string;
  subscribers: number;
  url: string;
  over18: boolean;
  icon_img?: string;
}

export default function FindSubredditPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [results, setResults] = useState<Subreddit[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchLoading(true);
    setError(null);
    setResults([]);
    try {
      const res = await api.get<{ subreddits: Subreddit[] }>(`/api/subreddits/search`, { params: { query } });
      setResults(res.data.subreddits || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF7F0] via-[#FF6B35]/10 to-[#FFF7F0] flex flex-col items-center justify-start pt-32 pb-20 px-4">
      <section className="w-full max-w-2xl flex flex-col items-center text-center animate-fade-slide relative z-10">
        <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
          <span className="w-2 h-2 bg-[#FF4500] rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-700">Find the Best Subreddit for Your Niche</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>
          Discover Ideal <span style={{ color: '#FF4500', fontWeight: 'bold' }}>Subreddits</span>
        </h1>
        <p className="mt-2 text-slate-600 text-lg sm:text-xl font-normal max-w-xl mx-auto leading-relaxed" style={{fontFamily: 'Plus Jakarta Sans'}}>
          Enter your product, niche, or keyword to find the most relevant subreddits, with posting tips and rules.
        </p>
        <form onSubmit={handleSearch} className="flex w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm mt-8">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-slate-900 font-medium text-lg px-2 placeholder:text-slate-400"
            placeholder="e.g. productivity, SaaS, fitness"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <button
            type="submit"
            className="ml-4 px-6 py-2 rounded-xl font-bold bg-[#FF4500] text-white hover:bg-[#FF6B35] transition-all bento-btn"
            disabled={searchLoading || !query.trim()}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600">{error}</div>}
        <div className="mt-10 w-full flex flex-col gap-6">
          {results.length > 0 && (
            <div className="grid gap-6 w-full" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'}}>
              {results.map((sub: Subreddit) => (
                <div key={sub.name} className="bg-white border border-slate-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col sm:flex-row items-center gap-5 text-left animate-fade-slide min-h-[120px]">
                  <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                    {sub.icon_img ? (
                      <img
                        src={sub.icon_img}
                        alt={sub.name}
                        className="w-16 h-16 object-cover rounded-full"
                        onError={e => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '';
                        }}
                      />
                    ) : (
                      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 text-slate-300" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#FF4500"/>
                        <ellipse cx="20" cy="28" rx="10" ry="6" fill="#fff"/>
                        <ellipse cx="14.5" cy="18" rx="2.5" ry="2.5" fill="#fff"/>
                        <ellipse cx="25.5" cy="18" rx="2.5" ry="2.5" fill="#fff"/>
                        <circle cx="20" cy="20" r="1.5" fill="#FF4500"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-[#FF4500] hover:underline break-all">r/{sub.name}</a>
                    <div className="text-slate-700 font-medium mt-1 break-words line-clamp-1">{sub.title}</div>
                    <div className="text-slate-500 text-sm mt-1 break-words line-clamp-2">{sub.description}</div>
                    <div className="text-slate-400 text-xs mt-2 font-medium">{sub.subscribers?.toLocaleString()} subscribers • {sub.over18 ? "18+" : "All ages"}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {results.length === 0 && !searchLoading && (
            <div className="text-slate-500 mt-8">No results yet. Try searching for a niche or product!</div>
          )}
        </div>
      </section>
    </main>
  );
} 