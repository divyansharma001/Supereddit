"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
    clientName: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if the user is already logged in
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await api.post("/api/auth/register", form);
      // --- Improvement: Redirect with a query param for a better user experience on the login page ---
      router.push("/login?registered=true");
    } catch (err: unknown) {
      setError(
        (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "error" in err.response.data)
          ? (err.response.data.error as string)
          : (err instanceof Error ? err.message : "An unknown error occurred during registration.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevents flash of content while checking auth status
  if (loading || user) {
     return (
      <main className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    // --- Improvement: Consistent layout and background ---
    <main className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            {/* You can place your logo here */}
            <h1 className="text-3xl font-bold text-slate-900">Early Access</h1>
            <p className="text-slate-600 mt-2">We're currently in early access mode. Join our waitlist to be notified when we launch!</p>
        </div>

        {/* --- Improvement: Professional card styling --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 rounded-full">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Coming Soon</h3>
            <p className="text-slate-600">Our platform is currently in development. Sign up for early access to be the first to know when we launch.</p>
            <Link href="/" className="inline-block mt-4 px-6 py-3 bg-[#FF4500] hover:bg-[#FF6B35] text-white font-semibold rounded-lg transition-colors">
              Join Waitlist
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );

  /* --- ORIGINAL REGISTER FORM CODE (COMMENTED FOR WAITLISTING PHASE) ---
  return (
    // --- Improvement: Consistent layout and background ---
    <main className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Create Your Account</h1>
            <p className="text-slate-600 mt-2">Start managing your Reddit presence with ease.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-slate-700 mb-1">
                Company Name
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                placeholder="Your Company Inc."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.clientName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="6+ characters"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center px-4 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-colors"
            >
              {isSubmitting && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
        
        <div className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
  */
}