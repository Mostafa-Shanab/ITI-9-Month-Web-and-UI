let fruits = ["apple", "strawberry", "banana", "orange", "mango"];

// a) Test that every element is a string
const allStrings = fruits.every((item) => typeof item === "string");
console.log(allStrings);

// b) Test that some elements start with "a"
const startsWithA = fruits.some((item) => item.startsWith("a"));
console.log(startsWithA);

// c) Filter elements starting with "b" or "s"
const filteredFruits = fruits.filter(
  (item) => item.startsWith("b") || item.startsWith("s"),
);
console.log(filteredFruits);

// d) Generate new array with sentences
const likedFruits = fruits.map((item) => `I like ${item}`);
console.log(likedFruits);

// e) Display elements using forEach()
likedFruits.forEach((item) => {
  console.log(item);
});
