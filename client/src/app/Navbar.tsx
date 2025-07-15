"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation";

function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  if (!user) return null;
  return (
    <div className="relative ml-4">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl font-semibold text-slate-700 hover:bg-slate-200 transition"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate max-w-[120px]">{user.clientName || user.email}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
          <button
            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            onClick={() => { logout(); window.location.href = "/login"; }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setDark(document.documentElement.classList.contains('dark'));
    }
  }, []);
  const toggle = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
      setDark(document.documentElement.classList.contains('dark'));
    }
  };
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#FF4500]/10 dark:hover:bg-[#FF4500]/20 transition flex items-center justify-center"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="w-5 h-5 text-[#FF4500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      ) : (
        <svg className="w-5 h-5 text-[#FF4500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.05 6.05L4.64 4.64m12.02 0l-1.41 1.41M6.05 17.95l-1.41 1.41" /></svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <nav className="w-full flex items-center justify-between py-3 px-6 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg fixed top-0 left-0 z-30 border-b border-slate-100 dark:border-slate-800 transition-all duration-300 min-h-[64px]">
      <div className="flex items-center gap-5">
        <Link href="/" className="flex items-center gap-2 group" title="Home">
          <span className="bg-gradient-to-tr from-[#FF4500] via-[#FF6B35] to-[#FF4500] h-[32px] w-[32px] rounded-xl flex items-center justify-center text-2xl font-extrabold shadow-[0_2px_8px_rgba(255,69,0,0.13)] mr-1 transition-all group-hover:scale-105"></span>
          <span className="font-extrabold text-lg ml-2 tracking-tight text-slate-900 dark:text-white" style={{fontFamily: 'Plus Jakarta Sans'}}>RedditMVP</span>
        </Link>
        <Link href="/" className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-[15px] transition-colors duration-200 ${pathname === '/' ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'text-slate-700 dark:text-slate-200 hover:text-[#FF4500] hover:bg-[#FF4500]/5'}`} title="Home">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-3.5" /></svg>
          Home
        </Link>
        <Link href="/posts" className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-[15px] transition-colors duration-200 ${pathname.startsWith('/posts') ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'text-slate-700 dark:text-slate-200 hover:text-[#FF4500] hover:bg-[#FF4500]/5'}`} title="Browse Posts">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
          Posts
        </Link>
        <Link href="/ai" className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-[15px] transition-colors duration-200 ${pathname.startsWith('/ai') ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'text-slate-700 dark:text-slate-200 hover:text-[#FF4500] hover:bg-[#FF4500]/5'}`} title="AI Playground">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          AI
        </Link>
        <Link href="/reddit-connect" className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-[15px] transition-colors duration-200 ${pathname.startsWith('/reddit-connect') ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'text-slate-700 dark:text-slate-200 hover:text-[#FF4500] hover:bg-[#FF4500]/5'}`} title="Reddit Connect">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5 2 4 2 4-2 4-2" /></svg>
          Reddit Connect
        </Link>
        <Link href="/posts/new" className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-xl font-semibold bg-[#FF4500] hover:bg-[#FF6B35] text-white shadow transition-all duration-200 ml-2" title="Create New Post">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          New Post
        </Link>
        {user && (
          <Link href="/dashboard" className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-[15px] transition-colors duration-200 ${pathname.startsWith('/dashboard') ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'text-slate-700 dark:text-slate-200 hover:text-[#FF4500] hover:bg-[#FF4500]/5'}`} title="Dashboard">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
            Dashboard
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </nav>
  );
} 