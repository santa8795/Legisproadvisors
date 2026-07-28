import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const megaMenuColumns = [
  {
    title: 'STARTUP & GROWTH',
    link: '/services#startup',
    items: [
      { name: 'Entity Structuring & Formation', href: '/services#structuring' },
      { name: 'Agreements & Contracts', href: '/services#agreements' },
      { name: 'Funding & Investment Support', href: '/services#funding' },
      { name: 'POSH Compliance', href: '/services#posh' },
      { name: 'Central & State Regulatory Registrations', href: '/services#registrations' },
      { name: 'ESOP Advisory & Structuring', href: '/services#esop' },
      { name: 'ISIN Procurement & Dematerialisation', href: '/services#demat' },
      { name: 'Accounting, Taxation & GST Advisory', href: '/services#accounting' },
    ],
  },
  {
    title: 'CORPORATE & REGULATORY',
    link: '/services#corporate',
    items: [
      { name: 'Secretarial Audit', href: '/services#secretarial' },
      { name: 'ROC Filings & Annual Compliance', href: '/services#roc' },
      { name: 'Secretarial & Governance Advisory', href: '/services#governance' },
      { name: 'FEMA Advisory', href: '/services#fema' },
      { name: 'Foreign Direct Investment (FDI)', href: '/services#fdi' },
      { name: 'Overseas Investment', href: '/services#overseas' },
      { name: 'External Commercial Borrowing (ECB)', href: '/services#ecb' },
      { name: 'RBI Reporting', href: '/services#rbi-reporting' },
      { name: 'Labour Law Compliance', href: '/services#labour' },
      { name: 'Income Tax & TDS Compliance', href: '/services#tax' },
    ],
  },
  {
    title: 'INVESTOR & INSTITUTIONAL',
    link: '/services#investor',
    items: [
      { name: 'End-to-End Program Management', href: '/services#program' },
      { name: 'Transaction Agreements', href: '/services#agreements-inst' },
      { name: 'Portfolio Management Advisory', href: '/services#portfolio' },
      { name: 'Due Diligence Support', href: '/services#due-diligence' },
      { name: 'Portfolio Company Compliance Oversight', href: '/services#oversight' },
      { name: 'Exit Strategy Advisory', href: '/services#exit' },
      { name: 'Capacity Building Workshops', href: '/services#workshops' },
      { name: 'Virtual Data Room Advisory', href: '/services#virtual-data-room' },
    ],
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Smooth hash navigation helper for both mobile and desktop
  const handleHashClick = (e, targetHref) => {
    setIsOpen(false);
    if (window.location.pathname === '/services') {
      const id = targetHref.split('#')[1];
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sticky top-0 z-50 font-sans transition-all duration-300 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" src={logo} alt="Legispro Logo" />
              <div className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center">
                <span className="text-[#0f172a]">LEGISPRO&nbsp;</span>
                <span className="text-[#2a73ff]">ADVISORS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[15px] font-semibold text-[#1f2937] tracking-wider">
            <Link to="/" className="relative py-2 group hover:text-[#2a73ff] transition-colors duration-200">
              <span>HOME</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2a73ff] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>

            <Link to="/about" className="relative py-2 group hover:text-[#2a73ff] transition-colors duration-200">
              <span>ABOUT US</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2a73ff] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>
            
            {/* Services Dropdown */}
            <div className="group py-2 cursor-pointer static">
              <div className="relative flex items-center gap-1 hover:text-[#2a73ff] transition-colors duration-200">
                <Link to="/services">SERVICES</Link>
                <svg className="w-4 h-4 stroke-current transition-transform duration-300 ease-out group-hover:rotate-180 opacity-70" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2a73ff] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </div>
              
              {/* Mega Menu Card */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[1150px] max-w-[96vw] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-6 sm:p-8 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                <div className="grid grid-cols-3 gap-6">
                  {megaMenuColumns.map((col, idx) => (
                    <div key={idx} className="bg-slate-50/80 hover:bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-100/80 transition-colors duration-300 flex flex-col justify-between">
                      <div>
                        <Link 
                          to={col.link}
                          onClick={(e) => handleHashClick(e, col.link)}
                          className="text-xs font-extrabold text-[#0f172a] tracking-wider uppercase mb-4 block hover:text-[#2a73ff] transition-colors border-b border-slate-200/60 pb-2.5"
                        >
                          {col.title}
                        </Link>

                        <ul className="space-y-2.5">
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              {/* Changed from <a> to <Link> for React Router reactivity */}
                              <Link 
                                to={item.href}
                                onClick={(e) => handleHashClick(e, item.href)}
                                className="text-slate-600 hover:text-[#2a73ff] hover:translate-x-1.5 block py-1 text-[13.5px] font-medium transition-all duration-200 leading-snug"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium px-2">
                  <span>Need tailored legal or compliance structuring?</span>
                  <Link to="/contact" className="text-[#2a73ff] font-bold hover:underline flex items-center gap-1">
                    <span>Speak with our senior advisors</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/resources" className="relative py-2 group hover:text-[#2a73ff] transition-colors duration-200">
              <span>RESOURCES</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2a73ff] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>

            <Link to="/contact" className="relative py-2 group hover:text-[#2a73ff] transition-colors duration-200">
              <span>CONTACT US</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#2a73ff] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>

          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link to="/contact" className="bg-[#3378ff] hover:bg-[#1f62e6] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-[14px] active:scale-95 transform hover:-translate-y-0.5">
              Book Consultation
            </Link>
          </div>

          {/* Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-[#2a73ff] focus:outline-none p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors" aria-label="Toggle Menu">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pt-4 pb-6 space-y-3 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-800 font-semibold hover:text-[#2a73ff] py-2.5 text-base border-b border-slate-50">HOME</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-800 font-semibold hover:text-[#2a73ff] py-2.5 text-base border-b border-slate-50">ABOUT US</Link>
          
          <div className="border-b border-slate-50 pb-2">
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex items-center justify-between text-gray-800 font-semibold hover:text-[#2a73ff] py-2.5 text-base text-left focus:outline-none">
              <span>SERVICES</span>
              <svg className={`w-4 h-4 transform transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-[#2a73ff]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div className="pl-3 mt-2 space-y-4 border-l-2 border-[#2a73ff]/30 py-2">
                {megaMenuColumns.map((col, idx) => (
                  <div key={idx} className="space-y-2">
                    <Link to={col.link} onClick={(e) => handleHashClick(e, col.link)} className="text-xs font-bold text-[#2a73ff] tracking-wider uppercase block">{col.title}</Link>
                    <div className="pl-2 space-y-1.5">
                      {col.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.href}
                          onClick={(e) => handleHashClick(e, item.href)}
                          className="block text-sm text-slate-600 hover:text-[#2a73ff] py-1"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/resources" onClick={() => setIsOpen(false)} className="block text-gray-800 font-semibold hover:text-[#2a73ff] py-2.5 text-base border-b border-slate-50">RESOURCES</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-800 font-semibold hover:text-[#2a73ff] py-2.5 text-base">CONTACT US</Link>

          <div className="pt-4">
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-center bg-[#3378ff] hover:bg-[#1f62e6] text-white font-semibold px-6 py-3.5 rounded-lg shadow-md text-base transition-all">
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;