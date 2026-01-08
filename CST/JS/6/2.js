function adding() {
  if (arguments.length < 1) {
    throw new Error("Enter Valid Number of Arguments");
  }

  let result = 0;

  for (const num of arguments) {
    if (typeof num !== "number") {
      throw new Error("Should be of type number");
    }
    result += num;
  }

  return result;
}
