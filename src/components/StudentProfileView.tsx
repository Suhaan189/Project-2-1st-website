import React, { useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Clock, 
  Code, 
  Briefcase, 
  Heart, 
  Plus, 
  Trash2, 
  CheckCircle, 
  ExternalLink, 
  FolderGit2, 
  Sparkles,
  Zap,
  Edit3,
  Award
} from 'lucide-react';
import { StudentProfile, Application, Project } from '../types';

interface StudentProfileViewProps {
  profile: StudentProfile;
  applications: Application[];
  onUpdateProfile: (updated: StudentProfile) => void;
  onExploreProjects: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  profile,
  applications,
  onUpdateProfile,
  onExploreProjects
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [college, setCollege] = useState(profile.college);
  const [degree, setDegree] = useState(profile.degree);
  const [availabilityHours, setAvailabilityHours] = useState(profile.availabilityHours);
  const [workMode, setWorkMode] = useState(profile.workMode);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      name,
      bio,
      college,
      degree,
      availabilityHours,
      workMode
    });
    setIsEditing(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!profile.skills.includes(newSkill.trim())) {
      onUpdateProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    if (!profile.interests.includes(newInterest.trim())) {
      onUpdateProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
    }
    setNewInterest('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    onUpdateProfile({
      ...profile,
      interests: profile.interests.filter(i => i !== interestToRemove)
    });
  };

  return (
    <section id="student-profile-section" className="py-12 sm:py-16 bg-[#080D16] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151E2E] border-2 border-[#FF5A1F]/40 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-3xl object-cover ring-2 ring-[#FF5A1F] shadow-xl shadow-[#FF5A1F]/20"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold">
                    ● {profile.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#FF7A3D]">
                  {profile.degree} • {profile.college}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7B0C0] mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    {profile.availabilityHours} hrs/week availability
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A7B0C0]" />
                    {profile.location} ({profile.workMode})
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-[#1F293D] border border-[#FF5A1F] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Drawer */}
        {isEditing && (
          <div className="p-6 rounded-3xl bg-[#111827] border-2 border-[#FF5A1F] mb-8 space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold text-white mb-2">Update Your Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#A7B0C0] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#A7B0C0] uppercase mb-1">University / Institute</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#A7B0C0] uppercase mb-1">Major / Degree</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#A7B0C0] uppercase mb-1">Hours / Week Availability</label>
                <input
                  type="number"
                  value={availabilityHours}
                  onChange={(e) => setAvailabilityHours(Number(e.target.value))}
                  className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A7B0C0] uppercase mb-1">Bio Summary</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold rounded-xl"
            >
              Save Profile Changes
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Main Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Bio Summary */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-2">
                About & Experience Summary
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed bg-[#111827] p-4 rounded-2xl border border-[#1F293D]/60">
                {profile.bio}
              </p>
            </div>

            {/* Skills Matrix */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D]">
                  Technical Skills & Competencies ({profile.skills.length})
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111827] border border-[#1F293D] text-xs font-semibold text-white"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-[#A7B0C0] hover:text-red-400 text-xs"
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill form */}
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill (e.g. Next.js, PyTorch, GraphQL)..."
                  className="flex-1 bg-[#111827] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF5A1F] text-white text-xs font-bold rounded-xl hover:bg-[#FF7A3D]"
                >
                  + Add
                </button>
              </form>
            </div>

            {/* Projects Applied To Status */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D]">
                  Applied Project Applications ({applications.length})
                </h3>
                <button
                  onClick={onExploreProjects}
                  className="text-xs text-[#FF5A1F] hover:underline font-bold"
                >
                  Find More →
                </button>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-6 bg-[#111827] rounded-2xl border border-[#1F293D] p-4 text-xs text-[#A7B0C0]">
                  You haven't submitted any project applications yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-[#111827] border border-[#1F293D] flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white">{app.projectName}</h4>
                        <p className="text-xs text-[#A7B0C0]">Role: <strong className="text-white">{app.roleTitle}</strong> • Applied {app.appliedAt}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        app.status === 'Accepted'
                          ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                          : app.status === 'Pending'
                          ? 'bg-[#FF5A1F]/15 text-[#FF7A3D] border border-[#FF5A1F]/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience / Projects Portfolio */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-4">
                Verified Projects & Hackathon Portfolio
              </h3>
              <div className="space-y-3">
                {profile.projectsExperience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-2xl bg-[#111827] border border-[#1F293D]">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{exp.name}</h4>
                      <span className="text-[10px] text-[#A7B0C0] bg-[#151E2E] px-2 py-0.5 rounded">{exp.role}</span>
                    </div>
                    <p className="text-xs text-[#A7B0C0] mt-1">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#151E2E] text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar Stats & Interests */}
          <div className="space-y-6">
            
            {/* AI Fit Radar Card */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border-2 border-[#FF5A1F]/40 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#080D16] border-2 border-[#FF5A1F] mx-auto flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-[#FF5A1F]" />
              </div>
              <h4 className="text-base font-extrabold text-white">High Demand Profile</h4>
              <p className="text-xs text-[#A7B0C0] mt-1">
                Your combination of <strong>Machine Learning</strong> and <strong>Full-Stack Python</strong> ranks in the top 4% of platform seekers.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1F293D] flex justify-around text-center">
                <div>
                  <div className="text-lg font-bold text-white">96%</div>
                  <div className="text-[10px] text-[#A7B0C0] uppercase">Avg Fit</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#FF5A1F]">18</div>
                  <div className="text-[10px] text-[#A7B0C0] uppercase">Matches</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#22C55E]">2</div>
                  <div className="text-[10px] text-[#A7B0C0] uppercase">Invites</div>
                </div>
              </div>
            </div>

            {/* Domains & Interests */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-3">
                Project Interests
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111827] border border-[#1F293D] text-xs text-[#A7B0C0]"
                  >
                    <span>★ {interest}</span>
                    <button onClick={() => handleRemoveInterest(interest)} className="text-red-400 hover:text-white">×</button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddInterest} className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add interest domain..."
                  className="flex-1 bg-[#111827] border border-[#1F293D] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                />
                <button type="submit" className="px-3 py-1.5 bg-[#FF5A1F] text-white text-xs font-bold rounded-xl">
                  +
                </button>
              </form>
            </div>

            {/* Education Summary */}
            <div className="p-6 rounded-3xl bg-[#151E2E] border border-[#1F293D]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF7A3D] mb-3">
                Education
              </h3>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">{profile.college}</h4>
                  <p className="text-xs text-[#A7B0C0]">{profile.degree}</p>
                  <span className="text-[10px] text-[#22C55E]">Expected Graduation: 2026</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
