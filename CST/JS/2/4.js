let userName;
do {
  userName = prompt("Enter your name (letters only):");
} while (!/^[A-Za-z\s]+$/.test(userName));

let phone;
do {
  phone = prompt("Enter your phone number (8 digits):");
} while (!/^\d{8}$/.test(phone));

let mobile;
do {
  mobile = prompt(
    "Enter your mobile number (11 digits, starts with 010/011/012):"
  );
} while (!/^(010|011|012)\d{8}$/.test(mobile));

let email;
do {
  email = prompt("Enter your email address:");
} while (!/^[a-zA-Z]{3}@[0-9]{3}\.com$/.test(email));
// } while (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(email));

let color;
do {
  color = prompt("Choose a color: red, green, or blue").toLowerCase();
} while (!(color === "red" || color === "green" || color === "blue"));

let today = new Date();

document.write(
  `<h2 style="color:${color}">
      Welcome ${userName}!<br>
      Phone: ${phone}<br>
      Mobile: ${mobile}<br>
      Email: ${email}<br>
      Date: ${today}
  </h2>`
);
