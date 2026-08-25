import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  UserPlus, 
  SlidersHorizontal,
  Flame,
  Layers
} from 'lucide-react';

interface TwoSidedSectionProps {
  onExploreProjects: () => void;
  onCreateProject: () => void;
}

export const TwoSidedSection: React.FC<TwoSidedSectionProps> = ({
  onExploreProjects,
  onCreateProject,
}) => {
  const studentFeatures = [
    'Explore curated projects by skill & difficulty',
    'Personalized match breakdown & recommendations',
    'Find complementary teammates with matching schedules',
    'Apply directly to open technical & design roles',
    'Build verified project portfolio and references',
    'Join research groups, hackathons & funded startups'
  ];

  const leaderFeatures = [
    'Create structured projects with clear milestones',
    'Define granular job roles & required competencies',
    'Set minimum & preferred experience criteria',
    'AI-powered candidate discovery & suitability scores',
    'Compare candidates side-by-side on skill matrices',
    'Directly invite candidates or hire verified teammates'
  ];

  return (
    <section className="py-20 bg-[#080D16] relative">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FF5A1F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#FF5A1F]/40 text-xs font-semibold text-[#FF7A3D] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Two-Sided Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built for <span className="text-[#FF5A1F]">Students</span> & <span className="text-[#FF5A1F]">Project Leaders</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A7B0C0]">
            Whether you want to contribute your technical skills or assemble the ultimate team for your breakthrough idea.
          </p>
        </div>

        {/* Two Large Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Card: For Students */}
          <div 
            id="two-sided-card-students"
            className="group relative bg-[#151E2E]/90 border-2 border-[#1F293D] hover:border-[#FF5A1F] rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:shadow-[#FF5A1F]/15 flex flex-col justify-between backdrop-blur-xl"
          >
            {/* Ambient top right glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5A1F]/10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF5A1F] shadow-lg shadow-[#FF5A1F]/10">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#111827] border border-[#FF5A1F]/30 text-[#FF7A3D]">
                  For Students & Specialists
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-[#FF7A3D] transition-colors">
                Find Projects You’ll Love
              </h3>
              <p className="text-sm sm:text-base text-[#A7B0C0] mb-8 leading-relaxed">
                Discover projects that match your interests, skills and career goals. Collaborate with passionate peers and build demonstrable real-world experience.
              </p>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                {studentFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              id="two-sided-explore-btn"
              onClick={onExploreProjects}
              className="w-full py-4 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-[#FF5A1F]/25 hover:shadow-[#FF5A1F]/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Card: For Project Leaders */}
          <div 
            id="two-sided-card-leaders"
            className="group relative bg-[#151E2E]/90 border-2 border-[#1F293D] hover:border-[#FF5A1F] rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:shadow-[#FF5A1F]/15 flex flex-col justify-between backdrop-blur-xl"
          >
            {/* Ambient top right glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF7A3D] shadow-lg shadow-[#FF5A1F]/10">
                  <Briefcase className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#111827] border border-[#FF5A1F]/30 text-[#FF7A3D]">
                  For Project Leaders & Labs
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-[#FF7A3D] transition-colors">
                Build Your Dream Team
              </h3>
              <p className="text-sm sm:text-base text-[#A7B0C0] mb-8 leading-relaxed">
                Define the roles your project needs and find people with the right skills and experience. Streamline interviews, matching, and team assembly.
              </p>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                {leaderFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A3D]" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              id="two-sided-create-project-btn"
              onClick={onCreateProject}
              className="w-full py-4 rounded-xl bg-[#111827] hover:bg-[#151E2E] border-2 border-[#FF5A1F] text-white hover:text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-md hover:shadow-[#FF5A1F]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create a Project</span>
              <ArrowRight className="w-4 h-4 text-[#FF5A1F]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
