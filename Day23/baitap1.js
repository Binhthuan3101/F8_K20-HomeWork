function formatBirthday(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

console.log(formatBirthday("1995-03-25")); // "25/03/1995"
console.log(formatBirthday("2000-12-01")); // "01/12/2000"

function getAge(birthDateString, currentDateString) {
  const birthDate = new Date(birthDateString);
  const currentDate = new Date(currentDateString);
  const birthYear = birthDate.getFullYear();
  const currYear = currentDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const currMonth = currentDate.getMonth();
  const birthDay = birthDate.getDate();
  const currDay = currentDate.getDate();
  let age = currYear - birthYear;
  if (
    currMonth < birthMonth ||
    (currMonth === birthMonth && currDay < birthDay)
  ) {
    age = age - 1;
  } else {
    age = age;
  }
  return age;
}
console.log(getAge("1995-03-25", "2026-07-19"));
// 31  (đã qua sinh nhật tháng 3)
console.log(getAge("2000-12-01", "2026-07-19"));
// 25  (chưa tới sinh nhật tháng 12, nên chưa tính là 26)
console.log(getAge("1995-08-01", "2026-07-19"));
// 30  (còn vài ngày nữa mới tới sinh nhật)

function getDayOfWeekName(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();
  const dayInWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  return `${dayInWeek[day]}`;
}

console.log(getDayOfWeekName("2026-07-19"));
// "Chủ nhật"
console.log(getDayOfWeekName("2000-01-01"));
// "Thứ bảy"
