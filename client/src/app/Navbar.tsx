"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

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

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-3 px-6 bg-white/70 backdrop-blur-md shadow-sm fixed top-0 left-0 z-30 border-b border-slate-100">
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-2">
          <span className="bg-gradient-to-tr from-[#FF4500] via-[#FF6B35] to-[#FF4500] h-[26px] w-[26px] rounded-xl flex items-center justify-center text-xl font-extrabold shadow-[0_2px_8px_rgba(255,69,0,0.10)] mr-1"></span>
          <span className="font-extrabold text-lg ml-2 tracking-tight text-slate-900" style={{fontFamily: 'Plus Jakarta Sans'}}>RedditMVP</span>
        </span>
        <Link href="/posts" className="text-[15px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200">Posts</Link>
        <Link href="/ai" className="text-[15px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200">AI</Link>
        <Link href="/reddit-connect" className="text-[15px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200">Reddit Connect</Link>
      </div>
      <div className="flex items-center gap-3">
        <UserMenu />
      </div>
    </nav>
  );
} 