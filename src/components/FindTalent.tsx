import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Zap, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Heart, 
  UserPlus, 
  Eye, 
  Sparkles,
  SlidersHorizontal,
  Scale,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Candidate, Project } from '../types';

interface FindTalentProps {
  candidates: Candidate[];
  projects: Project[];
  onViewCandidate: (candidate: Candidate) => void;
  onShortlistCandidate: (candidateId: string) => void;
  onInviteCandidate: (candidate: Candidate) => void;
  onOpenComparison: (selectedCandidates: Candidate[]) => void;
}

export const FindTalent: React.FC<FindTalentProps> = ({
  candidates,
  projects,
  onViewCandidate,
  onShortlistCandidate,
  onInviteCandidate,
  onOpenComparison
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleCategory, setSelectedRoleCategory] = useState('All');
  const [selectedExpFilter, setSelectedExpFilter] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedCandidatesForCompare, setSelectedCandidatesForCompare] = useState<string[]>([]);
  const [minMatchScore, setMinMatchScore] = useState<number>(0);

  const expRanges = [
    'All',
    '0–1 Years',
    '1–3 Years',
    '3–5 Years',
    '5–10 Years',
    '10+ Years'
  ];

  const roleCategories = [
    'All',
    'Machine Learning',
    'Backend',
    'Frontend',
    'UI/UX Design',
    'Data Engineering',
    'DevOps',
    'Mobile',
    'Research'
  ];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        query === '' ||
        cand.name.toLowerCase().includes(query) ||
        cand.role.toLowerCase().includes(query) ||
        cand.domain.toLowerCase().includes(query) ||
        cand.college.toLowerCase().includes(query) ||
        cand.skills.some(s => s.toLowerCase().includes(query));

      // Role filter
      let matchesRole = true;
      if (selectedRoleCategory !== 'All') {
        const cat = selectedRoleCategory.toLowerCase();
        matchesRole = 
          cand.role.toLowerCase().includes(cat) ||
          cand.skills.some(s => s.toLowerCase().includes(cat));
      }

      // Experience filter
      let matchesExp = true;
      if (selectedExpFilter !== 'All') {
        if (selectedExpFilter === '0–1 Years') matchesExp = cand.experienceYears <= 1;
        else if (selectedExpFilter === '1–3 Years') matchesExp = cand.experienceYears >= 1 && cand.experienceYears <= 3;
        else if (selectedExpFilter === '3–5 Years') matchesExp = cand.experienceYears >= 3 && cand.experienceYears <= 5;
        else if (selectedExpFilter === '5–10 Years') matchesExp = cand.experienceYears >= 5 && cand.experienceYears <= 10;
        else if (selectedExpFilter === '10+ Years') matchesExp = cand.experienceYears >= 10;
      }

      // Work mode
      const matchesWorkMode = 
        selectedWorkMode === 'All' || cand.workMode === selectedWorkMode;

      // Min Match
      const matchesMatch = cand.matchScore >= minMatchScore;

      return matchesSearch && matchesRole && matchesExp && matchesWorkMode && matchesMatch;
    });
  }, [candidates, searchQuery, selectedRoleCategory, selectedExpFilter, selectedWorkMode, minMatchScore]);

  const toggleSelectForCompare = (id: string) => {
    if (selectedCandidatesForCompare.includes(id)) {
      setSelectedCandidatesForCompare(selectedCandidatesForCompare.filter(i => i !== id));
    } else {
      if (selectedCandidatesForCompare.length >= 4) {
        alert('You can compare up to 4 candidates simultaneously.');
        return;
      }
      setSelectedCandidatesForCompare([...selectedCandidatesForCompare, id]);
    }
  };

  const handleLaunchCompare = () => {
    const list = candidates.filter(c => selectedCandidatesForCompare.includes(c.id));
    onOpenComparison(list);
  };

  return (
    <section id="find-talent-section" className="py-16 sm:py-24 bg-[#080D16] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#FF5A1F]/40 text-xs font-semibold text-[#FF7A3D] mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Candidate Discovery & Matching</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Find Top <span className="text-[#FF5A1F]">Talent</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A7B0C0]">
            Search verified candidates and students by tech stack, experience level, and algorithmic compatibility with your project roles.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex items-center bg-[#151E2E] border-2 border-[#1F293D] focus-within:border-[#FF5A1F] rounded-2xl p-2 shadow-2xl transition-all">
            <div className="pl-3 pr-2 text-[#FF5A1F]">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="talent-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talent by Name, Role, Skill (Python, React, NLP, Java), or College..."
              className="w-full bg-transparent text-white text-sm sm:text-base placeholder-[#A7B0C0]/60 focus:outline-none py-2"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#A7B0C0] hover:text-white px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#111827] border border-[#1F293D]">
            
            {/* Experience Level Pill Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-xs font-bold uppercase text-[#A7B0C0] mr-1 shrink-0">Experience:</span>
              {expRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedExpFilter(range)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    selectedExpFilter === range
                      ? 'bg-[#FF5A1F] text-white shadow-sm'
                      : 'bg-[#151E2E] text-[#A7B0C0] hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Work Mode Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#A7B0C0]">Mode:</span>
              <select
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="bg-[#151E2E] border border-[#1F293D] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
              >
                <option value="All">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-16 bg-[#151E2E]/40 border border-[#1F293D] rounded-3xl p-8 max-w-lg mx-auto">
            <Users className="w-12 h-12 text-[#A7B0C0] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching candidates found</h3>
            <p className="text-xs text-[#A7B0C0] mb-4">Try broadening your search keywords or clearing experience filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedExpFilter('All');
                setSelectedRoleCategory('All');
                setSelectedWorkMode('All');
              }}
              className="px-4 py-2 bg-[#FF5A1F] text-white text-xs font-bold rounded-lg"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => {
              const isSelectedForCompare = selectedCandidatesForCompare.includes(candidate.id);

              return (
                <div
                  key={candidate.id}
                  id={`candidate-card-${candidate.id}`}
                  className="group relative bg-[#151E2E]/95 border-2 border-[#1F293D] hover:border-[#FF5A1F] rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-md"
                >
                  <div>
                    {/* Card Top */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#FF5A1F] shadow-md shadow-[#FF5A1F]/20"
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#22C55E] border-2 border-[#151E2E] rounded-full" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-white group-hover:text-[#FF7A3D] transition-colors">
                            {candidate.name}
                          </h3>
                          <p className="text-xs text-[#A7B0C0]">{candidate.role}</p>
                          <span className="text-[11px] text-[#FF7A3D] font-medium">
                            {candidate.experienceYears} Years Experience
                          </span>
                        </div>
                      </div>

                      {/* Match badge */}
                      <div className="w-11 h-11 rounded-xl bg-[#080D16] border border-[#FF5A1F] flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-extrabold text-white">{candidate.matchScore}%</span>
                        <span className="text-[7px] uppercase font-bold text-[#FF5A1F]">Match</span>
                      </div>
                    </div>

                    {/* Education & Domain */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#A7B0C0] mb-4 bg-[#111827] p-2.5 rounded-xl border border-[#1F293D]">
                      <span className="truncate">{candidate.college}</span>
                      <span>•</span>
                      <span className="text-[#FF7A3D]">{candidate.domain}</span>
                    </div>

                    {/* Circular Progress Indicators Breakdown */}
                    <div className="grid grid-cols-4 gap-1.5 mb-4 text-center">
                      <div className="p-1.5 rounded-lg bg-[#080D16] border border-[#1F293D]">
                        <div className="text-xs font-bold text-[#FF5A1F]">{candidate.breakdown.skills}%</div>
                        <div className="text-[8px] text-[#A7B0C0] uppercase">Skills</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#080D16] border border-[#1F293D]">
                        <div className="text-xs font-bold text-[#FF7A3D]">{candidate.breakdown.experience}%</div>
                        <div className="text-[8px] text-[#A7B0C0] uppercase">Exp</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#080D16] border border-[#1F293D]">
                        <div className="text-xs font-bold text-white">{candidate.breakdown.domain}%</div>
                        <div className="text-[8px] text-[#A7B0C0] uppercase">Domain</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#080D16] border border-[#1F293D]">
                        <div className="text-xs font-bold text-[#22C55E]">{candidate.breakdown.availability}%</div>
                        <div className="text-[8px] text-[#A7B0C0] uppercase">Avail</div>
                      </div>
                    </div>

                    {/* Skills pills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#111827] border border-[#1F293D] text-[11px] font-medium text-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#111827] text-[11px] text-[#A7B0C0]">
                            +{candidate.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#1F293D] space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewCandidate(candidate)}
                        className="flex-1 py-2 rounded-xl bg-[#111827] hover:bg-[#1F293D] border border-[#1F293D] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#FF5A1F]" />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={() => onInviteCandidate(candidate)}
                        className="flex-1 py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Invite</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => onShortlistCandidate(candidate.id)}
                        className={`text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                          candidate.isShortlisted
                            ? 'text-[#22C55E]'
                            : 'text-[#A7B0C0] hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${candidate.isShortlisted ? 'fill-[#22C55E]' : ''}`} />
                        <span>{candidate.isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                      </button>

                      <label className="flex items-center gap-1.5 text-xs text-[#A7B0C0] hover:text-white cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isSelectedForCompare}
                          onChange={() => toggleSelectForCompare(candidate.id)}
                          className="accent-[#FF5A1F] rounded cursor-pointer"
                        />
                        <span>Compare</span>
                      </label>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Floating Comparison Tray */}
        {selectedCandidatesForCompare.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#151E2E] border-2 border-[#FF5A1F] rounded-2xl shadow-2xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#FF5A1F]" />
              <span className="text-xs font-bold text-white">
                {selectedCandidatesForCompare.length} Candidates Selected
              </span>
            </div>

            <div className="flex items-center -space-x-2">
              {candidates
                .filter(c => selectedCandidatesForCompare.includes(c.id))
                .map(c => (
                  <img
                    key={c.id}
                    src={c.avatar}
                    alt={c.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF5A1F]"
                  />
                ))}
            </div>

            <button
              onClick={handleLaunchCompare}
              className="px-4 py-2 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#FF5A1F]/30 cursor-pointer"
            >
              Compare Side-by-Side →
            </button>

            <button
              onClick={() => setSelectedCandidatesForCompare([])}
              className="text-xs text-[#A7B0C0] hover:text-white ml-1"
            >
              Clear
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
