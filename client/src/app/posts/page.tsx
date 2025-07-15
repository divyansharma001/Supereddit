"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import Link from "next/link";

const statusOptions = ["All", "Draft", "Scheduled", "Posted", "Error"];

export default function PostsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<any[] | null>(null);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("All");
  const [fetching, setFetching] = useState(false);

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

  useEffect(() => {
    if (!user || !accounts || accounts.length === 0) return;
    setFetching(true);
    const fetchPosts = async () => {
      try {
        const res: any = await api.get("/api/posts", {
          params: {
            page,
            limit,
            ...(status !== "All" ? { status } : {}),
          },
        });
        setPosts(res.data.posts);
        setTotalPages(res.data.pagination.pages);
      } catch {
        setPosts([]);
      } finally {
        setFetching(false);
      }
    };
    fetchPosts();
  }, [user, accounts, page, limit, status]);

  if (loading || !user || fetchingAccounts || accounts === null) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff]">
        <div className="text-xl text-slate-600 font-semibold animate-fade-slide">Loading posts...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4 pt-32">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl font-extrabold text-slate-900" style={{fontFamily: 'Plus Jakarta Sans'}}>Your Posts</h1>
          <Link href="/posts/new" className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 shadow hover:bg-[#FF6B35] transition-all text-lg">+ New Post</Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-semibold text-slate-700">Status:</span>
          <select
            className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-base focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Subreddit</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Scheduled</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr><td colSpan={5} className="text-center py-8 text-slate-400">Loading...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-slate-400">No posts found.</td></tr>
              ) : posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4 text-slate-700">{post.subreddit}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{background: post.status === 'Draft' ? '#f3f4f6' : post.status === 'Scheduled' ? '#fef3c7' : post.status === 'Posted' ? '#d1fae5' : '#fee2e2', color: post.status === 'Error' ? '#b91c1c' : '#374151'}}>{post.status}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{post.scheduled_at ? new Date(post.scheduled_at).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link href={`/posts/${post.id}`} className="text-[#FF4500] font-bold hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-base font-semibold disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-slate-700 font-medium">Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-base font-semibold disabled:opacity-50"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
} 