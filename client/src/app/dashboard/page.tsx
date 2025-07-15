"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<any[] | null>(null);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setFetchingAccounts(true);
    const fetchAccounts = async () => {
      try {
        const res: any = await api.get("/api/auth/reddit/accounts");
        setAccounts(res.data.accounts);
      } catch {
        setAccounts([]);
      } finally {
        setFetchingAccounts(false);
      }
    };
    fetchAccounts();
  }, [user]);

  useEffect(() => {
    if (!fetchingAccounts && accounts && accounts.length === 0) {
      router.replace("/reddit-connect");
    }
  }, [fetchingAccounts, accounts, router]);

  if (loading || !user || fetchingAccounts || accounts === null) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff]">
        <div className="text-xl text-slate-600 font-semibold animate-fade-slide">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4 pt-32">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>Welcome, {user.clientName || user.email}!</h1>
      <p className="text-lg text-slate-600 mb-12 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>Manage your Reddit posts, connect your account, and generate AI-powered content.</p>
      <div className="grid bento-grid gap-8 w-full max-w-4xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[220px]">
        {/* Posts Management */}
        <Link href="/posts" className="bento-card bento-shine bg-white rounded-3xl border border-slate-100 shadow hover:shadow-lg flex flex-col items-center justify-center gap-4 transition-all animate-fade-slide">
          <span className="text-4xl">📝</span>
          <span className="font-bold text-xl text-slate-900">Manage Posts</span>
          <span className="text-slate-600 text-sm text-center">View, create, edit, and schedule your Reddit posts</span>
        </Link>
        {/* AI Content Generation */}
        <Link href="/ai" className="bento-card bento-shine bg-white rounded-3xl border border-slate-100 shadow hover:shadow-lg flex flex-col items-center justify-center gap-4 transition-all animate-fade-slide">
          <span className="text-4xl">🤖</span>
          <span className="font-bold text-xl text-slate-900">AI Content</span>
          <span className="text-slate-600 text-sm text-center">Generate post ideas and drafts with AI</span>
        </Link>
        {/* Reddit Connect */}
        <Link href="/reddit-connect" className="bento-card bento-shine bg-white rounded-3xl border border-slate-100 shadow hover:shadow-lg flex flex-col items-center justify-center gap-4 transition-all animate-fade-slide">
          <span className="text-4xl">🔗</span>
          <span className="font-bold text-xl text-slate-900">Reddit Connect</span>
          <span className="text-slate-600 text-sm text-center">Connect your Reddit account for posting</span>
        </Link>
      </div>
    </main>
  );
} 