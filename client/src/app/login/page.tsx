"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data }: { data: any } = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6 animate-fade-slide">
        <h1 className="text-3xl font-extrabold text-slate-900 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Login to RedditMVP</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition-all"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition-all"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
          <button
            type="submit"
            className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
            disabled={loading}
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center text-slate-600 text-base">
          Don&apos;t have an account? <a href="/register" className="text-[#FF4500] font-bold hover:underline">Register</a>
        </div>
      </div>
    </main>
  );
} 