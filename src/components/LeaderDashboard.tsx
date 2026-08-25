import React, { useState } from 'react';
import { 
  Plus, 
  FolderGit2, 
  Users, 
  FileText, 
  Heart, 
  Sparkles, 
  BrainCircuit, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ChevronRight, 
  AlertCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Send,
  Trash2
} from 'lucide-react';
import { Project, Candidate, Application } from '../types';

interface LeaderDashboardProps {
  projects: Project[];
  candidates: Candidate[];
  applications: Application[];
  onOpenCreateProject: () => void;
  onSelectProject: (project: Project) => void;
  onOpenWorkspace: (project: Project) => void;
  onLaunchAITeamBuilder: (project: Project) => void;
  onAcceptApplication: (appId: string) => void;
  onRejectApplication: (appId: string) => void;
  onInviteCandidate: (candidate: Candidate) => void;
  onViewCandidate: (candidate: Candidate) => void;
}

export const LeaderDashboard: React.FC<LeaderDashboardProps> = ({
  projects,
  candidates,
  applications,
  onOpenCreateProject,
  onSelectProject,
  onOpenWorkspace,
  onLaunchAITeamBuilder,
  onAcceptApplication,
  onRejectApplication,
  onInviteCandidate,
  onViewCandidate
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'applications' | 'shortlisted' | 'formation'>('projects');

  const shortlistedCandidates = candidates.filter(c => c.isShortlisted);
  const totalOpenPositions = projects.reduce(
    (acc, p) => acc + p.availableRoles.reduce((sum, r) => sum + (r.countRequired - r.countFilled), 0),
    0
  );
  const totalTeamMembers = projects.reduce((acc, p) => acc + p.teamMembers.length, 0);

  return (
    <section id="leader-dashboard-section" className="py-12 sm:py-16 bg-[#080D16] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Leader Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 p-6 sm:p-8 rounded-3xl bg-[#151E2E] border-2 border-[#FF5A1F]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Evelyn Martinez"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#FF5A1F] shadow-lg shadow-[#FF5A1F]/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FF5A1F]/20 text-[#FF7A3D]">
                  Project Leader Hub
                </span>
                <span className="text-[10px] text-[#22C55E] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Verified Lab Lead
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Welcome back, Dr. Evelyn Martinez
              </h1>
              <p className="text-xs text-[#A7B0C0] mt-0.5">
                Senior Research Lead • Innovation AI & Health Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              id="leader-create-project-btn"
              onClick={onOpenCreateProject}
              className="px-6 py-3 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF5A1F]/30 hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* 5 Realtime Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
          <div className="p-4 rounded-2xl bg-[#151E2E] border border-[#1F293D]">
            <div className="flex items-center justify-between text-[#A7B0C0] mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">Active Projects</span>
              <FolderGit2 className="w-4 h-4 text-[#FF5A1F]" />
            </div>
            <div className="text-2xl font-black text-white">{projects.length}</div>
            <div className="text-[10px] text-[#22C55E] mt-0.5">● 100% On Track</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151E2E] border border-[#1F293D]">
            <div className="flex items-center justify-between text-[#A7B0C0] mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">Open Positions</span>
              <Users className="w-4 h-4 text-[#FF7A3D]" />
            </div>
            <div className="text-2xl font-black text-[#FF5A1F]">{totalOpenPositions}</div>
            <div className="text-[10px] text-[#A7B0C0] mt-0.5">Across {projects.length} Initiatives</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151E2E] border border-[#1F293D]">
            <div className="flex items-center justify-between text-[#A7B0C0] mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">Applications</span>
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-black text-white">{applications.length + 31}</div>
            <div className="text-[10px] text-[#FF7A3D] mt-0.5">3 Pending Review</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151E2E] border border-[#1F293D]">
            <div className="flex items-center justify-between text-[#A7B0C0] mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">Shortlisted</span>
              <Heart className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="text-2xl font-black text-[#22C55E]">{shortlistedCandidates.length}</div>
            <div className="text-[10px] text-[#A7B0C0] mt-0.5">Ready for team invite</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151E2E] border border-[#1F293D] col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-[#A7B0C0] mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">Team Members</span>
              <Users className="w-4 h-4 text-[#FF5A1F]" />
            </div>
            <div className="text-2xl font-black text-white">{totalTeamMembers}</div>
            <div className="text-[10px] text-[#22C55E] mt-0.5">Across active rosters</div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#1F293D] mb-8 overflow-x-auto gap-2">
          {[
            { id: 'projects', label: `Active Projects (${projects.length})` },
            { id: 'applications', label: `Applications (${applications.length})` },
            { id: 'shortlisted', label: `Shortlisted Talent (${shortlistedCandidates.length})` },
            { id: 'formation', label: 'Team Formation & AI Synergy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#FF5A1F] text-[#FF5A1F] bg-[#151E2E]/40'
                  : 'border-transparent text-[#A7B0C0] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ACTIVE PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-3xl bg-[#151E2E] border-2 border-[#1F293D] hover:border-[#FF5A1F]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#111827] text-[#A7B0C0] border border-[#1F293D]">
                        {project.domain}
                      </span>
                      <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/15 px-2.5 py-0.5 rounded-full border border-[#22C55E]/30">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white mb-1.5">{project.name}</h3>
                    <p className="text-xs text-[#A7B0C0] line-clamp-2 mb-4">{project.description}</p>

                    {/* Team progress bar */}
                    <div className="mb-4 bg-[#111827] p-3.5 rounded-2xl border border-[#1F293D]">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-white">Team Roster</span>
                        <span className="text-[#FF5A1F]">{project.teamMembers.length} / {project.teamSizeMax} Members</span>
                      </div>
                      <div className="w-full h-2 bg-[#151E2E] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#FF5A1F] to-[#FF7A3D] rounded-full" 
                          style={{ width: `${(project.teamMembers.length / project.teamSizeMax) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Open Roles */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] uppercase font-bold text-[#FF7A3D]">Open Roles:</span>
                      {project.availableRoles.map((role) => (
                        <div key={role.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#111827] text-white">
                          <span>{role.title}</span>
                          <span className="text-[10px] text-[#A7B0C0]">
                            {role.countFilled}/{role.countRequired} filled ({role.minExperienceYears}+ yrs)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#1F293D] flex items-center gap-2">
                    <button
                      onClick={() => onOpenWorkspace(project)}
                      className="flex-1 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#FF5A1F]/20 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Team Workspace</span>
                    </button>

                    <button
                      onClick={() => onLaunchAITeamBuilder(project)}
                      className="py-2.5 px-3 rounded-xl bg-[#111827] hover:bg-[#151E2E] border border-[#FF5A1F] text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                      title="Run AI Team Optimizer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
                      <span>AI Builder</span>
                    </button>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="p-2.5 rounded-xl bg-[#111827] text-[#A7B0C0] hover:text-white border border-[#1F293D]"
                      title="View Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS REVIEW */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-[#151E2E] rounded-3xl p-8 border border-[#1F293D]">
                <FileText className="w-12 h-12 text-[#A7B0C0] mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">No pending candidate applications</h4>
                <p className="text-xs text-[#A7B0C0]">When students apply for open roles, they appear here for your review.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl bg-[#151E2E] border border-[#1F293D] hover:border-[#FF5A1F]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={app.studentAvatar}
                        alt={app.studentName}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#FF5A1F]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{app.studentName}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5A1F]/20 text-[#FF7A3D] font-bold">
                            {app.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-[#A7B0C0]">
                          Applied for <strong className="text-white">{app.roleTitle}</strong> on <span className="text-[#FF7A3D]">{app.projectName}</span>
                        </p>
                        {app.pitch && (
                          <p className="text-xs text-gray-300 italic mt-1 bg-[#111827] p-2 rounded-lg border border-[#1F293D]/60 max-w-xl">
                            "{app.pitch}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {app.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => onAcceptApplication(app.id)}
                            className="px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#22C55E]/80 text-white text-xs font-bold transition-all shadow-md shadow-[#22C55E]/20 flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => onRejectApplication(app.id)}
                            className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          app.status === 'Accepted' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {app.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SHORTLISTED CANDIDATES */}
        {activeTab === 'shortlisted' && (
          <div>
            {shortlistedCandidates.length === 0 ? (
              <div className="text-center py-12 bg-[#151E2E] rounded-3xl p-8 border border-[#1F293D]">
                <Heart className="w-12 h-12 text-[#A7B0C0] mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">No candidates shortlisted yet</h4>
                <p className="text-xs text-[#A7B0C0]">Browse Find Talent and click "Shortlist" to save standout profiles here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shortlistedCandidates.map((cand) => (
                  <div key={cand.id} className="p-5 rounded-2xl bg-[#151E2E] border border-[#1F293D] flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#FF5A1F]" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{cand.name}</h4>
                        <p className="text-xs text-[#A7B0C0]">{cand.role}</p>
                        <span className="text-[10px] text-[#FF5A1F] font-bold">{cand.matchScore}% Match</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-[#1F293D]">
                      <button
                        onClick={() => onViewCandidate(cand)}
                        className="flex-1 py-1.5 bg-[#111827] text-white text-xs font-semibold rounded-lg hover:bg-[#1F293D]"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => onInviteCandidate(cand)}
                        className="flex-1 py-1.5 bg-[#FF5A1F] text-white text-xs font-bold rounded-lg hover:bg-[#FF7A3D]"
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TEAM FORMATION & AI SYNERGY */}
        {activeTab === 'formation' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#151E2E] border-2 border-[#FF5A1F]/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/20 text-[#FF7A3D] text-xs font-bold mb-2">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  Gemini Synergy Optimizer
                </div>
                <h3 className="text-xl font-extrabold text-white">Automate Team Assembly</h3>
                <p className="text-xs text-[#A7B0C0] max-w-xl mt-1">
                  Our neural matcher analyzes multidimensional skill matrix, time-zone overlap, work modes, and experience distributions to assemble the mathematically optimal team.
                </p>
              </div>

              <button
                onClick={() => onLaunchAITeamBuilder(projects[0])}
                className="px-6 py-3 rounded-2xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold shadow-lg shadow-[#FF5A1F]/30 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch AI Team Builder</span>
              </button>
            </div>

            {/* Team Compatibility Radar/Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{proj.name}</h4>
                    <span className="text-xs font-extrabold text-[#22C55E] bg-[#22C55E]/15 px-2.5 py-0.5 rounded-full">
                      {proj.compatibilityScore}% Synergy
                    </span>
                  </div>

                  {/* Skill Coverage Bars */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7B0C0]">Coverage Matrix:</span>
                    {Object.entries(proj.skillCoverage).map(([area, score]) => (
                      <div key={area}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">{area}</span>
                          <span className="font-bold text-[#FF5A1F]">{score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#111827] rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF5A1F] rounded-full" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gaps alert */}
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center gap-2 text-xs text-[#FF7A3D]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Identified gap: {proj.skillGaps.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
