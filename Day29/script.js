// /const inputs = document.querySelectorAll("#form-login input");
// const formLogin = document.querySelector("#form-login");
// inputs.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     const value = e.target.value;
//     const name = e.target.name;

//     if (name !== "password") {
//       localStorage.setItem(name, value);
//     }
//   });
//   input.value = localStorage.getItem(input.name) || "";
// });

// formLogin.addEventListener("submit", (e) => {
//     e.preventDefault();
//     // localStorage.clear();
//   inputs.forEach((input) => {
//     localStorage.removeItem(input.name);
//   });
//   formLogin.reset();
// });

// localStorage.length;

// // const b = "''";

// // sessionStorage
// // đóng tab sẽ mất

// // cookie

// document.cookie;

// // Giới thiệu
// // authentication là quá trình xác minh danh tính người dùng bạn là ai
// // server abc123
// // client:abc123
// // req-(abc123)->Server

// // server
// // client: JWT
// // req-(JWT)->server
// // blackList: JWT-1786287908938

// const payload = {
//     sub: "1234567890",
//     name: "John Doe",
//     admin: true,
//     iat: 1516239022,
//     expiredAt: 1786287908938
// }

const formLogin = document.querySelector("#form-login");
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  fetch("https://spotify.f8team.dev/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      window.location.href = "./register.html";
    });
});
