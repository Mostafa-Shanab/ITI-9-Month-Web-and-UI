if ("serviceWorker" in navigator) {
  window.addEventListener("load", (event) => {
    navigator.serviceWorker
      .register("./sw.js") // , { scope: "./Pages" }
      .then((reg) => {
        console.log("🚀 ~ regz:", reg);
      })
      .catch((err) => {
        console.log("🚀 ~ err:", err);
      });
  });
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  installBtn.style.display = "none";
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
});
