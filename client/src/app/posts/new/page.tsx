"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";

export default function NewPostPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await api.post("/api/posts", {
        title,
        body,
        subreddit,
        ...(scheduledAt ? { scheduled_at: new Date(scheduledAt).toISOString() } : {}),
      });
      setSuccess("Post created successfully!");
      setTimeout(() => router.push("/posts"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff]">
        <div className="text-xl text-slate-600 font-semibold animate-fade-slide">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4 pt-32">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6 animate-fade-slide">
        <h1 className="text-3xl font-extrabold text-slate-900 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Create New Post</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <textarea
            placeholder="Body"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <input
            type="text"
            placeholder="Subreddit (e.g. programming)"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            value={subreddit}
            onChange={e => setSubreddit(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 font-semibold">Schedule (optional):</label>
            <input
              type="datetime-local"
              className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              value={scheduledAt}
              onChange={e => setScheduledAt(e.target.value)}
              style={{fontFamily: 'Plus Jakarta Sans'}}
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center font-semibold">{success}</div>}
          <button
            type="submit"
            className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
            disabled={submitting}
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            {submitting ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </main>
  );
} 