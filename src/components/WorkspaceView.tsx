import React, { useState } from 'react';
import { 
  FolderGit2, 
  Users, 
  MessageSquare, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Send, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Paperclip, 
  Download,
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react';
import { Project, Task, ChatMessage, StudentProfile } from '../types';

interface WorkspaceViewProps {
  project: Project;
  currentUser: StudentProfile;
  onUpdateProject: (updated: Project) => void;
  onBackToDashboard: () => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  project,
  currentUser,
  onUpdateProject,
  onBackToDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'chat' | 'files' | 'milestones'>('tasks');
  const [newMessage, setNewMessage] = useState('');
  
  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState(currentUser.name);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // Files state
  const [files, setFiles] = useState([
    { id: 'f-1', name: 'Clinical_NLP_System_Architecture_v2.pdf', size: '3.4 MB', uploadedBy: 'Dr. Evelyn Martinez', date: '2 days ago' },
    { id: 'f-2', name: 'Biomedical_Corpus_Dataset_Summary.csv', size: '18.2 MB', uploadedBy: 'Alex Morgan', date: 'Yesterday' },
    { id: 'f-3', name: 'UI_Mockups_Healthcare_Assistant.fig', size: '42.0 MB', uploadedBy: 'Sarah Jenkins', date: '3 hours ago' },
  ]);

  // Handle Send Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageObj: ChatMessage = {
      id: `chat-${Date.now()}`,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: 'Student Contributor',
      message: newMessage.trim(),
      timestamp: 'Just now'
    };

    onUpdateProject({
      ...project,
      chatMessages: [...project.chatMessages, messageObj]
    });
    setNewMessage('');
  };

  // Handle Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const createdTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      assigneeName: newTaskAssignee,
      assigneeAvatar: currentUser.avatar,
      status: 'To Do',
      priority: newTaskPriority,
      dueDate: 'In 4 days'
    };

    onUpdateProject({
      ...project,
      tasks: [...project.tasks, createdTask]
    });

    setNewTaskTitle('');
    setShowNewTaskForm(false);
  };

  // Handle Update Task Status
  const handleUpdateTaskStatus = (taskId: string, newStatus: 'To Do' | 'In Progress' | 'Done') => {
    const updatedTasks = project.tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    onUpdateProject({
      ...project,
      tasks: updatedTasks
    });
  };

  // Handle Toggle Milestone
  const handleToggleMilestone = (milestoneId: string) => {
    const updatedMilestones = project.milestones.map(m => 
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    onUpdateProject({
      ...project,
      milestones: updatedMilestones
    });
  };

  const tasksTodo = project.tasks.filter(t => t.status === 'To Do');
  const tasksInProgress = project.tasks.filter(t => t.status === 'In Progress');
  const tasksDone = project.tasks.filter(t => t.status === 'Done');

  return (
    <section id="workspace-section" className="py-12 sm:py-16 bg-[#080D16] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Top Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151E2E] border-2 border-[#FF5A1F]/40 shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FF5A1F]/20 text-[#FF7A3D]">
                  Active Collaboration Workspace
                </span>
                <span className="text-xs text-[#22C55E] font-bold">● Live Sync</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{project.name}</h1>
              <p className="text-xs text-[#A7B0C0] mt-1">{project.tagline}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2 mr-2">
                {project.teamMembers.map((m) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    alt={m.name}
                    title={`${m.name} (${m.role})`}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#FF5A1F]"
                  />
                ))}
              </div>

              <button
                onClick={onBackToDashboard}
                className="px-4 py-2 rounded-xl bg-[#111827] text-white text-xs font-bold border border-[#1F293D] hover:bg-[#1F293D]"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex border-b border-[#1F293D] mb-8 overflow-x-auto gap-2">
          {[
            { id: 'tasks', label: `Kanban Tasks (${project.tasks.length})`, icon: CheckSquare },
            { id: 'chat', label: `Team Discussion (${project.chatMessages.length})`, icon: MessageSquare },
            { id: 'files', label: `Shared Repository (${files.length})`, icon: FileText },
            { id: 'milestones', label: `Roadmap Milestones (${project.milestones.length})`, icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#FF5A1F] text-[#FF5A1F] bg-[#151E2E]/40'
                    : 'border-transparent text-[#A7B0C0] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: KANBAN TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Project Sprint Board</h3>
              <button
                onClick={() => setShowNewTaskForm(true)}
                className="px-4 py-2 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-[#FF5A1F]/20 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Task</span>
              </button>
            </div>

            {/* Modal for new task */}
            {showNewTaskForm && (
              <div className="p-5 rounded-2xl bg-[#111827] border-2 border-[#FF5A1F] space-y-3 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase text-white">Add New Sprint Task</h4>
                  <button onClick={() => setShowNewTaskForm(false)} className="text-[#A7B0C0] hover:text-white">✕</button>
                </div>
                <form onSubmit={handleAddTask} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task summary (e.g. Integrate PubMed biomedical embeddings dataset)..."
                    className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Priority</label>
                      <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2 text-xs text-white"
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#A7B0C0] mb-1">Assignee</label>
                      <select
                        value={newTaskAssignee}
                        onChange={(e) => setNewTaskAssignee(e.target.value)}
                        className="w-full bg-[#151E2E] border border-[#1F293D] rounded-xl p-2 text-xs text-white"
                      >
                        {project.teamMembers.map(m => (
                          <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2 bg-[#FF5A1F] text-white text-xs font-bold rounded-xl">
                    Save Task
                  </button>
                </form>
              </div>
            )}

            {/* 3 Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Column 1: To Do */}
              <div className="p-4 rounded-3xl bg-[#151E2E] border border-[#1F293D] flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1F293D]">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A7B0C0]" />
                    To Do ({tasksTodo.length})
                  </span>
                </div>
                <div className="space-y-3 flex-1">
                  {tasksTodo.map((task) => (
                    <div key={task.id} className="p-4 rounded-2xl bg-[#111827] border border-[#1F293D] hover:border-[#FF5A1F]/40 transition-all space-y-2">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-[#FF5A1F]/20 text-[#FF7A3D]'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-[#A7B0C0]">{task.dueDate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-snug">{task.title}</h4>
                      <div className="pt-2 flex items-center justify-between border-t border-[#1F293D]/60 text-[11px] text-[#A7B0C0]">
                        <span>{task.assigneeName}</span>
                        <button
                          onClick={() => handleUpdateTaskStatus(task.id, 'In Progress')}
                          className="text-[#FF5A1F] hover:underline font-bold text-[10px]"
                        >
                          Start →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: In Progress */}
              <div className="p-4 rounded-3xl bg-[#151E2E] border border-[#1F293D] flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1F293D]">
                  <span className="text-xs font-bold text-[#FF7A3D] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
                    In Progress ({tasksInProgress.length})
                  </span>
                </div>
                <div className="space-y-3 flex-1">
                  {tasksInProgress.map((task) => (
                    <div key={task.id} className="p-4 rounded-2xl bg-[#111827] border border-[#FF5A1F]/50 transition-all space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#FF5A1F]/20 text-[#FF7A3D]">
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-[#A7B0C0]">{task.dueDate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-snug">{task.title}</h4>
                      <div className="pt-2 flex items-center justify-between border-t border-[#1F293D]/60 text-[11px] text-[#A7B0C0]">
                        <span>{task.assigneeName}</span>
                        <button
                          onClick={() => handleUpdateTaskStatus(task.id, 'Done')}
                          className="text-[#22C55E] hover:underline font-bold text-[10px]"
                        >
                          Mark Done ✓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Done */}
              <div className="p-4 rounded-3xl bg-[#151E2E] border border-[#1F293D] flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1F293D]">
                  <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    Done ({tasksDone.length})
                  </span>
                </div>
                <div className="space-y-3 flex-1">
                  {tasksDone.map((task) => (
                    <div key={task.id} className="p-4 rounded-2xl bg-[#111827]/60 border border-[#22C55E]/30 space-y-2 opacity-80">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#22C55E]/20 text-[#22C55E]">
                          Completed
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-through text-gray-300 leading-snug">{task.title}</h4>
                      <div className="pt-2 text-[11px] text-[#A7B0C0] border-t border-[#1F293D]/40">
                        <span>Completed by {task.assigneeName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: CHAT DISCUSSION */}
        {activeTab === 'chat' && (
          <div className="bg-[#151E2E] border border-[#1F293D] rounded-3xl overflow-hidden flex flex-col h-[600px]">
            {/* Message Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {project.chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#FF5A1F]"
                  />
                  <div className="flex-1 bg-[#111827] p-4 rounded-2xl border border-[#1F293D]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{msg.senderName}</span>
                      <span className="text-[10px] text-[#A7B0C0]">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#111827] border-t border-[#1F293D] flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a team update or message..."
                className="flex-1 bg-[#151E2E] border border-[#1F293D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: FILES REPOSITORY */}
        {activeTab === 'files' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Project Artifacts & Data Repository</h3>
              <button
                onClick={() => alert('Simulated upload completed! File indexed in repository.')}
                className="px-4 py-2 bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {files.map((file) => (
                <div key={file.id} className="p-5 rounded-2xl bg-[#151E2E] border border-[#1F293D] flex flex-col justify-between">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-8 h-8 text-[#FF5A1F] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug break-all">{file.name}</h4>
                      <p className="text-[10px] text-[#A7B0C0] mt-1">{file.size} • by {file.uploadedBy}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Simulated download of ${file.name}`)}
                    className="w-full py-2 bg-[#111827] hover:bg-[#1F293D] border border-[#1F293D] rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MILESTONES & ROADMAP */}
        {activeTab === 'milestones' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-white mb-2">Project Sprint Roadmap</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  onClick={() => handleToggleMilestone(milestone.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    milestone.completed
                      ? 'bg-[#111827] border-[#22C55E]/40'
                      : 'bg-[#151E2E] border-[#1F293D] hover:border-[#FF5A1F]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      milestone.completed ? 'bg-[#22C55E] border-[#22C55E] text-white' : 'border-[#A7B0C0]'
                    }`}>
                      {milestone.completed && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${milestone.completed ? 'text-gray-300 line-through' : 'text-white'}`}>
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-[#A7B0C0]">{milestone.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FF7A3D] bg-[#111827] px-3 py-1 rounded-full border border-[#1F293D]">
                    {milestone.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
