let adWindow = window.open(
  "child_ad.html",
  "",
  "width=400,height=300,scrollbars=yes"
);

let timer;

function scrollAd() {
  if (adWindow && !adWindow.closed) {
    adWindow.scrollBy(0, 1);

    timer = setTimeout(scrollAd, 10);
  }
}

scrollAd();

function stopTimer() {
  clearTimeout(timer);
}

// let adWindow = window.open(
//   "child_ad.html",
//   "",
//   "width=400,height=300,scrollbars=yes"
// );

// let timer = setInterval(function(){
//   adWindow.scrollBy(0, 1);
// }, 10)

// function stopTimer() {
//   clearTimeout(timer);
// }
