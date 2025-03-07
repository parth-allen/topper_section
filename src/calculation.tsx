import userData from "../public/testUser.json";
import toppersData from "../public/students.json";

const calculateFinalScore = (subjectIndex) => {
    const pyqUser = userData[0].PyqSolve[subjectIndex];
    const totalTopperPyqSum = toppersData.reduce(
        (sum, topper) => sum + (topper.PyqSolve[subjectIndex] || 0), 
        0
    );
    const avgTopperPyq = totalTopperPyqSum / toppersData.length;

    const totalQuestUser = userData[0].TotalQuestionsSolved[subjectIndex];
    const totalTopperQuestionsSum = toppersData.reduce(
        (sum, topper) => sum + (topper.TotalQuestionsSolved[subjectIndex] || 0),
        0
    );
    const avgTopperTotalQuestions = totalTopperQuestionsSum / toppersData.length;

    const userAllSubjectRanks = userData[0].TestSubjectRank;
    const sumOfSubjectRanks = userAllSubjectRanks.reduce((sum, ranks) => sum + (ranks[subjectIndex] || 0), 0);
    const avgSubjectRank = sumOfSubjectRanks / userData[0].NoOfTestsAttempted;

    const totalSubjectRankSum = toppersData.reduce(
        (sum, topper) =>
            sum + topper.TestSubjectRank.reduce((rankSum, ranks) => rankSum + (ranks[subjectIndex] || 0), 0),
        0
    );
    const totalTestsAttempted = toppersData.reduce((sum, topper) => sum + topper.NoOfTestsAttempted, 0);
    const avgTopperSubjectRank = totalSubjectRankSum / totalTestsAttempted;

    const scoreOfSubject = userData[0].TestScore;
    const sumOfSubjectScores = scoreOfSubject.reduce((sum, score) => sum + (score[subjectIndex] || 0), 0);
    const avgSubjectScore = sumOfSubjectScores / scoreOfSubject.length;

    const totalTopperSubjectScoreSum = toppersData.reduce(
        (sum, topper) =>
            sum + topper.TestScore.reduce((scoreSum, score) => scoreSum + (score[subjectIndex] || 0), 0),
        0
    );
    const totalTopperSubjectScoreCount = toppersData.reduce((count, topper) => count + topper.TestScore.length, 0);
    const avgTopperSubjectScore = totalTopperSubjectScoreSum / totalTopperSubjectScoreCount;

    const pyqUserScore = (pyqUser / avgTopperPyq) * 100;
    const totalQuestUserScore = (totalQuestUser / avgTopperTotalQuestions) * 100;
    const subjectAvgRankScore = (avgTopperSubjectRank / avgSubjectRank) * 100;
    const avgSubjectScoreUserScaled = (avgSubjectScore / avgTopperSubjectScore) * 100;

    return Math.round(
        (pyqUserScore * 0.25) +
        (totalQuestUserScore * 0.25) +
        (subjectAvgRankScore * 0.25) +
        (avgSubjectScoreUserScaled * 0.25)
    );
};

export const finalPhysicsScore = calculateFinalScore(0);
export const finalChemistryScore = calculateFinalScore(1);
export const finalMathsScore = calculateFinalScore(2);
