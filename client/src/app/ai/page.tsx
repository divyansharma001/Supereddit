"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";

export default function AIPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("");
  const [tones, setTones] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ title: string; body: string } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    api.get("/api/ai/tones")
      .then((res: any) => setTones(res.data.tones))
      .catch(() => setTones([]));
  }, [user]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setGenerating(true);
    try {
      const res: any = await api.post("/api/ai/draft", { keywords, tone });
      setResult({ title: res.data.title, body: res.data.body });
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to generate content");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function handleUseInNewPost() {
    if (!result) return;
    // Optionally, you could use context or query params to prefill the new post form
    router.push(`/posts/new?title=${encodeURIComponent(result.title)}&body=${encodeURIComponent(result.body)}`);
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
        <h1 className="text-3xl font-extrabold text-slate-900 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>AI Content Generator</h1>
        <form className="flex flex-col gap-5" onSubmit={handleGenerate}>
          <input
            type="text"
            placeholder="Enter keywords (e.g. programming tips)"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <select
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
            value={tone}
            onChange={e => setTone(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            <option value="">Select tone</option>
            {tones.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
          <button
            type="submit"
            className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
            disabled={generating}
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            {generating ? "Generating..." : "Generate"}
          </button>
        </form>
        {result && (
          <div className="bg-slate-50 rounded-2xl p-6 mt-4 shadow border border-slate-200 flex flex-col gap-4 animate-fade-slide">
            <div>
              <span className="font-bold text-slate-700">Title:</span>
              <div className="text-slate-900 font-semibold mt-1" style={{fontFamily: 'Plus Jakarta Sans'}}>{result.title}</div>
            </div>
            <div>
              <span className="font-bold text-slate-700">Body:</span>
              <div className="text-slate-800 mt-1 whitespace-pre-line" style={{fontFamily: 'Plus Jakarta Sans'}}>{result.body}</div>
            </div>
            <div className="flex gap-3 mt-2">
              <button
                className="bg-slate-200 text-slate-700 font-bold rounded-xl px-6 py-2 shadow hover:bg-slate-300 transition-all text-base"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-2 shadow hover:bg-[#FF6B35] transition-all text-base"
                onClick={handleUseInNewPost}
              >
                Use in New Post
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 