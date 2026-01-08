function adding(a, b) {
  if (arguments.length !== 2) {
    throw new Error("Enter Valid Number of Arguments");
  }
  return a + b;
}
