import { Project, Candidate, StudentProfile, NotificationItem, Application } from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'user-student-1',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'Machine Learning & AI Student Researcher',
  college: 'Stanford University',
  degree: 'B.S. in Computer Science',
  year: 'Class of 2026',
  bio: 'Passionate about Deep Learning, Natural Language Processing, and Bio-Medical AI applications. Experienced in PyTorch, TensorFlow, and full-stack integration with React and FastAPI.',
  location: 'San Francisco, CA (Remote / Hybrid)',
  skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'React', 'Java', 'NLP', 'SQL', 'Docker', 'FastAPI'],
  interests: ['Healthcare AI', 'Web Development', 'FinTech', 'Open Source', 'Distributed Systems'],
  experienceYears: 4,
  projectsExperience: [
    {
      id: 'pexp-1',
      name: 'MediScan ML Diagnostics',
      description: 'Built a convolutional vision model to detect retinal pathology with 96.4% test accuracy using PyTorch and FastAPI.',
      role: 'Lead ML Engineer',
      technologies: ['PyTorch', 'Computer Vision', 'FastAPI'],
      link: 'github.com/alexmorgan/mediscan'
    },
    {
      id: 'pexp-2',
      name: 'EduQuery Conversational Assistant',
      description: 'RAG-powered conversational engine for university course materials with semantic chunking and vector search.',
      role: 'Full Stack & AI Developer',
      technologies: ['NLP', 'Vector DB', 'React', 'Python'],
      link: 'github.com/alexmorgan/eduquery'
    }
  ],
  certifications: [
    'DeepLearning.AI Deep Learning Specialization',
    'AWS Certified Cloud Practitioner',
    'TensorFlow Developer Certificate'
  ],
  availabilityHours: 20,
  workMode: 'Remote',
  preferredRoles: ['Machine Learning Engineer', 'AI Researcher', 'Backend Engineer'],
  preferredProjectTypes: ['Startup', 'Research', 'Hackathon'],
  lookingFor: [
    'Academic Projects',
    'Collaborative Startups',
    'Hackathon Teams'
  ],
  status: 'Open to Projects'
};

