"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import WaitlistHero from '../components/WaitlistHero'; // Correctly imported from its new file

export default function Home() {
  const [open, setOpen] = React.useState<number | null>(null);
  const faqs = [
    {
      q: "What is RedditMVP?",
      a: "RedditMVP is an AI-powered platform to help you create, manage, and grow Reddit communities with smart tools and analytics."
    },
    {
      q: "Is my data private and secure?",
      a: "Absolutely. Your data is encrypted and you have full control over your community’s information."
    },
    {
      q: "Can I try RedditMVP for free?",
      a: "Yes! You can get started for free and explore all the core features. Premium features are available with a free trial."
    },
    {
      q: "Do I need to know coding to use RedditMVP?",
      a: "No coding required. Everything is designed to be user-friendly and accessible to everyone."
    },
    {
      q: "How do I get support?",
      a: "Our support team is available via chat and email to help you with any questions or issues."
    }
  ];
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#FFF7F0] via-[#FF6B35]/10 to-[#FFF7F0] p-0 max-w-none mx-0 relative overflow-hidden border-0 shadow-none">
      
      {/* Main Hero Content */}
      <section className="relative flex flex-col w-full justify-center items-center flex-1 min-h-screen pt-32 pb-20 z-10 px-6 bg-gradient-to-b from-[#FFF7F0] via-[#FF6B35]/10 to-[#FFF7F0] overflow-visible">
        {/* Animated floating shape */}
        <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[420px] h-[120px] bg-gradient-to-r from-[#FF4500]/20 via-[#FF6B35]/20 to-[#FFF7F0]/0 rounded-full blur-3xl opacity-70 animate-pulse-slow pointer-events-none"></div>
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#FF4500]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="w-full max-w-4xl flex flex-col items-center text-center animate-fade-slide relative z-10">
          {/* Professional badge */}
          <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF4500]" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.789 0l-2 4a1 1 0 00.894 1.447h4a1 1 0 00.894-1.447l-2-4zM10 18a1 1 0 01-1-1v-6a1 1 0 112 0v6a1 1 0 01-1 1z" />
      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM15 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6z" />
    </svg>
    <span className="text-sm font-medium text-slate-700">Launching Soon: Join the Waitlist</span>
  </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>
            Your <span style={{ color: '#FF4500', fontWeight: 'bold',  }}>Unfair</span> Advantage on <span style={{ color: '#FF4500', fontWeight: 'bold', textDecoration: 'underline' }}>Reddit</span>.
          </h1>
          
          <p className="mt-4 text-slate-600 text-lg sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed" style={{fontFamily: 'Plus Jakarta Sans'}}>
            Scale your presence with <span className="font-bold">AI post generation</span>, <span className="font-bold ">automated scheduling</span>, and a <span className="font-bold">powerful client analytics dashboard</span>.
          </p>

          {/* === THE NEW WAITLIST COMPONENT IS PLACED HERE === */}
          <WaitlistHero />
          
          {/* Social proof */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#FF4500]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.999-6.001A6.004 6.004 0 0115 7z"></path>
      </svg>
              <span>Exclusive Early Access</span>
            </div>
            <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      <span>Secure & Private by Design</span>
            </div>
          </div>
        </div>
        
        {/* This section with buttons is commented out, but links updated just in case. */}
        {/* 
        <div className="flex flex-col sm:flex-row gap-4 mt-10 mb-8 w-full max-w-md justify-center animate-fade-slide" style={{animationDelay: '0.1s'}}>
          <Link href="/" className="flex-1 bg-[#FF4500] hover:bg-[#FF6B35] text-white font-semibold rounded-xl px-6 py-3 text-sm shadow-lg hover:shadow-xl transition-all duration-200 text-center border-2 border-transparent hover:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:ring-offset-2 transform hover:scale-105">
            Start building for free
          </Link>
          <Link href="/" className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl px-6 py-3 text-sm shadow-lg hover:shadow-xl transition-all duration-200 text-center hover:border-slate-400 transform hover:scale-105">
            View demo
          </Link>
        </div>
        
        <div className="text-center animate-fade-slide" style={{animationDelay: '0.3s'}}>
          <p className="text-sm text-slate-500 mb-2">Already have an account?</p>
          <Link href="/" className="text-base font-medium text-[#FF4500] hover:text-[#FF6B35] hover:underline transition-colors duration-200">
            Sign in →
          </Link>
        </div> 
        */}
        
        {/* Animated Down Arrow */}
        <div className="mt-16 flex justify-center animate-bounce-slow">
          <DownArrowSVG />
        </div>
      </section>

      {/* --- ALL OTHER SECTIONS OF YOUR PAGE --- */}
      {/* Video Section */}
      {/* --- UPDATED VIDEO SECTION --- */}
<section className="w-full flex flex-col items-center -mt-10 mb-20 px-4 relative z-20">
    <div className="w-full max-w-5xl bg-gradient-to-br from-[#FFF7F0] via-[#FF6B35]/10 to-[#FFF7F0] rounded-3xl shadow-2xl border border-slate-200 p-0 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(circle at 70% 30%, #FF6B35 0%, transparent 70%)'}}></div>
        
        {/* THIS IS THE LINE I'VE CHANGED - Notice the new padding classes */}
        <div className="relative z-10 w-full flex flex-col items-center p-4 sm:p-8 md:p-12">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>See Supereddit in Action</h2>
            <p className="text-slate-600 text-lg sm:text-2xl mb-8 text-center max-w-2xl" style={{fontFamily: 'Plus Jakarta Sans'}}>Watch how you can create, manage, and grow your Reddit community with powerful, easy-to-use tools.</p>
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 flex items-center justify-center">
                <div style={{padding:'55.42% 0 0 0',position:'relative',width:'100%'}}>
                <iframe 
                    src="https://player.vimeo.com/video/1102814433?background=1&autoplay=1&loop=1&muted=1" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
                    title="Supereddit"
                ></iframe>
                </div>
            </div>
        </div>
    </div>
</section>
      {/* Bento Grid Section */}
      <section className="w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pb-28">
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-slate-900 animate-fade-slide">
            Discover What You Can Do
          </h2>
          <p className="mt-4 max-w-2xl text-center text-slate-600 text-lg sm:text-xl animate-fade-slide" style={{animationDelay: '0.2s'}}>
            Powerful tools to help you build, manage and grow your Reddit community
          </p>
        </div>
        
        <div className="grid gap-4 sm:gap-5 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 md:grid-cols-6 auto-rows-[250px]">
          {/* Card 1: AI Content Generator */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-3 row-span-2 bg-white rounded-2xl overflow-hidden relative border border-slate-100">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7F0] to-white opacity-80"></div>
            <div className="h-full flex flex-col justify-between p-5 sm:p-6 md:p-7 text-slate-800 relative">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-3xl sm:text-4xl bento-icon">🤖</span>
                  <span className="bg-[#FF4500]/10 text-[#FF4500] rounded-full px-3 py-1 text-xs font-bold tracking-wide bento-badge">NEW</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold bento-title mt-1 text-slate-900">AI Content Generator</h3>
                <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 max-w-md">Create engaging posts and comments tailored to your community's interests using advanced AI that learns from successful content.</p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="bento-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl">Try it now</button>
                <button className="bento-btn bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  See demo
                </button>
              </div>
            </div>
          </div>
          
          {/* Card 2: Analytics Dashboard */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-3 row-span-2 bg-[#23272f] rounded-2xl overflow-hidden relative">
            <div className="h-full flex flex-col justify-between p-5 sm:p-6 md:p-7 text-white relative z-10">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl sm:text-2xl font-extrabold bento-title">Analytics Dashboard</h3>
                  <span className="bento-icon text-2xl sm:text-3xl">📊</span>
                </div>
                <p className="text-white/80 mb-3 sm:mb-4">Track your community's growth and engagement</p>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-1">
                  <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                    <div className="text-white/70 text-xs sm:text-sm mb-1">New Members</div>
                    <div className="text-base sm:text-xl font-bold flex items-center">
                      247
                      <span className="text-green-400 text-xs sm:text-sm ml-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        23%
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                    <div className="text-white/70 text-xs sm:text-sm mb-1">Engagement</div>
                    <div className="text-base sm:text-xl font-bold flex items-center">
                      89%
                      <span className="text-green-400 text-xs sm:text-sm ml-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        7%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 relative h-12 sm:h-16">
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 400 100">
                      <path d="M0,50 C50,30 100,90 150,50 C200,10 250,50 300,40 C350,30 400,60 400,50" fill="none" stroke="#FF4500" strokeWidth="3" />
                      <path d="M0,50 C50,30 100,90 150,50 C200,10 250,50 300,40 C350,30 400,60 400,50" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5,5" />
                      <circle cx="150" cy="50" r="4" fill="#FF4500" />
                      <circle cx="300" cy="40" r="4" fill="#FF4500" />
                    </svg>
                  </div>
                </div>
              </div>
              <button className="bento-btn bg-white text-slate-900 hover:bg-white/90 font-bold px-5 py-2.5 rounded-xl mt-4 w-fit">View analytics</button>
            </div>
          </div>
          
          {/* Card 3: Community Builder */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-2 row-span-2 bg-white rounded-2xl overflow-hidden relative border border-slate-100">
            <div className="h-full flex flex-col justify-between p-5 sm:p-6 md:p-7 text-slate-800 relative">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="text-3xl sm:text-4xl bento-icon">🏆</span>
                  <span className="text-xs text-slate-500 font-medium px-2 py-0.5 bg-slate-100 rounded-full">Pro</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold bento-title mt-1 text-slate-900">Community Builder</h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium">Tools and templates to grow your community from scratch with proven strategies.</p>
                
                <div className="mt-3 bg-slate-50 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-slate-700 text-sm">Growth Plan</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">ACTIVE</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2">
                    <div className="bg-slate-700 h-1.5 sm:h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-slate-500">
                    <span>Step 3 of 5</span>
                    <span>65% Complete</span>
                  </div>
                </div>
              </div>
              <button className="bento-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl mt-4 w-fit">Continue setup</button>
            </div>
          </div>
          
          {/* Card 4: Content Calendar */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden relative border border-slate-100">
            <div className="h-full flex justify-between p-4 sm:p-5 text-slate-800 relative">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl bento-icon">📅</span>
                  <h3 className="text-base sm:text-lg font-extrabold bento-title">Content Calendar</h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">Schedule and automate posts</p>
              </div>
              
              <div className="flex items-end">
                <button className="bento-btn bg-slate-700 hover:bg-slate-800 text-white font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm">View</button>
              </div>
            </div>
          </div>
          
          {/* Card 5: Integrations */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-1 md:col-span-2 row-span-1 bg-white rounded-2xl overflow-hidden border border-slate-100 relative">
            <div className="h-full flex items-center p-4 sm:p-5 text-slate-800 relative">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1 font-medium">Tasks</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <span className="text-xs mt-1 font-medium">Notes</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs mt-1 font-medium">Time</span>
                </div>
              </div>
              <div className="absolute top-2 right-3">
                <span className="text-xs text-slate-500 font-semibold">+ More</span>
              </div>
            </div>
          </div>
          
          {/* Card 6: Call to Action */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-4 row-span-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl overflow-hidden relative">
            <div className="absolute right-0 bottom-0 w-20 h-20 sm:w-24 sm:h-24 opacity-10">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
              </svg>
            </div>
            <div className="h-full flex items-center justify-between p-5 sm:p-6 md:p-7 text-white relative">
              <div className="flex flex-col gap-1 max-w-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold bento-title">Get premium features for 30 days</h3>
                <p className="text-white/80 text-sm sm:text-base font-medium">Unlock all analytics and premium templates.</p>
              </div>
              <button className="bento-btn bg-white text-slate-900 font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow">Try Free</button>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="relative w-full flex flex-col items-center px-4 sm:px-6 md:px-8 py-20 bg-gradient-to-b from-white via-[#FFF7F0] to-white border-t border-slate-100 overflow-hidden">
        {/* Layered background shapes */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-gradient-to-r from-[#FF4500]/10 via-[#FF6B35]/5 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/3 -right-24 w-64 h-64 bg-gradient-to-br from-[#FF4500]/5 to-transparent rounded-full blur-2xl opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto mb-16">
          <div className="flex flex-col items-center">
            <span className="px-4 py-1.5 bg-[#FF4500]/5 text-[#FF4500] rounded-full text-sm font-medium mb-6">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-6 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
              How It Works
            </h2>
            <p className="text-slate-600 text-center text-lg max-w-2xl">
              Get started in minutes with our streamlined setup process and intuitive tools
            </p>
          </div>
        </div>
        
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 group">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#FF4500]/10 to-[#FF6B35]/5 rounded-2xl text-5xl shadow-sm group-hover:shadow-md transition-all duration-300 relative">
              <span role='img' aria-label='connect' className="relative z-10">🔗</span>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/5 to-[#FF6B35]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FF4500]/10 rounded-full text-[#FF4500] font-bold text-lg mb-4">1</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Connect Your Reddit</h3>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4"></div>
            <p className="text-slate-600 text-center text-base">Securely link your Reddit account in seconds to unlock powerful tools.</p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 group">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#FF4500]/10 to-[#FF6B35]/5 rounded-2xl text-5xl shadow-sm group-hover:shadow-md transition-all duration-300 relative">
              <span role='img' aria-label='content' className="relative z-10">📝</span>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/5 to-[#FF6B35]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FF4500]/10 rounded-full text-[#FF4500] font-bold text-lg mb-4">2</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Generate Content</h3>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4"></div>
            <p className="text-slate-600 text-center text-base">Use AI to create posts and comments tailored to your community's interests.</p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 group">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#FF4500]/10 to-[#FF6B35]/5 rounded-2xl text-5xl shadow-sm group-hover:shadow-md transition-all duration-300 relative">
              <span role='img' aria-label='moderation' className="relative z-10">🤖</span>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/5 to-[#FF6B35]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FF4500]/10 rounded-full text-[#FF4500] font-bold text-lg mb-4">3</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Automate Moderation</h3>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4"></div>
            <p className="text-slate-600 text-center text-base">Let smart automations handle spam, rules, and repetitive tasks for you.</p>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center bg-white backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 group">
            <div className="mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#FF4500]/10 to-[#FF6B35]/5 rounded-2xl text-5xl shadow-sm group-hover:shadow-md transition-all duration-300 relative">
              <span role='img' aria-label='analytics' className="relative z-10">📈</span>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/5 to-[#FF6B35]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FF4500]/10 rounded-full text-[#FF4500] font-bold text-lg mb-4">4</div>
            <h3 className="font-bold text-xl text-slate-900 mb-3 text-center" style={{fontFamily: 'Plus Jakarta Sans'}}>Track Growth</h3>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4"></div>
            <p className="text-slate-600 text-center text-base">Visualize your community's progress and optimize with actionable analytics.</p>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center relative z-10">
          <Link href="/" className="flex items-center gap-2 bg-[#FF4500] hover:bg-[#FF6B35] text-white font-semibold rounded-xl px-6 py-3 text-sm shadow-lg hover:shadow-xl transition-all duration-200 text-center transform hover:scale-105">
            Get Started Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="relative w-full flex flex-col items-center px-4 sm:px-6 md:px-8 py-20 bg-gradient-to-b from-white via-[#FFF7F0] to-white border-t border-slate-100 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-gradient-to-r from-[#FF4500]/10 via-[#FF6B35]/5 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 bg-gradient-to-br from-[#FF4500]/5 to-transparent rounded-full blur-2xl opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto mb-16">
          <div className="flex flex-col items-center">
            <span className="px-4 py-1.5 bg-[#FF4500]/5 text-[#FF4500] rounded-full text-sm font-medium mb-6">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-6 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-center text-lg max-w-2xl">
              Everything you need to know about RedditMVP and how it can help your community grow.
            </p>
          </div>
        </div>
        
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 relative z-10">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`bg-white backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${open === i ? 'ring-2 ring-[#FF4500]/20' : 'hover:border-slate-300'}`}
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-slate-800 focus:outline-none transition-all group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="flex items-center gap-3 text-lg">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${open === i ? 'bg-[#FF4500]/10 text-[#FF4500]' : 'bg-slate-100 text-slate-500 group-hover:bg-[#FF4500]/5 group-hover:text-[#FF4500]'}`}>
                    {open === i ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                      </svg>
                    )}
                  </span>
                  {faq.q}
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${open === i ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                aria-hidden={open !== i}
              >
                <div className="px-6 pb-6 pt-1">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4"></div>
                  <p className="text-slate-600 text-base leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col items-center relative z-10">
          <p className="text-slate-600 mb-6 text-center">Still have questions?</p>
          <Link href="/" className="flex items-center gap-2 bg-[#FF4500]/10 hover:bg-[#FF4500]/15 text-[#FF4500] font-semibold rounded-xl px-6 py-3 text-sm transition-all duration-200 text-center">
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
      {/* Final Call to Action & Footer */}
      <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 py-16 bg-white border-t border-slate-100">
  <div className="flex flex-col items-center max-w-2xl w-full">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-4 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
      Ready to build your next great Reddit community?
    </h2>
    <p className="text-slate-600 text-center mb-8 animate-fade-slide" style={{animationDelay: '0.1s'}}>
      Sign up now and unlock the power of AI-driven community management.
    </p>
    <Link href="/" className="bento-btn bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl shadow hover:bg-slate-800 transition-all text-lg animate-fade-slide" style={{animationDelay: '0.2s'}}>Get Started Free</Link>
  </div>
  {/* Modern Footer */}
  <footer className="relative w-full mt-16 pt-10 border-t border-slate-200/50 bg-white text-center animate-fade-slide overflow-hidden" style={{animationDelay: '0.3s'}}>
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-0 gap-4 pb-0">
      <div className="flex flex-col items-center md:items-start gap-3 mb-4 md:mb-0">
        <div className="flex items-center gap-2">
          {/* Updated Logo Span */}
          <span className="bg-gradient-to-tr from-[#FF4500] via-[#FF6B35] to-[#FF4500] h-8 w-8 rounded-xl flex items-center justify-center text-xl font-extrabold shadow-[0_2px_8px_rgba(255,69,0,0.15)] mr-1 text-white">
            S
          </span>
          {/* Updated Brand Name */}
          <span className="font-extrabold text-lg tracking-tight text-slate-900" style={{fontFamily: 'Plus Jakarta Sans'}}>Supereddit</span>
        </div>
        <p className="text-xs text-slate-500 max-w-xs text-center md:text-left">Elevate your Reddit community with AI-powered tools and analytics</p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="font-bold text-slate-800 text-sm">Quick Links</h3>
          <nav className="flex flex-wrap md:flex-col items-center md:items-start justify-center gap-3 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-[#FF4500] transition-colors">Home</Link>
            <a href="#how-it-works" className="hover:text-[#FF4500] transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-[#FF4500] transition-colors">FAQ</a>
          </nav>
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="font-bold text-slate-800 text-sm">Account</h3>
          <nav className="flex flex-wrap md:flex-col items-center md:items-start justify-center gap-3 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-[#FF4500] transition-colors">Login</Link>
            <Link href="/" className="hover:text-[#FF4500] transition-colors">Register</Link>
            <Link href="/" className="hover:text-[#FF4500] transition-colors">AI Playground</Link>
          </nav>
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="font-bold text-slate-800 text-sm">Connect</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-600 hover:text-[#FF4500] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-600 hover:text-[#FF4500] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-600 hover:text-[#FF4500] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="relative z-10 border-t border-slate-200/50 py-6">
      {/* Updated Copyright */}
      <div className="text-slate-500 text-xs">© {new Date().getFullYear()} Supereddit. All rights reserved.</div>
    </div>
  </footer>
</section>
    </main>
  );
}

// These helper components are kept here as in your original file structure.
function AIPlayground() {
  const [topic, setTopic] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");
    setTimeout(() => {
      setResult(
        `Here’s a sample post for "${topic}":\n\nHey everyone! Let’s talk about ${topic}. What are your thoughts, tips, or experiences? Share below!`
      );
      setLoading(false);
    }, 900);
  }

  return (
    <form
      onSubmit={handleGenerate}
      className="flex flex-col items-center w-full max-w-xl mx-auto"
    >
      <div className="flex w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-slate-900 font-medium text-lg px-2 placeholder:text-slate-400"
          placeholder="Enter a topic (e.g. productivity, memes, travel)"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          style={{fontFamily: 'Plus Jakarta Sans'}}
        />
        <button
          type="submit"
          className="ml-4 px-6 py-2 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all bento-btn"
          disabled={loading || !topic.trim()}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {result && (
        <div className="mt-8 w-full bg-gradient-to-br from-[#FFF7F0] to-white border border-slate-100 rounded-2xl p-6 text-slate-800 shadow-sm animate-fade-slide whitespace-pre-line">
          {result}
        </div>
      )}
    </form>
  );
}

function HeroBlobSVG() {
  return (
    <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#23272f" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <ellipse cx="720" cy="300" rx="700" ry="220" fill="url(#hero-gradient)" />
      <ellipse cx="400" cy="100" rx="200" ry="80" fill="#FF4500" fillOpacity="0.04" />
      <ellipse cx="1200" cy="500" rx="180" ry="60" fill="#FF6B35" fillOpacity="0.06" />
    </svg>
  );
}

function DownArrowSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
      <circle cx="18" cy="18" r="18" fill="#fff" fillOpacity="0.7" />
      <path d="M12 16l6 6 6-6" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}