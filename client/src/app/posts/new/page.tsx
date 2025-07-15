"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import Link from "next/link";

function NewPostPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read URL query params

  const [form, setForm] = useState({
    title: "",
    body: "",
    subreddit: "",
    scheduledAt: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  // --- Improvement: Pre-fill form from URL query params (from AI page) ---
  useEffect(() => {
    const titleFromQuery = searchParams.get("title");
    const bodyFromQuery = searchParams.get("body");
    if (titleFromQuery || bodyFromQuery) {
      setForm((f) => ({
        ...f,
        title: decodeURIComponent(titleFromQuery || ""),
        body: decodeURIComponent(bodyFromQuery || ""),
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const payload = {
        title: form.title,
        body: form.body,
        subreddit: form.subreddit,
        // Conditionally add scheduled_at if it exists
        ...(form.scheduledAt
          ? { scheduled_at: new Date(form.scheduledAt).toISOString() }
          : {}),
      };
      await api.post("/api/posts", payload);
      setSuccess("Post created successfully! Redirecting...");
      setTimeout(() => router.push("/posts"), 1500);
    } catch (err: unknown) {
      setError(
        (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "error" in err.response.data)
          ? (err.response.data.error as string)
          : (err instanceof Error ? err.message : "Failed to create post")
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // --- Improvement: Consistent loading state ---
  if (authLoading || !user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-slate-600 font-medium">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    // --- Improvement: Consistent page structure ---
    <main className="min-h-screen bg-slate-50">
      {/* Header with Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-slate-500 hover:text-blue-600">Dashboard</Link>
            <span className="text-slate-400">/</span>
            <Link href="/posts" className="text-slate-500 hover:text-blue-600">Posts</Link>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-800">Create New Post</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts for success and error messages */}
        {success && <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg">{success}</div>}
        {error && <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">{error}</div>}
        
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200"
        >
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold text-slate-900">
              Compose Your Post
            </h1>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="An interesting title for your post"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-slate-700 mb-1">
                Body
              </label>
              <textarea
                id="body"
                name="body"
                placeholder="Write your post content here. Markdown is supported."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[250px]"
                value={form.body}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="subreddit" className="block text-sm font-medium text-slate-700 mb-1">
                Subreddit
              </label>
              <input
                id="subreddit"
                name="subreddit"
                type="text"
                placeholder="e.g., programming"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.subreddit}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="scheduledAt" className="block text-sm font-medium text-slate-700 mb-1">
                Schedule (Optional)
              </label>
              <input
                id="scheduledAt"
                name="scheduledAt"
                type="datetime-local"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.scheduledAt}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <Link href="/posts" className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 flex items-center"
            >
              {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function NewPostPageWithSuspense() {
  return (
    <Suspense>
      <NewPostPage />
    </Suspense>
  );
}