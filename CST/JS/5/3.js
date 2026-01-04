const input = document.getElementById("userName");

const custEvent = new Event("waiting");

let timer = setTimeout(() => {
  input.dispatchEvent(custEvent);
}, 3000);

input.addEventListener("input", function () {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    input.dispatchEvent(custEvent);
  }, 3000);
});

input.addEventListener("waiting", function () {
  alert("User has not entered any data for 3 seconds");
});
