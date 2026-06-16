function classifyUser(user) {
  const displayName = user.name ? user.name : "Ẩn danh";
  const isAdult = user.age >= 18 ? true : false;
  const hasEmail = user.email !== "" ? true : false;
  const role =
    (user.role !== null && user.role !== undefined) ? user.role : "guest";
  let status = user.score >= 80 ? "vip" : user.score >= 50 ? "normal" : "new";
  const canAccess = isAdult === true && role !== "guest" ? true : false;
  return {
    displayName: displayName,
    isAdult: isAdult,
    hasEmail: hasEmail,
    role: role,
    status: status,
    canAccess: canAccess,
  };
}

console.log(
  classifyUser({ name: "An", age: 17, email: "", score: 0, role: null }),
);
console.log(
  classifyUser({
    name: "Bình",
    age: 22,
    email: "binh@gmail.com",
    score: 85,
    role: "admin",
  }),
);
console.log(
  classifyUser({
    name: "Chi",
    age: 20,
    email: "chi@gmail.com",
    score: 55,
    role: undefined,
  }),
);
console.log(
  classifyUser({ name: "", age: 30, email: "", score: 80, role: "member" }),
);
console.log(
  classifyUser({
    name: "Duy",
    age: 16,
    email: "duy@gmail.com",
    score: 90,
    role: "admin",
  }),
);

