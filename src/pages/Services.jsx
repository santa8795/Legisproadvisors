import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // 1. Hash read karne ke liye import

// 1. Local Asset Import (Apne assets folder ke hisaab se image filename check kar lijiye)
import servicesHeroBg from '../assets/hero-bg.jpg';

// Data structure containing all 3 major service categories and their cards
const servicesData = [
  {
    id: 'startup',
    categoryTitle: 'Startup & Growth',
    categoryDesc: 'Advisory for businesses building their foundation and preparing for scale',
    services: [
      {
        id: 'structuring',
        title: 'Entity Structuring & Formation',
        subtitle: 'Your First Step Towards Business Success',
        description:
          "Beginning your entrepreneurial journey with the right legal structure is crucial for your business's success and scalability.",
        list: [
          'Advisory on selection of appropriate business structure aligned with objectives',
          'Incorporation planning and execution across relevant entity types',
          'Drafting and review of constitutional documents',
          'Capital structuring and shareholding design considerations',
          'Structuring aligned with regulatory, operational, and investor requirements',
        ],
      },
      {
        id: 'agreements',
        title: 'Agreements & Contracts',
        subtitle: "Securing Your Business's Future",
        description:
          'Contracts form the backbone of your business, governing relationships with vendors, customers, and employees.',
        list: [
          'Shareholder agreements',
          'Founder agreement',
          'Employment agreement & NDA',
          'Internship agreement',
          'Freelance agreement',
          'Partnership agreement',
          'LLP agreement',
          'Vendor agreement',
          'Software agreement',
          'Joint Venture agreement',
          'NDA',
          'Vetting of legal documents',
        ],
      },
      {
        id: 'funding',
        title: 'Funding & Investment Support',
        subtitle: 'Navigating Your Path to Growth',
        description:
          "Fundraising is a pivotal moment in a startup's lifecycle. We guide startups through the complexities of securing investments.",
        list: [
          'Structuring of fundraising transactions aligned with business and investor expectations',
          'Drafting and review of investment documentation and term sheets',
          'Investor-readiness from a legal and governance perspective',
          'Regulatory compliance support for capital infusion',
          'End-to-end legal support across the investment lifecycle',
        ],
      },
      {
        id: 'posh',
        title: 'POSH Compliance',
        subtitle: 'Ensuring a Safe & Respectful Workplace',
        description:
          'Maintaining a safe and inclusive workplace is not just a legal requirement but a fundamental responsibility.',
        list: [
          'Drafting and implementation of POSH policies and frameworks',
          'Constitution and guidance on Internal Committee requirements',
          'Advisory on compliance obligations and reporting requirements',
          'Support in documentation and procedural alignment',
          'Ongoing advisory on workplace compliance and governance practices',
        ],
      },
      {
        id: 'registrations',
        title: 'Central & State Regulatory Registrations',
        subtitle: 'Simplifying Statutory Registrations & Compliance',
        description:
          'Obtaining timely registrations and maintaining statutory compliance is essential for smooth business operations.',
        list: [
          'Identification of applicable registrations and licensing requirements',
          'Advisory on sector-specific regulatory approvals',
          'Preparation and review of application documentation',
          'Representation and follow-up with relevant authorities',
          'Support aligned with operational and compliance requirements',
        ],
      },
      {
        id: 'esop',
        title: 'ESOP Advisory & Structuring',
        subtitle: 'Designing Effective Employee Ownership Frameworks',
        description:
          'Employee Stock Option Plans (ESOPs) are powerful tools for attracting, retaining, and rewarding key talent.',
        list: [
          'Structuring of ESOP schemes aligned with business strategy',
          'Drafting of ESOP policy, grant letters, and related documentation',
          'Advisory on vesting structures and employee participation',
          'Governance and compliance alignment under applicable laws',
          'Ongoing support for implementation and administration',
        ],
      },
      {
        id: 'demat',
        title: 'ISIN Procurement & Dematerialisation',
        subtitle: 'Ensuring Regulatory Compliance in Digital Securities',
        description:
          'With increasing regulatory emphasis on dematerialisation of securities, companies must align with SEBI and MCA mandates.',
        list: [
          'Advisory on dematerialisation requirements and process framework',
          'Coordination with depositories and intermediaries',
          'ISIN application and compliance support',
          'Alignment of corporate records with demat structure',
          'Ongoing support for demat-related compliance requirements',
        ],
      },
      {
        id: 'accounting',
        title: 'Accounting, Taxation & GST Advisory',
        subtitle: 'Integrated Financial & Indirect Tax Solutions',
        description:
          'Accurate financial management and proactive tax advisory are essential for sustainable business growth.',
        list: [
          'Advisory and coordination across accounting processes and frameworks',
          'Support on tax compliance and regulatory requirements',
          'Structuring aligned with financial reporting needs',
          'Review of documentation and filings',
          'Ongoing support for maintaining financial and tax discipline',
        ],
      },
    ],
  },
  {
    id: 'corporate',
    categoryTitle: 'Corporate & Regulatory',
    categoryDesc:
      'Advisory across ongoing compliance, governance, and regulatory matters that require structured and disciplined execution.',
    services: [
      {
        id: 'secretarial',
        title: 'Secretarial Audit',
        subtitle: 'Strengthening Compliance Through Structured Review',
        description:
          'Periodic evaluation of secretarial records ensures regulatory alignment and strengthens governance practices.',
        list: [
          'Conduct and support of secretarial audit processes',
          'Review of statutory records and corporate documentation',
          'Identification of compliance gaps and risk areas',
          'Advisory on corrective actions and governance improvements',
          'Alignment with Secretarial Standards and Companies Act requirements',
        ],
      },
      {
        id: 'roc',
        title: 'ROC Filings & Annual Compliance',
        subtitle: 'Ensuring Timely and Accurate Regulatory Filings',
        description:
          'Consistent compliance with ROC requirements is essential for maintaining corporate standing and avoiding penalties.',
        list: [
          'Preparation and filing of annual and event-based returns',
          'Maintenance and updating of statutory registers and records',
          'Drafting of board and shareholder documentation',
          'Compliance tracking aligned with statutory timelines',
          'Ongoing advisory on corporate compliance requirements',
        ],
      },
      {
        id: 'governance',
        title: 'Secretarial & Governance Advisory',
        subtitle: 'Building Strong Governance Frameworks',
        description:
          'Effective governance structures enhance accountability, transparency, and decision-making processes.',
        list: [
          'Advisory on governance structures and board processes',
          'Drafting and review of governance policies and frameworks',
          'Secretarial documentation aligned with regulatory standards',
          'Strengthening of internal governance mechanisms',
          'Ongoing support aligned with evolving business requirements',
        ],
      },
      {
        id: 'fema',
        title: 'FEMA Advisory',
        subtitle: 'Navigating Cross-Border Regulations with Clarity',
        description:
          'Foreign exchange regulations require careful interpretation and structured implementation.',
        list: [
          'Advisory on FEMA applicability across transactions',
          'Structuring of cross-border investments and transactions',
          'Review and preparation of regulatory documentation',
          'Compliance with reporting and filing requirements',
          'Ongoing support on foreign exchange regulatory matters',
        ],
      },
      {
        id: 'fdi',
        title: 'Foreign Direct Investment',
        subtitle: 'Enabling Structured Inbound Investment',
        description:
          'Inbound investments require alignment with sectoral regulations, structuring considerations, and reporting obligations.',
        list: [
          'Advisory on FDI framework, sectoral caps, and entry routes',
          'Structuring of investment transactions aligned with regulatory requirements',
          'Drafting and review of transaction-related documentation',
          'Compliance with pricing guidelines and reporting obligations',
          'Alignment with RBI and FEMA regulations for inbound investments',
        ],
      },
      {
        id: 'overseas',
        title: 'Overseas Investment',
        subtitle: 'Supporting Global Expansion Strategies',
        description:
          'Outbound investments require careful evaluation of regulatory conditions, structuring considerations, and ongoing compliance obligations.',
        list: [
          'Advisory on overseas investment regulations and eligibility conditions',
          'Structuring of outbound investment transactions',
          'Review and preparation of documentation for approvals and filings',
          'Compliance with reporting and disclosure requirements',
          'Alignment with applicable RBI guidelines for overseas investments',
        ],
      },
      {
        id: 'ecb',
        title: 'External Commercial Borrowing',
        subtitle: 'Facilitating Compliant Cross-Border Borrowings',
        description:
          'ECB transactions involve multiple regulatory parameters including eligibility, end-use, and reporting requirements.',
        list: [
          'Advisory on ECB framework, eligibility criteria, and permissible end-use',
          'Structuring of borrowing arrangements aligned with regulatory guidelines',
          'Review of loan documentation and transaction structure',
          'Compliance with reporting obligations and regulatory filings',
          'Alignment with RBI regulations governing external borrowings',
        ],
      },
      {
        id: 'rbi-reporting',
        title: 'RBI Reporting',
        subtitle: 'Ensuring Accuracy in Regulatory Reporting',
        description:
          'Regulatory reporting is a critical component of compliance in cross-border transactions and foreign exchange matters.',
        list: [
          'Preparation and review of RBI reporting forms and submissions',
          'Alignment with reporting timelines and regulatory requirements',
          'Review of underlying documentation supporting filings',
          'Advisory on reporting obligations across different transactions',
          'Ensuring consistency with FEMA and RBI compliance framework',
        ],
      },
      {
        id: 'labour',
        title: 'Labour Law Compliance',
        subtitle: 'Managing Employment Compliance with Discipline',
        description:
          'Labour law compliance requires continuous monitoring, documentation, and alignment with statutory obligations.',
        list: [
          'Advisory on applicability of labour laws based on business operations',
          'Structuring of compliance frameworks for employment-related regulations',
          'Review of employment documentation and statutory records',
          'Compliance with periodic filings and statutory obligations',
          'Alignment with regulatory requirements across labour law frameworks',
        ],
      },
      {
        id: 'tax',
        title: 'Income Tax & TDS Compliance',
        subtitle: 'Maintaining Tax Compliance with Confidence',
        description:
          'Tax and TDS compliance are critical for maintaining financial discipline and regulatory alignment.',
        list: [
          'Advisory on tax compliance framework and applicability',
          'Structuring of TDS processes aligned with regulatory requirements',
          'Review of filings, returns, and supporting documentation',
          'Alignment with statutory timelines and compliance obligations',
          'Ongoing advisory on tax-related regulatory requirements',
        ],
      },
    ],
  },
  {
    id: 'investor',
    categoryTitle: 'Investor & Institutional',
    categoryDesc:
      'Structured support for investors, incubators, accelerators, and institutions managing transactions, portfolio companies, and ecosystem programs.',
    services: [
      {
        id: 'program',
        title: 'End-to-End Program Management',
        subtitle: 'Structured Execution for Institutional Programs',
        description:
          'Startup and ecosystem programs require disciplined execution, compliance oversight, and multi-stakeholder coordination.',
        list: [
          'Structuring of program frameworks aligned with institutional objectives',
          'Design and implementation of operational and compliance processes',
          'Documentation frameworks across program lifecycle',
          'Alignment with regulatory and scheme-specific requirements',
          'Oversight mechanisms for effective program execution',
        ],
      },
      {
        id: 'agreements-inst',
        title: 'Transaction Agreements',
        subtitle: 'Ensuring Clarity in Investment Transactions',
        description:
          'Transaction documentation must align legal enforceability with commercial intent and stakeholder expectations.',
        list: [
          'Drafting and review of investment and transaction agreements',
          'Structuring of shareholder, subscription, and related documentation',
          'Alignment of contractual terms with deal structure and commercial understanding',
          'Review of rights, obligations, and protection mechanisms',
          'Documentation aligned with transaction-specific requirements',
        ],
      },
      {
        id: 'portfolio',
        title: 'Portfolio Management Advisory',
        subtitle: 'Supporting Institutional Oversight Across Investments',
        description:
          'Managing a portfolio requires structured oversight of compliance, governance, and legal positioning across entities.',
        list: [
          'Advisory on governance frameworks for portfolio companies',
          'Review of compliance status and regulatory positioning',
          'Alignment of documentation and legal structures across entities',
          'Identification of gaps in compliance and governance practices',
          'Support in strengthening portfolio-level oversight mechanisms',
        ],
      },
      {
        id: 'due-diligence',
        title: 'Due Diligence Support',
        subtitle: 'Preparing for Informed Investment Decisions',
        description:
          'Diligence requires a structured assessment of compliance, documentation, and governance readiness.',
        list: [
          'Preparation and organisation of data room documentation',
          'Review of legal, compliance, and governance records',
          'Identification of risks, gaps, and areas requiring attention',
          'Alignment of findings with transaction considerations',
          'Support across diligence processes from a legal and compliance perspective',
        ],
      },
      {
        id: 'oversight',
        title: 'Portfolio Company Compliance Oversight',
        subtitle: 'Enabling Visibility Across Portfolio Entities',
        description:
          'Institutional stakeholders require structured insight into compliance performance across their investments.',
        list: [
          'Design of compliance tracking and monitoring frameworks',
          'Review of statutory and governance documentation',
          'Identification of compliance gaps and risk areas',
          'Alignment of reporting mechanisms across entities',
          'Strengthening of oversight and monitoring structures',
        ],
      },
      {
        id: 'exit',
        title: 'Exit Strategy Advisory',
        subtitle: 'Preparing for Strategic Exit Events',
        description:
          'Exit transactions require structured planning, regulatory preparedness, and alignment among stakeholders.',
        list: [
          'Advisory on exit structuring and transaction approach',
          'Review of documentation and readiness for exit events',
          'Alignment with regulatory and compliance requirements',
          'Identification of key considerations impacting exit outcomes',
          'Support across execution of exit transactions',
        ],
      },
      {
        id: 'workshops',
        title: 'Capacity Building Workshops',
        subtitle: 'Building Knowledge That Drives Better Execution',
        description:
          'Knowledge-led interventions enhance compliance awareness and governance capabilities across organisations.',
        list: [
          'Design and delivery of workshops on compliance and governance',
          'Sessions on investment readiness and regulatory frameworks',
          'Training on documentation, structuring, and transaction processes',
          'Customised programs aligned with stakeholder requirements',
          'Practical and implementation-focused knowledge sessions',
        ],
      },
      {
        id: 'virtual-data-room',
        title: 'Virtual Data Room Advisory',
        subtitle: 'Enabling Structured and Secure Information Management',
        description:
          'A well-organised virtual data room is critical for ensuring transparency, efficiency, and confidence during due diligence and financial transactions.',
        list: [
          'Structuring of data room architecture aligned with transaction or diligence requirements',
          'Identification and organisation of key legal, financial, and compliance documentation',
          'Review of documents for completeness, consistency, and readiness',
          'Categorisation and indexing aligned with investor and stakeholder expectations',
          'Access control framework and information-sharing protocols',
          'Alignment of data room with diligence, fundraising, and transaction workflows',
        ],
      },
    ],
  },
];

