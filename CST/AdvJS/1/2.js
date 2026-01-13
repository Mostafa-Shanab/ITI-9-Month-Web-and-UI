function reverse1() {
  var arr = [].slice.call(arguments);
  return arr.reverse();
}

function reverse2() {
  return [].reverse.call(arguments);
}

function reverse3() {
  return [].reverse.bind([].slice.apply(arguments))();
}
