// import React, { useState, useEffect } from 'react';

// interface SubjectData {
//   name: string;
//   progress: number;
//   topics: string[];
//   topicsProgress: number[];
// }

// interface SubjectColors {
//   primary: string;
//   secondary: string;
//   hover: string;
//   text: string;
// }

// interface SubjectsProgress {
//   phy: number;
//   chem: number;
//   maths: number;
// }

// const MotivationalTracker: React.FC = () => {
//   const [progress, setProgress] = useState<number>(65);
//   const [quote, setQuote] = useState<string>("The harder you work for something, the greater you'll feel when you achieve it.");
//   const [activePage, setActivePage] = useState<string>('main'); // main, phy, chem, maths
//   const [isHovering, setIsHovering] = useState<number | null>(null);
//   const [animateProgress, setAnimateProgress] = useState<boolean>(false);
  
//   const [subjects, setSubjects] = useState<SubjectsProgress>({
//     phy: 70,
//     chem: 65,
//     maths: 80
//   });
  
//   const overallCompareScore: number = 78;
//   // Calculate overall progress (average of subjects)
//   const overallProgress: number = Math.round(overallCompareScore / 3);
  
//   // Motivational quotes array
//   const quotes: string[] = [
//     "The harder you work for something, the greater you'll feel when you achieve it.",
//     "Success is not final, failure is not fatal: it is the courage to continue that counts.",
//     "Believe you can and you're halfway there.",
//     "It always seems impossible until it's done.",
//     "Don't watch the clock; do what it does. Keep going."
//   ];
  
//   // Change quote randomly every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * quotes.length);
//       setQuote(quotes[randomIndex]);
//     }, 7000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   // Animate progress bars when page loads
//   useEffect(() => {
//     setAnimateProgress(true);
//   }, [activePage]);
  
//   // Get motivational text based on percentage
//   const getMotivationalText = (percentage: number): string => {
//     if (percentage >= 90) return "Outstanding! Keep up the amazing work!";
//     if (percentage >= 75) return "Great progress! You're on the right track!";
//     if (percentage >= 60) return "Good effort! Keep pushing forward!";
//     if (percentage >= 40) return "You're making progress. Don't give up!";
//     return "Every step counts. Keep going!";
//   };

//   // Get color based on percentage
//   const getProgressColor = (percentage: number): string => {
//     if (percentage >= 90) return "bg-purple-500";
//     if (percentage >= 75) return "bg-blue-700";
//     if (percentage >= 60) return "bg-purple-400";
//     if (percentage >= 40) return "bg-blue-500";
//     return "bg-blue-400";
//   };

//   // Navigation handler
//   const navigateTo = (page: string): void => {
//     setAnimateProgress(false);
//     setTimeout(() => {
//       setActivePage(page);
//     }, 300);
//   };

//   // Arrow icon component
//   const RedirectArrow = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//     </svg>
//   );

//   // Render subject specific page
//   const renderSubjectPage = (subject: 'phy' | 'chem' | 'maths'): JSX.Element => {
//     const subjectColors: Record<string, SubjectColors> = {
//       phy: {
//         primary: 'bg-blue-900',
//         secondary: 'bg-blue-800',
//         hover: 'hover:bg-blue-900',
//         text: 'text-blue-900'
//       },
//       chem: {
//         primary: 'bg-purple-600',
//         secondary: 'bg-purple-500',
//         hover: 'hover:bg-purple-700',
//         text: 'text-purple-600'
//       },
//       maths: {
//         primary: 'bg-blue-700',
//         secondary: 'bg-blue-600',
//         hover: 'hover:bg-blue-800',
//         text: 'text-blue-700'
//       }
//     };
    
//     const colors = subjectColors[subject];
    
//     const subjectData: Record<string, SubjectData> = {
//       phy: {
//         name: 'Physics',
//         progress: subjects.phy,
//         topics: ['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics'],
//         topicsProgress: [75, 65, 80, 60]
//       },
//       chem: {
//         name: 'Chemistry',
//         progress: subjects.chem,
//         topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Methods'],
//         topicsProgress: [60, 70, 65, 65]
//       },
//       maths: {
//         name: 'Mathematics',
//         progress: subjects.maths,
//         topics: ['Algebra', 'Calculus', 'Statistics', 'Geometry'],
//         topicsProgress: [85, 80, 75, 80]
//       }
//     };
    
