const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabsContainer = $("#tabs-container");
const tabBtns = Array.from($$(".tab-btn"));
const tabPanels = $$(".tab-panel");
console.log(tabBtns);
console.log(tabPanels);

let currentIndex = 0;

function activateTab(index) {
  currentIndex = index;
  tabBtns.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add(
        "border-indigo-600",
        "text-indigo-600",
        "bg-white",
        "font-semibold",
      );
      btn.classList.remove("border-transparent", "text-slate-600");
    } else {
      btn.classList.remove(
        "border-indigo-600",
        "text-indigo-600",
        "bg-white",
        "font-semibold",
      );
      btn.classList.add("border-transparent", "text-slate-600");
    }
  });

  const targetId = tabBtns[index].dataset.tab;
  tabPanels.forEach((panel) => {
    if (panel.id === targetId) {
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  });
}
tabBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => activateTab(index));
});

//Điều khiển bàn phím
function handleKeyDown(e) {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + tabBtns.length) % tabBtns.length;
    activateTab(prevIndex);
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % tabBtns.length;
    activateTab(nextIndex);
  }
}

tabsContainer.addEventListener("focusin", () => {
  tabsContainer.addEventListener("keydown", handleKeyDown);
});

tabsContainer.addEventListener("focusout", (e) => {
  if (!tabsContainer.contains(e.relatedTarget)) {
    tabsContainer.removeEventListener("keydown", handleKeyDown);
  }
});
activateTab(0);
