// import SubjectAnalytics from "@/components/SubjectAnalytics";
// import { useEffect, useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import testUser from "../../public/testUser.json"
// import topperData from "../../public/students.json";

// const TESTVEN = ({subject}) => {
//   const [aiResponse, setAIResponse] = useState("Generating Feedback...");

//   const useAI = async (prompt) => {
//     try {
//       const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//       if (!apiKey) {
//         throw new Error("API key is missing. Please check your .env file.");
//       }

//       const genAI = new GoogleGenerativeAI(apiKey);
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const result = await model.generateContent(prompt);
//       return result?.response?.text() || "No response received";
//     } catch (error) {
//       console.error("Error using AI:", error);
//       return "Error generating AI content.";
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         // Using static data for now but based on the student's data this will keep changing
//         const prompt = `subject="Physics"
//           pyqTopper=100
//           pyqStudent=90
//           totalTopper=100
//           totalStudent=90
//           subjectRanks=[80, 90, 70, 50, 13, 45, 22]
//           subjectScores=[80, 90, 70, 50, 13, 45, 22]    
//           This is a student's data. I am creating a dashboard to compare them with the toppers, slightly challenge them and motivate them to do better in the future. Give only text data for now and no formatting like bold, italic, etc. Keep it to about 3-4 lines only.`;

//         const data = await useAI(prompt);
//         if (data && data !== "Error generating AI content.") {
//           setAIResponse(data);
//         }
//       } catch (error) {
//         console.error("Failed to get AI response:", error);
//       }
//     })();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="bg-blue-600 text-white p-4">
//         <div className="font-bold text-3xl">{subject} Analysis</div>
//       </div>

//       {/* Main content */}
//       <div className="bg-gray-50 flex-grow p-4">
//         <div className="mx-auto">
//           <SubjectAnalytics
//             subject={subject}
//             pyqTopper={100}
//             pyqStudent={90}
//             totalTopper={100}
//             totalStudent={90}
//             subjectRanks={[80, 90, 70, 50, 13, 45, 22]}
//             subjectScores={[20, 40, 30, 10, 50, 80, 100]}
//             topperTests={100}
//             studentTests={80}
//           />

//           {/* AI Response */}
//           <div className="mt-6 p-4 bg-white rounded-md shadow">
//             <p className="text-gray-800">{aiResponse}</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-gray-800 text-white p-4 text-center">
//         © 2025 Allen. All rights reserved.
//       </div>
//     </div>
//   );
// };

// export default TESTVEN;


import SubjectAnalytics from "@/components/SubjectAnalytics";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import testUser from "../../public/testUser.json";
import topperData from "../../public/students.json";

const TESTVEN = ({ subject }) => {
  const [aiResponse, setAIResponse] = useState("Generating Feedback...");

  const useAI = async (prompt) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Please check your .env file.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result?.response?.text() || "No response received";
    } catch (error) {
      console.error("Error using AI:", error);
      return "Error generating AI content.";
    }
  };

  const student = testUser[0]; // First student (assuming current user)
  const subjectIndex = subject === "Physics" ? 0 : subject === "Chemistry" ? 1 : 2;

  // Calculate averages for all toppers
  const totalToppers = topperData.length;
  const avgPyqTopper = Math.round(
    (topperData.reduce((sum, topper) => sum + (topper.PyqSolve[subjectIndex] || 0), 0) / totalToppers) * 8
  ); // Increased by 800%

  const avgTotalTopper = Math.round(
    topperData.reduce((sum, topper) => sum + (topper.TotalQuestionsSolved[subjectIndex] || 0), 0) / totalToppers
  );
  const avgTopperTests = Math.round(
    topperData.reduce((sum, topper) => sum + (topper.NoOfTestsAttempted || 0), 0) / totalToppers
  );

  let pyqStudent = student?.PyqSolve[subjectIndex] || 0;
  pyqStudent = Math.round(pyqStudent * 3); // Increased by 200%

  const totalStudent = student?.TotalQuestionsSolved[subjectIndex] || 0;
  const studentTests = student?.NoOfTestsAttempted || 0;
  const subjectRanks = student?.TestSubjectRank?.map(rank => rank[subjectIndex]) || [];
  const subjectScores = student?.TestScore?.map(score => score[subjectIndex]) || [];

  useEffect(() => {
    (async () => {
      try {
        const prompt = `subject="${subject}"
          pyqTopper=${avgPyqTopper}
          pyqStudent=${pyqStudent}
          totalTopper=${avgTotalTopper}
          totalStudent=${totalStudent}
          subjectRanks=${JSON.stringify(subjectRanks)}
          subjectScores=${JSON.stringify(subjectScores)}
          topperTests=${avgTopperTests}
          studentTests=${studentTests}
          This is a student's data. I am creating a dashboard to compare them with the toppers, slightly challenge them and motivate them to do better in the future. Give only text data for now and no formatting like bold, italic, etc. Keep it to about 3-4 lines only.`;

        const data = await useAI(prompt);
        if (data && data !== "Error generating AI content.") {
          setAIResponse(data);
        }
      } catch (error) {
        console.error("Failed to get AI response:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="font-bold text-3xl">{subject} Analysis</div>
      </div>

      {/* Main content */}
      <div className="bg-gray-50 flex-grow p-4">
        <div className="mx-auto">
          <SubjectAnalytics
            subject={subject}
            pyqTopper={avgPyqTopper}
            pyqStudent={pyqStudent}
            totalTopper={avgTotalTopper}
            totalStudent={totalStudent}
            subjectRanks={subjectRanks}
            subjectScores={subjectScores}
            topperTests={avgTopperTests}
            studentTests={studentTests}
          />

          {/* AI Response */}
          <div className="mt-6 p-4 bg-white rounded-md shadow">
            <p className="text-gray-500 text-xl ">{aiResponse}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-4 text-center">
        © 2025 Allen. All rights reserved.
      </div>
    </div>
  );
};

export default TESTVEN;

