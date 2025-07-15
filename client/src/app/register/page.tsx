"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/api/auth/register", { email, password, clientName });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6 animate-fade-slide">
        <h1 className="text-3xl font-extrabold text-slate-900 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Register for RedditMVP</h1>
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
            placeholder="Password (min 6 chars)"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition-all"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <input
            type="text"
            placeholder="Client/Company Name"
            className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition-all"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            required
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
          <button
            type="submit"
            className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
            disabled={submitting}
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center text-slate-600 text-base">
          Already have an account? <a href="/login" className="text-[#FF4500] font-bold hover:underline">Login</a>
        </div>
      </div>
    </main>
  );
} 