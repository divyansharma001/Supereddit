// src/components/WaitlistHero.js
"use client";
import React, { useState } from 'react';
import api from '../lib/axios';
import axios from 'axios';

const WaitlistHero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [alreadyOnWaitlist, setAlreadyOnWaitlist] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    setAlreadyOnWaitlist(false);
    try {
      await api.post('/api/waitlist', { email });
      setSubmitted(true);
    } catch (err: unknown) {
      const maybeAxiosErr = err as { response?: { status?: number; data?: { error?: string } } };
      if (maybeAxiosErr.response) {
        if (maybeAxiosErr.response.status === 409) {
          setAlreadyOnWaitlist(true);
        } else if (maybeAxiosErr.response.data && maybeAxiosErr.response.data.error) {
          setError(maybeAxiosErr.response.data.error || '');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 text-center animate-fade-in w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm border border-green-300 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800" style={{fontFamily: 'Plus Jakarta Sans'}}>You're on the Supereddit waitlist!</h3>
        <p className="mt-2 text-slate-600">Thank you for joining. We'll notify you as soon as you can start dominating Reddit with AI-powered automation.</p>
      </div>
    );
  }

  if (alreadyOnWaitlist) {
    return (
      <div className="mt-8 text-center animate-fade-in w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm border border-yellow-300 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-100 rounded-full">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800" style={{fontFamily: 'Plus Jakarta Sans'}}>You're already on the Supereddit waitlist!</h3>
        <p className="mt-2 text-slate-600">We'll notify you as soon as you can start dominating Reddit with AI-powered automation.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-lg mx-auto animate-fade-slide" style={{animationDelay: '0.2s'}}>
      <div className="mb-3 flex justify-center">
        <span className="inline-block text-xs font-semibold text-[#FF4500] bg-[#FF4500]/10 rounded px-3 py-1 whitespace-nowrap shadow-sm border border-[#FF4500]/20">
          Free access to first 100 members on waitlist
        </span>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white rounded-xl border border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4500]/80 transition-all duration-300 pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 text-base font-medium shadow-sm"
            placeholder="Enter your email to join the waitlist"
            style={{fontFamily: 'Plus Jakarta Sans'}}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto flex-shrink-0 bg-[#FF4500] hover:bg-[#FF6B35] text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Join Waitlist'}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-600 text-center animate-fade-in">{error}</p>}
    </div>
  );
};

export default WaitlistHero;