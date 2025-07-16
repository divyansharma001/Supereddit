// client/src/app/keywords/page.tsx

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useSocketContext } from '@/contexts/SocketContext';
import Link from 'next/link';

// --- Type Definitions (from Prisma Schema) ---
interface Keyword {
    id: string;
    term: string;
    createdAt: string;
}

interface Mention {
    id: string;
    source_url: string;
    content_snippet: string;
    author: string;
    subreddit: string;
    sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'UNKNOWN';
    found_at: string;
}

// --- Reusable Components ---

const SentimentBadge = ({ sentiment }: { sentiment: Mention['sentiment'] }) => {
    const styles = {
        POSITIVE: 'bg-green-100 text-green-800 border-green-200',
        NEGATIVE: 'bg-red-100 text-red-800 border-red-200',
        NEUTRAL: 'bg-blue-100 text-blue-800 border-blue-200',
        UNKNOWN: 'bg-slate-100 text-slate-800 border-slate-200',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${styles[sentiment]}`}>{sentiment}</span>;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-lg text-slate-600 font-medium">Loading...</div>
        </div>
    </div>
);

// --- Main Page Component ---

export default function KeywordsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { lastMention } = useSocketContext();

    const [keywords, setKeywords] = useState<Keyword[]>([]);
    const [mentions, setMentions] = useState<Mention[]>([]);
    const [newKeyword, setNewKeyword] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchInitialData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError('');
        try {
            const [keywordsRes, mentionsRes]: [{ data: unknown }, { data: unknown }] = await Promise.all([
                api.get('/api/keywords'),
                api.get('/api/mentions?pageSize=20'),
            ]);
            setKeywords(keywordsRes.data as Keyword[]);
            setMentions(((mentionsRes.data as { mentions: Mention[] }).mentions));
        } catch {
            setError('Failed to load initial data. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        } else if (user) {
            fetchInitialData();
        }
    }, [user, authLoading, router, fetchInitialData]);

    // Listen for new mentions from WebSocket
    useEffect(() => {
        if (lastMention && !mentions.some(m => m.id === lastMention.id)) {
            setMentions(prev => [lastMention, ...prev]);
        }
    }, [lastMention, mentions]);

    const handleAddKeyword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeyword.trim()) return;
        setIsSubmitting(true);
        setError('');

        try {
            const res = await api.post('/api/keywords', { term: newKeyword });
            const newKw = res.data as Keyword;
            setKeywords(prev => [newKw, ...prev].sort((a, b) => a.term.localeCompare(b.term)));
            setNewKeyword('');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to add keyword.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteKeyword = async (id: string) => {
        const originalKeywords = keywords;
        setKeywords(prev => prev.filter(k => k.id !== id));
        
        try {
            await api.delete(`/api/keywords/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete keyword.');
            setKeywords(originalKeywords); // Revert on error
        }
    };

    if (authLoading || !user) {
        return <LoadingSpinner />;
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Keyword Monitoring</h1>
                            <p className="text-slate-600 mt-1">Track brand mentions, competitors, and topics across Reddit.</p>
                        </div>
                        <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">{error}</div>}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Keyword Management */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Add Keyword</h2>
                            <form onSubmit={handleAddKeyword} className="space-y-3">
                                <input
                                    type="text"
                                    value={newKeyword}
                                    onChange={e => setNewKeyword(e.target.value)}
                                    placeholder="e.g., 'customer service'"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !newKeyword.trim()}
                                    className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Keyword'}
                                </button>
                            </form>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Tracked Keywords</h2>
                            {loading ? (
                                <p className="text-slate-500">Loading keywords...</p>
                            ) : keywords.length === 0 ? (
                                <p className="text-slate-500 text-sm">You are not tracking any keywords. Add one above to start.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {keywords.map(kw => (
                                        <li key={kw.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <span className="font-medium text-slate-800">{kw.term}</span>
                                            <button 
                                                onClick={() => handleDeleteKeyword(kw.id)}
                                                className="text-slate-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                title={`Delete "${kw.term}"`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Mentions Feed */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900 p-6 border-b border-slate-200">Real-time Mentions</h2>
                        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            {loading ? (
                                <p className="text-slate-500 text-center py-8">Loading mentions feed...</p>
                            ) : mentions.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <h3 className="text-lg font-semibold text-slate-800">No Mentions Yet</h3>
                                    <p className="mt-1">Once a tracked keyword is mentioned on Reddit, it will appear here in real-time.</p>
                                </div>
                            ) : (
                                mentions.map(mention => (
                                    <div key={mention.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <SentimentBadge sentiment={mention.sentiment} />
                                                <span className="text-sm font-medium text-slate-600">r/{mention.subreddit}</span>
                                            </div>
                                            <a href={mention.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                                View on Reddit ↗
                                            </a>
                                        </div>
                                        <p className="text-slate-800 my-2">{mention.content_snippet}</p>
                                        <div className="text-xs text-slate-500 flex justify-between">
                                            <span>by u/{mention.author}</span>
                                            <span>{new Date(mention.found_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}