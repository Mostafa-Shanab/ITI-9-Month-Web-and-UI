document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    e.preventDefault();
    alert("Ctrl+S is disabled!");
  }

  if (e.ctrlKey && e.key.toLowerCase() === "p") {
    e.preventDefault();
    alert("Ctrl+P is disabled!");
  }

  if (e.key === "F12") {
    e.preventDefault();
    alert("F12 disabled!");
  }
});
