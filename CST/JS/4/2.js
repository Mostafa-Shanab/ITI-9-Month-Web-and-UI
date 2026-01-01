function startExec() {
  const childWindow = window.open("child.html", "", "width=400,height=300");

  childWindow.onload = function () {
    const msg = "Mostafa Shaaban Shanab";
    let i = 0;

    let timerID = setInterval(function () {
      childWindow.document.querySelector("h1").innerHTML += msg[i];

      i++;

      if (i === msg.length) {
        clearInterval(timerID);
        setTimeout(function () {
          childWindow.close();
        }, 3333);
      }
    }, 333);
  };
}
