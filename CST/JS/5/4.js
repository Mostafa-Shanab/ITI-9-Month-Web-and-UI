document.addEventListener("keydown", (e) => {
  console.log("keydown:", e.key, e.code);
});

document.addEventListener("keypress", (e) => {
  console.log("keypress:", e.key, e.code);
});
