var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");

var x1 = 0,
  y1 = 0;
var x2 = 350,
  y2 = 250;
var x3 = 350,
  y3 = 0;

var dx1 = 2,
  dy1 = 2;
var dx2 = -2,
  dy2 = -2;
var dx3 = -2,
  dy3 = 2;

var timer;

function move() {
  x1 += dx1;
  y1 += dy1;

  x2 += dx2;
  y2 += dy2;

  x3 += dx3;
  y3 += dy3;

  if (x1 <= 0 || x1 >= 360) dx1 *= -1;
  if (y1 <= 0 || y1 >= 260) dy1 *= -1;

  if (x2 <= 0 || x2 >= 360) dx2 *= -1;
  if (y2 <= 0 || y2 >= 260) dy2 *= -1;

  if (x3 <= 0 || x3 >= 360) dx3 *= -1;
  if (y3 <= 0 || y3 >= 260) dy3 *= -1;

  img1.style.left = x1 + "px";
  img1.style.top = y1 + "px";

  img2.style.left = x2 + "px";
  img2.style.top = y2 + "px";

  img3.style.left = x3 + "px";
  img3.style.top = y3 + "px";
}

function start(btn) {
  if (!timer) {
    btn.innerHTML = "Stop";
    timer = setInterval(move, 20);
  } else {
    btn.innerHTML = "Start";
    clearInterval(timer);
    timer = null;
  }
}

function reset() {
  document.getElementById("startbtn").innerHTML = "Start";
  clearInterval(timer);
  timer = null;

  img1.style.left = "200px";
  img1.style.top = "200px";
  x1 = 200;
  y1 = 200;

  img2.style.left = "150px";
  img2.style.top = "200px";
  x2 = 150;
  y2 = 200;

  img3.style.left = "150px";
  img3.style.top = "150px";
  x3 = 150;
  y3 = 150;
}
