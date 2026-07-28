import React from 'react';

// Clients Data Array
const clientsData = [
  {
    id: 1,
    number: '01',
    title: 'Startups',
  },
  {
    id: 2,
    number: '02',
    title: 'Incubators & Accelerators',
  },
  {
    id: 3,
    number: '03',
    title: 'Founders',
  },
  {
    id: 4,
    number: '04',
    title: 'Investors',
  },
];

function Clients() {
  return (
    <section className="py-20 md:py-28 bg-white font-sans overflow-hidden border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Who We Work With
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-[#2a73ff] tracking-wide uppercase">
            Supporting diverse stakeholders across the ecosystem
          </p>
        </div>

        {/* 4-Column Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {clientsData.map((client) => (
            <div 
              key={client.id}
              className="group relative bg-[#f8fafc] rounded-2xl p-8 sm:p-10 border border-gray-100/80 transition-all duration-300 ease-out hover:-translate-y-2.5 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(42,115,255,0.18)] hover:border-blue-100 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] overflow-hidden cursor-pointer"
            >
              
              {/* Top Section: Number & Arrow Icon */}
              <div className="flex items-start justify-between">
                {/* Animated Number */}
                <span className="text-4xl sm:text-5xl font-extrabold text-gray-300 group-hover:text-[#2a73ff] transition-all duration-300 transform group-hover:scale-110 inline-block origin-top-left">
                  {client.number}
                </span>

                {/* Subtle Arrow Icon (Appears on hover) */}
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#2a73ff]">
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Bottom Section: Client Title */}
              <div className="mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#1e293b] transition-colors leading-snug">
                  {client.title}
                </h3>
              </div>

              {/* Hover Animated Bottom Border Accent Line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#2a73ff] to-[#60a5fa] transition-all duration-300 group-hover:w-full"></div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Clients;