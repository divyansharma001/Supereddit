// client/src/app/Navbar.tsx

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
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-md font-medium text-slate-700 hover:bg-slate-100 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate max-w-[120px]">{user.clientName || user.email}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg z-50">
          <button
            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
            onClick={() => { logout(); window.location.href = "/login"; }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8 bg-white shadow-sm fixed top-0 left-0 z-30 border-b border-slate-100">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-8" title="Home">
          <span className="font-bold text-lg tracking-tight text-slate-900">Supereddit</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <Link href="/dashboard" className={`py-1.5 font-medium text-sm transition-colors duration-200 ${pathname.startsWith('/dashboard') ? 'text-[#FF4500]' : 'text-slate-600 hover:text-[#FF4500]'}`}>
              Dashboard
            </Link>
          )}
           <Link href="/posts" className={`py-1.5 font-medium text-sm transition-colors duration-200 ${pathname.startsWith('/posts') ? 'text-[#FF4500]' : 'text-slate-600 hover:text-[#FF4500]'}`}>
            Posts
          </Link>
          <Link href="/ai" className={`py-1.5 font-medium text-sm transition-colors duration-200 ${pathname.startsWith('/ai') ? 'text-[#FF4500]' : 'text-slate-600 hover:text-[#FF4500]'}`}>
            AI
          </Link>
          <Link href="/keywords" className={`py-1.5 font-medium text-sm transition-colors duration-200 ${pathname.startsWith('/keywords') ? 'text-[#FF4500]' : 'text-slate-600 hover:text-[#FF4500]'}`}>
            Monitoring
          </Link>
          <Link href="/find-subreddit" className={`py-1.5 font-medium text-sm transition-colors duration-200 ${pathname.startsWith('/find-subreddit') ? 'text-[#FF4500]' : 'text-slate-600 hover:text-[#FF4500]'}`}>
            Find Subreddit
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <UserMenu />
        ) : (
          <>
            <Link href="/login" className="py-1.5 px-3 font-medium text-sm text-slate-600 hover:text-[#FF4500] transition-colors">
              Login
            </Link>
            <Link href="/register" className="py-1.5 px-4 rounded-md font-medium text-sm bg-[#FF4500] hover:bg-[#FF4500]/90 text-white transition-colors">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}