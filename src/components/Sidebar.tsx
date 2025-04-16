
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Menu,
  X,
  MessageSquare,
  Settings,
  Shield,
  UserCog,
  FileSpreadsheet,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import '@/styles/sidebar.css';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  to,
  isActive,
  onClick
}: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "sidebar-menu-button",
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, profile, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === '/documents' && location.pathname === '/documents') {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Apply expanded class to body based on hover or open state
  useEffect(() => {
    const expanded = (!isMobile && isHovering) || (isMobile && isOpen);
    
    if (expanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
    
    return () => {
      document.body.classList.remove('sidebar-expanded');
    };
  }, [isHovering, isOpen, isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen) {
        const sidebar = document.querySelector('.sidebar-container');
        const menuButton = document.querySelector('.mobile-menu-button');
        
        if (sidebar && 
            !sidebar.contains(event.target as Node) && 
            menuButton && 
            !menuButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  // Default to admin access in preview environments
  // In production, this would be controlled by proper role checks
  const isPreviewEnvironment = 
    process.env.NODE_ENV === 'development' ||
    window.location.hostname.includes('lovable.app') ||
    window.location.hostname.includes('lovable.dev') ||
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1');
    
  const isAdmin = isPreviewEnvironment || profile?.role === 'admin';
  
  // Default initials for avatar
  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : (user?.email?.substring(0, 2)?.toUpperCase() || 'UN');

  return (
    <>
      {isMobile && (
        <button
          onClick={toggle}
          className="mobile-menu-button fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <aside
        className={cn(
          "sidebar-container",
          isMobile ? (isOpen ? "open" : "") : "sidebar-hover-expand",
        )}
        style={{
          '--collapsed-width': isMobile ? '0' : '4rem',
          '--expanded-width': '16rem'
        } as React.CSSProperties}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        <div className="sidebar-logo">
          <span className="text-xl font-bold text-blue-600">UD</span>
          <span className="sidebar-logo-text">Unidoc</span>
        </div>

        <nav className="sidebar-nav">
          <div className="space-y-1">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              to="/dashboard"
              isActive={isActive('/dashboard')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              label="Schedule"
              to="/schedule"
              isActive={isActive('/schedule')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Customers"
              to="/customers"
              isActive={isActive('/customers')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<FileText size={20} />}
              label="Agreements"
              to="/agreements"
              isActive={isActive('/agreements')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<FileSpreadsheet size={20} />}
              label="Documents"
              to="/documents"
              isActive={isActive('/documents')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<MessageSquare size={20} />}
              label="Chat"
              to="/chat"
              isActive={isActive('/chat')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Users"
              to="/users"
              isActive={isActive('/users')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<UserCog size={20} />}
              label="Agents"
              to="/agents"
              isActive={isActive('/agents')}
              onClick={handleNavigate}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              to="/settings"
              isActive={isActive('/settings')}
              onClick={handleNavigate}
            />
            
            {isAdmin && (
              <SidebarItem
                icon={<Shield size={20} />}
                label="Admin Panel"
                to="/admin"
                isActive={isActive('/admin')}
                onClick={handleNavigate}
              />
            )}
          </div>
        </nav>

        <div className="sidebar-user-menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="sidebar-user-button group hover:bg-gray-100 rounded-md w-full">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user?.email || 'User'} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="sidebar-user-info">
                  <p className="text-sm font-medium truncate">{profile?.full_name || user?.email?.split('@')[0] || 'Guest User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'guest@unidoc.com'}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="cursor-pointer flex items-center text-red-600 hover:text-red-700">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
