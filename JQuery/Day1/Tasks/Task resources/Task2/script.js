function start() {
  var header = document.getElementById("header");

  var ul = document.getElementById("nav");
  var img = document.images[0];

  // var img2 = img.cloneNode(true);
  var img2 = document.createElement("img");
  img2.src = img.src;
  img2.alt = img.alt;

  var topRight = document.createElement("div");
  var bottomLeft = document.createElement("div");

  topRight.appendChild(img2);
  bottomLeft.appendChild(img);

  document.body.appendChild(topRight);
  document.body.appendChild(bottomLeft);

  document.body.removeChild(header);
  // document.body.removeChild(nav);

  topRight.style.position = "absolute";
  topRight.style.top = "10px";
  topRight.style.right = "10px";

  bottomLeft.style.position = "absolute";
  bottomLeft.style.bottom = "10px";
  bottomLeft.style.left = "10px";

  ul.style.position = "absolute";
  ul.style.bottom = "50%";
  ul.style.left = "50%";
  ul.style.margin = "auto";
  ul.style.width = "fit-content";
  ul.style.transform = "translateX(-50%)";
  ul.style.listStyleType = "circle";
}
