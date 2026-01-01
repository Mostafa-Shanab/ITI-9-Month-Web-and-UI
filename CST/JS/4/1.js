function startExec() {
  console.log("Waiting 5 seconds...");

  const start = Date.now();
  while (Date.now() - start < 5000) {}

  console.log("Done after 5 seconds");
}
