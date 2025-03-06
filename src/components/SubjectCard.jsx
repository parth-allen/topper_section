
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SubjectCard = ({ title, icon, color = "bg-blue-100", iconColor = "text-brand-blue" }) => {
  return (
    <div className="relative overflow-hidden group">
      <div className={cn(
        "flex flex-col p-6 rounded-xl border border-gray-100 bg-white",
        "hover:shadow-md transition-all duration-300 h-full",
        "transform hover:-translate-y-1"
      )}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className={cn(
            "p-3 rounded-full",
            color
          )}>
            {icon && React.cloneElement(icon, { 
              size: 24, 
              className: cn("transition-transform group-hover:scale-110", iconColor)
            })}
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-brand-blue transition-colors">
          <ArrowRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
