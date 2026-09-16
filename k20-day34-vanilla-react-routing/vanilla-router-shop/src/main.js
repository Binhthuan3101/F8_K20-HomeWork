import { router, navigateTo } from "./router/index.js";


document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute("href"));
    }
  });
  router();
});

window.addEventListener("popstate", router);
