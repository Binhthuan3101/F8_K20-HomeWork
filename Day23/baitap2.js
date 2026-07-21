function addDays(dateString, days) {
  const date = new Date(dateString);
  const day = date.getDate();
  date.setDate(day + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  return `${year}-${month}-${String(date.getDate()).padStart(2, 0)}`;
}

console.log(addDays("2026-07-19", 10));
// "2026-07-29"
console.log(addDays("2026-07-25", 10));
// "2026-08-04"
console.log(addDays("2026-01-01", -5));
// "2025-12-27"

function getDaysBetween(date1String, date2String) {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);
  const diffInMs = date2 - date1;
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffInDays = diffInMs / msPerDay;
  return Math.abs(Math.round(diffInDays));
}

console.log(getDaysBetween("2026-07-19", "2026-08-01"));
// 13
console.log(getDaysBetween("2026-01-01", "2026-12-31"));
// 364

function isExpired(expiryDateString, currentDateString) {
  const expiredDate = new Date(expiryDateString);
  const currDate = new Date(currentDateString);
  if (currDate > expiredDate) {
    return true;
  }
  return false;
}

console.log(isExpired("2026-07-01", "2026-07-19"));
// true  (đã qua ngày hết hạn)
console.log(isExpired("2026-12-31", "2026-07-19"));
// false (chưa tới hạn)

function getCountdown(targetDateString, currentDateString) {
  const targetDate = new Date(targetDateString);
    const currDate = new Date(currentDateString);
    const diffDate = targetDate- currDate;
    const msPerDay = 24 * 60 * 60 * 1000;
    const msPerHour = 60 * 60 * 1000;
    const diffDay = Math.floor(diffDate / msPerDay);
    const diffHour = Math.floor((diffDate % msPerDay)/msPerHour);
    if (currDate > targetDate) {
        return `Đã qua hạn`;
    }
    return `Còn ${diffDay} ngày ${diffHour} giờ`;
}


console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00"));

// "Còn 12 ngày 12 giờ"

console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00"));

// "Đã qua hạn"