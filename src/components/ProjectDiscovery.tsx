import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Sparkles, 
  BrainCircuit, 
  Clock, 
  BarChart, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Info
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDiscoveryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  selectedDomain?: string;
}

export const ProjectDiscovery: React.FC<ProjectDiscoveryProps> = ({
  projects,
  onSelectProject,
  selectedDomain = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(selectedDomain);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('All');
  const [minMatchFilter, setMinMatchFilter] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All',
    'AI',
    'Healthcare',
    'Web Development',
    'Java',
    'Python',
    'FinTech',
    'Education',
    'Research',
    'Hackathon',
    'Cybersecurity',
    'Startup'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search query filter
      const matchesSearch = 
        searchQuery.trim() === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.availableRoles.some(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      let matchesCategory = true;
      if (activeCategory !== 'All') {
        const catLower = activeCategory.toLowerCase();
        matchesCategory = 
          project.domain.toLowerCase().includes(catLower) ||
          project.requiredSkills.some(s => s.toLowerCase().includes(catLower)) ||
          project.projectType.toLowerCase().includes(catLower) ||
          (catLower === 'ai' && (project.domain.toLowerCase().includes('healthcare') || project.requiredSkills.some(s => s.toLowerCase().includes('ml') || s.toLowerCase().includes('python'))));
      }

      // Difficulty filter
      const matchesDifficulty = 
        selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;

      // Project Type filter
      const matchesType = 
        selectedProjectType === 'All' || project.projectType === selectedProjectType;

      // Min Match filter
      const matchesScore = project.matchBreakdown.overall >= minMatchFilter;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesScore;
    });
  }, [projects, searchQuery, activeCategory, selectedDifficulty, selectedProjectType, minMatchFilter]);

  return (
    <section id="explore-projects-section" className="py-16 sm:py-24 bg-[#080D16] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#FF5A1F]/40 text-xs font-semibold text-[#FF7A3D] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Discovery Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Find Your Next <span className="text-[#FF5A1F]">Project</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A7B0C0]">
            Browse projects looking for your exact skills, or search by tech stack, domain, and experience level.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center bg-[#151E2E] border-2 border-[#1F293D] focus-within:border-[#FF5A1F] rounded-2xl p-2 shadow-2xl transition-all duration-200">
            <div className="pl-3 pr-2 text-[#A7B0C0]">
              <Search className="w-5 h-5 text-[#FF5A1F]" />
            </div>
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What kind of project do you want to work on? (e.g. AI, Python, Healthcare...)"
              className="w-full bg-transparent text-white text-sm sm:text-base placeholder-[#A7B0C0]/60 focus:outline-none py-2"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#A7B0C0] hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                showFilters || minMatchFilter > 0 || selectedDifficulty !== 'All'
                  ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/30'
                  : 'bg-[#111827] text-[#A7B0C0] hover:text-white border border-[#1F293D]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/30 scale-105'
                    : 'bg-[#111827] text-[#A7B0C0] hover:text-white hover:bg-[#151E2E] border border-[#1F293D]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Advanced Filters Expandable Drawer */}
        {showFilters && (
          <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-[#111827] border border-[#1F293D] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Difficulty filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">
                  Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                >
                  <option value="All">All Types</option>
                  <option value="Startup">Startup</option>
                  <option value="Research">Research</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Academic">Academic</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>

              {/* Min Match % slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A7B0C0]">
                    Min Match:
                  </label>
                  <span className="text-xs font-bold text-[#FF5A1F]">{minMatchFilter}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="95"
                  step="5"
                  value={minMatchFilter}
                  onChange={(e) => setMinMatchFilter(Number(e.target.value))}
                  className="w-full accent-[#FF5A1F] cursor-pointer"
                />
              </div>

            </div>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-[#151E2E]/40 border border-[#1F293D] rounded-3xl p-8 max-w-xl mx-auto">
            <Search className="w-12 h-12 text-[#A7B0C0] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching projects found</h3>
            <p className="text-xs text-[#A7B0C0] mb-4">
              Try adjusting your search terms, changing categories, or lowering the minimum match filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setSelectedDifficulty('All');
                setMinMatchFilter(0);
              }}
              className="px-4 py-2 bg-[#FF5A1F] text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative bg-[#151E2E]/90 border-2 border-[#1F293D] hover:border-[#FF5A1F] rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#FF5A1F]/15 flex flex-col justify-between backdrop-blur-md"
              >
                {/* Card Top: Match % Badge & Status */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 text-[#FF7A3D] text-xs font-extrabold shadow-sm">
                      <Zap className="w-3.5 h-3.5 fill-[#FF5A1F]" />
                      {project.matchBreakdown.overall}% Match
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#FF7A3D] transition-colors leading-snug mb-2">
                    {project.name}
                  </h3>

                  {/* Tagline / short description */}
                  <p className="text-xs text-[#A7B0C0] line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Required Skills Badges */}
                  <div className="mb-4">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#A7B0C0] mb-1.5">
                      Required Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.requiredSkills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#111827] border border-[#1F293D] text-gray-200 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.requiredSkills.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#111827] text-[#A7B0C0] text-[11px]">
                          +{project.requiredSkills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Open Roles Preview */}
                  <div className="mb-4 p-2.5 rounded-xl bg-[#111827]/70 border border-[#1F293D]">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#FF7A3D] mb-1">
                      Open Roles:
                    </div>
                    <div className="space-y-1">
                      {project.availableRoles.slice(0, 2).map((role) => (
                        <div key={role.id} className="flex items-center justify-between text-xs">
                          <span className="text-white font-medium">{role.title}</span>
                          <span className="text-[10px] text-[#A7B0C0] bg-[#151E2E] px-1.5 py-0.5 rounded">
                            {role.minExperienceYears}+ yrs exp
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta & View Button */}
                <div className="pt-3 border-t border-[#1F293D]">
                  <div className="flex items-center justify-between text-xs text-[#A7B0C0] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#FF5A1F]" />
                      Team: <strong className="text-white">{project.teamSizeCurrent} / {project.teamSizeMax}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#A7B0C0]" />
                      {project.duration}
                    </span>
                  </div>

                  <button
                    id={`view-project-btn-${project.id}`}
                    onClick={() => onSelectProject(project)}
                    className="w-full py-2.5 rounded-xl bg-[#111827] hover:bg-[#FF5A1F] border border-[#FF5A1F]/50 hover:border-[#FF5A1F] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm hover:shadow-[#FF5A1F]/30"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
