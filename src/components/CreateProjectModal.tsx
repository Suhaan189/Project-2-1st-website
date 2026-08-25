import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  Clock, 
  MapPin, 
  DollarSign, 
  Sparkles 
} from 'lucide-react';
import { Project, ProjectRole } from '../types';

interface CreateProjectModalProps {
  onClose: () => void;
  onCreateProject: (newProject: Project) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onClose,
  onCreateProject
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 Form State
  const [projectName, setProjectName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('Healthcare');
  const [projectType, setProjectType] = useState<'Startup' | 'Research' | 'Hackathon' | 'Academic' | 'Open Source'>('Startup');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Advanced');
  const [duration, setDuration] = useState('6 Months');
  const [teamSizeMax, setTeamSizeMax] = useState<number>(5);

  // STEP 2 Form State (Roles list)
  const [roles, setRoles] = useState<ProjectRole[]>([
    {
      id: 'role-new-1',
      title: 'Machine Learning Engineer',
      countRequired: 1,
      countFilled: 0,
      minExperienceYears: 3,
      preferredExperienceYears: 5,
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
      preferredSkills: ['AWS', 'Docker', 'Computer Vision'],
      responsibilities: [
        'Develop and fine-tune multimodal AI models',
        'Train neural network pipelines and validate accuracy',
        'Deploy scalable REST/FastAPI inference microservices'
      ],
      availabilityHours: 20,
      workMode: 'Remote'
    }
  ]);

  // Active role input temporary state
  const [tempRoleTitle, setTempRoleTitle] = useState('');
  const [tempCount, setTempCount] = useState(1);
  const [tempMinExp, setTempMinExp] = useState(2);
  const [tempRequiredSkills, setTempRequiredSkills] = useState('');
  const [tempResponsibilities, setTempResponsibilities] = useState('');
  const [tempWorkMode, setTempWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [tempHours, setTempHours] = useState(20);

  // STEP 3 & 4
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [budgetRange, setBudgetRange] = useState('$2,000 - $3,500 Stipend + Equity');

  const addRoleToProject = () => {
    if (!tempRoleTitle.trim()) return;
    const newRole: ProjectRole = {
      id: `role-custom-${Date.now()}`,
      title: tempRoleTitle.trim(),
      countRequired: tempCount,
      countFilled: 0,
      minExperienceYears: tempMinExp,
      requiredSkills: tempRequiredSkills.split(',').map(s => s.trim()).filter(Boolean),
      responsibilities: tempResponsibilities.split('\n').map(s => s.trim()).filter(Boolean),
      availabilityHours: tempHours,
      workMode: tempWorkMode,
    };
    setRoles([...roles, newRole]);
    setTempRoleTitle('');
    setTempRequiredSkills('');
    setTempResponsibilities('');
  };

  const removeRole = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const handleFinish = () => {
    // Extract unique skills from roles
    const allSkills: string[] = Array.from(
      new Set(roles.flatMap(r => r.requiredSkills))
    );

    const createdProj: Project = {
      id: `proj-${Date.now()}`,
      name: projectName || 'Untitled AI Project',
      tagline: tagline || 'High impact collaborative engineering project',
      description: description || 'Exciting project formed through ProjectMatch to build breakthrough applications.',
      domain: domain,
      projectType: projectType,
      difficulty: difficulty,
      duration: duration,
      teamSizeCurrent: 1,
      teamSizeMax: teamSizeMax,
      requiredSkills: allSkills.length > 0 ? allSkills : ['Python', 'React', 'FastAPI'],
      availableRoles: roles,
      leader: {
        name: 'Dr. Evelyn Martinez',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        role: 'Project Lead',
        organization: 'Innovation Labs'
      },
      matchBreakdown: {
        overall: 95,
        skills: 96,
        interest: 94,
        experience: 90,
        availability: 95,
        reason: `Engineered for candidates skilled in ${allSkills.slice(0, 3).join(', ')}.`
      },
      status: 'Recruiting',
      createdAt: 'Just now',
      progress: 10,
      compatibilityScore: 92,
      skillCoverage: {
        'Engineering': 90,
        'Design': 85,
        'Domain Logic': 95
      },
      skillGaps: ['DevOps'],
      budgetRange: budgetRange,
      filesCount: 2,
      teamMembers: [
        {
          id: 'mem-lead',
          name: 'Dr. Evelyn Martinez',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
          role: 'Project Lead',
          skills: ['Architecture', 'Leadership'],
          matchScore: 100,
          joinedAt: 'Founder'
        }
      ],
      tasks: [
        {
          id: 'task-init-1',
          title: 'Team Onboarding & Kickoff Brief',
          assigneeName: 'Dr. Evelyn Martinez',
          assigneeAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
          status: 'To Do',
          priority: 'High',
          dueDate: 'Next Week'
        }
      ],
      chatMessages: [
        {
          id: 'chat-init-1',
          senderName: 'Dr. Evelyn Martinez',
          senderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
          senderRole: 'Leader',
          message: 'Project officially registered on ProjectMatch! Excited to assemble our team.',
          timestamp: 'Just now'
        }
      ],
      milestones: [
        {
          id: 'mile-init-1',
          title: 'Project Kickoff & Architecture Spec',
          date: 'Month 1',
          completed: false,
          description: 'Establish repository and data schemas.'
        }
      ]
    };

    onCreateProject(createdProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="create-project-wizard"
        className="relative w-full max-w-4xl bg-[#151E2E] border-2 border-[#FF5A1F]/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Wizard Header */}
        <div className="p-6 bg-[#111827] border-b border-[#1F293D] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A3D]">
              Multi-Step Project Wizard • Step {currentStep} of 4
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Create a New Project</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#151E2E] border border-[#1F293D] text-[#A7B0C0] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 bg-[#080D16] border-b border-[#1F293D] text-center text-xs font-bold">
          {[
            { num: 1, label: '1. Project Info' },
            { num: 2, label: '2. Define Roles' },
            { num: 3, label: '3. Availability' },
            { num: 4, label: '4. Budget & Review' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`py-3 px-2 border-b-2 cursor-pointer transition-all ${
                currentStep === s.num
                  ? 'border-[#FF5A1F] text-[#FF5A1F] bg-[#151E2E]/50'
                  : currentStep > s.num
                  ? 'border-[#22C55E] text-[#22C55E]'
                  : 'border-transparent text-[#A7B0C0]'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* Wizard Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: PROJECT INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Autonomous Robotic Drone Mapper, Smart Campus App..."
                  className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                  Short Tagline *
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="One sentence describing the core mission and innovation..."
                  className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                  Detailed Project Description *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the architectural goals, problem statement, technology stack, and milestones..."
                  className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                    Domain / Field
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Education">Education</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="Robotics">Robotics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as any)}
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  >
                    <option value="Startup">Startup</option>
                    <option value="Research">Research</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Academic">Academic</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Months, 6 Months, 1 Year"
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                    Target Team Size
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="15"
                    value={teamSizeMax}
                    onChange={(e) => setTeamSizeMax(Number(e.target.value))}
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DEFINE ROLES */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Configured Project Roles ({roles.length})</h4>
                <div className="space-y-3">
                  {roles.map((r, i) => (
                    <div key={r.id} className="p-4 rounded-xl bg-[#111827] border border-[#1F293D] flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{r.title}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5A1F]/15 text-[#FF7A3D] font-bold">
                            {r.countRequired} Required • {r.minExperienceYears}+ yrs exp
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {r.requiredSkills.map((sk, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#151E2E] text-gray-200 border border-[#1F293D]">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => removeRole(r.id)}
                        className="p-1.5 text-[#A7B0C0] hover:text-red-400"
                        title="Remove role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Role Card */}
              <div className="p-5 rounded-2xl bg-[#080D16] border border-[#FF5A1F]/40 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF7A3D] flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  Add Another Role
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Role Title</label>
                    <input
                      type="text"
                      value={tempRoleTitle}
                      onChange={(e) => setTempRoleTitle(e.target.value)}
                      placeholder="e.g. Backend Developer, UI/UX Designer..."
                      className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Quantity Needed</label>
                    <input
                      type="number"
                      min="1"
                      value={tempCount}
                      onChange={(e) => setTempCount(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Min Experience</label>
                    <input
                      type="number"
                      min="0"
                      value={tempMinExp}
                      onChange={(e) => setTempMinExp(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">
                    Required Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tempRequiredSkills}
                    onChange={(e) => setTempRequiredSkills(e.target.value)}
                    placeholder="e.g. React, TypeScript, GraphQL, Tailwind"
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">
                    Responsibilities (1 per line)
                  </label>
                  <textarea
                    rows={2}
                    value={tempResponsibilities}
                    onChange={(e) => setTempResponsibilities(e.target.value)}
                    placeholder="- Build responsive UI components&#10;- Optimize state management"
                    className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>

                <button
                  type="button"
                  onClick={addRoleToProject}
                  className="px-4 py-2 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  + Add Role to Project
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AVAILABILITY & WORK MODE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">
                  Expected Commitment (Hours / Week)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="flex-1 accent-[#FF5A1F]"
                  />
                  <span className="text-base font-extrabold text-[#FF5A1F] w-24">
                    {hoursPerWeek} hrs / wk
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-2">
                  Work Mode Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Remote', 'Hybrid', 'On-site'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setWorkMode(mode as any)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        workMode === mode
                          ? 'bg-[#FF5A1F] border-[#FF5A1F] text-white shadow-md'
                          : 'bg-[#111827] border-[#1F293D] text-[#A7B0C0] hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET & COMPENSATION REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7B0C0] mb-1.5">
                  Compensation / Grant Structure
                </label>
                <input
                  type="text"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  placeholder="e.g. $1,500 - $3,000 / month Stipend + Equity"
                  className="w-full bg-[#111827] border border-[#1F293D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>

              {/* Review Summary Box */}
              <div className="p-5 rounded-2xl bg-[#111827] border border-[#FF5A1F]/40 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  Project Review Summary
                </h4>
                <div className="text-xs space-y-1.5 text-[#A7B0C0]">
                  <p><strong className="text-white">Name:</strong> {projectName || 'Untitled Project'}</p>
                  <p><strong className="text-white">Domain:</strong> {domain} • {projectType} ({difficulty})</p>
                  <p><strong className="text-white">Roles ({roles.length}):</strong> {roles.map(r => r.title).join(', ')}</p>
                  <p><strong className="text-white">Commitment:</strong> {hoursPerWeek} hrs/week ({workMode})</p>
                  <p><strong className="text-white">Budget:</strong> {budgetRange}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        <div className="p-6 bg-[#111827] border-t border-[#1F293D] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 rounded-xl bg-[#151E2E] text-xs font-semibold text-white hover:bg-[#1F293D] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#FF5A1F]/25"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold transition-all shadow-xl shadow-[#FF5A1F]/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Project & Begin Matching</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
