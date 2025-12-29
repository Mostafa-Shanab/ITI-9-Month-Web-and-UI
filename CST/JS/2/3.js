function getLargestWord(str) {
  let words = str.split(" ");
  let largestWord = "";

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > largestWord.length) {
      largestWord = words[i];
    }
  }

  return largestWord;
}

let input = "this is a javascript string javascripts demo";
let result = getLargestWord(input);
console.log(result);
