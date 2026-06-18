function analyzeClass(scores) {
  let xuatSac = 0;
  let gioi = 0;
  let kha = 0;
  let trungBinh = 0;
  let yeu = 0;
  let max = null;
  let min = null;
  let invalidScore = 0;
  let validStudent = 0;
  let totalScore = 0;
  let isFirstValid = true;
  for (let i = 0; i < scores.length; i++) {
    let score = scores[i];
    if (score < 0 || score > 10) {
      invalidScore++;
    } else {
      validStudent++;
      totalScore += score;
      if (isFirstValid) {
        max = score;
        min = score;
        isFirstValid = false;
      } else {
        if (score > max) {
          max = score;
        }
        if (score < min) {
          min = score;
        }
      }

      if (score >= 9 && score <= 10) {
        xuatSac++;
      } else if (score >= 8 && score < 9) {
        gioi++;
      } else if (score >= 6.5 && score < 8) {
        kha++;
      } else if (score >= 5 && score < 6.5) {
        trungBinh++;
      } else {
        yeu++;
      }
    }
  }
    let averageScore = 0;
    let comment = "";
    if (validStudent === 0) {
        averageScore = 0;
        comment = "Không có dữ liệu hợp lệ.";
    } else {
        let rawAverage = totalScore / validStudent;
        averageScore = Math.round(rawAverage * 100) / 100;
        let khaTroLen = xuatSac + gioi + kha;
        let halfClass = validStudent / 2;
        if (khaTroLen>halfClass) {
            comment = "Lớp học tốt";
        }
        else if (yeu > halfClass) {
            comment = "Cần cải thiện.";
        }
        else {
            comment = "Lớp học ở mức ổn.";
        }
    }
    return {
        "Xuất sắc": xuatSac,
        "Giỏi":gioi,
        "Khá": kha,
        "Trung bình": trungBinh,
        "Yếu": yeu,
        "Điểm cao nhất": max,
        "Điểm thấp nhất": min,
        "Điểm trung bình":averageScore,
        "Số điểm không hợp lệ": invalidScore,
        "Nhận xét":comment
    }
}

console.log(analyzeClass([9, 7, -2, 5.5, 10, 4, 11, 6.5, 8]));
