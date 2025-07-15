"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";

// --- Improvement: Type-safe data model based on your API docs ---
interface AITone {
  value: string;
  label: string;
  description: string;
}

export default function AIPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("");
  const [tones, setTones] = useState<AITone[]>([]);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ title: string; body: string } | null>(
    null
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchTones = async () => {
      try {
        const res = await api.get<{ tones: AITone[] }>("/api/ai/tones");
        setTones(res.data.tones);
        // Set a default tone if available
        if (res.data.tones.length > 0) {
          setTone(res.data.tones[0].value);
        }
      } catch {
        setError("Could not load AI tones. Please try again later.");
        setTones([]);
      }
    };
    fetchTones();
  }, [user]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords || !tone) {
      setError("Please enter keywords and select a tone.");
      return;
    }
    setError("");
    setResult(null);
    setGenerating(true);
    try {
      const res = await api.post<{ title: string; body: string }>("/api/ai/draft", { keywords, tone });
      setResult({ title: res.data.title, body: res.data.body });
    } catch (err: unknown) {
      setError(
        (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "error" in err.response.data)
          ? (err.response.data.error as string)
          : (err instanceof Error ? err.message : "An unknown error occurred") ||
            "An unknown error occurred."
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseInNewPost = () => {
    if (!result) return;
    // Use query params to pre-fill the new post form
    router.push(
      `/posts/new?title=${encodeURIComponent(
        result.title
      )}&body=${encodeURIComponent(result.body)}`
    );
  };

  // --- Improvement: Consistent loading state with the dashboard ---
  if (authLoading || !user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-slate-600 font-medium">Loading AI Generator...</div>
        </div>
      </main>
    );
  }

  return (
    // --- Improvement: Consistent page structure with dashboard ---
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">
            AI Content Generator
          </h1>
          <p className="text-slate-600 mt-1">
            Generate high-quality Reddit post ideas and drafts in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              1. Enter Your Idea
            </h2>
            <form className="space-y-4" onSubmit={handleGenerate}>
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-slate-700 mb-1">
                  Keywords
                </label>
                <input
                  id="keywords"
                  type="text"
                  placeholder="e.g., productivity hacks for developers"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">
                  Tone of Voice
                </label>
                <select
                  id="tone"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a tone</option>
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={generating}
              >
                {generating && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                {generating ? "Generating..." : "✨ Generate Content"}
              </button>
              {error && (
                <div className="text-red-600 text-sm text-center font-medium p-3 bg-red-50 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Result Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              2. Review Your Draft
            </h2>
            {generating ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                    <span className="text-4xl mb-4">🤖</span>
                    <p className="font-semibold">Our AI is writing...</p>
                    <p className="text-sm">This may take a few moments.</p>
                </div>
            ) : result ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-600">TITLE</h3>
                  <p className="text-lg font-semibold text-slate-900 mt-1">
                    {result.title}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-600">BODY</h3>
                  <p className="text-slate-800 mt-1 whitespace-pre-line prose prose-slate max-w-none">
                    {result.body}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                  <button
                    className="flex-1 min-w-[120px] bg-slate-100 text-slate-800 font-semibold rounded-lg px-4 py-2 hover:bg-slate-200 transition-colors"
                    onClick={handleCopy}
                  >
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                  <button
                    className="flex-1 min-w-[120px] bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
                    onClick={handleUseInNewPost}
                  >
                    Use in New Post
                  </button>
                </div>
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-50 rounded-lg">
                    <span className="text-4xl mb-4">📝</span>
                    <p className="font-semibold">Your generated content will appear here.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}