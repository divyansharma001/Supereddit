// client/src/app/dashboard/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
dayjs.extend(relativeTime);

// --- API types ---
interface Post {
  id: string;
  title: string;
  body: string;
  subreddit: string;
  status: "Draft" | "Scheduled" | "Posted" | "Error";
  scheduled_at?: string;
  createdAt?: string;
  updatedAt?: string;
  // ... other fields as needed
}

// --- Add RedditAccount interface ---
interface RedditAccount {
  id: string;
  reddit_username: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<RedditAccount[] | null>(null);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    draftPosts: 0,
    aiGeneratedContent: 0
  });
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [calendarValue, setCalendarValue] = useState<Date>(new Date());
  // Map of date string (YYYY-MM-DD) to array of posts
  const postsByDate = recentPosts.reduce((acc, post) => {
    const date = dayjs(post.scheduled_at || post.createdAt || post.updatedAt).format('YYYY-MM-DD');
    if (!acc[date]) acc[date] = [];
    acc[date].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setFetchingAccounts(true);
    const fetchDashboardData = async () => {
      try {
        const [accountsRes, postsRes] = await Promise.all([
          api.get<{ accounts: RedditAccount[] }>("/api/auth/reddit/accounts"),
          api.get<{ posts: Post[] }>("/api/posts?limit=20")
        ]);
        setAccounts(accountsRes.data.accounts);
        const posts = postsRes.data.posts || [];
        // Calculate stats
        const totalPosts = posts.length;
        const scheduledPosts = posts.filter(p => p.status === "Scheduled").length;
        const draftPosts = posts.filter(p => p.status === "Draft").length;
        const aiGeneratedContent = posts.filter(p => p.body && p.body.includes("AI") || p.title && p.title.includes("AI")).length; // Example logic, adjust as needed
        setStats({ totalPosts, scheduledPosts, draftPosts, aiGeneratedContent });
        // Recent activity: sort by created/updated date, take latest 3
        const sorted = posts
          .slice()
          .sort((a, b) =>
            new Date(b.updatedAt || b.createdAt || "").getTime() -
            new Date(a.updatedAt || a.createdAt || "").getTime()
          );
        setRecentPosts(sorted.slice(0, 3));
      } catch {
        setAccounts([]);
        setStats({ totalPosts: 0, scheduledPosts: 0, draftPosts: 0, aiGeneratedContent: 0 });
        setRecentPosts([]);
      } finally {
        setFetchingAccounts(false);
      }
    };
    fetchDashboardData();
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
          <div className="text-lg text-slate-600 font-medium">Loading your Reddit automation dashboard...</div>
        </div>
      </main>
    );
  }

  // Calculate dynamic stats for card footers
  const now = dayjs();
  const thisMonth = now.month();
  const lastMonth = now.subtract(1, 'month').month();
  const thisYear = now.year();
  const lastMonthYear = lastMonth === 11 ? thisYear - 1 : thisYear;
  const posts = recentPosts;
  const postsThisMonth = posts.filter(p => {
    const d = dayjs(p.createdAt || p.scheduled_at);
    return d.year() === thisYear && d.month() === thisMonth;
  });
  const postsLastMonth = posts.filter(p => {
    const d = dayjs(p.createdAt || p.scheduled_at);
    return d.year() === lastMonthYear && d.month() === lastMonth;
  });
  const percentChange = postsLastMonth.length === 0 ? null : Math.round(((postsThisMonth.length - postsLastMonth.length) / Math.max(postsLastMonth.length, 1)) * 100);
  const nextScheduled = posts
    .filter(p => p.status === 'Scheduled' && p.scheduled_at && dayjs(p.scheduled_at).isAfter(now))
    .sort((a, b) => dayjs(a.scheduled_at).valueOf() - dayjs(b.scheduled_at).valueOf())[0];
  const timeToNextScheduled = nextScheduled ? dayjs(nextScheduled.scheduled_at).fromNow(true) : null;
  const draftsReady = stats.draftPosts;
  const aiPercent = stats.totalPosts > 0 ? Math.round((stats.aiGeneratedContent / stats.totalPosts) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
        {/* Floating/blurred background shapes */}
        <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[340px] h-[80px] bg-gradient-to-r from-[#FF4500]/20 via-[#FF6B35]/20 to-[#FFF7F0]/0 rounded-full blur-3xl opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-[#FF4500]/10 to-transparent rounded-full blur-2xl opacity-40 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">Reddit Automation Dashboard</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-900 mb-3 tracking-tight" style={{fontFamily: 'Plus Jakarta Sans'}}>
            Your Reddit Command Center
          </h1>
          <p className="text-slate-700 text-lg sm:text-xl font-medium mb-2" style={{fontFamily: 'Plus Jakarta Sans'}}>
            Welcome back, {user.clientName || user.email} - Ready to dominate Reddit?
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6">
        {/* Calendar View - moved to top and beautified */}
        <div className="relative bg-gradient-to-r from-[#FF4500]/20 via-[#FF6B35]/20 to-[#FFF7F0]/0 rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-6 md:p-8 mb-12 flex flex-col items-center animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Your Reddit Content Calendar</h2>
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) setCalendarValue(value);
              else if (Array.isArray(value) && value[0] instanceof Date) setCalendarValue(value[0]);
            }}
            value={calendarValue}
            tileContent={({ date, view }) => {
              const dateStr = dayjs(date).format('YYYY-MM-DD');
              const posts = postsByDate[dateStr] || [];
              if (posts.length > 0) {
                // Color dots by post status
                return (
                  <div className="flex justify-center mt-1 gap-1">
                    {posts.map((post, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full inline-block transition-transform duration-300 scale-90 hover:scale-125 shadow-md ${
                          post.status === 'Posted'
                            ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-200'
                            : post.status === 'Scheduled'
                            ? 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-200'
                            : post.status === 'Draft'
                            ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-200'
                            : 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-slate-200'
                        } animate-pulse`}
                        title={`${post.status}: ${post.title}`}
                      />
                    ))}
                  </div>
                );
              }
              return null;
            }}
            className="!border-0 !shadow-none !bg-transparent calendar-theme w-full max-w-md md:max-w-lg lg:max-w-xl"
            tileClassName={({ date, view }) => {
              const dateStr = dayjs(date).format('YYYY-MM-DD');
              return postsByDate[dateStr] ? '!bg-slate-100 !rounded-xl !transition-colors !duration-200 hover:!bg-orange-50 focus:!bg-orange-100' : '';
            }}
          />
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 inline-block"></span>Posted</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 inline-block"></span>Scheduled</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 inline-block"></span>Draft</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 inline-block"></span>Other</div>
          </div>
        </div>

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
            <p className="text-sm text-green-600 mt-2">
              {percentChange !== null ? `${percentChange > 0 ? '+' : ''}${percentChange}% from last month` : `${postsThisMonth.length} new this month`}
            </p>
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
            <p className="text-sm text-blue-600 mt-2">{timeToNextScheduled ? `Next post in ${timeToNextScheduled}` : 'No posts scheduled'}</p>
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
            <p className="text-sm text-slate-600 mt-2">{draftsReady > 0 ? `${draftsReady} ready to publish` : 'No drafts'}</p>
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
            <p className="text-sm text-purple-600 mt-2">{aiPercent > 0 ? `${aiPercent}% of total content` : 'No AI content'}</p>
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
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Schedule Posts</h3>
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

            <Link href="/keywords" className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-yellow-300 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-yellow-700 transition-colors">Keyword Monitoring</h3>
                  <p className="text-sm text-slate-600 mt-1">Track mentions across Reddit</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity + Find Subreddit */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Recent Activity Section */}
            <div className="flex-[3] p-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-0">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentPosts.length === 0 ? (
                  <div className="text-slate-500 text-sm">No recent activity.</div>
                ) : (
                  recentPosts.map((post, idx) => (
                    <div key={post.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${post.status === "Posted" ? "bg-green-500" : post.status === "Scheduled" ? "bg-purple-500" : post.status === "Draft" ? "bg-blue-500" : "bg-slate-400"}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {post.status === "Posted" ? "Post published successfully" : post.status === "Scheduled" ? "Post scheduled" : post.status === "Draft" ? "Draft saved" : "Post updated"}
                        </p>
                        <p className="text-xs text-slate-600">
                          {post.subreddit ? `r/${post.subreddit}` : ""} • {dayjs((post.updatedAt as string) || (post.createdAt as string) || '').fromNow()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Find Subreddit Section */}
            <div className="flex-[1] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF7F0] via-[#FF6B35]/10 to-[#FFF7F0] min-w-0">
              <div className="flex flex-col items-center text-center w-full max-w-xs mx-auto">
                <svg className="w-12 h-12 text-[#FF4500] mb-3" fill="none" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#FF4500"/>
                  <ellipse cx="20" cy="28" rx="10" ry="6" fill="#fff"/>
                  <ellipse cx="14.5" cy="18" rx="2.5" ry="2.5" fill="#fff"/>
                  <ellipse cx="25.5" cy="18" rx="2.5" ry="2.5" fill="#fff"/>
                  <circle cx="20" cy="20" r="1.5" fill="#FF4500"/>
                </svg>
                <h3 className="text-xl font-bold text-[#FF4500] mb-2">Find Subreddit</h3>
                <p className="text-slate-700 mb-4 text-sm">Discover the best subreddits for your product or niche and see key info at a glance.</p>
                <Link href="/find-subreddit" className="px-5 py-2 rounded-xl font-bold bg-[#FF4500] text-white hover:bg-[#FF6B35] transition-all text-sm shadow-lg">Try it now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}