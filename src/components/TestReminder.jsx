
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import topgallary from '@/pages/topgallary';



const TestReminder = ({ 
  testName = "AOSAT", 
  time = "12 PM", 
  date = "today", 
  onStartTest 
}) => {

  const navigate= useNavigate();
  const handleClick = () => {
    navigate('/topgallary');
  
  
  }
  return (
    <div className="bg-sky-200 rounded-2xl p-10 cursor-pointer overflow-hidden relative min-h-200px] max-w-[1100px] ml-4 mr-4" onClick={handleClick} >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <h2 className="text-2xl font-bold mb-6">
            Visit <span className="text-brand-blue">Toppers</span> Gallery
          </h2>
          
          <Button 
            
            className="bg-brand-blue hover:bg-brand-lightBlue text-white px-6 rounded-2xl"
          >
            Visit <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
        
        <div className="hidden md:block relative z-10">
          <img 
            src="student.png" 
            alt="Student preparing for test" 
            className="max-h-[160px] object-contain"
          />
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-0 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L60,112C120,128,240,160,360,144C480,128,600,64,720,48C840,32,960,64,1080,80C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default TestReminder;



