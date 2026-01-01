const srcImages = [
  "../CST-Day6/CST-Day6/Tasks/TaskResources/SlideShow/1.jpg",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/SlideShow/2.jpg",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/SlideShow/3.jpg",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/SlideShow/4.jpg",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/SlideShow/5.jpg",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/SlideShow/6.jpg",
];

let index = 0;
let slideInterval = null;

const photoEl = document.getElementById("photo");

photoEl.src = srcImages[index];

function nextButton() {
  if (index < srcImages.length - 1) {
    photoEl.src = srcImages[++index];
  }
}

function prevButton() {
  if (index > 0) {
    photoEl.src = srcImages[--index];
  }
}

function startSlider() {
  if (slideInterval) return;

  slideInterval = setInterval(() => {
    photoEl.src = srcImages[index];
    index = (index + 1) % srcImages.length;
  }, 2000);
}

function stopSlider() {
  clearInterval(slideInterval);
  slideInterval = null;
}
