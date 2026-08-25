import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Zap, 
  Heart, 
  UserPlus, 
  CheckCircle, 
  Clock, 
  Send,
  FolderGit2,
  Sparkles
} from 'lucide-react';
import { Candidate, Project } from '../types';

interface CandidateModalProps {
  candidate: Candidate | null;
  projects: Project[];
  onClose: () => void;
  onShortlist: (id: string) => void;
  onInviteToProject: (candidateId: string, projectId: string, roleId: string) => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  projects,
  onClose,
  onShortlist,
  onInviteToProject
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [inviteSent, setInviteSent] = useState<boolean>(false);

  if (!candidate) return null;

  const currentSelectedProject = projects.find(p => p.id === selectedProjectId);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    const roleToAssign = selectedRoleId || currentSelectedProject?.availableRoles[0]?.id || 'lead-role';
    onInviteToProject(candidate.id, selectedProjectId, roleToAssign);
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="candidate-profile-modal"
        className="relative w-full max-w-3xl bg-[#151E2E] border-2 border-[#FF5A1F]/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#111827] border-b border-[#1F293D] relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#151E2E] border border-[#1F293D] text-[#A7B0C0] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#FF5A1F] shadow-lg shadow-[#FF5A1F]/20"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="text-2xl font-extrabold text-white">{candidate.name}</h3>
                <span className="px-3 py-0.5 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 text-[#FF7A3D] text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-[#FF5A1F]" />
                  {candidate.matchScore}% Match
                </span>
              </div>
              <p className="text-sm text-[#FF7A3D] font-semibold">{candidate.role}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#A7B0C0] mt-2">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  {candidate.college} ({candidate.degree})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A7B0C0]" />
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">Professional Summary</h4>
            <p className="text-sm text-gray-200 bg-[#111827] p-4 rounded-xl border border-[#1F293D] leading-relaxed">
              {candidate.bio}
            </p>
          </div>

          {/* Compatibility Breakdown Circles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-3">Matching Compatibility Metrics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#111827] rounded-xl border border-[#1F293D] text-center">
                <div className="text-xl font-extrabold text-[#FF5A1F]">{candidate.breakdown.skills}%</div>
                <div className="text-[10px] text-[#A7B0C0] uppercase font-bold mt-0.5">Skills Match</div>
              </div>
              <div className="p-3 bg-[#111827] rounded-xl border border-[#1F293D] text-center">
                <div className="text-xl font-extrabold text-[#FF7A3D]">{candidate.breakdown.experience}%</div>
                <div className="text-[10px] text-[#A7B0C0] uppercase font-bold mt-0.5">Experience</div>
              </div>
              <div className="p-3 bg-[#111827] rounded-xl border border-[#1F293D] text-center">
                <div className="text-xl font-extrabold text-white">{candidate.breakdown.domain}%</div>
                <div className="text-[10px] text-[#A7B0C0] uppercase font-bold mt-0.5">Domain Fit</div>
              </div>
              <div className="p-3 bg-[#111827] rounded-xl border border-[#1F293D] text-center">
                <div className="text-xl font-extrabold text-[#22C55E]">{candidate.breakdown.availability}%</div>
                <div className="text-[10px] text-[#A7B0C0] uppercase font-bold mt-0.5">Availability</div>
              </div>
            </div>
          </div>

          {/* Skills & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">Technical Skills & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#111827] border border-[#1F293D] rounded-lg text-xs font-semibold text-white">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">Looking to Join</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.lookingFor.map((item, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-lg text-xs text-[#FF7A3D] font-medium">
                  ★ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Invite to Project Box */}
          <div className="p-5 rounded-2xl bg-[#111827] border border-[#FF5A1F]/40">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#FF5A1F]" />
              Invite {candidate.name} to Your Project
            </h4>

            {inviteSent ? (
              <div className="p-3 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-center text-xs text-[#22C55E] font-bold">
                ✓ Team invitation sent to {candidate.name}!
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Target Project</label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => {
                        setSelectedProjectId(e.target.value);
                        setSelectedRoleId('');
                      }}
                      className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Assigned Role</label>
                    <select
                      value={selectedRoleId}
                      onChange={(e) => setSelectedRoleId(e.target.value)}
                      className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                    >
                      <option value="">Default Open Role</option>
                      {currentSelectedProject?.availableRoles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white font-bold text-xs transition-all shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Project Invitation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onShortlist(candidate.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      candidate.isShortlisted
                        ? 'bg-[#22C55E]/15 border-[#22C55E] text-[#22C55E]'
                        : 'border-[#1F293D] text-[#A7B0C0] hover:text-white'
                    }`}
                  >
                    {candidate.isShortlisted ? 'Shortlisted' : '+ Shortlist'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#111827] border-t border-[#1F293D] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#151E2E] text-white text-xs font-semibold hover:bg-[#1F293D]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
