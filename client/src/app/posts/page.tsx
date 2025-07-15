"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import Link from "next/link";

// --- Improvement: Type-safe data models ---
type PostStatus = "Draft" | "Scheduled" | "Posted" | "Error";

interface Post {
  id: string;
  title: string;
  subreddit: string;
  status: PostStatus;
  scheduled_at?: string;
}

interface RedditAccount {
  id: string;
  reddit_username: string;
}

// --- Improvement: Reusable Status Badge Component ---
const StatusBadge = ({ status }: { status: PostStatus }) => {
  const statusStyles: Record<PostStatus, string> = {
    Draft: "bg-slate-100 text-slate-800",
    Scheduled: "bg-yellow-100 text-yellow-800",
    Posted: "bg-green-100 text-green-800",
    Error: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

// --- Main Page Component ---
function PostsPageContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accounts, setAccounts] = useState<RedditAccount[] | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const statusOptions = ["All", "Draft", "Scheduled", "Posted", "Error"];

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  // Check for success message from query params
  useEffect(() => {
    if (searchParams.get("deleted") === "true") {
      setSuccessMessage("Post deleted successfully.");
      // Clean up URL
      router.replace("/posts", { scroll: false });
    }
  }, [searchParams, router]);

  // This effect now combines account fetching and the initial post fetch.
  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // First, check for connected Reddit accounts
        const accountsRes = await api.get<{ accounts: RedditAccount[] }>("/api/auth/reddit/accounts");
        if (accountsRes.data.accounts.length === 0) {
          router.replace("/reddit-connect");
          return;
        }
        setAccounts(accountsRes.data.accounts);

        // Then, fetch posts
        const postsRes = await api.get("/api/posts", {
          params: { page, limit: 10, ...(status !== "All" && { status }) },
        });
        const responseData = postsRes.data as { posts: Post[]; pagination: { pages: number } };
        setPosts(responseData.posts);
        setTotalPages(responseData.pagination.pages);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        setPosts([]); // Clear posts on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, page, status, router]);


  if (authLoading || accounts === null) {
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
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your Posts</h1>
            <p className="text-slate-600 mt-1">Manage, edit, and schedule all your content.</p>
          </div>
          <Link href="/posts/new" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            + New Post
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg">{successMessage}</div>}
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          {/* Filter Bar */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <label htmlFor="status-filter" className="text-sm font-medium text-slate-700">Filter by status:</label>
              <select
                id="status-filter"
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={status}
                onChange={e => { setStatus(e.target.value); setPage(1); }}
              >
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Subreddit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Scheduled</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-12 text-slate-500">Loading posts...</td></tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <h3 className="text-lg font-semibold text-slate-800">No Posts Found</h3>
                      <p className="text-slate-500 mt-1">Try a different filter or create a new post.</p>
                      <Link href="/posts/new" className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Create your first post</Link>
                    </td>
                  </tr>
                ) : posts.map(post => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 max-w-xs truncate">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">r/{post.subreddit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={post.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{post.scheduled_at ? new Date(post.scheduled_at).toLocaleString() : '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <Link href={`/posts/${post.id}`} className="px-3 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {posts.length > 0 && (
            <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1 || loading}
                    className="px-3 py-1.5 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-slate-700 font-medium">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || loading}
                    className="px-3 py-1.5 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Using Suspense for client components that use searchParams
export default function PostsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostsPageContent />
        </Suspense>
    );
}