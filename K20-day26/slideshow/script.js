const rawImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80",
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const images = [rawImages[rawImages.length - 1], ...rawImages, rawImages[0]];

const slider = $("#slider");
const track = $("#track");
const prevBtn = $("#prev-btn");
const nextBtn = $("#next-btn");
const dotsContainer = $("#dots-container");
const counter = $("#counter");

let currentIndex = 1;
let isTransitioning = false;
let autoPlayTimer = null;

images.forEach((src) => {
  const slide = document.createElement("div");
  slide.className = `w-full flex-shrink-0`;
  slide.innerHTML = `<img src="${src}" class="w-full h-[380px] object-cover pointer-events-none"/>`;
  track.appendChild(slide);
});

rawImages.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = `w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all`;
  dot.addEventListener("click", () => {
    if (isTransitioning) return;
    goToSlide(index + 1);
    resetAutoPlay();
  });
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateUI() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  let realIndex = currentIndex - 1;
  if (currentIndex === 0) realIndex = rawImages.length - 1;
  if (currentIndex === images.length - 1) realIndex = 0;
  counter.textContent = `${realIndex + 1} / ${rawImages.length}`;
  dots.forEach((dot, index) => {
    if (index === realIndex) {
      dot.className = "w-6 h-3 rounded-full bg-indigo-500 transition-all";
    } else {
      dot.className = `w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all`;
    }
  });
}

function goToSlide(index, withAnimation = true) {
  isTransitioning = withAnimation;
  if (withAnimation) {
    track.style.transition = "transform 500ms ease-in-out";
  } else {
    track.style.transition = "none";
  }
  currentIndex = index;
  updateUI();
}

track.addEventListener("transitionend", () => {
  isTransitioning = false;
  if (currentIndex === 0) {
    goToSlide(images.length - 2, false);
  } else if (currentIndex === images.length - 1) {
    goToSlide(1, false);
  }
});

function nextSlide() {
  if (isTransitioning) return;
  goToSlide(currentIndex + 1);
}

function prevSLide() {
  if (isTransitioning) return;
  goToSlide(currentIndex - 1);
}

prevBtn.addEventListener("click", () => {
  prevSLide();
  resetAutoPlay();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

function startAutoPlay() {
  if (!autoPlayTimer) {
    autoPlayTimer = setInterval(nextSlide, 3000);
  }
}


function stopAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

slider.addEventListener("mouseenter", stopAutoPlay);
slider.addEventListener("mouseleave", startAutoPlay);


function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
        prevSLide();
        resetAutoPlay();
    } else if (e.key === "ArrowRight") {
        nextSlide();
        resetAutoPlay();
    }
}

slider.addEventListener("focus", () => {
    slider.addEventListener("keydown", handleKeyDown);
})

slider.addEventListener("blur", () => {
    slider.removeEventListener("keydown", handleKeyDown);
})

goToSlide(1, false);
startAutoPlay();