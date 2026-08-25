import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Clock, 
  BrainCircuit, 
  CheckCircle2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Zap, 
  Layers, 
  AlertCircle,
  Share2,
  Calendar,
  Sparkles,
  Send
} from 'lucide-react';
import { Project, ProjectRole, StudentProfile } from '../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  currentUser: StudentProfile;
  onApplyRole: (projectId: string, roleId: string, roleTitle: string, note: string) => void;
  hasApplied?: boolean;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  currentUser,
  onApplyRole,
  hasApplied = false
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [applicationNote, setApplicationNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(hasApplied);
  const [activeTab, setActiveTab] = useState<'overview' | 'roles' | 'team' | 'match'>('overview');

  if (!project) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleId) return;
    setIsSubmitting(true);
    const roleObj = project.availableRoles.find(r => r.id === selectedRoleId);
    setTimeout(() => {
      onApplyRole(project.id, selectedRoleId, roleObj?.title || 'Team Role', applicationNote);
      setIsSubmitting(false);
      setApplicationSubmitted(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="project-details-modal-container"
        className="relative w-full max-w-4xl bg-[#151E2E] border-2 border-[#FF5A1F]/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#111827] border-b border-[#1F293D] relative">
          
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#151E2E] border border-[#1F293D] text-[#A7B0C0] hover:text-white hover:border-[#FF5A1F] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/50 text-[#FF7A3D] text-xs font-extrabold">
              <Zap className="w-3.5 h-3.5 fill-[#FF5A1F]" />
              {project.matchBreakdown.overall}% Project Match
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#111827] border border-[#1F293D] text-xs text-[#A7B0C0] font-medium">
              {project.domain}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#111827] border border-[#1F293D] text-xs text-[#A7B0C0] font-medium">
              {project.difficulty}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold">
              {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {project.name}
          </h2>
          <p className="text-sm text-[#A7B0C0] max-w-2xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Leader Info */}
          <div className="mt-4 flex items-center gap-3 pt-4 border-t border-[#1F293D]/60">
            <img
              src={project.leader.avatar}
              alt={project.leader.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-[#FF5A1F]"
            />
            <div>
              <p className="text-xs font-bold text-white">{project.leader.name}</p>
              <p className="text-[11px] text-[#A7B0C0]">
                {project.leader.role} • <span className="text-[#FF7A3D]">{project.leader.organization}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#1F293D] bg-[#080D16]/90 px-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Specs' },
            { id: 'roles', label: `Available Roles (${project.availableRoles.length})` },
            { id: 'match', label: 'Transparent Match' },
            { id: 'team', label: `Team & Progress (${project.teamMembers.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#FF5A1F] border-[#FF5A1F] bg-[#151E2E]/40'
                  : 'text-[#A7B0C0] border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#151E2E]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-2">
                  Project Description
                </h4>
                <p className="text-sm text-gray-200 leading-relaxed bg-[#111827]/60 p-4 rounded-2xl border border-[#1F293D]">
                  {project.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Duration</span>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FF5A1F]" />
                    {project.duration}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Team Size</span>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#FF5A1F]" />
                    {project.teamSizeCurrent} / {project.teamSizeMax} Members
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Project Type</span>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#FF5A1F]" />
                    {project.projectType}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Compensation</span>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5 truncate">
                    <DollarSign className="w-4 h-4 text-[#22C55E]" />
                    {project.budgetRange || 'Grant / Equity'}
                  </div>
                </div>
              </div>

              {/* Required Skills list */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-2.5">
                  Core Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#111827] border border-[#1F293D] text-xs font-semibold text-white flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Action to switch to roles */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF5A1F]/10 to-transparent border border-[#FF5A1F]/30 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-white">Looking for your role?</h5>
                  <p className="text-xs text-[#A7B0C0]">This project currently has open slots available for application.</p>
                </div>
                <button
                  onClick={() => setActiveTab('roles')}
                  className="px-4 py-2 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold rounded-xl transition-all"
                >
                  View Roles & Apply
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AVAILABLE ROLES & APPLY FLOW */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {project.availableRoles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      selectedRoleId === role.id
                        ? 'bg-[#111827] border-[#FF5A1F] shadow-lg shadow-[#FF5A1F]/15'
                        : 'bg-[#111827]/70 border-[#1F293D] hover:border-[#FF5A1F]/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{role.title}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF5A1F]/15 text-[#FF7A3D] border border-[#FF5A1F]/30">
                            {role.countFilled} / {role.countRequired} Filled
                          </span>
                        </div>
                        <p className="text-xs text-[#A7B0C0] mt-0.5">
                          {role.minExperienceYears}+ Years Experience • {role.workMode} • {role.availabilityHours} hrs/week
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedRoleId(role.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedRoleId === role.id
                            ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/30'
                            : 'bg-[#151E2E] border border-[#FF5A1F] text-white hover:bg-[#FF5A1F]/15'
                        }`}
                      >
                        {selectedRoleId === role.id ? 'Selected Role' : 'Select to Apply'}
                      </button>
                    </div>

                    {/* Role Skills */}
                    <div className="mb-3">
                      <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {role.requiredSkills.map((sk, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#151E2E] border border-[#1F293D] text-gray-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities list */}
                    {role.responsibilities && role.responsibilities.length > 0 && (
                      <div className="pt-2 border-t border-[#1F293D]/60">
                        <span className="text-[10px] text-[#A7B0C0] uppercase font-bold">Key Responsibilities:</span>
                        <ul className="mt-1 space-y-1">
                          {role.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-xs text-[#A7B0C0] flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive Apply Form */}
              <div className="p-6 rounded-2xl bg-[#111827] border border-[#FF5A1F]/40">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#FF5A1F]" />
                  Apply to Join This Project
                </h4>

                {applicationSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-center">
                    <CheckCircle2 className="w-8 h-8 text-[#22C55E] mx-auto mb-2" />
                    <h5 className="text-sm font-bold text-white">Application Submitted!</h5>
                    <p className="text-xs text-[#A7B0C0] mt-1">
                      The project leader Dr. Evelyn Martinez has been notified and can review your Stanford CS profile.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#A7B0C0] uppercase tracking-wider mb-1.5">
                        Selected Role
                      </label>
                      <select
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                        required
                        className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                      >
                        <option value="">-- Choose a Role to Apply --</option>
                        {project.availableRoles.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.title} ({r.minExperienceYears}+ yrs exp, {r.workMode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#A7B0C0] uppercase tracking-wider mb-1.5">
                        Short Pitch / Message to Leader
                      </label>
                      <textarea
                        rows={3}
                        value={applicationNote}
                        onChange={(e) => setApplicationNote(e.target.value)}
                        placeholder="Explain why you're interested, your experience with these skills, and your weekly availability..."
                        className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF5A1F] placeholder-[#A7B0C0]/50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedRoleId || isSubmitting}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        selectedRoleId && !isSubmitting
                          ? 'bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white shadow-lg shadow-[#FF5A1F]/30'
                          : 'bg-[#1F293D] text-[#A7B0C0] cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TRANSPARENT MATCH BREAKDOWN */}
          {activeTab === 'match' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#111827] border border-[#FF5A1F]/40 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[#080D16] border-4 border-[#FF5A1F] flex flex-col items-center justify-center shadow-lg shadow-[#FF5A1F]/20 shrink-0">
                  <span className="text-2xl font-black text-white">{project.matchBreakdown.overall}%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#FF7A3D]">Fit Score</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Transparent AI Match Engine</h4>
                  <p className="text-xs text-[#A7B0C0] leading-relaxed">
                    {project.matchBreakdown.reason}
                  </p>
                </div>
              </div>

              {/* 4 Score Breakdown Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-white">Skills Match</span>
                    <span className="text-[#FF5A1F]">{project.matchBreakdown.skills}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#151E2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF5A1F] rounded-full" style={{ width: `${project.matchBreakdown.skills}%` }} />
                  </div>
                  <p className="text-[11px] text-[#A7B0C0] mt-1.5">Matches your Python, NLP, and ML competencies.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-white">Interest Match</span>
                    <span className="text-[#FF7A3D]">{project.matchBreakdown.interest}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#151E2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF7A3D] rounded-full" style={{ width: `${project.matchBreakdown.interest}%` }} />
                  </div>
                  <p className="text-[11px] text-[#A7B0C0] mt-1.5">Directly corresponds with your Healthcare AI focus.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-white">Experience Match</span>
                    <span className="text-white">{project.matchBreakdown.experience}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#151E2E] rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${project.matchBreakdown.experience}%` }} />
                  </div>
                  <p className="text-[11px] text-[#A7B0C0] mt-1.5">4 years student/research experience satisfies role minimums.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-[#1F293D]">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-white">Availability Match</span>
                    <span className="text-[#22C55E]">{project.matchBreakdown.availability}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#151E2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${project.matchBreakdown.availability}%` }} />
                  </div>
                  <p className="text-[11px] text-[#A7B0C0] mt-1.5">20 hrs/week preference fits the 20 hr role requirement.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CURRENT TEAM & PROGRESS */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-3">
                  Current Team Members ({project.teamMembers.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.teamMembers.map((member) => (
                    <div key={member.id} className="p-3.5 rounded-xl bg-[#111827] border border-[#1F293D] flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-[#FF5A1F]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">{member.name}</p>
                          <span className="text-[10px] text-[#FF5A1F] font-bold">{member.matchScore}% fit</span>
                        </div>
                        <p className="text-[11px] text-[#A7B0C0]">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill coverage and gaps */}
              <div className="p-4 rounded-2xl bg-[#111827] border border-[#1F293D]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Identified Team Skill Gap
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#FF7A3D]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#FF5A1F]" />
                  <span>{project.recommendedAction || 'Looking for Cloud / DevOps Engineer'}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#111827] border-t border-[#1F293D] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#151E2E] hover:bg-[#1F293D] text-xs font-semibold text-white transition-all cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-3">
            {activeTab !== 'roles' && (
              <button
                onClick={() => setActiveTab('roles')}
                className="px-5 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-xs font-bold text-white transition-all shadow-md shadow-[#FF5A1F]/25 cursor-pointer flex items-center gap-1.5"
              >
                <span>Apply for Role</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
