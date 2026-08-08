// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const tabs = $$(".tab");
// const tabContents = $$(".tab-content");

// tabs.forEach((tab) => {
//   const currentTab = tab.dataset.tab;
//   tab.addEventListener("click", () => {
//     tabContents.forEach((tabContent) => {
//       if (currentTab === tabContent.dataset.tab) {
//         tabContent.classList.remove("hidden");
//       } else {
//         tabContent.classList.add("hidden");
//       }
//     });
//     tabs.forEach((item) => {
//       if (currentTab === item.dataset.tab) {
//         item.classList.add("active");
//       } else {
//         item.classList.remove("active");
//       }
//     });
//   });
// });

// window.alert()hiện thị hộp thông báo
//window.confirm() hiện ra sự báo
// window.prompt() ô nhập giá trị44

// setTimeout(() => {
//     console.log("chạy sau 3 giây");

// }, 3000);

// setInterval(() => {
//     console.log("Chạy sau 3 giây");

// })

setTimeout(() => {
  window.open("https://www.google.com/", "_blank");
}, 3000);

// close đóng window

// screen
// screen.width
// screen.availWidth
// screen.availHeight
console.log(screen.orientation);

// location"
let hello = 10;
// const btn = document.querySelector("button");
// btn.addEventListener("click", () => {
//   //   console.log(location);
//   // console.log(location.port="9999");
//   // console.log((hello += 10));
//   // console.log(location.search=`?hello=${hello}`);//?query=value
//   // console.log(location.hash);
// //   console.log(location.assign());

//   location.reload();
// });

// location.protocol giao thức vd: http, https

// location.assign() //giống href

// location.replace()//Thay url hiện tại


// history
// history.length  số lượng mục trong lịch sử phê duyệt web
// history.back(); // quay lại trang trước đó
// history.forward();// đi tới trang tiếp theo
// history.go()// di chuyển n bước trong lịch sử
// history.pushState()
const changeNoReload = document.querySelector("#change-no-reload");
changeNoReload.addEventListener("click", () => {
    history.pushState({ name: "hello" }, "title", "?name=hello");
})


//Navigator
console.log(navigator.userAgent);
 //chuỗi nhận diện trình duyệt
console.log(navigator.language);
 //ngôn ngữ chính của trình duyệt
console.log(navigator.languages);
//mảng ngôn ngữ người dùng ưu tiên
 
console.log(navigator.onLine);
// trả về true nếu trình duyệt đang kết nối mạng
console.log(navigator.platform);
console.log(navigator.cookieEnabled);
console.log(navigator.geolocation.getCurrentPosition((position => {
    console.log(position);
    
})));

