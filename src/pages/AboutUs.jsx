import React from 'react';
import TeamSection from '../components/TeamSection';

// Local Assets Imports
import aboutUsBg from '../assets/about-us-bg.png';
import aboutUsImg from '../assets/about-us1.png';

const AboutUs = () => {
  return (
    <div className="bg-slate-50 font-sans text-slate-800 selection:bg-[#2a73ff] selection:text-white">
      
      {/* 1. HERO SECTION (With Smooth Lift & Subtle Hover Glow) */}
      <section
        className="relative py-24 md:py-32 px-6 text-center bg-cover bg-center bg-no-repeat shadow-inner overflow-hidden group cursor-default"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url(${aboutUsBg})`,
        }}
      >
        <div className="max-w-4xl mx-auto text-white transition-all duration-500 ease-out group-hover:-translate-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fade-up drop-shadow-md">
            Learn more about <span className="bg-gradient-to-r from-white via-blue-200 to-slate-300 bg-clip-text text-transparent">Legispro Advisors</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed transition-colors duration-300 group-hover:text-white">
            and our approach to corporate compliance and governance advisory.
          </p>
        </div>
      </section>

      {/* 2. WHO WE ARE SECTION (With Image 3D Lift & Enhanced Blur Aura) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-5">
            <span className="text-xs font-extrabold tracking-widest text-[#2a73ff] uppercase block w-fit py-1 px-2.5 rounded-full bg-blue-100/50 border border-blue-200/60 shadow-sm">
              WHO WE ARE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight transition-all duration-300 hover:text-[#2a73ff] cursor-default">
              Advisory Support Built for Sustainable Growth
            </h2>
            <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed text-justify font-normal">
              <p className="transition-all duration-300 hover:text-slate-900 hover:translate-x-1">
                Legispro Advisors partners with businesses, startups, investors, and institutions to deliver advisory services in corporate compliance, governance, and regulatory matters.
              </p>
              <p className="transition-all duration-300 hover:text-slate-900 hover:translate-x-1">
                We assist organizations in navigating regulatory requirements with clarity while strengthening internal frameworks that support sustainable and well-governed growth.
              </p>
              <p className="transition-all duration-300 hover:text-slate-900 hover:translate-x-1">
                Our advisory is grounded in practicality, with a focus on delivering solutions that can be effectively implemented.
              </p>
            </div>
          </div>

          {/* Enhanced Image Glow & Smooth Scale */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#2a73ff] via-indigo-500 to-blue-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-50 group-hover:scale-105 transition duration-700"></div>
            <img
              src={aboutUsImg}
              alt="Legispro Advisors Story"
              className="relative w-full h-auto rounded-2xl shadow-xl object-cover transform transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1.5"
            />
          </div>

        </div>
      </section>

      {/* 3. IDEOLOGY SECTION (3D Hover Cards with Blue Shadow Glow) */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          
          {/* Card 1: Our Vision */}
          <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 border-t-4 border-t-[#2a73ff] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(42,115,255,0.15)] hover:border-blue-200 cursor-default">
            <h3 className="text-xl font-bold text-[#0f172a] mb-2 transition-colors duration-300 group-hover:text-[#2a73ff]">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base transition-colors duration-300 group-hover:text-slate-800">
              To become a trusted advisory partner within the startup and investment ecosystem by delivering structured, transparent, and growth-aligned legal and compliance solutions that empower businesses to scale with confidence.
            </p>
          </div>

          {/* Card 2: Our Mission */}
          <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 border-t-4 border-t-[#2a73ff] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(42,115,255,0.15)] hover:border-blue-200 cursor-default">
            <h3 className="text-xl font-bold text-[#0f172a] mb-2 transition-colors duration-300 group-hover:text-[#2a73ff]">Our Mission</h3>
            <div className="text-slate-600 leading-relaxed space-y-3 text-sm md:text-base transition-colors duration-300 group-hover:text-slate-800">
              <p>
                To support businesses, startups, investors, and institutions in navigating regulatory and compliance requirements with clarity and structure, while building strong governance frameworks that enable sustainable growth and informed decision-making.
              </p>
              <p>
                We are committed to delivering practical, implementation-oriented advisory that aligns legal and compliance processes with the evolving needs of businesses across their lifecycle.
              </p>
            </div>
          </div>

          {/* Card 3: Founder's Ideology */}
          <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 border-t-4 border-t-[#2a73ff] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(42,115,255,0.15)] hover:border-blue-200 cursor-default">
            <h3 className="text-xl font-bold text-[#0f172a] mb-1 transition-colors duration-300 group-hover:text-[#2a73ff]">Founder’s Ideology</h3>
            <p className="text-xs font-bold text-[#2a73ff] uppercase tracking-wider mb-4">
              THE FOUNDATION OF LEGISPRO ADVISORS
            </p>
            <div className="text-slate-600 leading-relaxed space-y-3 text-sm md:text-base transition-colors duration-300 group-hover:text-slate-800">
              <p>
                Legispro Advisors is built on the belief that strong businesses are not only driven by vision, but are sustained through clarity in decision-making, structured execution, and a deep commitment to integrity.
              </p>
              <p>
                From our experience of working closely with startups, founders, and institutional stakeholders, we have observed that many challenges faced by businesses are not due to a lack of opportunity, but due to gaps in structure, governance, and regulatory alignment.
              </p>
              <p>
                This understanding forms the foundation of our approach — where advisory goes beyond compliance and becomes an enabler of long-term growth, stability, and trust.
              </p>
            </div>
            
            {/* Interactive Blockquote with Shift & Color Deepening */}
            <blockquote className="mt-6 border-l-4 border-[#2a73ff] pl-4 italic text-slate-800 font-semibold bg-blue-50/60 py-3.5 px-4 rounded-r-lg text-sm md:text-base transition-all duration-300 group-hover:bg-blue-100/70 group-hover:translate-x-1.5 group-hover:shadow-sm">
              "Entrepreneurship thrives when supported by clarity, structure, and integrity."
            </blockquote>
          </div>

        </div>
      </section>

      {/* 4. MEET THE TEAM SECTION */}
      <TeamSection />

      {/* 5. FLOATING WHATSAPP BUTTON (With Neon Green Glow & Scale Animation) */}
      <a
        href="https://wa.me/918368383581"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd5a] text-white p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:shadow-[0_0_25px_rgba(37,211,102,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
};

export default AboutUs;