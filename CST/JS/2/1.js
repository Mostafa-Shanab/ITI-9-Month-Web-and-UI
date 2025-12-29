let text = prompt("Enter a string:");
let char = prompt("Enter the character you want to count:");
let caseSensitive = confirm("Do you want to consider letter case?");

// If case-insensitive, convert both to lowercase
if (!caseSensitive) {
  text = text.toLowerCase();
  char = char.toLowerCase();
}

let count = 0;

for (let i = 0; i < text.length; i++) {
  if (text[i] === char) {
    count++;
  }
}

alert("The character '" + char + "' appears " + count + " times.");
