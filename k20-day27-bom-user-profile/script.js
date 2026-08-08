const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const MY_NAME = "Binh_Thuan";
const btnHome = $("#btn-home");
const btnFp = $("#btn-fp");
const btnBack = $("#btn-back");
const dot = $("#dot");
const statusText = $("#status-text");
const loc = $("#loc");
const browser = $("#browser");
const os = $("#os");
const lang = $("#lang");
const sizeScreen = $("#screen");
const orient = $("#orient");
const adBanner = $("#ad-banner");
const pageHome = $("#page-home");
const pageFp = $("#page-fp");
const fpResult = $("#fp-result");

let data = {
  loc: "Đang lấy...",
  isOnline: getStatus(),
  browser: getBrowserName(),
  os: getOSName(),
  lang: getListLanguage(),
  screen: screen.width + " x " + screen.height,
  orient:
    window.innerHeight > window.innerWidth
      ? "Chiều dọc(Portrait)"
      : "Chiều ngang (Landscape)",
};
console.log(navigator.userAgent);

function getStatus() {
  const status = navigator.onLine;
  if (status) {
    dot.classList.remove("bg-red-500");
    dot.classList.add("bg-green-500");
    statusText.textContent = "Online";
    statusText.classList.remove("text-red-600");
    statusText.classList.add("text-green-600");
  } else {
    dot.classList.remove("bg-green-500");
    dot.classList.add("bg-red-500");
    statusText.textContent = "Offline";
    statusText.classList.remove("text-green-600");
    statusText.classList.add("text-red-600");
  }
  return status;
}
window.addEventListener("online", () => (data.isOnline = getStatus()));
window.addEventListener("offline", () => (data.isOnline = getStatus()));
console.log(getStatus());

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("Chrome")) return "Google Chrome";
  if (ua.includes("Firefox")) return "Mozilla FireFox";
  if (ua.includes("Safari")) return "Apple Safari";
  return "Trình duyệt khác";
}
console.log(getBrowserName());

function getOSName() {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac") && !ua.includes("iPhone") && !ua.includes("iPad"))
    return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "IOS";
  return "Không xác định";
}

console.log(getOSName());

function getListLanguage() {
  return navigator.languages
    ? navigator.languages.join(", ")
    : navigator.language;
}
console.log(getListLanguage());

// Lấy tọa độ Gps
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      data.loc =
        pos.coords.latitude.toFixed(4) + ", " + pos.coords.longitude.toFixed(4);
      loc.textContent = data.loc;
    },
    function () {
      data.loc = "Bị từ chối vị trí";
      loc.textContent = data.loc;
    },
  );
} else {
  data.loc = "Trình duyệt không hỗ trợ Geolocation";
  loc.textContent = data.loc;
}
browser.textContent = data.browser;
os.textContent = data.os;
lang.textContent = data.lang;
sizeScreen.textContent = data.screen;
orient.textContent = data.orient;

window.addEventListener("resize", () => {
  data.orient =
    window.innerHeight > window.innerWidth
      ? "Chiều dọc(Portrait)"
      : "Chiều ngang (Landscape)";
  orient.textContent = data.orient;
});

adBanner.href = `campaign.html?utm_source=${MY_NAME}&utm_campaign=campage_1`;

function showHome() {
  pageHome.classList.remove("hidden");
  pageFp.classList.add("hidden");
  btnHome.classList.remove("bg-gray-200", "text-gray-800");
  btnHome.classList.add("bg-blue-600", "text-white");
  btnFp.classList.remove("bg-blue-600", "text-white");
  btnFp.classList.add("bg-gray-200", "text-gray-800");
}

function showFingerprint(state) {
  pageHome.classList.add("hidden");
  pageFp.classList.remove("hidden");
  btnHome.classList.remove("bg-blue-600", "text-white");
  btnHome.classList.add("bg-gray-200", "text-gray-700");
  btnFp.classList.remove("bg-gray-200", "text-gray-700");
  btnFp.classList.add("bg-blue-600", "text-white");
  if (state) {
    const fpString =
      "LOC:" +
      state.loc +
      "|BROWSER:" +
      state.browser +
      "|OS:" +
      state.os +
      "|LANG:" +
      state.lang +
      "|SCREEN:" +
      state.screen +
      "|ORIENT:" +
      state.orient;
    fpResult.textContent = fpString;
  } else {
    fpResult.textContent = "Không tìm thấy history.state!";
  }
}

btnFp.addEventListener("click", () => {
  history.pushState(data, "", "#fingerprint");
  showFingerprint(data);
});

btnHome.addEventListener("click", () => {
  history.pushState(null, "", window.location.pathname);
  showHome();
});
btnBack.addEventListener("click", () => {
  history.back();
});

window.addEventListener("popstate", (e) => {
  if (e.state) {
    showFingerprint(e.state);
  } else {
    showHome();
  }
});
