import SubjectAnalytics from "@/components/SubjectAnalytics";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

const TESTVEN = () => {
  const [aiResponse, setAIResponse] = useState(null);

  const useAI = async (prompt) => {
    try {
      const apiKey: string = import.meta.env.VITE_GEMINI_API_KEY;
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

  useEffect(() => {
    (async () => {
      const data = await useAI(`subject="Physics"
          pyqTopper={100}
          pyqStudent={90}
          totalTopper={100}
          totalStudent={90}
          subjectRanks={[80, 90, 70, 50, 13, 45, 22]}
          subjectScores={[80, 90, 70, 50, 13, 45, 22]}    This is the a student's data  I am creating a dashboard to compare himself with the toppers, slightly insult him and motivate him to do better in the future. Also GIve only text data for now and no formattings like bold, italic, etc.    keep it to about 2-3 lines only`);
      setAIResponse(data);
    })();
  }, []);

  return (
    <div className="h-full w-full p-2 grid grid-cols-1 gap-4">
      <div className="bg-blue-600 text-white p-4">
        <div className="font-bold text-3xl">Physics Analysis</div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SubjectAnalytics
          subject="Physics"
          pyqTopper={100}
          pyqStudent={90}
          totalTopper={100}
          totalStudent={90}
          subjectRanks={[80, 90, 70, 50, 13, 45, 22]}
          subjectScores={[80, 90, 70, 50, 13, 45, 22]}
        />
      </div>
      <div className="p-4">
        <p>{aiResponse}</p>
      </div>
      <div className="bg-gray-800 text-white p-4 text-center">
        © 2023 Allen. All rights reserved.
      </div>
    </div>
  );
};

export default TESTVEN;
