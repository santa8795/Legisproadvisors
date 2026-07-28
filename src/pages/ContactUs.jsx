import React, { useState } from 'react';

// 1. Local Asset Import (Apne assets folder ke hisaab se image filename check kar lijiye)
import contactHeroBg from '../assets/premium-contact-hero-final.png';

const ContactUs = () => {
  // Form State Management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future me yahan aap backend API call add kar sakte hain (e.g., fetch/axios)
    console.log('Form Submitted:', formData);
    
    // Success feedback
    setStatus({
      type: 'success',
      message: 'Thank you! Your query has been submitted successfully. Our team will get back to you soon.',
    });

    // Reset form after submit
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
  };

  return (
    <div className="bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#2a73ff] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[35vh] min-h-[250px] flex items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat shadow-inner bg-[#0B0F19]"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.75), rgba(11, 15, 25, 0.75)), url(${contactHeroBg})`,
        }}
      >
        <div className="max-w-[1440px] mx-auto text-white w-full">
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight mb-4 animate-fade-up">
            Reach Us
          </h1>
          <p className="text-base sm:text-lg md:text-[1.15rem] text-slate-200 max-w-[600px] mx-auto font-normal leading-relaxed opacity-90 animate-fade-up">
            Expert legal guidance is just a message away. Connect with our advisors today.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Layout Grid: Reversed on mobile, 2-columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Contact Information */}
            <div className="pt-2">
              <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#111827] mb-3 tracking-tight">
                Contact Information
              </h2>
              <p className="text-[#6B7280] text-base mb-10 leading-relaxed max-w-[90%]">
                Our team is available to assist you with your legal inquiries.
              </p>

              {/* Info Cards Container */}
              <div className="flex flex-col gap-6">
                
                {/* Card 1: Office Address */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-[#3B82F6] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#F0F7FF] text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                      Office Address
                    </h3>
                    <p className="text-base text-[#475569] m-0">
                      Paschim Vihar, New Delhi, India
                    </p>
                  </div>
                </div>

                {/* Card 2: Email Us */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-[#3B82F6] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#F0F7FF] text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@legisproadvisors.com"
                      className="text-base text-[#475569] hover:text-[#3B82F6] transition-colors m-0 block font-medium"
                    >
                      info@legisproadvisors.com
                    </a>
                  </div>
                </div>

                {/* Card 3: Call Us */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-[#3B82F6] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#F0F7FF] text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                      Call Us
                    </h3>
                    <a
                      href="tel:+918368383581"
                      className="text-base text-[#475569] hover:text-[#3B82F6] transition-colors m-0 block font-medium"
                    >
                      +91 8368383581
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Query Form */}
            <div className="bg-white border border-[#F3F4F6] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] rounded-2xl p-6 sm:p-10 lg:p-12">
              <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#111827] mb-8 tracking-tight">
                Send us a Query
              </h2>

              {/* Status Alert Messages */}
              {status.message && (
                <div
                  className={`p-4 rounded-lg mb-6 text-sm font-medium border ${
                    status.type === 'success'
                      ? 'bg-[#DEF7EC] text-[#03543F] border-[#31C48D]'
                      : 'bg-[#FDF2F2] text-[#9B1C1C] border-[#F98080]'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-[#374151]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-base text-[#111827] bg-white focus:outline-none focus:border-[#3B82F6] focus:ring-3 focus:ring-[#3B82F6]/15 transition-all"
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-[#374151]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-base text-[#111827] bg-white focus:outline-none focus:border-[#3B82F6] focus:ring-3 focus:ring-[#3B82F6]/15 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-[#374151]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-base text-[#111827] bg-white focus:outline-none focus:border-[#3B82F6] focus:ring-3 focus:ring-[#3B82F6]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-sm font-semibold text-[#374151]">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-base text-[#111827] bg-white focus:outline-none focus:border-[#3B82F6] focus:ring-3 focus:ring-[#3B82F6]/15 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-[#374151]">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your requirements..."
                    required
                    className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-base text-[#111827] bg-white focus:outline-none focus:border-[#3B82F6] focus:ring-3 focus:ring-[#3B82F6]/15 transition-all resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg text-base shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] cursor-pointer mt-2"
                >
                  Submit Inquiry
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/918368383581"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20b858] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
};

export default ContactUs;