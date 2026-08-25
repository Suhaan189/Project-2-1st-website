import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Sliders, 
  Check, 
  HelpCircle, 
  Users, 
  Clock, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Project, StudentProfile } from '../types';

interface PersonalizedMatchingSectionProps {
  projects: Project[];
  currentUser: StudentProfile;
  onSelectProject: (project: Project) => void;
}

export const PersonalizedMatchingSection: React.FC<PersonalizedMatchingSectionProps> = ({
  projects,
  currentUser,
  onSelectProject
}) => {
  const [skillWeight, setSkillWeight] = useState(40);
  const [interestWeight, setInterestWeight] = useState(30);
  const [experienceWeight, setExperienceWeight] = useState(15);
  const [availabilityWeight, setAvailabilityWeight] = useState(15);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(projects[0]?.id || null);

  // Calculate dynamic match score based on slider weights
  const getDynamicScore = (proj: Project) => {
    const totalWeight = skillWeight + interestWeight + experienceWeight + availabilityWeight || 100;
    const raw = (
      (proj.matchBreakdown.skills * skillWeight) +
      (proj.matchBreakdown.interest * interestWeight) +
      (proj.matchBreakdown.experience * experienceWeight) +
      (proj.matchBreakdown.availability * availabilityWeight)
    ) / totalWeight;
    return Math.round(raw);
  };

  const sortedProjects = [...projects].sort((a, b) => getDynamicScore(b) - getDynamicScore(a)).slice(0, 3);

  return (
    <section className="py-20 bg-[#080D16] border-t border-[#1F293D]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#FF5A1F]/40 text-xs font-semibold text-[#FF7A3D] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized For You</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projects You <span className="text-[#FF5A1F]">May Like</span>
            </h2>
            <p className="mt-2 text-sm text-[#A7B0C0] max-w-xl">
              Recommendations calculated against your profile ({currentUser.name}, {currentUser.college}). Complete transparency on why each project matches.
            </p>
          </div>

          <div className="p-3 bg-[#111827] rounded-2xl border border-[#1F293D] flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
            <span className="text-xs text-[#A7B0C0]">
              Scored with <strong>Zero-Bias AI</strong> skill affinity engine
            </span>
          </div>
        </div>

        {/* Dynamic Weight Tuning Pill Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-[#151E2E] border border-[#1F293D]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#FF5A1F]" />
              Fine-tune Your Matching Priorities:
            </span>
            <span className="text-[11px] text-[#A7B0C0]">Weights dynamically recalculate ranking</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A7B0C0]">Skills ({skillWeight}%)</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={skillWeight}
                onChange={(e) => setSkillWeight(Number(e.target.value))}
                className="w-full accent-[#FF5A1F] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A7B0C0]">Interests ({interestWeight}%)</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={interestWeight}
                onChange={(e) => setInterestWeight(Number(e.target.value))}
                className="w-full accent-[#FF7A3D] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A7B0C0]">Experience ({experienceWeight}%)</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={experienceWeight}
                onChange={(e) => setExperienceWeight(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A7B0C0]">Availability ({availabilityWeight}%)</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={availabilityWeight}
                onChange={(e) => setAvailabilityWeight(Number(e.target.value))}
                className="w-full accent-[#22C55E] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Recommendation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => {
            const dynamicScore = getDynamicScore(project);
            const isExpanded = expandedProjectId === project.id;

            return (
              <div
                key={project.id}
                id={`personalized-card-${project.id}`}
                className="relative bg-[#151E2E] border-2 border-[#1F293D] hover:border-[#FF5A1F] rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Match Score Pill */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#080D16] border-2 border-[#FF5A1F] flex flex-col items-center justify-center shadow-md shadow-[#FF5A1F]/20">
                        <span className="text-base font-extrabold text-white leading-none">{dynamicScore}%</span>
                        <span className="text-[8px] uppercase font-bold text-[#FF5A1F]">Match</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#A7B0C0]">{project.domain}</span>
                        <h3 className="text-lg font-bold text-white leading-tight">{project.name}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#A7B0C0] mb-5 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Why this match? breakdown */}
                  <div className="p-3.5 rounded-2xl bg-[#111827] border border-[#1F293D] mb-5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span className="flex items-center gap-1.5 text-[#FF7A3D]">
                        <Zap className="w-3.5 h-3.5" />
                        Why this recommendation?
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#151E2E] p-2 rounded-lg">
                        <div className="text-[10px] text-[#A7B0C0]">Skills Match</div>
                        <div className="font-bold text-[#FF5A1F]">{project.matchBreakdown.skills}%</div>
                      </div>
                      <div className="bg-[#151E2E] p-2 rounded-lg">
                        <div className="text-[10px] text-[#A7B0C0]">Interest Match</div>
                        <div className="font-bold text-[#FF7A3D]">{project.matchBreakdown.interest}%</div>
                      </div>
                      <div className="bg-[#151E2E] p-2 rounded-lg">
                        <div className="text-[10px] text-[#A7B0C0]">Experience Match</div>
                        <div className="font-bold text-white">{project.matchBreakdown.experience}%</div>
                      </div>
                      <div className="bg-[#151E2E] p-2 rounded-lg">
                        <div className="text-[10px] text-[#A7B0C0]">Availability</div>
                        <div className="font-bold text-[#22C55E]">{project.matchBreakdown.availability}%</div>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#A7B0C0] italic leading-tight pt-1">
                      "{project.matchBreakdown.reason}"
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full py-3 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Project & Apply</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
