// src/components/WaitlistHero.js
"use client";
import React, { useState } from 'react';

const WaitlistHero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 text-center animate-fade-in w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm border border-green-300 rounded-2xl p-8 shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800" style={{fontFamily: 'Plus Jakarta Sans'}}>You're on the list!</h3>
        <p className="mt-2 text-slate-600">Thank you for joining. We'll send you an email as soon as we're ready to launch.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-lg mx-auto animate-fade-slide" style={{animationDelay: '0.2s'}}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center bg-white rounded-xl p-2 shadow-lg border border-slate-200/80 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#FF4500] transition-all duration-300">
          <svg className="w-6 h-6 ml-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-transparent px-4 py-3 text-slate-800 placeholder-slate-400 text-base font-medium focus:outline-none"
            placeholder="Enter your email address"
            style={{fontFamily: 'Plus Jakarta Sans'}}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FF4500] hover:bg-[#FF6B35] text-white font-bold px-4 sm:px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Join Waitlist'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600 text-center animate-fade-in">{error}</p>}
      </form>
    </div>
  );
};

export default WaitlistHero;