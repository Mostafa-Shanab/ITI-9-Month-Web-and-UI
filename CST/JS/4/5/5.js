const allImages = document.images;

const lengthImages = allImages.length;

let index = 0;

let marbelMove = setInterval(function () {
  allImages[index].src =
    "../CST-Day6/CST-Day6/Tasks/TaskResources/marbels/marble1.jpg";

  index = (index + 1) % lengthImages;

  allImages[index].src =
    "../CST-Day6/CST-Day6/Tasks/TaskResources/marbels/marble3.jpg";
}, 555);

function enterImage() {
  clearInterval(marbelMove);
}

function leaveImage() {
  marbelMove = setInterval(function () {
    allImages[index].src =
      "../CST-Day6/CST-Day6/Tasks/TaskResources/marbels/marble1.jpg";

    index = (index + 1) % lengthImages;

    allImages[index].src =
      "../CST-Day6/CST-Day6/Tasks/TaskResources/marbels/marble3.jpg";
  }, 555);
}
