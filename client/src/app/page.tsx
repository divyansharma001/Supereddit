"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#fff7f0] via-[#fff] to-[#f0f4ff] p-0 max-w-none mx-0 relative overflow-hidden border-0 shadow-none">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between py-8 px-10 bg-white/80 backdrop-blur-lg shadow-sm fixed top-0 left-0 z-30 border-b border-slate-100">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2">
            <span className="bg-gradient-to-tr from-[#FF4500] via-[#FF6B35] to-[#FF4500] h-[32px] w-[32px] rounded-2xl flex items-center justify-center text-2xl font-extrabold shadow-[0_4px_16px_rgba(255,69,0,0.12)] mr-1"></span>
            <span className="font-extrabold text-2xl ml-2 tracking-tight text-slate-900" style={{fontFamily: 'Plus Jakarta Sans'}}>RedditMVP</span>
          </span>
          <a href="#" className="text-[17px] font-semibold text-slate-700 hover:text-[#FF4500] transition-colors duration-200">Explore</a>
          <a href="#" className="relative text-[17px] font-semibold text-slate-700 hover:text-[#FF4500] transition-colors duration-200 flex items-center">Features
            <span className="absolute -top-3 left-8 text-[10px] rounded-full bg-[#FF4500] text-white px-2 py-0.5 font-bold">NEW!</span>
          </a>
          <a href="#" className="text-[17px] font-semibold text-slate-700 hover:text-[#FF4500] transition-colors duration-200">About</a>
          <a href="#" className="text-[17px] font-semibold text-slate-700 hover:text-[#FF4500] transition-colors duration-200">Blog</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[16px] text-slate-700 mr-1 font-semibold hover:text-[#FF4500] transition-colors duration-200">Login</a>
          <a href="#" className="bg-[#FF4500] font-bold rounded-2xl px-7 py-3 text-base border-2 border-transparent hover:border-[#FF6B35] shadow-[0_4px_16px_rgba(255,69,0,0.12)] hover:shadow-[0_8px_24px_rgba(255,69,0,0.18)] transition-all duration-200 relative text-white">Sign up</a>
        </div>
      </nav>
      {/* Main Hero Content */}
      <section className="flex flex-col w-full justify-center items-center flex-1 min-h-screen pt-36 pb-16 z-10 px-4 bg-transparent">
        <div className="flex gap-4 mb-12 flex-wrap justify-center">
          <button className="bg-white/90 border border-slate-200 rounded-full px-6 py-3 text-base font-semibold shadow hover:shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 text-slate-700 hover:text-[#FF4500]">AI-Powered Content Creation <span className="ml-1 text-xl font-bold text-[#FF4500]">▶</span></button>
          <button className="bg-white/90 border border-slate-200 rounded-full px-6 py-3 text-base font-semibold shadow hover:shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 text-slate-700 hover:text-[#FF4500]">Smart Community Management <span className="ml-1 text-xl font-bold text-[#FF4500]">▶</span></button>
        </div>
        <h1 className="text-[3.2rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] xl:text-[6rem] font-extrabold leading-[1.05] text-center relative max-w-6xl text-slate-900 drop-shadow-sm" style={{fontFamily: 'Plus Jakarta Sans'}}>
          Build the <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] via-[#FF6B35] to-[#FF4500] font-extrabold italic drop-shadow-md" style={{WebkitTextStroke:'1px transparent'}}>next</span> great<br className="hidden sm:block"/> Reddit community.
        </h1>
        <p className="mt-10 text-slate-600 text-2xl sm:text-3xl font-medium text-center max-w-3xl leading-relaxed px-4" style={{fontFamily: 'Plus Jakarta Sans'}}>RedditMVP helps you create engaging content, manage communities, and grow your Reddit presence with AI-powered tools and analytics.</p>
        {/* Signup/search */}
        <form className="flex flex-col items-center mt-12 w-full max-w-2xl px-4">
          <div className="flex items-center w-full bg-white/90 border border-slate-200 rounded-2xl px-8 py-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="text-slate-400 text-2xl font-medium ml-2 select-none">redditmvp.com/</span>
            <input
              type="text"
              placeholder="your-community"
              className="flex-1 bg-transparent outline-none text-slate-900 font-bold text-2xl px-3 placeholder:font-normal placeholder:text-slate-400 min-w-0"
              style={{fontFamily: 'Plus Jakarta Sans'}}
            />
            <button type="submit" className="ml-4 mr-2 font-bold text-[18px] px-7 py-3 rounded-2xl shadow border-[2.7px] border-transparent bg-[#FF4500] relative transition-all duration-200 hover:shadow-lg hover:scale-105 flex-shrink-0 text-white">
              Get Started
            </button>
          </div>
        </form>
        <a href="#" className="mt-8 text-lg font-semibold text-[#FF4500] hover:text-[#FF6B35] hover:underline transition-colors duration-200" style={{fontFamily: 'Plus Jakarta Sans'}}>Already have an account? Login</a>
      </section>
      {/* Video Section */}
      <section className="w-full flex flex-col items-center -mt-10 mb-20 px-4 relative z-20">
        <div className="w-full max-w-5xl bg-gradient-to-br from-white via-[#f7f7fa] to-[#f0f4ff] rounded-3xl shadow-2xl border border-slate-200 p-0 flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(circle at 70% 30%, #FF6B35 0%, transparent 70%)'}}></div>
          <div className="relative z-10 p-12 w-full flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>See RedditMVP in Action</h2>
            <p className="text-slate-600 text-lg sm:text-2xl mb-8 text-center max-w-2xl" style={{fontFamily: 'Plus Jakarta Sans'}}>Watch how you can create, manage, and grow your Reddit community with powerful, easy-to-use tools.</p>
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="RedditMVP Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
