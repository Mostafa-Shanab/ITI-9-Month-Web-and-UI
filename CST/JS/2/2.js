let text = prompt("Enter a string:");
let caseSensitive = confirm("Case Sensitive?");

let originalText = text;

// If user chooses to ignore case sensitivity
if (!caseSensitive) {
  text = text.toLowerCase();
}

let reversedText = "";

for (let i = text.length - 1; i >= 0; i--) {
  reversedText += text[i];
}

if (text === reversedText) {
  alert(originalText + " is a palindrome.");
} else {
  alert(originalText + " is NOT a palindrome.");
}
