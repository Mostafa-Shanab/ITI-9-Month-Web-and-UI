// let childWindow = window.open("child.html", "", "width=300,height=150");

// let moveX = 1;
// let moveY = 2;

// let timer = setInterval(function () {
//   if (childWindow && !childWindow.closed) {
//     childWindow.moveBy(moveX, moveY);
//     childWindow.focus();
//     childWindow.resizeTo(400, 250);

//     const y = childWindow.screenY + 5;
//     const height = childWindow.outerHeight;
//     if (y + height >= screen.availHeight) {
//       console.log("Child window touched the bottom!");
//       moveX = -1;
//       moveY = -2;
//     }
//     if (y <= 5) {
//       console.log("Child window touched the top!");
//       moveX = 1;
//       moveY = 2;
//     }
//   }
// }, 10);

// function stopTimer() {
//   clearInterval(timer);
// }

let childWindow = window.open("child.html", "", "width=300,height=150");

let moveX = 1;
let moveY = 2;

let timer;

function moveChild() {
  if (childWindow && !childWindow.closed) {
    childWindow.moveBy(moveX, moveY);
    childWindow.focus();
    childWindow.resizeTo(400, 250);

    const y = childWindow.screenY + 5;
    const height = childWindow.outerHeight;

    if (y + height >= screen.availHeight) {
      console.log("Child window touched the bottom!");
      moveX = -1;
      moveY = -2;
    }

    if (y <= 5) {
      console.log("Child window touched the top!");
      moveX = 1;
      moveY = 2;
    }

    // Call this function again after 10ms
    timer = setTimeout(moveChild, 10);
  }
}

moveChild();

function stopTimer() {
  clearTimeout(timer);
}
