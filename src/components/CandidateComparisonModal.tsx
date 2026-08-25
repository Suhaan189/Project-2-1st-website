import React from 'react';
import { X, CheckCircle, Zap, Shield, Sparkles, UserPlus, Heart, ArrowRight } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateComparisonModalProps {
  candidates: Candidate[];
  onClose: () => void;
  onShortlist: (id: string) => void;
  onInvite: (candidate: Candidate) => void;
  onRemoveFromCompare: (id: string) => void;
}

export const CandidateComparisonModal: React.FC<CandidateComparisonModalProps> = ({
  candidates,
  onClose,
  onShortlist,
  onInvite,
  onRemoveFromCompare
}) => {
  if (candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="candidate-comparison-modal"
        className="relative w-full max-w-5xl bg-[#151E2E] border-2 border-[#FF5A1F]/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 bg-[#111827] border-b border-[#1F293D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/20 border border-[#FF5A1F] flex items-center justify-center text-[#FF5A1F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Side-by-Side Candidate Comparison</h3>
              <p className="text-xs text-[#A7B0C0]">Compare skills, domain fit, experience and availability matrices.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#151E2E] border border-[#1F293D] text-[#A7B0C0] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-6 overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F293D]">
                <th className="p-4 text-xs font-bold text-[#A7B0C0] uppercase tracking-wider w-44">Attribute</th>
                {candidates.map((cand) => (
                  <th key={cand.id} className="p-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-2">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#FF5A1F]"
                        />
                        <button
                          onClick={() => onRemoveFromCompare(cand.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#080D16] border border-[#FF5A1F] text-xs text-[#A7B0C0] hover:text-white flex items-center justify-center"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-white">{cand.name}</h4>
                      <span className="text-[11px] text-[#A7B0C0]">{cand.role}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D]/60 text-xs">
              
              {/* Overall Match */}
              <tr className="bg-[#111827]/40">
                <td className="p-4 font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#FF5A1F]" />
                  Overall Match Score
                </td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FF5A1F]/20 text-[#FF7A3D] font-extrabold text-sm border border-[#FF5A1F]/40">
                      {cand.matchScore}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Experience */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Experience Level</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center font-bold text-white">
                    {cand.experienceYears} Years
                  </td>
                ))}
              </tr>

              {/* Skills Match */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Skills Match Score</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center">
                    <span className="font-bold text-[#FF5A1F]">{cand.breakdown.skills}%</span>
                  </td>
                ))}
              </tr>

              {/* Domain Match */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Domain Match</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center">
                    <span className="font-bold text-[#FF7A3D]">{cand.breakdown.domain}%</span>
                  </td>
                ))}
              </tr>

              {/* Availability */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Availability</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center">
                    <span className="font-bold text-[#22C55E]">{cand.availability} hrs/wk ({cand.breakdown.availability}%)</span>
                  </td>
                ))}
              </tr>

              {/* Work Mode */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Work Mode</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center text-white">
                    {cand.workMode}
                  </td>
                ))}
              </tr>

              {/* Education */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Education / Institution</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center text-white">
                    <div>{cand.college}</div>
                    <div className="text-[10px] text-[#A7B0C0]">{cand.degree}</div>
                  </td>
                ))}
              </tr>

              {/* Skills list */}
              <tr>
                <td className="p-4 font-medium text-[#A7B0C0]">Key Skills</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {cand.skills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-[#111827] text-[10px] text-gray-200 border border-[#1F293D]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr className="bg-[#111827]/80">
                <td className="p-4 font-bold text-white">Actions</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="p-4 text-center">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onInvite(cand)}
                        className="w-full py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white font-bold text-xs transition-all shadow-sm"
                      >
                        {cand.isInvited ? 'Invited' : 'Invite Candidate'}
                      </button>
                      <button
                        onClick={() => onShortlist(cand.id)}
                        className={`w-full py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          cand.isShortlisted
                            ? 'bg-[#22C55E]/15 border-[#22C55E] text-[#22C55E]'
                            : 'border-[#1F293D] text-[#A7B0C0] hover:text-white'
                        }`}
                      >
                        {cand.isShortlisted ? '✓ Shortlisted' : '+ Shortlist'}
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#111827] border-t border-[#1F293D] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#151E2E] text-white text-xs font-semibold hover:bg-[#1F293D]"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
