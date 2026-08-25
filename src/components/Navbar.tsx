import React, { useState } from 'react';
import { 
  Sparkles, 
  Bell, 
  Menu, 
  X, 
  Briefcase, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  FolderGit2,
  Layers,
  Plus
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  currentPersona: UserRole;
  onPersonaChange: (persona: UserRole) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  onOpenCreateProject?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentPersona,
  onPersonaChange,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  onOpenCreateProject
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'explore', label: 'Explore Projects' },
    { id: 'talent', label: 'Find Talent' },
    { id: 'student-view', label: 'Student Profile' },
    { id: 'leader-view', label: 'Leader Dashboard' },
    { id: 'workspace', label: 'Workspace' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080D16]/90 border-b border-[#1F293D]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            id="navbar-brand-logo"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3D] flex items-center justify-center shadow-lg shadow-[#FF5A1F]/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-lg text-white">PM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white leading-none">
                PROJECT<span className="text-[#FF5A1F]">MATCH</span>
              </span>
              <span className="text-[10px] text-[#A7B0C0] tracking-wider uppercase font-semibold mt-1">
                AI Discovery & Team Engine
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-tab-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#151E2E] border border-[#FF5A1F]/60 shadow-md shadow-[#FF5A1F]/15'
                      : 'text-[#A7B0C0] hover:text-white hover:bg-[#111827]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side Persona Toggle & Notifications */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Persona Toggle: Student vs Leader */}
            <div className="flex items-center bg-[#111827] border border-[#1F293D] p-1 rounded-2xl shadow-inner">
              <button
                id="persona-btn-student"
                onClick={() => {
                  onPersonaChange('student');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPersona === 'student'
                    ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/30'
                    : 'text-[#A7B0C0] hover:text-white'
                }`}
                title="View platform as a Student / Specialist"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                id="persona-btn-leader"
                onClick={() => {
                  onPersonaChange('leader');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPersona === 'leader'
                    ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/30'
                    : 'text-[#A7B0C0] hover:text-white'
                }`}
                title="View platform as a Project Leader"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Leader</span>
              </button>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-[#111827] border border-[#1F293D] text-[#A7B0C0] hover:text-white hover:border-[#FF5A1F]/50 transition-all cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF5A1F] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-[#080D16]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#151E2E] border-2 border-[#FF5A1F]/40 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F293D]">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#FF5A1F]" />
                      <span className="font-bold text-sm text-white">Live Notifications</span>
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={onClearNotifications}
                        className="text-[10px] text-[#A7B0C0] hover:text-white"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-[#1F293D]/50 max-h-80 overflow-y-auto mt-2">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#A7B0C0]">No new notifications</div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            onMarkNotificationRead(notif.id);
                            if (notif.linkTab) onNavigate(notif.linkTab);
                            setShowNotifications(false);
                          }}
                          className={`py-3 px-2.5 rounded-xl cursor-pointer transition-colors ${
                            notif.read ? 'hover:bg-[#111827]/60' : 'bg-[#FF5A1F]/10 hover:bg-[#FF5A1F]/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-white">{notif.title}</p>
                            <span className="text-[10px] text-[#A7B0C0]">{notif.time}</span>
                          </div>
                          <p className="text-xs text-[#A7B0C0] mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Context Action */}
            {currentPersona === 'leader' && onOpenCreateProject && (
              <button
                onClick={onOpenCreateProject}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#FF7A3D] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5A1F]/25 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Project</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#111827] border border-[#1F293D] text-[#A7B0C0] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-[#1F293D] space-y-2">
            <div className="flex items-center justify-between p-2 mb-2 bg-[#111827] rounded-xl">
              <span className="text-xs text-[#A7B0C0] font-bold">Active Mode:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onPersonaChange('student')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    currentPersona === 'student' ? 'bg-[#FF5A1F] text-white' : 'text-[#A7B0C0]'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => onPersonaChange('leader')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    currentPersona === 'leader' ? 'bg-[#FF5A1F] text-white' : 'text-[#A7B0C0]'
                  }`}
                >
                  Leader
                </button>
              </div>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === link.id
                    ? 'bg-[#FF5A1F] text-white'
                    : 'text-[#A7B0C0] hover:bg-[#111827] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};
