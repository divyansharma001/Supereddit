"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";

export default function RedditConnectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [callbackHandled, setCallbackHandled] = useState(false);

  // Fetch Reddit accounts
  useEffect(() => {
    if (!user) {
      // Don't fetch if no user, and stop loading if auth is done
      if (!loading) {
        setFetchingAccounts(false);
      }
      return;
    }
    setFetchingAccounts(true);
    setError(""); // Clear previous errors
    const fetchAccounts = async () => {
        try {
            const res: any = await api.get("/api/auth/reddit/accounts");
            setAccounts(res.data.accounts);
        } catch (err) {
            setError("Failed to fetch connection status. Please refresh.");
            setAccounts([]);
        } finally {
            setFetchingAccounts(false);
        }
    };
    fetchAccounts();
  }, [user, loading, callbackHandled]);

  // Handle Reddit OAuth callback
  useEffect(() => {
    if (!user) return;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    // Only proceed if JWT is present
    if (code && !callbackHandled) {
      if (!localStorage.getItem("token")) {
        setError("You must be logged in to connect your Reddit account. Please log in again.");
        setTimeout(() => router.replace("/login"), 1500);
        return;
      }
      setCallbackHandled(true);
      setConnecting(true);
      setError("");
      setSuccess("");
      const handleCallback = async () => {
        try {
          const res: any = await api.get(`/api/auth/reddit/oauth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || "")}`);
          setSuccess("Reddit account connected: " + res.data.redditUsername);
          // Let the other useEffect handle fetching the new account list
        } catch (err: any) {
          setError(err.response?.data?.error || err.message || "Failed to connect Reddit account");
        } finally {
          setConnecting(false);
        }
      };
      handleCallback();
    }
  }, [user, searchParams, callbackHandled, router]);

  function handleConnect() {
    setConnecting(true);
    setError("");
    setSuccess("");
    api.post("/api/auth/reddit/oauth/connect")
      .then((res: any) => {
        window.location.href = res.data.authUrl;
      })
      .catch((err: any) => {
        setError(err.response?.data?.error || err.message || "Failed to get Reddit OAuth URL");
        setConnecting(false);
      });
  }

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || fetchingAccounts) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff]">
        <div className="text-xl text-slate-600 font-semibold animate-fade-slide">Loading...</div>
      </main>
    );
  }

  const connected = accounts.length > 0;
  const username = connected ? accounts[0].reddit_username : null;

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] px-4 pt-32">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6 animate-fade-slide">
        <h1 className="text-3xl font-extrabold text-slate-900 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Reddit Account Connection</h1>
        <div className="flex flex-col gap-2 items-center">
          <span className="font-semibold text-slate-700">Status:</span>
          {connected ? (
            <span className="text-green-600 font-bold">Connected as {username}</span>
          ) : (
            <span className="text-slate-500">Not connected</span>
          )}
        </div>
        {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center font-semibold">{success}</div>}
        <button
          className="bg-[#FF4500] text-white font-bold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#FF6B35] transition-all text-lg"
          onClick={handleConnect}
          disabled={connecting}
          style={{fontFamily: 'Plus Jakarta Sans'}}
        >
          {connecting ? "Connecting..." : connected ? "Reconnect Reddit Account" : "Connect Reddit Account"}
        </button>
      </div>
    </main>
  );
}