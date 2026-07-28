import React, { useState, useEffect } from 'react';

function AnimatedGraphic() {
  const [scene, setScene] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Progress Bar Animation (20 Seconds Total Duration)
    const startTime = Date.now();
    const totalDuration = 20000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
    }, 50);

    // 2. Scene Timeline Controller (Same timing as the original code)
    const t1 = setTimeout(() => setScene(2), 4500);  // Scene 2 at 4.5s
    const t2 = setTimeout(() => setScene(3), 8500);  // Scene 3 at 8.5s
    const t3 = setTimeout(() => setScene(4), 12500); // Scene 4 at 12.5s
    const t4 = setTimeout(() => setScene(5), 17000); // Scene 5 at 17.0s
    const t5 = setTimeout(() => {
      setScene(1);                                   // Loop restart at 20s
      setProgress(0);
    }, 20000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [scene]);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#f4f8fc] rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(42,115,255,0.18)] border border-blue-100/80 select-none font-sans flex items-center justify-center">
      
      {/* Soft Light Gradient Wash Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(180,215,255,0.30)_0%,transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(100,160,230,0.12)_0%,transparent_50%)] pointer-events-none"></div>

      {/* 4 Corner Accent Brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#4472c4]/40"></div>
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#4472c4]/40"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#4472c4]/40"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#4472c4]/40"></div>

      {/* Blue Accent Bottom Divider Line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-[1px] bg-gradient-to-r from-transparent via-[#4472c4] to-transparent opacity-70 transition-all duration-1000"></div>

      {/* ── SCENE 1: Navigating Complexity ── */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${scene === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-[#0d1e3a] text-xl sm:text-2xl md:text-3xl font-light tracking-[0.14em] uppercase text-center">
          Navigating Complexity.
        </p>
        <p className="text-[#0d1e3a] text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.14em] uppercase text-center mt-2">
          Enabling <span className="text-[#2b5faa] font-medium">Growth.</span>
        </p>
      </div>

      {/* ── SCENE 2: Legal. Compliance. Strategy. ── */}
      <div className={`absolute inset-0 flex items-center justify-center gap-4 sm:gap-8 transition-all duration-700 transform ${scene === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <span className="text-[#1a3560] text-sm sm:text-lg md:text-xl font-light tracking-[0.28em] uppercase">Legal</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#4472c4]"></span>
        <span className="text-[#1a3560] text-sm sm:text-lg md:text-xl font-light tracking-[0.28em] uppercase">Compliance</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#4472c4]"></span>
        <span className="text-[#1a3560] text-sm sm:text-lg md:text-xl font-light tracking-[0.28em] uppercase">Strategy</span>
      </div>

      {/* ── SCENE 3: Built for Startups ── */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${scene === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-[#0d1e3a] text-xl sm:text-2xl md:text-3xl font-light tracking-[0.14em] uppercase text-center">
          Built for <span className="text-[#2b5faa] font-medium">Startups.</span>
        </p>
        <p className="text-[#0d1e3a] text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.14em] uppercase text-center mt-1">
          Trusted by Founders.
        </p>
        <span className="mt-4 text-[10px] sm:text-xs tracking-[0.45em] text-[#4472c4] font-medium uppercase">
          Where Governance Meets Growth
        </span>
      </div>

      {/* ── SCENE 4: Firm Name ── */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${scene === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <h3 className="text-[#0d1e3a] text-xl sm:text-2xl md:text-3xl font-light tracking-[0.44em] uppercase text-center ml-[0.44em]">
          LEGISPRO ADVISORS
        </h3>
        <div className="w-32 sm:w-48 h-[1px] bg-gradient-to-r from-transparent via-[#4472c4] to-transparent my-4"></div>
        <p className="text-[#4472c4] text-[9px] sm:text-[11px] font-medium tracking-[0.6em] uppercase text-center ml-[0.6em]">
          Legal &bull; Compliance &bull; Strategy
        </p>
      </div>

      {/* ── SCENE 5: Your Compliance Partner ── */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${scene === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-[#0d1e3a] text-lg sm:text-xl md:text-2xl font-light tracking-[0.44em] uppercase text-center ml-[0.44em]">
          Your Compliance Partner
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 height-[2px] h-0.5 bg-gradient-to-r from-[#aaccf4] via-[#4472c4] to-[#aaccf4] opacity-80 transition-all duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>

    </div>
  );
}

export default AnimatedGraphic;