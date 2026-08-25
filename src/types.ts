export type UserRole = 'student' | 'leader';
export type UserPersona = 'student' | 'leader';

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  college: string;
  degree: string;
  year: string;
  bio: string;
  location: string;
  skills: string[];
  interests: string[];
  experienceYears: number;
  projectsExperience: {
    id: string;
    name: string;
    description: string;
    role: string;
    technologies: string[];
    link?: string;
  }[];
  certifications: string[];
  availabilityHours: number;
  workMode: 'Remote' | 'Hybrid' | 'On-site' | 'Any';
  preferredRoles: string[];
  preferredProjectTypes: string[];
  lookingFor: string[];
  status: string;
}

export interface ProjectRole {
  id: string;
  title: string;
  countRequired: number;
  countFilled: number;
  minExperienceYears: number;
  preferredExperienceYears?: number;
  requiredSkills: string[];
  preferredSkills?: string[];
  responsibilities: string[];
  availabilityHours: number;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  compensation?: string;
}

export interface MatchBreakdown {
  overall: number;
  skills: number;
  interest: number;
  experience: number;
  availability: number;
  reason: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  experienceYears: number;
  skills: string[];
  domain: string;
  location: string;
  availability: number; // hours/wk
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  matchScore: number;
  breakdown: {
    skills: number;
    experience: number;
    domain: number;
    availability: number;
    projectCompatibility: number;
  };
  bio: string;
  college: string;
  degree: string;
  year: string;
  lookingFor: string[];
  isShortlisted?: boolean;
  isInvited?: boolean;
  invitedRole?: string;
}

export interface Task {
  id: string;
  title: string;
  assigneeName: string;
  assigneeAvatar: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  message: string;
  timestamp: string;
  isAI?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description: string;
}

export interface ProjectTeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  matchScore: number;
  joinedAt: string;
}

export interface Application {
  id: string;
  projectId: string;
  projectName: string;
  roleId: string;
  roleTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  matchScore: number;
  status: 'Pending' | 'Accepted' | 'Shortlisted' | 'Rejected';
  appliedAt: string;
  pitch?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  projectType: 'Startup' | 'Research' | 'Hackathon' | 'Academic' | 'Open Source';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  teamSizeCurrent: number;
  teamSizeMax: number;
  requiredSkills: string[];
  availableRoles: ProjectRole[];
  leader: {
    name: string;
    avatar: string;
    role: string;
    organization: string;
  };
  matchBreakdown: MatchBreakdown;
  status: 'Recruiting' | 'In Progress' | 'Completed';
  createdAt: string;
  progress: number;
  compatibilityScore: number;
  skillCoverage: {
    [skillCategory: string]: number;
  };
  skillGaps: string[];
  recommendedAction?: string;
  teamMembers: ProjectTeamMember[];
  tasks: Task[];
  chatMessages: ChatMessage[];
  milestones: Milestone[];
  filesCount: number;
  budgetRange?: string;
}

export interface NotificationItem {
  id: string;
  type: 'match' | 'view' | 'accepted' | 'invite' | 'application' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTab?: string;
}
