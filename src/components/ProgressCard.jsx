
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ProgressCard = ({ 
  title, 
  icon, 
  progress = 0, 
  total = 1, 
  completed = 0,
  color = "bg-purple-100",
  iconColor = "text-purple-600" 
}) => {
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 border border-gray-100",
      "hover:shadow-md transition-all duration-300",
      "transform hover:-translate-y-1"
    )}>
      <div className="flex gap-4 items-center mb-4">
        <div className={cn("p-3 rounded-full", color)}>
          {icon && React.cloneElement(icon, { size: 24, className: iconColor })}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      
      <div className="mb-4">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{completed}/{total}</span> Mistakes resolved
        </div>
        
        <Button variant="default" className="bg-brand-blue hover:bg-brand-lightBlue">
          Solve Now
        </Button>
      </div>
    </div>
  );
};

export default ProgressCard;
