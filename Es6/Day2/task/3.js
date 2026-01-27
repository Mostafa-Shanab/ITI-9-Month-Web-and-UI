const truncateLongString = {
  [Symbol.replace](string) {
    if (string.length > 15) {
      return string.slice(0, 15) + "…";
    }
    return string;
  },
};

const longText = "JavaScript is very powerful language";
console.log(longText.replace(truncateLongString));

const shortText = "Hello World";
console.log(shortText.replace(truncateLongString));
