import SubjectAnalytics from "@/components/SubjectAnalytics";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TESTVEN = () => {
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

  useEffect(() => {
    (async () => {
      try {
        // Using static data for now but based on the student's data this will keep changing
        const prompt = `subject="Physics"
          pyqTopper=100
          pyqStudent=90
          totalTopper=100
          totalStudent=90
          subjectRanks=[80, 90, 70, 50, 13, 45, 22]
          subjectScores=[80, 90, 70, 50, 13, 45, 22]    
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SubjectAnalytics
        subject="Physics"
        pyqTopper={100}
        pyqStudent={90}
        totalTopper={100}
        totalStudent={90}
        subjectRanks={[7]}
        subjectScores={[80]}
      />
    </div>
  );
};

export default TESTVEN;
