
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const notifications = 20; // Example notification count
  const userName = "Ram"; // Example user name
  const userInitial = "R"; // User initial for avatar
  const currentCourse = "JEE (Main + Advanced)";

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/db/ALLEN_Career_Institute_logo.svg"
            alt="Allen Logo" 
            className="h-8"
            height="800"
            width="80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/80x30/0063c5/white?text=ALLEN";
            }}
          />
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <div className="relative">
            <button className="rounded-full p-1 hover:bg-gray-100 transition-colors">
              <Bell size={24} className="text-gray-600" />
              {notifications > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 flex items-center justify-center",
                  "h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium text-white",
                  "animate-fade-in"
                )}>
                  {notifications > 99 ? '99+' : notifications}
                </span>
              )}
            </button>
          </div>

          {/* Course info */}
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium">{currentCourse}</span>
            <Link 
              to="/change-course" 
              className="flex items-center text-brand-blue hover:text-brand-lightBlue"
            >
              <span className="ml-1">Change course</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* User avatar */}
          <Avatar className="h-8 w-8 bg-gray-200 hover:ring-2 hover:ring-brand-blue transition-all">
            <AvatarFallback className="bg-gray-800 text-white">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
