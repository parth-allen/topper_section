import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubjectData {
  name: string;
  progress: number;
  topics: string[];
  topicsProgress: number[];
}

interface SubjectColors {
  primary: string;
  secondary: string;
  hover: string;
  text: string;
}

interface SubjectsProgress {
  phy: number;
  chem: number;
  maths: number;
}
interface QuoteCategory {
  range: [number, number];
  quotes: string[];
}

const motivationalQuotes: QuoteCategory[] = [
  {
    range: [90, 100],
    quotes: [
      "Outstanding! You're achieving excellence at the highest level! 🌟",
      "Phenomenal performance! You're in the top tier of achievers! 🏆",
      "Exceptional work! Your dedication is truly paying off! 🌠",
      "Brilliant results! You're setting the standard for excellence! ⭐",
      "Amazing achievement! Keep pushing these boundaries! 💫"
    ]
  },
  {
    range: [75, 89],
    quotes: [
      "Great progress! You're well on your way to excellence! 🚀",
      "Impressive performance! Keep this momentum going! 💪",
      "Strong showing! You're getting closer to your peak! 📈",
      "Excellent effort! The path to mastery is clear! 🎯",
      "Solid achievement! Your hard work is showing! ✨"
    ]
  },
  {
    range: [60, 74],
    quotes: [
      "Good effort! Keep pushing forward, you're getting stronger! 💪",
      "Steady progress! Every step counts towards your goal! 🎯",
      "You're on the right track! Keep this consistency! 🌟",
      "Notable improvement! Your dedication is showing! 📈",
      "Keep going! You're building something great! 🌱"
    ]
  },
  {
    range: [40, 59],
    quotes: [
      "You're making progress! Don't give up now! 🌱",
      "Every effort counts! Keep pushing forward! 💫",
      "Stay focused! Your breakthrough is coming! 🎯",
      "Keep going! Small steps lead to big changes! 📈",
      "Progress takes time! You're on the right path! ⭐"
    ]
  },
  {
    range: [0, 39],
    quotes: [
      "Every master was once a beginner. Keep going! 🌱",
      "Your effort today shapes your success tomorrow! 💫",
      "The journey of a thousand miles begins with a single step! 🚀",
      "Don't give up! Every practice makes you stronger! 💪",
      "Believe in yourself! You have the power to improve! ⭐"
    ]
  }
];

const MotivationalTracker: React.FC = () => {
  const [progress, setProgress] = useState<number>(65);
  const [quote, setQuote] = useState<string>(
    "The harder you work for something, the greater you'll feel when you achieve it."
  );
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [animateProgress, setAnimateProgress] = useState<boolean>(false);

  const [subjects, setSubjects] = useState<SubjectsProgress>({
    phy: 70,
    chem: 65,
    maths: 80
  });

  const overallCompareScore: number = 78;
  const overallProgress: number = Math.round(overallCompareScore / 3);

  const quotes: string[] = [
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "It always seems impossible until it's done.",
    "Don't watch the clock; do what it does. Keep going."
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimateProgress(true);
  }, [location.pathname]);

  const getMotivationalText = (percentage: number): string => {
    if (percentage >= 90) return "Outstanding! Keep up the amazing work!";
    if (percentage >= 75) return "Great progress! You're on the right track!";
    if (percentage >= 60) return "Good effort! Keep pushing forward!";
    if (percentage >= 40) return "You're making progress. Don't give up!";
    return "Every step counts. Keep going!";
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return "bg-purple-500";
    if (percentage >= 75) return "bg-blue-700";
    if (percentage >= 60) return "bg-purple-400";
    if (percentage >= 40) return "bg-blue-500";
    return "bg-blue-400";
  };

  const renderSubjectCard = (
    subject: 'phy' | 'chem' | 'maths',
    data: { name: string; progress: number; color: string }
  ) => (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:translate-y-[-2px]"
      )}
      onClick={() => navigate(`/topgallary/${subject}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          {data.name}
          <ExternalLink className="w-4 h-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{data.progress}%</div>
        <Progress 
          value={data.progress} 
          className={cn(
            "h-2 transition-all duration-300",
            data.color
          )}
        />
      </CardContent>
    </Card>
  );

  const renderMainDashboard = (): JSX.Element => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="border-none shadow-lg bg-gradient-to-r from-primary to-primary/80">
            <CardContent className="pt-6">
              <p className="text-primary-foreground text-lg text-center italic">
                {quote}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>
                {getMotivationalText(progress)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 text-center">
                {progress}%
              </div>
              <Progress 
                value={progress} 
                className="h-3"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderSubjectCard('phy', { 
              name: 'Physics', 
              progress: subjects.phy,
              color: 'bg-blue-600'
            })}
            {renderSubjectCard('chem', { 
              name: 'Chemistry', 
              progress: subjects.chem,
              color: 'bg-purple-600'
            })}
            {renderSubjectCard('maths', { 
              name: 'Mathematics', 
              progress: subjects.maths,
              color: 'bg-blue-500'
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderSubjectPage = (subject: 'phy' | 'chem' | 'maths'): JSX.Element => {
    const subjectData: Record<string, SubjectData> = {
      phy: {
        name: 'Physics',
        progress: subjects.phy,
        topics: ['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics'],
        topicsProgress: [75, 65, 80, 60]
      },
      chem: {
        name: 'Chemistry',
        progress: subjects.chem,
        topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Methods'],
        topicsProgress: [60, 70, 65, 65]
      },
      maths: {
        name: 'Mathematics',
        progress: subjects.maths,
        topics: ['Algebra', 'Calculus', 'Statistics', 'Geometry'],
        topicsProgress: [85, 80, 75, 80]
      }
    };

    const data = subjectData[subject];

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold">{data.name} Progress</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>
                {getMotivationalText(data.progress)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 text-center">
                {data.progress}%
              </div>
              <Progress 
                value={data.progress} 
                className="h-3"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.topics.map((topic, index) => (
              <Card key={topic}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{topic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold mb-2">
                    {data.topicsProgress[index]}%
                  </div>
                  <Progress 
                    value={data.topicsProgress[index]} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderOverallPage = (): JSX.Element => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold">Overall Progress</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Total Progress</CardTitle>
              <CardDescription>
                {getMotivationalText(overallProgress)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 text-center">
                {overallProgress}%
              </div>
              <Progress 
                value={overallProgress} 
                className="h-3"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {Object.entries(subjects).map(([subject, value]) => (
              <Card 
                key={subject}
                className="cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => navigate(`/topgallary/${subject}`)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold capitalize">
                      {subject === 'phy' ? 'Physics' : 
                       subject === 'chem' ? 'Chemistry' : 
                       'Mathematics'}
                    </span>
                    <span>{value}%</span>
                  </div>
                  <Progress 
                    value={value} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPage = (): JSX.Element => {
    switch (location.pathname) {
      case '/topgallary/phy':
        return renderSubjectPage('phy');
      case '/topgallary/chem':
        return renderSubjectPage('chem');
      case '/topgallary/maths':
        return renderSubjectPage('maths');
      case '/topgallary/overall':
        return renderOverallPage();
      default:
        return renderMainDashboard();
    }
  };

  return renderPage();
};

export default MotivationalTracker;