"use client";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-[#f6f8fa] p-4 rounded-[2.2rem] max-w-[1440px] mx-auto relative overflow-visible border border-[#e6eaef] shadow-sm mt-4">
      {/* Floating images - top left */}
      <div className="absolute left-[-44px] top-14 z-10">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80"
          alt="Profile"
          width={110}
          height={110}
          className="rounded-xl shadow-lg object-cover rotate-[-12deg]"
        />
      </div>
      <div className="absolute left-[-62px] top-[265px] z-10">
        <Image
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=220&q=80"
          alt="Dog"
          width={142}
          height={88}
          className="rounded-xl shadow-lg object-cover rotate-[-16deg]"
        />
      </div>
      <div className="absolute left-[46px] top-[358px] z-10">
        <div className="rounded-xl bg-white p-2 shadow-md w-[120px] text-xs border flex items-center gap-1">
          <Image
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?w=80&q=80"
            alt="Boat"
            width={32}
            height={32}
            className="rounded-lg object-cover"
          />
          <span className="truncate">Gap year: Indonesia '25</span>
        </div>
      </div>
      {/* Floating images - right */}
      <div className="absolute right-[-52px] top-20 z-10">
        <Image
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=200&q=80"
          alt="Friends"
          width={112}
          height={112}
          className="rounded-xl shadow-lg object-cover rotate-[14deg]"
        />
      </div>
      <div className="absolute right-[-40px] top-[380px] z-10 flex flex-col gap-3">
        <div className="rounded-xl bg-white p-2 shadow-md w-[130px] text-xs border flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#b2b2b2]">Nov 23</span>
            <span className="ml-auto text-[#fb651e] font-bold">|</span>
          </div>
          <span className="font-semibold leading-tight">LLMs for house plants?</span>
          <span className="text-[11px] text-muted-foreground leading-tight">It's been (five incredibly turbulent days ...</span>
          <span className="text-[11px] text-blue-600">Read more →</span>
        </div>
        <div className="rounded-xl bg-white p-1 shadow-md w-[80px] border flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=80&q=80"
            alt="Juice"
            width={70}
            height={44}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between py-4 px-3">
        <div className="flex items-center gap-7">
          <span className="flex items-center gap-2">
            <span className="bg-gradient-to-tr from-[#ff4e00] via-[#ffdd55] to-[#3b82f6] h-[26px] w-[26px] rounded-xl flex items-center justify-center text-xl font-bold shadow-[1px_3px_13px_rgba(60,60,94,0.04)] mr-1"></span>
            <span className="font-bold text-lg ml-2 tracking-tight">Portrait</span>
          </span>
          <a href="#" className="text-[16px] font-medium text-[#181c29] hover:text-blue-600 transition">Explore</a>
          <a href="#" className="relative text-[16px] font-medium text-[#181c29] hover:text-blue-600 transition flex items-center">Points
            <span className="absolute -top-3 left-8 text-[10px] rounded-full text-[#fb651e] font-bold">NEW!</span>
          </a>
          <a href="#" className="text-[16px] font-medium text-[#181c29] hover:text-blue-600 transition">About</a>
          <a href="#" className="text-[16px] font-medium text-[#181c29] hover:text-blue-600 transition">Blog</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-[15px] text-[#181c29] mr-1 font-medium hover:text-blue-600">Login</a>
          <a href="#" className="bg-white font-semibold rounded-2xl px-4 py-1.5 text-sm border-2 border-transparent hover:border-[#57d2ff] shadow-xs transition relative" style={{boxShadow:'0 1.5px 0 #f59c28, 0 -1.5px 0 #8743ff, 1.5px 0 0 #f9f871, -1.5px 0 0 #f44e4e'}}>Sign up</a>
        </div>
      </nav>
      {/* Main Hero Content */}
      <section className="flex flex-col w-full justify-center items-center mt-10 mb-4 z-10">
        <div className="flex gap-3 mb-7">
          <button className="bg-white/90 border border-[#e6eaef] rounded-full px-4 py-2 text-sm font-medium shadow hover:shadow-md flex items-center gap-2">Portrait launches Public Testnet <span className="ml-1 text-lg font-bold">▶</span></button>
          <button className="bg-white/90 border border-[#e6eaef] rounded-full px-4 py-2 text-sm font-medium shadow hover:shadow-md flex items-center gap-2">Discover Portrait in 90s <span className="ml-1 text-lg font-bold">▶</span></button>
        </div>
        <h1 className="text-[2.75rem] sm:text-[3.25rem] md:text-[3.7rem] lg:text-[4rem] font-bold leading-[1.15] text-center relative">
          Your <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#FF4E00] via-[#F9D423] via-[#72A3FF] via-[#E19FFD] via-[#FFAF7B] to-[#57d2ff] font-semibold italic drop-shadow" style={{WebkitTextStroke:'1px transparent'}}>forever</span> space for<br className="hidden sm:block"/> everything you are.
        </h1>
        <p className="mt-6 text-[#2e3242] text-xl font-normal text-center max-w-xl">More than a link4—a decentralized canvas to share your story, your work, and your life—in minutes.</p>
        {/* Signup/search */}
        <form className="flex flex-col items-center mt-8 w-full max-w-xl">
          <div className="flex items-center w-full bg-white border border-[#e6eaef] rounded-full px-3 py-3 shadow-[0_4px_20px_rgba(60,60,94,0.07)]">
            <span className="text-[#b4bcd0] text-xl font-normal ml-3 select-none">portrait.so/</span>
            <input
              type="text"
              placeholder="robert"
              className="flex-1 bg-transparent outline-none text-[#181c29] font-bold text-2xl px-2 placeholder:font-normal placeholder:text-[#acacbc]"
              style={{minWidth:'120px'}}
            />
            <button type="submit" className="ml-3 mr-2 font-semibold text-[17px] px-4 py-1.5 rounded-2xl shadow-xs border-[2.7px] border-transparent bg-white relative transition" style={{boxShadow:'0 1.2px 0 #f59c28, 0 -1.2px 0 #8743ff, 1.2px 0 0 #f9f871, -1.2px 0 0 #57d2ff', color: '#181c29'}}>
              Sign up
            </button>
          </div>
        </form>
        <a href="#" className="mt-3 text-base font-medium text-[#274393] hover:underline">Already have a Portrait? Login</a>
      </section>
    </main>
  );
}
