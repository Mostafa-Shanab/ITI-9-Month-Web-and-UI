let rowNumbers = parseFloat(prompt("Enter Number of Rows"));

for (let i = 1; i <= rowNumbers; i++) {
  for (let j = 0; j < i; j++) {
    document.write("*");
  }
  document.writeln("</br>");
}
