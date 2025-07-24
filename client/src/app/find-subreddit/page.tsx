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
  rules?: Array<{
    short_name: string;
    description: string;
  }>;
  bestTime?: string;
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
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center animate-fade-slide relative z-10">
        <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
          <span className="w-2 h-2 bg-[#FF4500] rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-700">Find the Best Subreddit for Your Niche</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>
          Discover Ideal <span style={{ color: '#FF4500', fontWeight: 'bold' }}>Subreddits</span>
        </h1>
        <p className="mt-2 text-slate-600 text-lg sm:text-xl font-normal max-w-xl mx-auto leading-relaxed" style={{fontFamily: 'Plus Jakarta Sans'}}>
          Enter your product, niche, or keyword to find the most relevant subreddits, with posting tips and rules.
        </p>
        <form onSubmit={handleSearch} className="w-full relative">
          <div className="flex w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:border-[#FF4500] focus-within:shadow-xl">
            <div className="flex items-center mr-4">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-slate-900 font-medium text-lg placeholder:text-slate-400"
              placeholder="e.g. productivity, SaaS, fitness, crypto..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{fontFamily: 'Plus Jakarta Sans'}}
            />
            <button
              type="submit"
              className="ml-4 px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF4500] to-[#FF6B35] text-white hover:from-[#FF6B35] hover:to-[#FF4500] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-2"
              disabled={searchLoading || !query.trim()}
              style={{fontFamily: 'Plus Jakarta Sans'}}
            >
              {searchLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <div>
              <h4 className="font-semibold text-red-800" style={{fontFamily: 'Plus Jakarta Sans'}}>
                Search Error
              </h4>
              <p className="text-red-700 text-sm mt-1">
                {error}
              </p>
            </div>
          </div>
        )}
        <div className="mt-10 w-full flex flex-col gap-6">
          {searchLoading && (
            <div className="grid gap-6 w-full" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'}}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden animate-pulse">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-slate-200 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded-lg mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded-lg w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded-lg w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="h-3 bg-slate-200 rounded-lg w-20"></div>
                      <div className="h-3 bg-slate-200 rounded-lg w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {results.length > 0 && !searchLoading && (
            <div className="grid gap-8 w-full" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'}}>
              {results.map((sub: Subreddit) => (
                <div
                  key={sub.name}
                  className="bg-gradient-to-br from-white via-slate-50 to-orange-50 border border-slate-200/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col min-h-[300px] h-full justify-between"
                >
                  <div className="flex flex-col items-center pt-8 px-8 pb-4 flex-1">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 overflow-hidden flex items-center justify-center">
                        {sub.icon_img ? (
                          <img
                            src={sub.icon_img}
                            alt={sub.name}
                            className="w-16 h-16 object-cover rounded-xl"
                            onError={e => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '';
                            }}
                          />
                        ) : (
                          <img src="/reddit-logo.png" alt="Reddit" className="w-16 h-16 object-contain rounded-xl" />
                        )}
                      </div>
                      {sub.over18 && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs font-bold">18+</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-extrabold text-[#FF4500] group-hover:text-[#FF6B35] transition-colors flex items-center mb-1 text-center" style={{ fontFamily: 'Plus Jakarta Sans' }}
                    >
                      r/{sub.name}
                      <svg className="w-5 h-5 ml-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                    <div className="text-lg font-semibold text-slate-700 mb-2 text-center line-clamp-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>{sub.title}</div>
                    <div className="text-slate-500 text-base mb-4 text-center leading-relaxed line-clamp-3">{sub.description}</div>
                  </div>
                  <div className="flex items-center justify-between px-8 pb-8 pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-2 text-slate-600 text-base font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {sub.subscribers?.toLocaleString()} members
                    </div>
                    {sub.rules && sub.rules.length > 0 && (
                      <span className="text-sm text-slate-400">{sub.rules.length} rules</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {results.length === 0 && !searchLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2" style={{fontFamily: 'Plus Jakarta Sans'}}>
                Ready to discover subreddits?
              </h3>
              <p className="text-slate-500">
                Enter a keyword, product, or niche above to find the perfect communities for your content.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 