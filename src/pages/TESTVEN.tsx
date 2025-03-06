import SubjectAnalytics from "@/components/SubjectAnalytics";

const TESTVEN = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SubjectAnalytics
        subject="Physics"
        pyqTopper={100}
        pyqStudent={90}
        totalTopper={100}
        totalStudent={90}
        subjectRanks={7}
        subjectScores={80}
      />
    </div>
  );
};

export default TESTVEN;
