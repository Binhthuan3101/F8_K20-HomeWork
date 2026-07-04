const examResults = [
  { student: "An", scores: [8.5, 7, 9, 6.5] },
  { student: "Bình", scores: [10, 9.5, 8, 10] },
  { student: "Chi", scores: [5, 4.5, 6, 5.5] },
  { student: "Duy", scores: [7, 7, 7, 7] },
];

function getAverage(scores) {
  let sum = 0;
  for (const score of scores) {
    sum += score;
  }
  const average = (sum / scores.length).toFixed(1);
  return Number(average);
}

console.log(getAverage([8.5, 7, 9, 6.5]));
console.log(getAverage([10, 9.5, 8, 10]));


function classifyStudent(average) {
    if (average >= 9) {
        return "Xuất sắc";
    } else if (average >= 8) {
        return "Giỏi";
    } else if (average >= 6.5) {
        return "Khá";
    } else if (average >= 5) {
        return "Trung bình";
    }
    return "Yếu";
}

console.log(classifyStudent(9.4));
   // "Xuất sắc"
console.log(classifyStudent(7.8));
   // "Khá"
console.log(classifyStudent(4.5));
   // "Yếu"

function isValidScore(score) {
    if (Number.isFinite(score) && (score >= 0 && score <= 10)) {
        return true;
    }
    return false;
}

console.log(isValidScore(8.5)); //true
console.log(isValidScore(-1) );//false
console.log(isValidScore(11) );//false
console.log(isValidScore(Infinity));
console.log(isValidScore(NaN));


function getReportCard(examResults) {
    
    return examResults.map(result => {
        const average = getAverage(result.scores);
        return {
            student: result.student,
            average: average,
            classification: classifyStudent(average)
        }
    })
}

console.log(getReportCard(examResults));
