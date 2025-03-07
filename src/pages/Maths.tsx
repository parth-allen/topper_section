import React  from 'react';
import SubjectAnalytics from '@/components/SubjectAnalytics';
const Maths = ()=>{
    return (
        <>
             <SubjectAnalytics subject="Maths"
  pyqTopper={90}
  pyqStudent={70}
  totalTopper={100}
  totalStudent={80}
  subjectRanks={[50]}
  subjectScores={[67]}/>

        </>
    );
};


export default Maths;