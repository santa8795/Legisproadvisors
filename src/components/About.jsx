import React from 'react';
import AnimatedGraphic from './AnimatedGraphic'; 

function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white font-sans overflow-hidden">
      {/* max-w ko 1600px kiya hai taaki screen ka poora width ache se cover ho aur left-right space kam bache */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Grid Gap ko bade screen ke hisaab se adjust kiya hai */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* 1. Left Side: Animated Graphic (7 Columns) */}
          <div className="lg:col-span-7 w-full">
            <AnimatedGraphic />
          </div>

          {/* 2. Right Side: Text Content (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Subtitle - Size bada aur bold kiya */}
            <span className="text-sm sm:text-[15px] font-extrabold text-[#3b82f6] uppercase tracking-widest block mb-3">
              Who We Are
            </span>

            {/* Main Heading - Size ko 38px se badha kar 46px aur bold kiya */}
            <h2 className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold text-[#1e293b] tracking-tight leading-[1.2] mb-6">
              About Legispro Advisors
            </h2>

            {/* Paragraphs - Text size 15px se badha kar 18px kiya aur line-gap badhaya */}
            <div className="space-y-5 text-[#475569] text-base sm:text-lg lg:text-[18px] leading-[1.8] font-normal">
              <p>
                Legispro Advisors partners with businesses, startups, investors, and institutions to deliver advisory services in corporate compliance, governance, and regulatory matters.
              </p>
              <p>
                We assist organizations in navigating regulatory requirements with clarity while strengthening internal frameworks that support sustainable and well-governed growth.
              </p>
              <p>
                Our advisory is grounded in practicality, with a focus on delivering solutions that can be effectively implemented.
              </p>
            </div>

            {/* Call To Action (CTA) Button - Button ko bada aur prominent kiya */}
            <div className="mt-10">
              <a 
                href="https://legisproadvisors.com/about-us" 
                className="inline-block bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base lg:text-[16px] active:scale-95 text-center"
              >
                More About Us
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;