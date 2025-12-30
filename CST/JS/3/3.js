function dispVal(obj, key) {
  if (key in obj) {
    let res = `${obj[key]} years old`;
  }
  return res;
}

obj = { nm: "ali", age: 10, test: undefined };

dispVal(obj, "age");

console.log(dispVal(obj, "age"));
