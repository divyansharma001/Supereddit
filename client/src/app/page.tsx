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
      {/* Bento Grid Section */}
      <section className="w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pb-28">
        {/* Animated Heading */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-slate-900 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
            Discover What You Can Do
          </h2>
          <p className="mt-5 max-w-2xl text-center text-slate-600 text-xl animate-fade-slide" style={{animationDelay: '0.2s'}}>
            Powerful tools to help you build, manage and grow your Reddit community
          </p>
        </div>
        
        <div className="grid bento-grid gap-5 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 md:grid-cols-6 auto-rows-[250px]">
          {/* Card 1: AI Content Generator */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-3 row-span-2 bg-white rounded-3xl overflow-hidden relative border border-slate-100" style={{fontFamily: 'Plus Jakarta Sans'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fc] to-white opacity-80"></div>
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-slate-800 relative">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-4xl sm:text-5xl bento-icon">🤖</span>
                  <span className="bg-[#FF4500]/10 text-[#FF4500] rounded-full px-3 py-1 text-xs font-bold tracking-wide bento-badge">NEW</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold bento-title mt-2 text-slate-900">AI Content Generator</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 max-w-md">Create engaging posts and comments tailored to your community's interests using advanced AI that learns from successful content.</p>
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
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-3 row-span-2 bg-[#23272f] rounded-3xl overflow-hidden relative" style={{fontFamily: 'Plus Jakarta Sans'}}>
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-white relative z-10">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl sm:text-2xl font-extrabold bento-title">Analytics Dashboard</h3>
                  <span className="bento-icon text-2xl sm:text-3xl">📊</span>
                </div>
                <p className="text-white/80 mb-4">Track your community's growth and engagement</p>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
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
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-2 row-span-2 bg-white rounded-3xl overflow-hidden relative border border-slate-100" style={{fontFamily: 'Plus Jakarta Sans'}}>
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-slate-800 relative">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="text-3xl sm:text-4xl bento-icon">🏆</span>
                  <span className="text-xs text-slate-500 font-medium px-2 py-0.5 bg-slate-100 rounded-full">Pro</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold bento-title mt-2 text-slate-900">Community Builder</h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium">Tools and templates to grow your community from scratch with proven strategies.</p>
                
                <div className="mt-3 sm:mt-4 bg-slate-50 rounded-xl p-3">
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
          <div className="bento-card bento-shine col-span-1 sm:col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden relative border border-slate-100" style={{fontFamily: 'Plus Jakarta Sans'}}>
            <div className="h-full flex justify-between p-5 sm:p-6 text-slate-800 relative">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl bento-icon">📅</span>
                  <h3 className="text-base sm:text-xl font-extrabold bento-title">Content Calendar</h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">Schedule and automate posts</p>
              </div>
              
              <div className="flex items-end">
                <button className="bento-btn bg-slate-700 hover:bg-slate-800 text-white font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm">View</button>
              </div>
            </div>
          </div>
          
          {/* Card 5: Integrations */}
          <div className="bento-card bento-shine col-span-1 sm:col-span-1 md:col-span-2 row-span-1 bg-white rounded-3xl overflow-hidden border border-slate-100 relative" style={{fontFamily: 'Plus Jakarta Sans'}}>
            <div className="h-full flex items-center p-5 sm:p-6 text-slate-800 relative">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1 font-medium">Tasks</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <span className="text-xs mt-1 font-medium">Notes</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="bento-card bento-shine col-span-1 sm:col-span-2 md:col-span-4 row-span-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl overflow-hidden relative" style={{fontFamily: 'Plus Jakarta Sans'}}>
            <div className="absolute right-0 bottom-0 w-24 h-24 sm:w-28 sm:h-28 opacity-10">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
              </svg>
            </div>
            <div className="h-full flex items-center justify-between p-5 sm:p-8 text-white relative">
              <div className="flex flex-col gap-1 max-w-xl">
                <h3 className="text-lg sm:text-2xl font-extrabold bento-title">Get premium features for 30 days</h3>
                <p className="text-white/80 text-sm sm:text-base font-medium">Unlock all analytics and premium templates.</p>
              </div>
              <button className="bento-btn bg-white text-slate-900 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-opacity-90 transition-all shadow">Try Free</button>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 py-20 bg-gradient-to-b from-white via-[#f7f8fa] to-[#f0f4ff] border-t border-slate-100">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-10 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide">
            <div className="mb-4 text-4xl bento-icon">📝</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Create or Join a Community</h3>
            <p className="text-slate-600 text-center text-base">Start your own subreddit or join an existing one to begin building your presence.</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.1s'}}>
            <div className="mb-4 text-4xl bento-icon">🤖</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Leverage AI Tools</h3>
            <p className="text-slate-600 text-center text-base">Use AI-powered content creation and analytics to engage and grow your community.</p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.2s'}}>
            <div className="mb-4 text-4xl bento-icon">🚀</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Grow & Succeed</h3>
            <p className="text-slate-600 text-center text-base">Track your progress, optimize your strategy, and watch your community thrive.</p>
          </div>
        </div>
      </section>
      {/* Features Overview Section */}
      <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 py-20 bg-white border-t border-slate-100">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-10 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl">
          {/* Feature 1 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-[#f7f8fa] to-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide">
            <div className="mb-4 text-3xl bento-icon">💡</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Smart Suggestions</h3>
            <p className="text-slate-600 text-center text-base">Get AI-powered post and comment ideas tailored to your community’s interests.</p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-[#f7f8fa] to-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.1s'}}>
            <div className="mb-4 text-3xl bento-icon">📈</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Analytics Dashboard</h3>
            <p className="text-slate-600 text-center text-base">Track growth, engagement, and trends with beautiful, easy-to-read analytics.</p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-[#f7f8fa] to-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.2s'}}>
            <div className="mb-4 text-3xl bento-icon">🔗</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Easy Integrations</h3>
            <p className="text-slate-600 text-center text-base">Connect with your favorite tools and platforms for seamless workflows.</p>
          </div>
          {/* Feature 4 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-[#f7f8fa] to-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.3s'}}>
            <div className="mb-4 text-3xl bento-icon">🔒</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 bento-title">Privacy First</h3>
            <p className="text-slate-600 text-center text-base">Your data is secure and private, with full control over your community’s information.</p>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 py-20 bg-gradient-to-b from-white via-[#f7f8fa] to-[#f0f4ff] border-t border-slate-100">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-10 animate-fade-slide" style={{fontFamily: 'Plus Jakarta Sans'}}>
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Testimonial 1 */}
          <div className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-500">A</div>
              <div>
                <div className="font-semibold text-slate-900">Alex Kim</div>
                <div className="text-xs text-slate-400">Community Manager</div>
              </div>
            </div>
            <p className="text-slate-700 text-base mb-2">“RedditMVP’s AI tools helped us grow our subreddit by 300% in just a few months. The analytics are clear and actionable!”</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-500">J</div>
              <div>
                <div className="font-semibold text-slate-900">Jamie Lee</div>
                <div className="text-xs text-slate-400">Content Creator</div>
              </div>
            </div>
            <p className="text-slate-700 text-base mb-2">“The content suggestions are always on point and save me hours every week. Love the clean, easy-to-use interface!”</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-8 bento-shine animate-fade-slide" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-500">S</div>
              <div>
                <div className="font-semibold text-slate-900">Samira Patel</div>
                <div className="text-xs text-slate-400">Moderator</div>
              </div>
            </div>
            <p className="text-slate-700 text-base mb-2">“Integrations with our workflow tools are seamless. The support team is responsive and helpful!”</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
