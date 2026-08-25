import React from 'react';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  CheckCircle, 
  Users, 
  BrainCircuit, 
  Award,
  Zap,
  TrendingUp,
  FolderGit2
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onFindTalent: () => void;
  onSelectProjectPreview?: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onFindTalent,
  onSelectProjectPreview
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 min-h-[90vh] flex flex-col justify-center items-center">
      {/* Dark Blurred Workspace Background Layer */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* Workspace Desk Ambient Image Simulation */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-xl scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&auto=format&fit=crop&q=80')`
          }}
        />
        {/* Additional desk ambiance glow overlay */}
        <div className="absolute inset-0 bg-radial from-[#FF5A1F]/10 via-[#080D16]/90 to-[#080D16]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF5A1F]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Texture Overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#FF5A1F 0.75px, transparent 0.75px), radial-gradient(#1F293D 0.75px, #080D16 0.75px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151E2E]/90 border border-[#FF5A1F]/70 text-[#FF7A3D] text-xs sm:text-sm font-semibold mb-8 shadow-lg shadow-[#FF5A1F]/15 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#FF5A1F] animate-pulse" />
          <span>AI-Powered Project & Team Matching Platform</span>
        </div>

        {/* Hero Large Centered Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Find the Right <span className="text-[#FF5A1F] inline-block drop-shadow-[0_0_25px_rgba(255,90,31,0.4)]">Project.</span>
          <br className="hidden sm:inline" />
          {' '}Find the Right <span className="text-[#FF5A1F] inline-block drop-shadow-[0_0_25px_rgba(255,90,31,0.4)]">People.</span>
        </h1>

        {/* Subtitle description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#A7B0C0] font-normal leading-relaxed mb-10">
          ProjectMatch connects students and professionals with exciting projects and the right teammates based on skills, interests, experience and availability.
        </p>

        {/* Two Main Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            id="hero-explore-projects-btn"
            onClick={onExploreProjects}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-base font-bold transition-all duration-200 shadow-xl shadow-[#FF5A1F]/30 hover:shadow-[#FF5A1F]/50 hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="hero-find-talent-btn"
            onClick={onFindTalent}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#151E2E]/80 hover:bg-[#151E2E] border-2 border-[#FF5A1F] text-white hover:text-white text-base font-bold transition-all duration-200 shadow-lg hover:shadow-[#FF5A1F]/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Users className="w-5 h-5 text-[#FF5A1F]" />
            <span>Find Talent</span>
          </button>
        </div>

        {/* Floating Hero Decorative Cards */}
        <div className="relative w-full max-w-4xl mx-auto mt-4 hidden md:block">
          
          {/* Left Floating Card - Student Persona */}
          <div className="absolute -left-12 -top-16 w-76 bg-[#151E2E]/90 border border-[#FF5A1F]/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-float-slow text-left text-white z-10 transition-all hover:scale-105">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Alex"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FF5A1F]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">Alex</h4>
                  <span className="bg-[#22C55E]/20 text-[#22C55E] text-[10px] px-1.5 py-0.5 rounded font-bold">Online</span>
                </div>
                <p className="text-xs text-[#A7B0C0]">Computer Science Student</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 my-3">
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#111827] text-white border border-[#1F293D]">Python</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#111827] text-white border border-[#1F293D]">Java</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#111827] text-white border border-[#1F293D]">React</span>
            </div>

            <div className="pt-2 border-t border-[#1F293D] flex items-center justify-between">
              <span className="text-xs text-[#A7B0C0]">Project Compatibility</span>
              <span className="text-xs font-bold text-[#FF5A1F] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-[#FF5A1F]" />
                94% Match
              </span>
            </div>
          </div>

          {/* Right Floating Card - Project Card */}
          <div className="absolute -right-12 -top-12 w-80 bg-[#151E2E]/90 border border-[#FF5A1F]/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-float-reverse text-left text-white z-10 transition-all hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF7A3D]">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF7A3D]">Featured Project</span>
                  <h4 className="font-bold text-sm text-white">AI Healthcare Assistant</h4>
                </div>
              </div>
              <span className="bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                Recruiting
              </span>
            </div>

            <div className="mt-3 bg-[#111827]/70 rounded-lg p-2 border border-[#1F293D]">
              <p className="text-[11px] text-[#A7B0C0] mb-1.5 font-medium">Looking for:</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5A1F]/15 text-[#FF7A3D] font-semibold border border-[#FF5A1F]/30">
                  ML Engineer
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5A1F]/15 text-[#FF7A3D] font-semibold border border-[#FF5A1F]/30">
                  UI/UX Designer
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#A7B0C0]">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#FF5A1F]" />
                4 / 5 Members
              </span>
              <span className="text-[#FF7A3D] font-semibold hover:underline cursor-pointer">
                View Project →
              </span>
            </div>
          </div>
        </div>

        {/* Platform Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-24 pt-8 border-t border-[#1F293D]/80 text-left">
          <div className="p-4 rounded-xl bg-[#111827]/60 border border-[#1F293D]">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">1,400+</div>
            <div className="text-xs text-[#A7B0C0] mt-0.5">Active Discovery Projects</div>
          </div>
          <div className="p-4 rounded-xl bg-[#111827]/60 border border-[#1F293D]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FF5A1F]">96.4%</div>
            <div className="text-xs text-[#A7B0C0] mt-0.5">Skill Match Accuracy</div>
          </div>
          <div className="p-4 rounded-xl bg-[#111827]/60 border border-[#1F293D]">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">8,200+</div>
            <div className="text-xs text-[#A7B0C0] mt-0.5">Students & Specialists</div>
          </div>
          <div className="p-4 rounded-xl bg-[#111827]/60 border border-[#1F293D]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#22C55E]">380+</div>
            <div className="text-xs text-[#A7B0C0] mt-0.5">Formed & Shipped Teams</div>
          </div>
        </div>

      </div>
    </section>
  );
};
