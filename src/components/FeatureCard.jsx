
import React from 'react';
import { cn } from '@/lib/utils';

const FeatureCard = ({ 
  icon, 
  title, 
  isNew = false,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center",
        "hover:shadow-md transition-all duration-300 cursor-pointer",
        "transform hover:-translate-y-1 relative h-full"
      )}
      onClick={onClick}
    >
      {isNew && (
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </div>
      )}
      <div className="mb-4 text-gray-700">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-center">{title}</h3>
    </div>
  );
};

export default FeatureCard;
