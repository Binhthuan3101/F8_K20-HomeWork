const students = [
  { id: 1, name: "Khoa Nguyen" },
  { id: 2, name: "My Tran" },
  { id: 3, name: "Phong Le" },
  { id: 4, name: "Yen Vo" },
  { id: 5, name: "Bao Pham" },
];

const answerKey = [
  { question: 1, correctAnswer: "A", point: 2 },
  { question: 2, correctAnswer: "C", point: 1 },
  { question: 3, correctAnswer: "B", point: 3 },
  { question: 4, correctAnswer: "D", point: 2 },
  { question: 5, correctAnswer: "A", point: 2 },
];

const submissions = [
  {
    studentId: 1,
    submittedAt: "2026-07-10T08:00:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "A" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 2,
    submittedAt: "2026-07-10T08:05:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "B" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "C" },
    ],
  },
  {
    studentId: 3,
    submittedAt: "2026-07-10T07:58:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 4,
    submittedAt: "2026-07-10T08:02:00",
    answers: [
      { question: 1, answer: "B" },
      { question: 2, answer: "C" },
    ],
  },
  {
    studentId: 5,
    submittedAt: "2026-07-10T08:01:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
];

function correctCount(submits) {
  let count = 0;
  submits.forEach((submit) => {
    if (!submit || !submit.answers) return;
    submit.answers.forEach((answer) => {
      answerKey.forEach((key) => {
        if (answer.question === key.question) {
          if (answer.answer === key.correctAnswer) {
            count++;
          }
        }
      });
    });
  });
  return count;
}
function wrongQuestion(submits) {
  let arr = [];
  const submitObj = submits[0];
  answerKey.forEach((key) => {
    if (!submitObj || !submitObj.answers) {
      arr.push(key.question);
      return;
    }
    const answer = submitObj.answers.find(
      (ans) => ans.question === key.question,
    );
    if (!answer || answer.answer !== key.correctAnswer) {
      arr.push(key.question);
    }
  });
  return arr.sort((a, b) => a - b);
}

function totalPoint(submits) {
  return submits.answers.reduce((total, answer) => {
    let score = 0;
    answerKey.forEach((key) => {
      if (answer.question === key.question) {
        if (answer.answer === key.correctAnswer) {
          score += key.point;
        }
      }
    });
    return total + score;
  }, 0);
}

function filterSubmitByStudentId(studentId) {
  return submissions.filter((submit) => {
    return (
      submit &&
      submit.studentId === studentId &&
      Object.prototype.hasOwnProperty.call(submit, "answers")
    );
  });
}

function calculateRankAndLock(sortedResult) {
  const finalResult = [];
  sortedResult.forEach((curr, index) => {
    if (index === 0) {
      curr.rank = 1;
    } else {
      const previous = sortedResult[index - 1];
      curr.rank =
        curr.score === previous.score ? finalResult[index - 1].rank : index + 1;
    }
    const cleanObj = {
      id: curr.id,
      name: curr.name,
      score: curr.score,
      correctCount: curr.correctCount,
      wrongQuestions: curr.wrongQuestions,
      rank: curr.rank,
    };

    const secureObj = {};
    Object.keys(cleanObj).forEach((key) => {
      Object.defineProperty(secureObj, key, {
        value: cleanObj[key],
        writable: false,
        configurable: false,
        enumerable: true,
      });
    });
      finalResult.push(secureObj);
  });
    return finalResult;
}

function gradeExam(students, answerKey, submissions) {
  const result = students.map((student) => {
    const matchedSubmissions = filterSubmitByStudentId(student.id);
    const firstSubmit = matchedSubmissions[0];
    const submittedTime = firstSubmit
      ? new Date(firstSubmit.submittedAt).getTime()
      : Infinity;
    return {
      id: student.id,
      name: student.name,
      score: matchedSubmissions.reduce((sum, submit) => {
        return sum + totalPoint(submit);
      }, 0),
      correctCount: correctCount(matchedSubmissions),
      wrongQuestions: wrongQuestion(matchedSubmissions),
      submittedTime,
      rank: 1,
    };
  });

  result.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.submittedTime - b.submittedTime;
  });
    return calculateRankAndLock(result);
}

function WrongAnswerIterator(studentResult) {
  return {
    [Symbol.iterator]() {
      let index = 0;
      const list = studentResult ? studentResult.wrongQuestions : [];
      return {
        next() {
          return index < list.length 
            ? { value: list[index++], done: false }
            : { value: undefined, done: true };
        }
      };
    }
  };
}
console.log(gradeExam(students, answerKey, submissions));
console.log(WrongAnswerIterator(gradeExam(students, answerKey, submissions)));

const result = gradeExam(students, answerKey, submissions);

const boa = result.find(r => r.name === "Bao Pham");
console.log([...WrongAnswerIterator(boa)]);



console.log(`--- Duyệt các câu sai của ${boa.name} bằng vòng lặp for...of ---`);
for (const questionNum of WrongAnswerIterator(boa)) {
  console.log(`Học sinh làm sai hoặc bỏ trống câu số: ${questionNum}`);
}

const studentYen = result.find(r => r.name === "Yen Vo");

console.log(`\n--- Chuyển đổi nhanh iterator câu sai của ${studentYen.name} sang mảng ---`);
console.log([...WrongAnswerIterator(studentYen)]); 
// Output mong muốn: [1, 3, 4, 5]