//     const data = subjectData[subject];
    
//     return (
//       <div className="min-h-screen bg-gray-100 p-6 md:p-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center mb-6">
//             <button 
//               onClick={() => navigateTo('main')}
//               className={`mr-4 ${colors.primary} text-white p-2 rounded-full ${colors.hover} transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//             >
//               ← Back
//             </button>
//             <h2 className={`text-2xl md:text-3xl font-bold ${colors.text}`}>{data.name} Progress</h2>
//           </div>
          
//           <div className="mb-8">
//             <div className="text-center text-xl md:text-2xl font-bold mb-2">{data.progress}%</div>
//             <div className="h-12 md:h-16 bg-gray-200 rounded-full overflow-hidden flex mb-1 shadow-inner">
//               <div 
//                 className={`${colors.primary} h-full transition-all duration-1000 ease-out`}
//                 style={{ width: animateProgress ? `${data.progress}%` : '0%' }}
//               ></div>
//             </div>
//           </div>
          
//           <div className={`${colors.primary} text-white py-5 px-10 rounded-full text-center mb-10 shadow-lg transform hover:scale-102 transition-transform duration-300`}>
//             <p className="text-lg md:text-xl">{getMotivationalText(data.progress)}</p>
//           </div>
          
//           <h3 className="text-xl md:text-2xl font-bold mb-4">Topics</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {data.topics.map((topic, index) => (
//               <div 
//                 key={index} 
//                 className={`${colors.secondary} text-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
//                 onMouseEnter={() => setIsHovering(index)}
//                 onMouseLeave={() => setIsHovering(null)}
//               >
//                 <div className="flex justify-between mb-2">
//                   <span className="font-bold">{topic}</span>
//                   <span>{data.topicsProgress[index]}%</span>
//                 </div>
//                 <div className="h-4 bg-white bg-opacity-30 rounded-full overflow-hidden shadow-inner">
//                   <div 
//                     className="bg-white h-full transition-all duration-1000 ease-out"
//                     style={{ width: animateProgress ? `${data.topicsProgress[index]}%` : '0%' }}
//                   ></div>
//                 </div>
//                 {isHovering === index && (
//                   <div className="mt-2 text-sm text-white">
//                     {getMotivationalText(data.topicsProgress[index])}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render main dashboard
//   const renderMainDashboard = (): JSX.Element => {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6 md:p-8 flex flex-col">
//         <div className="max-w-5xl w-full mx-auto flex-grow flex flex-col">
//           {/* Motivational Text Based on Progress */}
//           {/* <div className="bg-white bg-opacity-80 rounded-lg text-black py-4 px-6 md:px-8 rounded-2xl text-center mb-6 
//           shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
//             <p className="text-lg md:text-xl font-semibold">{getMotivationalText(progress)}</p>
//           </div> */}
//           <div className="flex justify-center mb-3">
//             <div className="bg-gradient-to-r from-purple-600 to-blue-900 text-white py-4 px-6 md:px-8 rounded-2xl text-center mb-6 
//           shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
//               <p className="text-center italic px-4 md:px-6 text-lg text-white">{quote}</p>
//             </div>
//           </div>

          
//           {/* Progress Section */}
//           <div className="mb-6">
//             <div className="text-center text-xl md:text-2xl font-bold mb-2">{progress}%</div>
//             <div className="h-12 md:h-16 bg-gray-200 rounded-full overflow-hidden flex mb-1 shadow-inner">
//               <div 
//                 className={`${getProgressColor(progress)} h-full transition-all duration-1000 ease-out`}
//                 style={{ width: animateProgress ? `${progress}%` : '0%' }}
//               ></div>
//             </div>
//           </div>
//           {/* bg-white bg-opacity-80 rounded-lg p-3 shadow-lg transform hover:scale-105 transition-all duration-300 max-w-3xl */}
//           {/* <div className="flex justify-center mb-3">
//             <div className="bg-gradient-to-r from-purple-600 to-blue-900 text-white py-4 px-6 md:px-8 rounded-2xl text-center mb-6 
//           shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
//               <p className="text-center italic px-4 md:px-6 text-lg text-white">{quote}</p>
//             </div>
//           </div> */}

          // <div className="bg-white bg-opacity-80 rounded-lg text-black py-4 px-6 md:px-8 rounded-2xl text-center mb-6 
          // shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
          //   <p className="text-lg md:text-xl font-semibold">{getMotivationalText(progress)}</p>
          // </div>
          
