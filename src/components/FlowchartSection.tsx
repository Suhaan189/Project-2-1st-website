import React from 'react';
import { 
  FolderSearch, 
  UserCheck, 
  Puzzle, 
  Users, 
  UserPlus, 
  MessageSquareCode,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FlowchartSectionProps {
  onStepClick?: (stepIndex: number) => void;
}

export const FlowchartSection: React.FC<FlowchartSectionProps> = ({ onStepClick }) => {
  const steps = [
    {
      number: '1',
      title: 'DISCOVER PROJECTS',
      icon: FolderSearch,
      description: 'Explore projects based on your interests, skills and goals.',
      badge: 'Step 01',
      actionTab: 'explore'
    },
    {
      number: '2',
      title: 'CREATE PROFILE',
      icon: UserCheck,
      description: 'Add your skills, experience, interests and availability.',
      badge: 'Step 02',
      actionTab: 'student-view'
    },
    {
      number: '3',
      title: 'MATCH SKILLS',
      icon: Puzzle,
      description: 'Get personalized project and teammate recommendations.',
      badge: 'Step 03',
      actionTab: 'explore'
    },
    {
      number: '4',
      title: 'FIND TEAMMATES',
      icon: Users,
      description: 'Connect with people who complement your skills.',
      badge: 'Step 04',
      actionTab: 'talent'
    },
    {
      number: '5',
      title: 'JOIN / FORM TEAM',
      icon: UserPlus,
      description: 'Apply to projects or invite the right people to your team.',
      badge: 'Step 05',
      actionTab: 'leader-view'
    },
    {
      number: '6',
      title: 'COLLABORATE',
      icon: MessageSquareCode,
      description: 'Work together, manage tasks and build your project.',
      badge: 'Step 06',
      actionTab: 'workspace'
    },
  ];

  return (
    <section className="relative py-20 bg-[#080D16] border-y border-[#1F293D]/60 overflow-hidden">
      
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-0 right-0 h-40 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FF5A1F]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#FF5A1F]/40 text-xs font-semibold text-[#FF7A3D] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Steps to <span className="text-[#FF5A1F]">ProjectMatch</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A7B0C0]">
            From individual exploration to coordinated execution — our systematic lifecycle gets ideas built.
          </p>
        </div>

        {/* Flowchart Container: Horizontal on Large Screens, Responsive Flow on Tablet/Mobile */}
        <div className="relative">

          {/* Desktop Horizontal Connecting Line (Only visible on lg: screens) */}
          <div className="hidden lg:block absolute top-[60px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#FF5A1F]/20 via-[#FF5A1F] to-[#FF5A1F]/20 z-0">
            {/* Glowing nodes along line */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className="w-3.5 h-3.5 rounded-full bg-[#080D16] border-2 border-[#FF5A1F] shadow-[0_0_8px_#FF5A1F] -mt-[1px]" 
                />
              ))}
            </div>
          </div>

          {/* Six Flowchart Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-4 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  id={`flowchart-step-${index + 1}`}
                  onClick={() => onStepClick && onStepClick(index)}
                  className="group relative flex flex-col items-center text-center p-5 rounded-2xl bg-[#151E2E]/95 border-2 border-[#FF5A1F]/60 hover:border-[#FF5A1F] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#FF5A1F]/20 cursor-pointer backdrop-blur-md"
                >
                  {/* Step Icon with Circular Orange Border */}
                  <div className="w-14 h-14 rounded-full bg-[#080D16] border-2 border-[#FF5A1F] group-hover:border-[#FF7A3D] flex items-center justify-center mb-4 shadow-lg shadow-[#FF5A1F]/20 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-6 h-6 text-[#FF5A1F] group-hover:text-white transition-colors" />
                  </div>

                  {/* Step Badge */}
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF7A3D] bg-[#FF5A1F]/15 px-2.5 py-0.5 rounded-full mb-2 border border-[#FF5A1F]/30">
                    {step.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#FF7A3D] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#A7B0C0] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Subtle hover arrow hint */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-[#FF5A1F] font-semibold flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Slogan Pill */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#151E2E] border border-[#FF5A1F]/70 text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#FF5A1F]/15 tracking-wide">
            <span className="text-[#FF5A1F]">Discover.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-white">Match.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-[#FF7A3D]">Team Up.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-[#22C55E]">Build.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
