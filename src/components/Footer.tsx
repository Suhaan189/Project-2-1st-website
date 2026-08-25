import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#080D16] border-t border-[#1F293D] text-[#A7B0C0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3D] flex items-center justify-center shadow-lg shadow-[#FF5A1F]/25 text-white">
                <span className="font-extrabold text-xl tracking-tight">PM</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                PROJECT<span className="text-[#FF5A1F]">MATCH</span>
              </span>
            </div>

            <p className="text-sm max-w-md text-[#A7B0C0] leading-relaxed">
              AI-powered project discovery and team formation platform connecting university students, specialists, and project leaders to assemble world-class engineering teams.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#FF5A1F]/40 text-xs font-semibold text-[#FF7A3D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find the Right Project. Find the Right People.</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#FF5A1F] transition-colors cursor-pointer">
                  Explore Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('talent')} className="hover:text-[#FF5A1F] transition-colors cursor-pointer">
                  Find Talent & Match
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leader-view')} className="hover:text-[#FF5A1F] transition-colors cursor-pointer">
                  Leader Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-view')} className="hover:text-[#FF5A1F] transition-colors cursor-pointer">
                  Student Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workspace')} className="hover:text-[#FF5A1F] transition-colors cursor-pointer">
                  Team Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles & Manifesto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Core Lifecycle
            </h4>
            <div className="space-y-2 text-xs">
              <div className="text-white font-semibold">PROJECT → ROLES → REQUIREMENTS → MATCHING → TEAM → COLLABORATION</div>
              <p className="text-[11px] text-[#A7B0C0] pt-2">
                Built with transparent zero-bias AI matching algorithms and real-time skill graph synchronization.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright & slogan */}
        <div className="pt-8 border-t border-[#1F293D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} ProjectMatch Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-white">
            <span className="text-[#FF5A1F]">Discover</span>
            <span>•</span>
            <span>Match</span>
            <span>•</span>
            <span className="text-[#FF7A3D]">Team Up</span>
            <span>•</span>
            <span className="text-[#22C55E]">Build</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
