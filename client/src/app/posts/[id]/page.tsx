"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";

export default function PostDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;

  const [post, setPost] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", subreddit: "", status: "Draft" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [scheduleAt, setScheduleAt] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !postId) return;
    setLoadingPost(true);
    const fetchPost = async () => {
      try {
        const res: any = await api.get(`/api/posts/${postId}`);
        setPost(res.data.post);
        setForm({
          title: res.data.post.title,
          body: res.data.post.body,
          subreddit: res.data.post.subreddit,
          status: res.data.post.status,
        });
      } catch {
        setError("Failed to load post");
      } finally {
        setLoadingPost(false);
      }
    };
    fetchPost();
  }, [user, postId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res: any = await api.put(`/api/posts/${postId}`, form);
      setPost(res.data.post);
      setSuccess("Post updated successfully!");
      setEdit(false);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    setError("");
    try {
      await api.delete(`/api/posts/${postId}`);
      router.push("/posts");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  }

  async function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    setScheduling(true);
    setError("");
    try {
      const res: any = await api.post(`/api/posts/${postId}/schedule`, {
        scheduled_at: new Date(scheduleAt).toISOString(),
      });
      setPost(res.data.post);
      setSuccess("Post scheduled successfully!");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to schedule post");
    } finally {
      setScheduling(false);
    }
  }

  if (loading || !user || loadingPost) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff]">
        <div className="text-xl text-slate-600 font-semibold animate-fade-slide">Loading post...</div>
      </main>
    );
  }
  if (!post) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff]">
        <div className="text-xl text-red-600 font-semibold animate-fade-slide">{error || "Post not found."}</div>
      </main>
    );
  }

  const canEdit = post.status !== "Posted";

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4 pt-32">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6 animate-fade-slide">
        <h1 className="text-3xl font-extrabold text-slate-900 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Post Details</h1>
        {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center font-semibold">{success}</div>}
        {edit && canEdit ? (
          <form className="flex flex-col gap-5" onSubmit={handleSave}>
            <input
              type="text"
              className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
              style={{fontFamily: 'Plus Jakarta Sans'}}
            />
            <textarea
              className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              required
              style={{fontFamily: 'Plus Jakarta Sans'}}
            />
            <input
              type="text"
              className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              value={form.subreddit}
              onChange={e => setForm(f => ({ ...f, subreddit: e.target.value }))}
              required
              style={{fontFamily: 'Plus Jakarta Sans'}}
            />
            <select
              className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              disabled={!canEdit}
              style={{fontFamily: 'Plus Jakarta Sans'}}
            >
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
            </select>
            <button
              type="submit"
              className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
              disabled={saving}
              style={{fontFamily: 'Plus Jakarta Sans'}}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="bg-slate-200 text-slate-700 font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-slate-300 transition-all text-lg"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-bold text-slate-700">Title:</span> <span className="text-slate-900">{post.title}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Body:</span>
              <div className="bg-slate-50 rounded-xl p-4 mt-1 text-slate-800 whitespace-pre-line">{post.body}</div>
            </div>
            <div>
              <span className="font-bold text-slate-700">Subreddit:</span> <span className="text-slate-900">{post.subreddit}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Status:</span> <span className="px-3 py-1 rounded-full text-xs font-bold" style={{background: post.status === 'Draft' ? '#f3f4f6' : post.status === 'Scheduled' ? '#fef3c7' : post.status === 'Posted' ? '#d1fae5' : '#fee2e2', color: post.status === 'Error' ? '#b91c1c' : '#374151'}}>{post.status}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Scheduled At:</span> <span className="text-slate-900">{post.scheduled_at ? new Date(post.scheduled_at).toLocaleString() : '-'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Posted At:</span> <span className="text-slate-900">{post.posted_at ? new Date(post.posted_at).toLocaleString() : '-'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Author:</span> <span className="text-slate-900">{post.author?.email}</span>
            </div>
            <div className="flex gap-3 mt-4">
              {canEdit && (
                <button
                  className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 shadow hover:bg-[#FF6B35] transition-all text-lg"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-500 text-white font-bold rounded-xl px-6 py-3 shadow hover:bg-red-600 transition-all text-lg"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
            {canEdit && (
              <form className="flex flex-col gap-2 mt-6" onSubmit={handleSchedule}>
                <label className="text-slate-700 font-semibold">Schedule Post:</label>
                <input
                  type="datetime-local"
                  className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                  value={scheduleAt}
                  onChange={e => setScheduleAt(e.target.value)}
                  style={{fontFamily: 'Plus Jakarta Sans'}}
                />
                <button
                  type="submit"
                  className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
                  disabled={scheduling}
                  style={{fontFamily: 'Plus Jakarta Sans'}}
                >
                  {scheduling ? "Scheduling..." : "Schedule"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 