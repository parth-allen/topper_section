
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LucideBeaker, 
  Leaf, 
  Activity,
  Search, 
  BookOpen, 
  Calendar, 
  PencilRuler, 
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';
import SubjectCard from '@/components/SubjectCard';
import ProgressCard from '@/components/ProgressCard';
import FeatureCard from '@/components/FeatureCard';
import TestReminder from '@/components/TestReminder';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get time of day for greeting
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    };

    setGreeting(getGreeting());
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Study materials data
  const subjects = [
    { 
      title: 'Biology', 
      icon: <Leaf />, 
      color: 'bg-green-100', 
      iconColor: 'text-green-600' 
    },
    { 
      title: 'Chemistry', 
      icon: <LucideBeaker />, 
      color: 'bg-purple-100', 
      iconColor: 'text-purple-600' 
    },
    { 
      title: 'Physics', 
      icon: <Activity />, 
      color: 'bg-blue-100', 
      iconColor: 'text-blue-600' 
    }
  ];

  // Study essentials data
  const studyEssentials = [
    { title: 'Module Solutions', icon: <Search size={24} />, isNew: true },
    { title: 'Improvement book', icon: <BookOpen size={24} /> },
    { title: 'Study Planner', icon: <Calendar size={24} /> },
    { title: 'Custom Practice', icon: <PencilRuler size={24} /> },
    { title: 'Practice', icon: <ClipboardList size={24} /> }
  ];

  return (
    <Layout>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="animate-pulse space-y-6 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-slide-in">
          {/* Welcome section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {greeting}, <span className="text-brand-blue">BIO</span>
            </h1>
          </div>

          {/* Test Reminder */}
          <TestReminder
            testName="AOSAT"
            time="12 PM"
            date="today"
            onStartTest={() => navigate('/Input_name')} // Navigate to TopGallary
          />

          {/* Improvement Book section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Improvement Book</h2>
              <Link to="/improvement-book">
                <Button variant="link" className="text-brand-blue hover:text-brand-lightBlue">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <ProgressCard 
                title="Biomolecules" 
                icon={<LucideBeaker />} 
                progress={0} 
                total={1} g
                completed={0}
                color="bg-purple-100"
                iconColor="text-purple-600"
              />
            </div>
          </div>

          {/* Study Materials section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Explore Study Materials</h2>
              <div className="inline-flex items-center justify-center whitespace-nowrap 
              rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 
              focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm 
              hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                NEET
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <SubjectCard 
                  key={index} 
                  title={subject.title} 
                  icon={subject.icon} 
                  color={subject.color}
                  iconColor={subject.iconColor}
                />
              ))}
            </div>
          </div>

          {/* Study Essentials section */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Study Essentials</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {studyEssentials.map((item, index) => (
                <FeatureCard 
                  key={index} 
                  title={item.title} 
                  icon={item.icon} 
                  isNew={item.isNew}
                  onClick={() => console.log(`Clicked on ${item.title}`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;