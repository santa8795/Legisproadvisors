import React from 'react';

// Card Data Array
const whyChooseData = [
  {
    id: 1,
    title: 'Clarity in Complexity',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
    ),
    difference: 'Regulatory frameworks can often appear complex and fragmented, making decision-making difficult.',
    value: 'We translate requirements into clear, structured, and actionable guidance.',
  },
  {
    id: 2,
    title: 'Execution-Focused Advisory',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    difference: 'Advisory often remains theoretical, creating a gap between understanding and execution.',
    value: 'We ensure every recommendation is practical and implementation-ready.',
  },
  {
    id: 3,
    title: 'Growth & Investor Alignment',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    difference: 'Misalignment between founders, investors, and compliance can create long-term issues.',
    value: 'We align business objectives with investor expectations and regulatory requirements.',
  },
  {
    id: 4,
    title: 'Long-Term Partnership',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    difference: 'Many advisory engagements lack continuity and long-term perspective.',
    value: 'We act as extended advisors, supporting businesses across stages with consistency.',
  },
];

function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-[#0a1128] font-sans relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-3">
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-normal text-gray-400 tracking-wide">
            Advisory built on clarity, execution, and alignment
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {whyChooseData.map((item) => (
            <div 
              key={item.id} 
              /* group class add ki hai taaki card par hover hone se andar ke icon par effect aaye */
              className="group bg-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col justify-between cursor-pointer"
            >
              <div>
                
                {/* ── INTERACTIVE ICON BOX ── */}
                {/* By default: Light blue background (#eff6ff) + Blue icon (#2a73ff) */}
                {/* On Hover (group-hover): Solid blue background + White icon + Tilt (-rotate-6) + Zoom (scale-110) + Glow Shadow */}
                <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#2a73ff] flex items-center justify-center mb-8 transition-all duration-300 ease-out group-hover:bg-[#2a73ff] group-hover:text-white group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  {item.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-2xl sm:text-[26px] font-bold text-[#0f172a] mb-8 tracking-tight group-hover:text-[#2a73ff] transition-colors duration-200">
                  {item.title}
                </h3>

                {/* The Difference Section */}
                <div className="mb-6">
                  <p className="text-[12px] font-extrabold text-[#2a73ff] uppercase tracking-widest mb-2">
                    THE DIFFERENCE
                  </p>
                  <p className="text-[#475569] text-base sm:text-[16.5px] leading-relaxed font-normal">
                    {item.difference}
                  </p>
                </div>
              </div>

              {/* How We Add Value Section */}
              <div className="pt-2">
                <p className="text-[12px] font-extrabold text-[#2a73ff] uppercase tracking-widest mb-2">
                  HOW WE ADD VALUE
                </p>
                <p className="text-[#334155] text-base sm:text-[16.5px] leading-relaxed font-medium">
                  {item.value}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;