import React from 'react';
// Apne project folder ke hisaab se path check kar lijiye
import heroBg from '../assets/hero-bg.jpg'; 

function Hero() {
  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat min-h-[550px] md:min-h-[75vh] flex items-center justify-center font-sans overflow-hidden group"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* 1. Dark Overlay with subtle hover shift */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-black/60 transition-all duration-700 group-hover:bg-black/55"></div>

      {/* 2. Hero Content Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16 sm:py-20">
        
        {/* Main Title / Heading with Hover Lift & Letter Spacing Effect */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight md:leading-tight transition-all duration-300 ease-out hover:-translate-y-1 hover:tracking-normal cursor-default drop-shadow-md">
          Where Governance <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent">
            Meets Growth
          </span>
        </h1>

        {/* Subtitle / Description with smooth color transition */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 font-normal max-w-2xl mx-auto tracking-wide leading-relaxed transition-colors duration-300 hover:text-white">
          Helping Businesses Navigate Complex Legal and Regulatory Landscapes
        </p>

        {/* Call to Action (CTA) Button with 3D Lift & Glowing Shadow */}
        <div className="mt-8 sm:mt-10">
          <a
            href="#services"
            className="relative inline-block bg-[#3378ff] hover:bg-[#1f62e6] text-white font-semibold px-8 py-3.5 rounded-md shadow-lg shadow-[#3378ff]/30 hover:shadow-2xl hover:shadow-[#3378ff]/60 hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 ease-out text-base sm:text-[16px] active:scale-95 active:translate-y-0 cursor-pointer border border-transparent hover:border-blue-300/40"
          >
            Explore Services
          </a>
        </div>

      </div>
    </div>
  );
}

export default Hero;