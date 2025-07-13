"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-white p-6 rounded-[2.5rem] max-w-[1440px] mx-auto relative overflow-hidden border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)] mt-6">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2">
            <span className="bg-gradient-to-tr from-[#FF4500] via-[#FF6B35] to-[#FF4500] h-[28px] w-[28px] rounded-2xl flex items-center justify-center text-xl font-bold shadow-[0_4px_16px_rgba(255,69,0,0.12)] mr-1"></span>
            <span className="font-bold text-xl ml-2 tracking-tight text-slate-900">RedditMVP</span>
          </span>
          <a href="#" className="text-[16px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200">Explore</a>
          <a href="#" className="relative text-[16px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200 flex items-center">Features
            <span className="absolute -top-3 left-8 text-[10px] rounded-full bg-[#FF4500] text-white px-2 py-0.5 font-bold">NEW!</span>
          </a>
          <a href="#" className="text-[16px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200">About</a>
          <a href="#" className="text-[16px] font-medium text-slate-700 hover:text-[#FF4500] transition-colors duration-200">Blog</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[15px] text-slate-700 mr-1 font-medium hover:text-[#FF4500] transition-colors duration-200">Login</a>
          <a href="#" className="bg-[#FF4500] font-semibold rounded-2xl px-6 py-2.5 text-sm border-2 border-transparent hover:border-[#FF6B35] shadow-[0_4px_16px_rgba(255,69,0,0.12)] hover:shadow-[0_8px_24px_rgba(255,69,0,0.18)] transition-all duration-200 relative text-white">Sign up</a>
        </div>
      </nav>
      
      {/* Main Hero Content */}
      <section className="flex flex-col w-full justify-center items-center mt-16 mb-8 z-10 px-4">
        <div className="flex gap-4 mb-10 flex-wrap justify-center">
          <button className="bg-white border border-slate-200 rounded-full px-5 py-2.5 text-sm font-medium shadow hover:shadow-md flex items-center gap-2 transition-all duration-200 hover:scale-105 text-slate-700 hover:text-[#FF4500]">AI-Powered Content Creation <span className="ml-1 text-lg font-bold text-[#FF4500]">▶</span></button>
          <button className="bg-white border border-slate-200 rounded-full px-5 py-2.5 text-sm font-medium shadow hover:shadow-md flex items-center gap-2 transition-all duration-200 hover:scale-105 text-slate-700 hover:text-[#FF4500]">Smart Community Management <span className="ml-1 text-lg font-bold text-[#FF4500]">▶</span></button>
        </div>
        
        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.2rem] font-bold leading-[1.1] text-center relative max-w-5xl text-slate-900">
          Build the <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] via-[#FF6B35] via-[#FF4500] via-[#FF6B35] via-[#FF4500] to-[#FF6B35] font-semibold italic drop-shadow-sm" style={{WebkitTextStroke:'1px transparent'}}>next</span> great<br className="hidden sm:block"/> Reddit community.
        </h1>
        
        <p className="mt-8 text-slate-600 text-lg sm:text-xl font-normal text-center max-w-2xl leading-relaxed px-4">
          RedditMVP helps you create engaging content, manage communities, and grow your Reddit presence with AI-powered tools and analytics.
        </p>
        
        {/* Signup/search */}
        <form className="flex flex-col items-center mt-10 w-full max-w-2xl px-4">
          <div className="flex items-center w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow hover:shadow-md transition-shadow duration-300">
            <span className="text-slate-400 text-xl font-normal ml-2 select-none">redditmvp.com/</span>
            <input
              type="text"
              placeholder="your-community"
              className="flex-1 bg-transparent outline-none text-slate-900 font-bold text-2xl px-3 placeholder:font-normal placeholder:text-slate-400 min-w-0"
            />
            <button type="submit" className="ml-4 mr-2 font-semibold text-[17px] px-6 py-2.5 rounded-2xl shadow border-[2.7px] border-transparent bg-[#FF4500] relative transition-all duration-200 hover:shadow-md hover:scale-105 flex-shrink-0 text-white">
              Get Started
            </button>
          </div>
        </form>
        
        <a href="#" className="mt-6 text-base font-medium text-[#FF4500] hover:text-[#FF6B35] hover:underline transition-colors duration-200">Already have an account? Login</a>
      </section>
    </main>
  );
}