const Services = () => {
  const [openCards, setOpenCards] = useState({});
  const [highlightedId, setHighlightedId] = useState(null); // Highlight state
  const location = useLocation();

  // 2. Hash Change pe Auto-Scroll aur Highlight Animation Logic
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Thoda delay taaki page render aur DOM paint finish ho jaye
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Card ko auto-expand bhi kar do (services list khul jayegi)
          setOpenCards((prev) => ({ ...prev, [id]: true }));
          
          // Highlight ON karo
          setHighlightedId(id);

          // 3.5 seconds ke baad highlight glow automatically hata do
          const timer = setTimeout(() => {
            setHighlightedId(null);
          }, 3500);

          return () => clearTimeout(timer);
        }, 150);
      }
    }
  }, [location]);

  const toggleCard = (cardId) => {
    setOpenCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <main className="bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#2a73ff] selection:text-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative bg-[#0B0F19] text-white py-24 md:py-32 px-6 text-center border-b border-slate-800 bg-cover bg-center bg-no-repeat shadow-inner"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.8), rgba(11, 15, 25, 0.8)), url(${servicesHeroBg})`,
        }}
      >
        <div className="relative max-w-[1000px] mx-auto z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-[750px] mx-auto font-normal leading-relaxed opacity-90 animate-fade-up">
            Supporting businesses, startups, investors, and institutions with practical, implementation-focused solutions across their lifecycle.
          </p>
        </div>
      </section>

      {/* 2. DETAILED SERVICES GROUPS */}
      <div className="py-16 md:py-24 px-6 max-w-[1300px] mx-auto space-y-24 md:space-y-32">
        {servicesData.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-28">
            
            {/* Category Header */}
            <header className="mb-12 md:mb-14 border-b border-slate-200/80 pb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-2.5">
                {group.categoryTitle}
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-medium">
                {group.categoryDesc}
              </p>
            </header>

            {/* Services Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 items-start">
              {group.services.map((service) => {
                const isOpen = !!openCards[service.id];
                const isHighlighted = highlightedId === service.id; // Check agar ye target service hai

                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className={`bg-white rounded-2xl p-8 sm:p-10 border transition-all duration-500 flex flex-col justify-between scroll-mt-32 h-fit group relative ${
                      isHighlighted
                        ? 'shadow-[0_0_35px_rgba(42,115,255,0.4)] border-[#2a73ff] ring-4 ring-[#2a73ff]/30 scale-[1.02] bg-blue-50/10' // HIGHLIGHT STYLING
                        : isOpen
                        ? 'shadow-[0_20px_40px_-15px_rgba(42,115,255,0.12)] border-[#2a73ff]/40 ring-1 ring-[#2a73ff]/20'
                        : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] border-slate-200/80 hover:border-slate-300 hover:-translate-y-1.5'
                    }`}
                  >
                    {/* FOCUSED SERVICE BADGE ON HIGHLIGHT */}
                    {isHighlighted && (
                      <div className="absolute -top-3 right-6 bg-[#2a73ff] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md animate-pulse">
                        ⭐ Selected Service
                      </div>
                    )}

                    <div>
                      {/* Service Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] group-hover:text-[#2a73ff] transition-colors mb-2 leading-snug">
                        {service.title}
                      </h3>
                      
                      {/* Service Subtitle */}
                      <p className="text-xs sm:text-sm font-bold text-[#2a73ff] uppercase tracking-wider mb-4">
                        {service.subtitle}
                      </p>
                      
                      {/* Service Description */}
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                        {service.description}
                      </p>
                    </div>

                    {/* Interactive Expand / Collapse Area */}
                    <div className="pt-5 border-t border-slate-100 mt-auto">
                      <button
                        type="button"
                        onClick={() => toggleCard(service.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between py-2 text-sm sm:text-base font-bold text-[#0F172A] hover:text-[#2a73ff] transition-colors focus:outline-none cursor-pointer group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <span>Services Include</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover/btn:bg-blue-50 group-hover/btn:text-[#2a73ff] transition-colors">
                            {service.list.length}
                          </span>
                        </span>
                        
                        {/* Chevron Icon */}
                        <span className={`transform transition-transform duration-300 p-1 rounded-full ${isOpen ? 'rotate-180 bg-blue-50 text-[#2a73ff]' : 'text-slate-400 group-hover/btn:text-[#2a73ff]'}`}>
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>

                      {/* Accordion Expansion */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-3 border-t border-dashed border-slate-100">
                              <ul className="space-y-3 pl-5 list-disc marker:text-[#2a73ff] text-sm sm:text-base text-slate-600 pb-2">
                                {service.list.map((item, idx) => (
                                  <li key={idx} className="leading-relaxed pl-1">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </article>
                );
              })}
            </div>

          </section>
        ))}
      </div>

      {/* 3. FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/918368383581"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20b858] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </main>
  );
};

export default Services;