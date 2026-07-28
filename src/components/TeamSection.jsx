import React, { useState, useEffect } from 'react';
import { getEmployees } from '../api/api';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getEmployees();
        
        // Fix: Asli array response.data me hai. Agar response direct array hai toh usko use karo, warna response.data ko extract karo
        const membersArray = Array.isArray(response) ? response : (response?.data || []);
        
        setTeamMembers(membersArray);
      } catch (err) {
        console.error("Failed to load team members from API:", err);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="team">
      
      {/* Left-aligned Section Header */}
      <div className="text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight">
          Meet Our Team
        </h2>
        <p className="mt-2 text-base md:text-lg text-slate-500 font-medium">
          A team committed to structured and dependable advisory
        </p>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">
          Loading team members...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 font-medium">
          {error}
        </div>
      ) : !Array.isArray(teamMembers) || teamMembers.length === 0 ? (
        <div className="text-center py-12 text-slate-500 font-medium">
          No team members found.
        </div>
      ) : (
        /* Team Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            // Backend keys ko frontend se map kiya hai
            const memberName = member.name || "Unknown Member";
            const memberRole = member.position || member.role || "";
            const memberImage = member.image || 'https://via.placeholder.com/150';
            const memberLinkedin = member.linkedinProfileLink || member.linkedin;
            const memberDesc = member.description || "";
            const memberQual = member.qualification || "";

            return (
              <div
                key={member._id || index}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Circular Avatar Image */}
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-5 border-4 border-slate-50 shadow-inner flex-shrink-0 bg-slate-100">
                  <img
                    src={memberImage}
                    alt={memberName}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Member Info */}
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#2a73ff] transition-colors">
                        {memberName}
                      </h3>
                      {memberLinkedin && memberLinkedin !== '#' && (
                        <a
                          href={memberLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-[#0077b5] transition-colors"
                          aria-label={`LinkedIn profile of ${memberName}`}
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    <p className="text-xs md:text-sm font-semibold text-[#2a73ff] mb-1">
                      {memberRole}
                    </p>
                    {memberQual && (
                      <p className="text-[11px] text-slate-400 font-medium mb-3">
                        {memberQual}
                      </p>
                    )}
                  </div>

                  {memberDesc && (
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed border-t border-gray-100 pt-3 mt-3">
                      {memberDesc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TeamSection;