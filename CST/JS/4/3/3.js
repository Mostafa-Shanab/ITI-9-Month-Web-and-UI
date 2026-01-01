const query = location.search.substring(1);
const pairs = query.split("&");
const obj = {};

for (let i = 0; i < pairs.length; i++) {
  const parts = pairs[i].split("=");
  const key = parts[0];
  const value = decodeURIComponent(parts[1].replace(/\+/g, " "));

  obj[key] = value;
}

document.getElementById(
  "greeting"
).innerText = `Welcome ${obj.title} ${obj.userName}`;

document.getElementById("info").innerHTML = `
        <p><strong>Email:</strong> ${obj.email}</p>
        <p><strong>Mobile:</strong> ${obj.mobile}</p>
        <p><strong>Gender:</strong> ${obj.gender}</p>
        <p><strong>Address:</strong> ${obj.address}</p>
      `;

console.log(navigator.userAgent);
if (
  !(
    /Chrome/.test(navigator.userAgent) &&
    !/Edg|OPR|Opera/.test(navigator.userAgent)
  )
) {
  document.getElementById("browserMsg").innerText =
    "For best experience, please use Google Chrome browser.";
}