//           {/* Overall */}
//           <div className="mb-4 mt-12 mt-auto">
//             <div 
//               className="bg-blue-900 text-white py-4 text-center text-xl md:text-2xl font-bold rounded-lg mb-4 cursor-pointer hover:bg-blue-800 transition-all duration-300 shadow-md transform hover:scale-105 relative"
//               onClick={() => navigateTo('/overall')}
//             >
//               <div className="absolute top-3 right-3 text-white">
//                 <RedirectArrow />
//               </div>
//               Overall: {progress}%
//             </div>
            
//             {/* Subject Boxes */}
//             <div className="grid grid-cols-3 gap-4">
//               <div 
//                 className="bg-blue-800 text-white p-4 md:p-6 rounded-lg cursor-pointer hover:bg-blue-900 transition-all duration-300 shadow-md transform hover:scale-105 hover:rotate-1 relative"
//                 onClick={() => navigateTo('phy')}
//               >
//                 <div className="absolute top-2 right-2 text-white">
//                   <RedirectArrow />
//                 </div>
//                 <div className="text-center mb-2 font-bold text-lg md:text-xl">Physics</div>
//                 <div className="text-center text-2xl md:text-3xl">{subjects.phy}%</div>
//               </div>
//               <div 
//                 className="bg-purple-600 text-white p-4 md:p-6 rounded-lg cursor-pointer hover:bg-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 hover:rotate-1 relative"
//                 onClick={() => navigateTo('chem')}
//               >
//                 <div className="absolute top-2 right-2 text-white">
//                   <RedirectArrow />
//                 </div>
//                 <div className="text-center mb-2 font-bold text-lg md:text-xl">Chemistry</div>
//                 <div className="text-center text-2xl md:text-3xl">{subjects.chem}%</div>
//               </div>
//               <div 
//                 className="bg-blue-700 text-white p-4 md:p-6 rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-300 shadow-md transform hover:scale-105 hover:rotate-1 relative"
//                 onClick={() => navigateTo('maths')}
//               >
//                 <div className="absolute top-2 right-2 text-white">
//                   <RedirectArrow />
//                 </div>
//                 <div className="text-center mb-2 font-bold text-lg md:text-xl">Mathematics</div>
//                 <div className="text-center text-2xl md:text-3xl">{subjects.maths}%</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render overall page
//   const renderOverallPage = (): JSX.Element => {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6 md:p-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center mb-6">
//             <button 
//               onClick={() => navigateTo('main')}
//               className="mr-4 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               ← Back
//             </button>
//             <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Overall Progress</h2>
//           </div>
          
//           <div className="mb-8">
//             <div className="text-center text-xl md:text-2xl font-bold mb-2">{overallProgress}%</div>
//             <div className="h-12 md:h-16 bg-gray-200 rounded-full overflow-hidden flex mb-1 shadow-inner">
//               <div 
//                 className={`${getProgressColor(overallProgress)} h-full transition-all duration-1000 ease-out`}
//                 style={{ width: animateProgress ? `${overallProgress}%` : '0%' }}
//               ></div>
//             </div>
//           </div>
          
//           <div className="bg-blue-900 text-white py-5 px-10 rounded-full text-center mb-8 shadow-lg transform hover:translate-y-1 transition-transform duration-300">
//             <p className="text-lg md:text-xl">{getMotivationalText(overallProgress)}</p>
//           </div>
          
//           <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-900">Subjects</h3>
//           <div className="space-y-4">
//             <div 
//               className="bg-blue-800 text-white p-4 rounded-lg cursor-pointer hover:bg-blue-900 transition-all duration-300 shadow-md transform hover:scale-102 relative"
//               onClick={() => navigateTo('phy')}
//             >
//               <div className="absolute top-3 right-3 text-white">
//                 <RedirectArrow />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-bold">Physics</span>
//                 <span>{subjects.phy}%</span>
//               </div>
//               <div className="h-4 bg-white bg-opacity-30 rounded-full overflow-hidden shadow-inner">
//                 <div 
//                   className="bg-white h-full transition-all duration-1000 ease-out"
//                   style={{ width: animateProgress ? `${subjects.phy}%` : '0%' }}
//                 ></div>
//               </div>
//             </div>
            
