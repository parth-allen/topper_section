
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Book, HelpCircle, LucideBeaker, TestTube, BookOpen } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, active }) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200",
        "hover:bg-white hover:shadow-sm",
        active ? "bg-white shadow-sm font-medium" : "text-gray-700"
      )}
    >
      <Icon size={20} className={active ? "text-brand-blue" : "text-gray-500"} />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="h-full w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
      <div className="p-4">
        <div className="py-4 flex items-center">
          <h2 className="text-xl font-semibold text-brand-blue">Explore</h2>
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <SidebarItem 
          icon={HelpCircle} 
          label="Doubts" 
          to="/doubts" 
          active={path === "/doubts"}
        />
        <SidebarItem 
          icon={BookOpen} 
          label="Practice" 
          to="/practice" 
          active={path === "/practice"}
        />
        <SidebarItem 
          icon={TestTube} 
          label="Tests" 
          to="/tests" 
          active={path === "/tests"}
        />
        <SidebarItem 
          icon={Book} 
          label="Improvement Book" 
          to="/" 
          active={path === "/"}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