export const initialCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Machine Learning Engineer',
    experienceYears: 5,
    skills: ['Python', 'TensorFlow', 'NLP', 'PyTorch', 'Computer Vision', 'FastAPI', 'Docker'],
    domain: 'Healthcare AI',
    location: 'San Francisco, CA (Remote)',
    availability: 20,
    workMode: 'Remote',
    matchScore: 98,
    breakdown: {
      skills: 98,
      experience: 96,
      domain: 95,
      availability: 100,
      projectCompatibility: 97,
    },
    bio: 'Experienced ML engineer specializing in clinical diagnostic NLP models, sequence transformers, and edge model optimization.',
    college: 'Stanford University',
    degree: 'B.S. in Computer Science',
    year: 'Class of 2026',
    lookingFor: ['Healthcare Startups', 'AI Research', 'Competitions'],
    isShortlisted: true,
  },
  {
    id: 'cand-2',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Lead UI/UX & Design Systems Designer',
    experienceYears: 4,
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Tailwind CSS', 'Micro-interactions'],
    domain: 'Product Design & Healthcare UI',
    location: 'Austin, TX (Hybrid)',
    availability: 25,
    workMode: 'Hybrid',
    matchScore: 94,
    breakdown: {
      skills: 95,
      experience: 92,
      domain: 94,
      availability: 95,
      projectCompatibility: 94,
    },
    bio: 'Crafting accessible, human-centered interfaces for complex medical software and SaaS analytics portals.',
    college: 'University of Texas at Austin',
    degree: 'B.Des. in Interaction Design',
    year: 'Class of 2025',
    lookingFor: ['Startups', 'Research Labs', 'Hackathons'],
    isShortlisted: true,
  },
  {
    id: 'cand-3',
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Distributed Backend & Cloud Systems Lead',
    experienceYears: 6,
    skills: ['Go', 'Rust', 'Kubernetes', 'gRPC', 'PostgreSQL', 'Redis', 'Microservices'],
    domain: 'FinTech & High-Throughput Cloud',
    location: 'Seattle, WA (Remote)',
    availability: 20,
    workMode: 'Remote',
    matchScore: 96,
    breakdown: {
      skills: 97,
      experience: 98,
      domain: 92,
      availability: 96,
      projectCompatibility: 96,
    },
    bio: 'Architecting zero-downtime distributed microservices, low-latency transaction pipelines, and resilient cloud backends.',
    college: 'University of Washington',
    degree: 'M.S. Computer Science',
    year: 'Alumni',
    lookingFor: ['FinTech Startups', 'Open Source Infrastructure'],
    isShortlisted: false,
  },
  {
    id: 'cand-4',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Data Engineer & AI Pipeline Specialist',
    experienceYears: 3,
    skills: ['Apache Spark', 'Python', 'Snowflake', 'dbt', 'Airflow', 'Kafka', 'SQL'],
    domain: 'Data Infrastructure & ML Ops',
    location: 'Boston, MA (Remote)',
    availability: 15,
    workMode: 'Remote',
    matchScore: 92,
    breakdown: {
      skills: 93,
      experience: 90,
      domain: 93,
      availability: 90,
      projectCompatibility: 92,
    },
    bio: 'Constructing robust streaming pipelines and clean data lakes for real-time inference and analytics.',
    college: 'MIT',
    degree: 'M.S. Data Science',
    year: 'Graduate Student',
    lookingFor: ['Research', 'Startups', 'Competitions'],
    isShortlisted: false,
  },
  {
    id: 'cand-5',
    name: 'Liam Wright',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Cloud & DevOps Engineer',
    experienceYears: 4,
    skills: ['Docker', 'AWS', 'Terraform', 'CI/CD', 'GitHub Actions', 'Prometheus', 'Linux'],
    domain: 'Cloud Infrastructure',
    location: 'New York, NY (Remote)',
    availability: 15,
    workMode: 'Remote',
    matchScore: 95,
    breakdown: {
      skills: 96,
      experience: 93,
      domain: 92,
      availability: 94,
      projectCompatibility: 95,
    },
    bio: 'Passionate about automated infrastructure as code, robust observability, and cloud security pipelines.',
    college: 'Columbia University',
    degree: 'B.S. Computer Engineering',
    year: 'Class of 2025',
    lookingFor: ['Startups', 'Open Source', 'Hackathons'],
    isShortlisted: false,
  },
  {
    id: 'cand-6',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'Frontend & Full-Stack Engineer',
    experienceYears: 3,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Jest'],
    domain: 'Web Apps & Startups',
    location: 'Chicago, IL (Hybrid)',
    availability: 20,
    workMode: 'Hybrid',
    matchScore: 91,
    breakdown: {
      skills: 92,
      experience: 88,
      domain: 90,
      availability: 95,
      projectCompatibility: 91,
    },
    bio: 'Crafting responsive, high-performance web applications with clean component architecture and delightful micro-interactions.',
    college: 'Northwestern University',
    degree: 'B.S. Computer Science',
    year: 'Class of 2026',
    lookingFor: ['Hackathons', 'Startups'],
    isShortlisted: false,
  },
  {
    id: 'cand-7',
    name: 'Marcus Brody',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'Mobile Systems Developer',
    experienceYears: 4,
    skills: ['Java', 'Android', 'Kotlin', 'Firebase', 'Jetpack Compose', 'SQLite'],
    domain: 'Mobile Apps & Smart Systems',
    location: 'San Jose, CA (Remote)',
    availability: 25,
    workMode: 'Remote',
    matchScore: 89,
    breakdown: {
      skills: 90,
      experience: 89,
      domain: 87,
      availability: 92,
      projectCompatibility: 89,
    },
    bio: 'Android core engineer building high-efficiency background sync, sensor telemetry, and offline-first mobile applications.',
    college: 'UC Berkeley',
    degree: 'B.S. EECS',
    year: 'Alumni',
    lookingFor: ['Academic Projects', 'Startups'],
    isShortlisted: false,
  },
  {
    id: 'cand-8',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Bioinformatics & ML Researcher',
    experienceYears: 3,
    skills: ['Python', 'PyTorch', 'Genomics', 'Biopython', 'R', 'Machine Learning'],
    domain: 'Healthcare & Biotech',
    location: 'Boston, MA (Hybrid)',
    availability: 20,
    workMode: 'Remote',
    matchScore: 97,
    breakdown: {
      skills: 97,
      experience: 94,
      domain: 99,
      availability: 95,
      projectCompatibility: 98,
    },
    bio: 'PhD candidate working on neural sequence representations and structural drug discovery.',
    college: 'Harvard University',
    degree: 'PhD Computational Biology',
    year: 'Graduate Student',
    lookingFor: ['Research', 'Open Source'],
    isShortlisted: true,
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'AI Healthcare Assistant',
    tagline: 'Conversational clinical triage & diagnostic intelligence suite',
    description: 'Developing an advanced AI-powered healthcare assistant that analyzes patient symptom logs, integrates electronic health records, and assists medical practitioners with diagnostic hypotheses and drug interaction warnings.',
    domain: 'Healthcare',
    projectType: 'Startup',
    difficulty: 'Advanced',
    duration: '6 Months',
    teamSizeCurrent: 4,
    teamSizeMax: 5,
    requiredSkills: ['Python', 'Machine Learning', 'React', 'NLP', 'TensorFlow'],
    leader: {
      name: 'Dr. Evelyn Martinez',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
      role: 'Clinical AI Director & Founder',
      organization: 'BioSync Health Labs'
    },
    matchBreakdown: {
      overall: 96,
      skills: 95,
      interest: 94,
      experience: 88,
      availability: 92,
      reason: 'Strong alignment with your Python, Machine Learning, and NLP skills; perfect match with your Healthcare AI research interests.'
    },
    status: 'Recruiting',
    createdAt: '2 days ago',
    progress: 68,
    compatibilityScore: 94,
    skillCoverage: {
      'Machine Learning': 100,
      'Backend': 95,
      'Frontend': 90,
      'UI/UX': 100,
      'Data Engineering': 90
    },
    skillGaps: ['Cloud / DevOps'],
    recommendedAction: 'Find a DevOps Engineer for Kubernetes deployment and CI/CD pipelines.',
    budgetRange: '$2,000 - $4,000 Stipend + Equity',
    filesCount: 14,
    availableRoles: [
      {
        id: 'role-101',
        title: 'Machine Learning Engineer',
        countRequired: 1,
        countFilled: 0,
        minExperienceYears: 3,
        preferredExperienceYears: 5,
        requiredSkills: ['Python', 'TensorFlow', 'NLP', 'PyTorch'],
        preferredSkills: ['AWS', 'Docker', 'Computer Vision'],
        responsibilities: [
          'Develop & fine-tune multimodal healthcare LLM models',
          'Train symptom-recognition classification pipelines',
          'Build secure HIPAA-compliant NLP inference APIs',
          'Deploy optimized ONNX/TensorRT inference runtimes'
        ],
        availabilityHours: 20,
        workMode: 'Remote',
        compensation: '$2,500/mo'
      },
      {
        id: 'role-102',
        title: 'Lead UI/UX Designer',
        countRequired: 1,
        countFilled: 1,
        minExperienceYears: 2,
        requiredSkills: ['Figma', 'Design Systems', 'User Research'],
        responsibilities: [
          'Conduct clinical user journeys with doctors and nurses',
          'Create accessible high-contrast patient dashboards',
          'Maintain design system component tokens'
        ],
        availabilityHours: 15,
        workMode: 'Hybrid'
      },
      {
        id: 'role-103',
        title: 'Cloud & DevOps Engineer',
        countRequired: 1,
        countFilled: 0,
        minExperienceYears: 3,
        requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        responsibilities: [
          'Set up secure HIPAA-compliant cloud hosting',
          'Create automated testing and linting GitHub actions',
          'Manage Prometheus telemetry and uptime alarms'
        ],
        availabilityHours: 15,
        workMode: 'Remote'
      }
    ],
    teamMembers: [
      {
        id: 'mem-1',
        name: 'Dr. Evelyn Martinez',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        role: 'Founder & Clinical Lead',
        skills: ['Medicine', 'Clinical NLP', 'Leadership'],
        matchScore: 100,
        joinedAt: 'Project Founder'
      },
      {
        id: 'mem-2',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        role: 'Lead UI/UX Designer',
        skills: ['Figma', 'Design Systems', 'Tailwind'],
        matchScore: 94,
        joinedAt: '1 week ago'
      },
      {
        id: 'mem-3',
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'Backend Systems Lead',
        skills: ['Go', 'PostgreSQL', 'FastAPI'],
        matchScore: 96,
        joinedAt: '4 days ago'
      },
      {
        id: 'mem-4',
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'Data Engineer',
        skills: ['Python', 'SQL', 'Airflow'],
        matchScore: 92,
        joinedAt: '2 days ago'
      }
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Integrate PubMed biomedical vocabulary embedding models',
        assigneeName: 'Alex Morgan',
        assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'In Progress',
        priority: 'High',
        dueDate: 'Aug 30, 2026'
      },
      {
        id: 'task-2',
        title: 'Design clinical consultation notes summary view',
        assigneeName: 'Sarah Jenkins',
        assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        status: 'Done',
        priority: 'Medium',
        dueDate: 'Aug 24, 2026'
      },
      {
        id: 'task-3',
        title: 'Implement encrypted FHIR patient record schema validation',
        assigneeName: 'David Chen',
        assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'To Do',
        priority: 'High',
        dueDate: 'Sep 05, 2026'
      }
    ],
    chatMessages: [
      {
        id: 'msg-1',
        senderName: 'Dr. Evelyn Martinez',
        senderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        senderRole: 'Clinical AI Director',
        message: 'Welcome everyone! We have finalized the clinical pilot parameters with the university hospital.',
        timestamp: '10:30 AM'
      },
      {
        id: 'msg-2',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        senderRole: 'UI/UX Designer',
        message: 'Uploaded the updated high-fidelity doctor triage prototype in the Files section!',
        timestamp: '11:15 AM'
      }
    ],
    milestones: [
      {
        id: 'ms-1',
        title: 'Phase 1: Architecture & Model Validation',
        date: 'Month 1',
        completed: true,
        description: 'Establish foundational transformers and validate NLP accuracy > 94%.'
      },
      {
        id: 'ms-2',
        title: 'Phase 2: HIPAA Compliant API & EHR Integration',
        date: 'Month 3',
        completed: false,
        description: 'Connect live test endpoints with synthetic patient streams.'
      },
      {
        id: 'ms-3',
        title: 'Phase 3: Beta Clinical Pilot Deployment',
        date: 'Month 6',
        completed: false,
        description: 'Deploy web client and conduct pilot evaluations with 50 doctors.'
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Smart Campus App',
    tagline: 'IoT sensor network, indoor navigation & peer resource sharing',
    description: 'An integrated mobile ecosystem connecting campus sensors, library desk occupancy monitors, dining hall wait times, and collaborative study group matchmaking.',
    domain: 'Education',
    projectType: 'Academic',
    difficulty: 'Intermediate',
    duration: '4 Months',
    teamSizeCurrent: 3,
    teamSizeMax: 4,
    requiredSkills: ['Java', 'Android', 'Firebase', 'IoT', 'Kotlin'],
    leader: {
      name: 'Zachary Cole',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      role: 'Head of Student Tech Council',
      organization: 'UC Berkeley Open Campus'
    },
    matchBreakdown: {
      overall: 91,
      skills: 88,
      interest: 92,
      experience: 90,
      availability: 95,
      reason: 'Aligns with your Java and full-stack software experience, plus student community focus.'
    },
    status: 'Recruiting',
    createdAt: '4 days ago',
    progress: 45,
    compatibilityScore: 88,
    skillCoverage: {
      'Mobile Development': 95,
      'Backend & Firebase': 90,
      'UI/UX': 80,
      'Hardware / IoT': 85
    },
    skillGaps: ['UI/UX Designer'],
    budgetRange: 'Student Council Grant ($5,000)',
    filesCount: 6,
    availableRoles: [
      {
        id: 'role-201',
        title: 'Android Developer',
        countRequired: 1,
        countFilled: 0,
        minExperienceYears: 2,
        requiredSkills: ['Java', 'Android', 'Firebase', 'Kotlin'],
        responsibilities: [
          'Implement BLE beacon indoor navigation routines',
          'Create real-time Firebase sync for study rooms'
        ],
        availabilityHours: 15,
        workMode: 'Remote'
      }
    ],
    teamMembers: [
      {
        id: 'mem-201',
        name: 'Zachary Cole',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        role: 'Project Lead',
        skills: ['Java', 'Project Management'],
        matchScore: 100,
        joinedAt: 'Founder'
      }
    ],
    tasks: [],
    chatMessages: [],
    milestones: []
  },
  {
    id: 'proj-3',
    name: 'Vortex Quantum Trading Engine',
    tagline: 'High-frequency algorithmic market-making and arbitrage engine',
    description: 'Developing high-throughput, low-latency algorithmic trading infrastructure using Rust, Python time-series models, and real-time order book execution.',
    domain: 'FinTech',
    projectType: 'Startup',
    difficulty: 'Advanced',
    duration: '6 Months',
    teamSizeCurrent: 2,
    teamSizeMax: 4,
    requiredSkills: ['Rust', 'Python', 'Quantitative Analysis', 'Distributed Systems', 'C++'],
    leader: {
      name: 'Julian Vance',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      role: 'Managing Partner',
      organization: 'Vortex Capital AI'
    },
    matchBreakdown: {
      overall: 89,
      skills: 85,
      interest: 90,
      experience: 92,
      availability: 90,
      reason: 'Fits your strong mathematical foundation and distributed systems capabilities.'
    },
    status: 'Recruiting',
    createdAt: '5 days ago',
    progress: 30,
    compatibilityScore: 91,
    skillCoverage: {
      'Quant Algorithms': 100,
      'Low-Latency Execution': 90,
      'Data Feeds': 85
    },
    skillGaps: ['Quantitative Python Researcher'],
    budgetRange: '$4,000/mo + Performance Bonus',
    filesCount: 8,
    availableRoles: [
      {
        id: 'role-301',
        title: 'Quantitative ML Engineer',
        countRequired: 1,
        countFilled: 0,
        minExperienceYears: 3,
        requiredSkills: ['Python', 'PyTorch', 'Time Series', 'NumPy'],
        responsibilities: [
          'Backtest statistical arbitrage alphas',
          'Deploy neural forecasting models to live execution'
        ],
        availabilityHours: 20,
        workMode: 'Remote'
      }
    ],
    teamMembers: [
      {
        id: 'mem-301',
        name: 'Julian Vance',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        role: 'Founder',
        skills: ['Trading', 'Rust'],
        matchScore: 100,
        joinedAt: 'Founder'
      }
    ],
    tasks: [],
    chatMessages: [],
    milestones: []
  },
  {
    id: 'proj-4',
    name: 'CyberShield Zero-Trust Mesh',
    tagline: 'Autonomous AI vulnerability triage & automated patch validation',
    description: 'Decentralized zero-trust network monitoring tool that proactively discovers API security leaks and validates cryptographic authentication payloads.',
    domain: 'Cybersecurity',
    projectType: 'Research',
    difficulty: 'Advanced',
    duration: '5 Months',
    teamSizeCurrent: 3,
    teamSizeMax: 4,
    requiredSkills: ['Python', 'Docker', 'Network Security', 'Cryptography', 'Linux'],
    leader: {
      name: 'Prof. Henrik Lindqvist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      role: 'Principal Investigator',
      organization: 'Nordic Cyber Institute'
    },
    matchBreakdown: {
      overall: 87,
      skills: 89,
      interest: 84,
      experience: 86,
      availability: 90,
      reason: 'Matches your systems and Python backend engineering proficiency.'
    },
    status: 'Recruiting',
    createdAt: '1 week ago',
    progress: 50,
    compatibilityScore: 90,
    skillCoverage: {
      'Security Auditing': 95,
      'Systems Engineering': 90
    },
    skillGaps: ['Automated Exploit Tester'],
    budgetRange: 'Research Fellowship ($3,500/mo)',
    filesCount: 10,
    availableRoles: [
      {
        id: 'role-401',
        title: 'Security Research Engineer',
        countRequired: 1,
        countFilled: 0,
        minExperienceYears: 2,
        requiredSkills: ['Python', 'Linux', 'Network Protocols'],
        responsibilities: [
          'Build automated payload fuzzing benchmarks',
          'Write formal verification reports'
        ],
        availabilityHours: 15,
        workMode: 'Remote'
      }
    ],
    teamMembers: [],
    tasks: [],
    chatMessages: [],
    milestones: []
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'match',
    title: 'New High-Score Project Match!',
    message: 'AI Healthcare Assistant has a 96% match with your ML & Python profile.',
    timestamp: '10m ago',
    read: false,
    linkTab: 'explore'
  },
  {
    id: 'notif-2',
    type: 'invite',
    title: 'Team Invitation Received',
    message: 'Dr. Evelyn Martinez invited you to join AI Healthcare Assistant as Lead ML Engineer.',
    timestamp: '2h ago',
    read: false,
    linkTab: 'student-view'
  },
  {
    id: 'notif-3',
    type: 'view',
    title: 'Profile Viewed',
    message: 'Project Leader from Vortex Capital AI reviewed your quantitative skills.',
    timestamp: '5h ago',
    read: true,
    linkTab: 'student-view'
  },
  {
    id: 'notif-4',
    type: 'accepted',
    title: 'Application Shortlisted!',
    message: 'Your application for Smart Campus App was moved to the Shortlist stage.',
    timestamp: '1d ago',
    read: true,
    linkTab: 'student-view'
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-1',
    projectId: 'proj-1',
    projectName: 'AI Healthcare Assistant',
    roleId: 'role-101',
    roleTitle: 'Machine Learning Engineer',
    studentId: 'user-student-1',
    studentName: 'Alex Morgan',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    matchScore: 98,
    status: 'Shortlisted',
    appliedAt: '2 days ago',
    pitch: 'I would love to help optimize the clinical NLP triage model! My previous research in diagnostic transformers aligns directly with your mission.'
  },
  {
    id: 'app-2',
    projectId: 'proj-2',
    projectName: 'Smart Campus App',
    roleId: 'role-201',
    roleTitle: 'Android Developer',
    studentId: 'cand-7',
    studentName: 'Marcus Brody',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    matchScore: 89,
    status: 'Accepted',
    appliedAt: '3 days ago',
    pitch: 'Built 3 production Android apps with Firebase real-time database and BLE sensor telemetry.'
  }
];