//             <div 
//               className="bg-purple-600 text-white p-4 rounded-lg cursor-pointer hover:bg-purple-700 transition-all duration-300 shadow-md transform hover:scale-102 relative"
//               onClick={() => navigateTo('chem')}
//             >
//               <div className="absolute top-3 right-3 text-white">
//                 <RedirectArrow />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-bold">Chemistry</span>
//                 <span>{subjects.chem}%</span>
//               </div>
//               <div className="h-4 bg-white bg-opacity-30 rounded-full overflow-hidden shadow-inner">
//                 <div 
//                   className="bg-white h-full transition-all duration-1000 ease-out"
//                   style={{ width: animateProgress ? `${subjects.chem}%` : '0%' }}
//                 ></div>
//               </div>
//             </div>
            
//             <div 
//               className="bg-blue-700 text-white p-4 rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-300 shadow-md transform hover:scale-102 relative"
//               onClick={() => navigateTo('maths')}
//             >
//               <div className="absolute top-3 right-3 text-white">
//                 <RedirectArrow />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-bold">Mathematics</span>
//                 <span>{subjects.maths}%</span>
//               </div>
//               <div className="h-4 bg-white bg-opacity-30 rounded-full overflow-hidden shadow-inner">
//                 <div 
//                   className="bg-white h-full transition-all duration-1000 ease-out"
//                   style={{ width: animateProgress ? `${subjects.maths}%` : '0%' }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render appropriate page based on state
//   const renderPage = (): JSX.Element => {
//     switch (activePage) {
//       case 'phy':
//         return renderSubjectPage('phy');
//       case 'chem':
//         return renderSubjectPage('chem');
//       case 'maths':
//         return renderSubjectPage('maths');
//       case 'overall':
//         return renderOverallPage();
//       default:
//         return renderMainDashboard();
//     }
//   };

//   return renderPage();
// };

// export default MotivationalTracker;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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

