import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlowchartSection } from './components/FlowchartSection';
import { TwoSidedSection } from './components/TwoSidedSection';
import { PersonalizedMatchingSection } from './components/PersonalizedMatchingSection';
import { ProjectDiscovery } from './components/ProjectDiscovery';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { FindTalent } from './components/FindTalent';
import { CandidateModal } from './components/CandidateModal';
import { CandidateComparisonModal } from './components/CandidateComparisonModal';
import { LeaderDashboard } from './components/LeaderDashboard';
import { CreateProjectModal } from './components/CreateProjectModal';
import { AITeamBuilderModal } from './components/AITeamBuilderModal';
import { StudentProfileView } from './components/StudentProfileView';
import { WorkspaceView } from './components/WorkspaceView';
import { Footer } from './components/Footer';

import { 
  initialProjects, 
  initialCandidates, 
  initialStudentProfile, 
  initialApplications, 
  initialNotifications 
} from './data/mockData';
import { 
  Project, 
  Candidate, 
  StudentProfile, 
  Application, 
  NotificationItem, 
  UserPersona 
} from './types';

export function App() {
  // Navigation & Persona State
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('student');

  // Application Data States
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialStudentProfile);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Modals & Active Selections
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [comparisonCandidates, setComparisonCandidates] = useState<Candidate[]>([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState<boolean>(false);
  const [aiBuilderProject, setAiBuilderProject] = useState<Project | null>(null);
  const [activeWorkspaceProject, setActiveWorkspaceProject] = useState<Project>(initialProjects[0]);

  // Handle Persona Toggle
  const handlePersonaChange = (persona: UserPersona) => {
    setCurrentPersona(persona);
    if (persona === 'leader' && activeTab === 'student-view') {
      setActiveTab('leader-view');
    } else if (persona === 'student' && activeTab === 'leader-view') {
      setActiveTab('student-view');
    }
  };

  // Flowchart Step Click
  const handleFlowchartStepClick = (stepIndex: number) => {
    const tabMapping = [
      'explore',       // 01: Discover
      'student-view',  // 02: Create Profile
      'explore',       // 03: Match Skills
      'talent',        // 04: Find Teammates
      'leader-view',   // 05: Join/Form Team
      'workspace',     // 06: Collaborate
    ];
    setActiveTab(tabMapping[stepIndex] || 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student applies to a role
  const handleApplyRole = (projectId: string, roleId: string, roleTitle: string, note: string) => {
    const proj = projects.find(p => p.id === projectId);
    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId: projectId,
      projectName: proj?.name || 'AI Healthcare Assistant',
      roleId: roleId,
      roleTitle: roleTitle,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      studentAvatar: studentProfile.avatar,
      matchScore: proj?.matchBreakdown.overall || 96,
      status: 'Pending',
      appliedAt: 'Just now',
      pitch: note
    };

    setApplications([newApp, ...applications]);

    // Push notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Application Submitted',
      message: `Your application for ${roleTitle} on ${proj?.name} was received.`,
      timestamp: 'Just now',
      read: false,
      type: 'application'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Leader accepts application
  const handleAcceptApplication = (appId: string) => {
    setApplications(applications.map(a => a.id === appId ? { ...a, status: 'Accepted' } : a));
    const targetApp = applications.find(a => a.id === appId);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Application Approved!',
      message: `Congratulations! ${targetApp?.studentName || 'Applicant'} has been accepted to ${targetApp?.projectName}.`,
      timestamp: 'Just now',
      read: false,
      type: 'invite'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Leader rejects application
  const handleRejectApplication = (appId: string) => {
    setApplications(applications.map(a => a.id === appId ? { ...a, status: 'Rejected' } : a));
  };

  // Shortlist candidate
  const handleShortlistCandidate = (candidateId: string) => {
    setCandidates(candidates.map(c => 
      c.id === candidateId ? { ...c, isShortlisted: !c.isShortlisted } : c
    ));
  };

  // Invite candidate
  const handleInviteCandidate = (candidate: Candidate) => {
    setCandidates(candidates.map(c => 
      c.id === candidate.id ? { ...c, isInvited: true } : c
    ));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Invitation Sent',
      message: `Project invite sent to ${candidate.name} for open roles.`,
      timestamp: 'Just now',
      read: false,
      type: 'invite'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Invite with project & role
  const handleInviteToProject = (candidateId: string, projectId: string, roleId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    const targetProject = projects.find(p => p.id === projectId);

    setCandidates(candidates.map(c => 
      c.id === candidateId ? { ...c, isInvited: true } : c
    ));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Project Invitation Dispatched',
      message: `Invited ${candidate?.name} to join "${targetProject?.name}".`,
      timestamp: 'Just now',
      read: false,
      type: 'invite'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Leader creates new project
  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setActiveWorkspaceProject(newProject);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Project Published',
      message: `"${newProject.name}" is now live and accepting role applications.`,
      timestamp: 'Just now',
      read: false,
      type: 'system'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // AI Team composition apply
  const handleApplyTeamComposition = (projectId: string, chosenCandidates: Candidate[]) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        const newMembers = chosenCandidates.map(c => ({
          id: `mem-${c.id}`,
          name: c.name,
          avatar: c.avatar,
          role: c.role,
          skills: c.skills.slice(0, 3),
          matchScore: c.matchScore,
          joinedAt: 'AI Assembled'
        }));
        return {
          ...p,
          teamMembers: [...p.teamMembers, ...newMembers.filter(nm => !p.teamMembers.some(em => em.name === nm.name))],
          teamSizeCurrent: Math.min(p.teamSizeMax, p.teamMembers.length + newMembers.length),
          compatibilityScore: 97
        };
      }
      return p;
    });

    setProjects(updated);
    const refreshed = updated.find(p => p.id === projectId);
    if (refreshed) setActiveWorkspaceProject(refreshed);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'AI Squad Formed',
      message: `Optimal candidate squad synthesized and added to ${refreshed?.name}.`,
      timestamp: 'Just now',
      read: false,
      type: 'system'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Update workspace project
  const handleUpdateProject = (updated: Project) => {
    setProjects(projects.map(p => p.id === updated.id ? updated : p));
    setActiveWorkspaceProject(updated);
  };

  return (
    <div className="min-h-screen bg-[#080D16] text-white flex flex-col selection:bg-[#FF5A1F] selection:text-white">
      
      {/* Universal Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentPersona={currentPersona}
        onPersonaChange={handlePersonaChange}
        notifications={notifications}
        onMarkNotificationRead={(id) => {
          setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        }}
        onClearNotifications={() => setNotifications([])}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: LANDING PAGE */}
        {activeTab === 'landing' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onExploreProjects={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onFindTalent={() => {
                setActiveTab('talent');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProjectPreview={(id) => {
                const found = projects.find(p => p.id === id);
                if (found) setSelectedProject(found);
              }}
            />

            {/* 6 Steps Flowchart Section */}
            <FlowchartSection onStepClick={handleFlowchartStepClick} />

            {/* Two-Sided Platform Section */}
            <TwoSidedSection
              onExploreProjects={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCreateProject={() => {
                setShowCreateProjectModal(true);
              }}
            />

            {/* Personalized "Projects You May Like" Transparent Match Section */}
            <PersonalizedMatchingSection
              projects={projects}
              currentUser={studentProfile}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />

            {/* Quick Explore Showcase */}
            <ProjectDiscovery
              projects={projects}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
          </div>
        )}

        {/* VIEW 2: PROJECT DISCOVERY */}
        {activeTab === 'explore' && (
          <ProjectDiscovery
            projects={projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {/* VIEW 3: FIND TALENT & MATCHING */}
        {activeTab === 'talent' && (
          <FindTalent
            candidates={candidates}
            projects={projects}
            onViewCandidate={(cand) => setSelectedCandidate(cand)}
            onShortlistCandidate={handleShortlistCandidate}
            onInviteCandidate={handleInviteCandidate}
            onOpenComparison={(selected) => setComparisonCandidates(selected)}
          />
        )}

        {/* VIEW 4: STUDENT PROFILE */}
        {activeTab === 'student-view' && (
          <StudentProfileView
            profile={studentProfile}
            applications={applications}
            onUpdateProfile={(updated) => setStudentProfile(updated)}
            onExploreProjects={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: LEADER DASHBOARD */}
        {activeTab === 'leader-view' && (
          <LeaderDashboard
            projects={projects}
            candidates={candidates}
            applications={applications}
            onOpenCreateProject={() => setShowCreateProjectModal(true)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenWorkspace={(proj) => {
              setActiveWorkspaceProject(proj);
              setActiveTab('workspace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLaunchAITeamBuilder={(proj) => setAiBuilderProject(proj)}
            onAcceptApplication={handleAcceptApplication}
            onRejectApplication={handleRejectApplication}
            onInviteCandidate={handleInviteCandidate}
            onViewCandidate={(cand) => setSelectedCandidate(cand)}
          />
        )}

        {/* VIEW 6: COLLABORATION WORKSPACE */}
        {activeTab === 'workspace' && (
          <WorkspaceView
            project={activeWorkspaceProject}
            currentUser={studentProfile}
            onUpdateProject={handleUpdateProject}
            onBackToDashboard={() => {
              setActiveTab(currentPersona === 'leader' ? 'leader-view' : 'student-view');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* MODALS */}

      {/* 1. Project Details & Apply Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          currentUser={studentProfile}
          onClose={() => setSelectedProject(null)}
          onApplyRole={handleApplyRole}
          hasApplied={applications.some(a => a.projectId === selectedProject.id)}
        />
      )}

      {/* 2. Create Project Multi-Step Wizard Modal */}
      {showCreateProjectModal && (
        <CreateProjectModal
          onClose={() => setShowCreateProjectModal(false)}
          onCreateProject={handleCreateProject}
        />
      )}

      {/* 3. Candidate Profile Details Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          projects={projects}
          onClose={() => setSelectedCandidate(null)}
          onShortlist={handleShortlistCandidate}
          onInviteToProject={handleInviteToProject}
        />
      )}

      {/* 4. Side-by-Side Candidate Comparison Modal */}
      {comparisonCandidates.length > 0 && (
        <CandidateComparisonModal
          candidates={comparisonCandidates}
          onClose={() => setComparisonCandidates([])}
          onShortlist={handleShortlistCandidate}
          onInvite={handleInviteCandidate}
          onRemoveFromCompare={(id) => {
            setComparisonCandidates(comparisonCandidates.filter(c => c.id !== id));
          }}
        />
      )}

      {/* 5. AI Team Builder Modal */}
      {aiBuilderProject && (
        <AITeamBuilderModal
          project={aiBuilderProject}
          candidates={candidates}
          onClose={() => setAiBuilderProject(null)}
          onApplyTeamComposition={handleApplyTeamComposition}
        />
      )}

    </div>
  );
}

export default App;
