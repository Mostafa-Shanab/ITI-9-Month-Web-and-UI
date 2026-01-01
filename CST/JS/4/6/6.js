coverImage = "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/Moon.gif";

const srcImages = [
  "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/1.gif",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/2.gif",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/3.gif",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/4.gif",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/5.gif",
  "../CST-Day6/CST-Day6/Tasks/TaskResources/memory Game/6.gif",
];

const allImages = document.images;

const lengthImages = allImages.length;

let gameImages = [];
for (let i = 0; i < srcImages.length; i++) {
  gameImages.push(srcImages[i]);
  gameImages.push(srcImages[i]);
}

gameImages.sort(() => Math.random() - 0.5);

for (let i = 0; i < lengthImages; i++) {
  allImages[i].dataset.real = gameImages[i];
  allImages[i].src = coverImage;
}

flipped = [];

function flipCard(currentImage) {
  if (flipped.includes(currentImage) || !currentImage.src.includes("Moon.gif"))
    return;

  // flip the card
  currentImage.src = currentImage.dataset.real;
  flipped.push(currentImage);

  if (flipped.length === 2) {
    const first = flipped[0];
    const second = flipped[1];

    if (first.dataset.real === second.dataset.real) {
      flipped = [];
      checkAllFlipped();
    } else {
      // no match, flip back after 1s
      setTimeout(() => {
        first.src = coverImage;
        second.src = coverImage;
        flipped = [];
      }, 1000);
    }
  }
}

function checkAllFlipped() {
  allFlipped = true;

  for (let i = 0; i < lengthImages; i++) {
    if (allImages[i].src.includes("Moon.gif")) {
      allFlipped = false;
    }
  }

  if (allFlipped) {
    alert("Puzzle Solved :)");
  }
}