const MotivationalTracker: React.FC = () => {
  const [progress, setProgress] = useState<number>(65);
  const [quote, setQuote] = useState<string>("The harder you work for something, the greater you'll feel when you achieve it.");
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

  const navigate = useNavigate(); // Initialize useNavigate

  // Change quote randomly every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Animate progress bars when page loads
  useEffect(() => {
    setAnimateProgress(true);
  }, [location.pathname]); // Trigger animation on route change

  // Get motivational text based on percentage
  const getMotivationalText = (percentage: number): string => {
    if (percentage >= 90) return "Outstanding! Keep up the amazing work!";
    if (percentage >= 75) return "Great progress! You're on the right track!";
    if (percentage >= 60) return "Good effort! Keep pushing forward!";
    if (percentage >= 40) return "You're making progress. Don't give up!";
    return "Every step counts. Keep going!";
  };

  // Get color based on percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return "bg-purple-500";
    if (percentage >= 75) return "bg-blue-700";
    if (percentage >= 60) return "bg-purple-400";
    if (percentage >= 40) return "bg-blue-500";
    return "bg-blue-400";
  };

  // Arrow icon component
  const RedirectArrow = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  // Render subject specific page
  const renderSubjectPage = (subject: 'phy' | 'chem' | 'maths'): JSX.Element => {
    const subjectColors: Record<string, SubjectColors> = {
      phy: {
        primary: 'bg-blue-900',
        secondary: 'bg-blue-800',
        hover: 'hover:bg-blue-900',
        text: 'text-blue-900'
      },
      chem: {
        primary: 'bg-purple-600',
        secondary: 'bg-purple-500',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600'
      },
      maths: {
        primary: 'bg-blue-700',
        secondary: 'bg-blue-600',
        hover: 'hover:bg-blue-800',
        text: 'text-blue-700'
      }
    };

    const colors = subjectColors[subject];

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
      <div className="min-h-screen bg-gray-100 p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/')} // Navigate back to the main dashboard
              className={`mr-4 ${colors.primary} text-white p-2 rounded-full ${colors.hover} transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              ← Back
            </button>
            <h2 className={`text-2xl md:text-3xl font-bold ${colors.text}`}>{data.name} Progress</h2>
          </div>

          {/* Rest of the subject-specific page content */}
        </div>
      </div>
    );
  };

  // Render main dashboard
  const renderMainDashboard = (): JSX.Element => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6 md:p-8 flex flex-col">
        <div className="max-w-5xl w-full mx-auto flex-grow flex flex-col">
          {/* Motivational Text */}
          <div className="flex justify-center mb-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-900 text-white py-4 px-6 md:px-8 rounded-2xl text-center mb-6 shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <p className="text-center italic px-4 md:px-6 text-lg text-white">{quote}</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="text-center text-xl md:text-2xl font-bold mb-2">{progress}%</div>
            <div className="h-12 md:h-16 bg-gray-200 rounded-full overflow-hidden flex mb-1 shadow-inner">
              <div 
                className={`${getProgressColor(progress)} h-full transition-all duration-1000 ease-out`}
                style={{ width: animateProgress ? `${progress}%` : '0%' }}
              ></div>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 rounded-lg text-black py-4 px-6 md:px-8 rounded-2xl text-center mb-6 
          shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <p className="text-lg md:text-xl font-semibold">{getMotivationalText(progress)}</p>
          </div>

          {/* Overall and Subject Boxes */}
          <div className="mb-4 mt-12 mt-auto">
            <div 
              className="bg-blue-900 text-white py-4 text-center text-xl md:text-2xl font-bold rounded-lg mb-4 cursor-pointer hover:bg-blue-800 transition-all duration-300 shadow-md transform hover:scale-105 relative"
              onClick={() => navigate('/overall')} // Navigate to Overall page
            >
              <div className="absolute top-3 right-3 text-white">
                <RedirectArrow />
              </div>
              Overall: {progress}%
            </div>

            {/* Subject Boxes */}
            <div className="grid grid-cols-3 gap-4">
              <div 
                className="bg-blue-800 text-white p-4 md:p-6 rounded-lg cursor-pointer hover:bg-blue-900 transition-all duration-300 shadow-md transform hover:scale-105 hover:rotate-1 relative"
                onClick={() => navigate('/phy')} // Navigate to Physics page
              >
                <div className="absolute top-2 right-2 text-white">
                  <RedirectArrow />
                </div>
                <div className="text-center mb-2 font-bold text-lg md:text-xl">Physics</div>
                <div className="text-center text-2xl md:text-3xl">{subjects.phy}%</div>
              </div>
              <div 
                className="bg-purple-600 text-white p-4 md:p-6 rounded-lg cursor-pointer hover:bg-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 hover:rotate-1 relative"
                onClick={() => navigate('/chem')} // Navigate to Chemistry page
              >
                <div className="absolute top-2 right-2 text-white">
                  <RedirectArrow />
                </div>
                <div className="text-center mb-2 font-bold text-lg md:text-xl">Chemistry</div>
                <div className="text-center text-2xl md:text-3xl">{subjects.chem}%</div>
              </div>
              <div 
                className="bg-blue-700 text-white p-4 md:p-6 rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-300 shadow-md transform hover:scale-105 hover:rotate-1 relative"
                onClick={() => navigate('/maths')} // Navigate to Mathematics page
              >
                <div className="absolute top-2 right-2 text-white">
                  <RedirectArrow />
                </div>
                <div className="text-center mb-2 font-bold text-lg md:text-xl">Mathematics</div>
                <div className="text-center text-2xl md:text-3xl">{subjects.maths}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render overall page
  const renderOverallPage = (): JSX.Element => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/')} // Navigate back to the main dashboard
              className="mr-4 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Overall Progress</h2>
          </div>

          {/* Rest of the overall page content */}
        </div>
      </div>
    );
  };

  // Render appropriate page based on route
  const renderPage = (): JSX.Element => {
    switch (location.pathname) {
      case '/phy':
        return renderSubjectPage('phy');
      case '/chem':
        return renderSubjectPage('chem');
      case '/maths':
        return renderSubjectPage('maths');
      case '/overall':
        return renderOverallPage();
      default:
        return renderMainDashboard();
    }
  };

  return renderPage();
};

export default MotivationalTracker;