"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<any[] | null>(null);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    draftPosts: 0,
    aiGeneratedContent: 0
  });

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
        // Mock stats - replace with actual API calls
        setStats({
          totalPosts: 24,
          scheduledPosts: 3,
          draftPosts: 7,
          aiGeneratedContent: 12
        });
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

  if (loading || !user || fetchingAccounts || accounts === null) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-slate-600 font-medium">Loading dashboard...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-4 mb-2 shadow-sm">
                <p className="text-slate-700 text-base font-medium">Welcome back, {user.clientName || user.email}</p>
              </div>
            </div>
          
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Posts</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalPosts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Scheduled</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.scheduledPosts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">Next post in 2 hours</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Drafts</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.draftPosts}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-2">Ready to publish</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">AI Generated</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.aiGeneratedContent}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">50% of total content</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/posts" className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Manage Posts</h3>
                  <p className="text-sm text-slate-600 mt-1">View, create, and edit your content</p>
                </div>
              </div>
            </Link>

            <Link href="/ai" className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-purple-300 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">AI Content Generator</h3>
                  <p className="text-sm text-slate-600 mt-1">Generate ideas and drafts with AI</p>
                </div>
              </div>
            </Link>

            <Link href="/analytics" className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">Analytics</h3>
                  <p className="text-sm text-slate-600 mt-1">Track performance and engagement</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Post published successfully</p>
                  <p className="text-xs text-slate-600">r/productivity • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">AI content generated</p>
                  <p className="text-xs text-slate-600">3 new draft posts • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Post scheduled</p>
                  <p className="text-xs text-slate-600">r/technology • 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}