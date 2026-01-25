function getCookie(cookieName) {
  // Retrieves a cookie value based on a cookie name.
  if (arguments.length !== 1) {
    throw new Error("Enter valid number of arguments");
  }
  if (typeof arguments[0] !== "string") {
    throw new Error("You should enter string value");
  }

  cookieObj = {};
  allPairs = document.cookie.split("; ");
  for (const currentPair of allPairs) {
    keyValue = currentPair.split("=");
    cookieObj[keyValue[0]] = keyValue[1];
  }

  return cookieObj[cookieName];
}

function setCookie(cookieName, cookieValue, expiryDate) {
  // Sets a cookie based on a cookie name, cookie value, and expiration date.
  if (arguments.length < 2 || arguments.length > 3) {
    throw new Error("Enter valid number of arguments");
  }
  if (typeof arguments[0] !== "string") {
    throw new Error("You should enter cookieName as a string value");
  }
  if (arguments.length === 3) {
    if (!(arguments[2] instanceof Date)) {
      throw new Error("You should enter expiryDate as a date type");
    }
    document.cookie = `${cookieName}=${cookieValue};expires=${expiryDate};`;
  } else {
    document.cookie = `${cookieName}=${cookieValue}`;
  }
}

function deleteCookie(cookieName) {
  // Deletes a cookie based on a cookie name.
  if (arguments.length !== 1) {
    throw new Error("Enter valid number of arguments");
  }
  if (typeof arguments[0] !== "string") {
    throw new Error("You should enter string value");
  }

  document.cookie = `${cookieName}=;expires=${new Date()};`;
}

function allCookieList() {
  // returns a list of all stored cookies
  cookieObj = {};
  allPairs = document.cookie.split("; ");
  for (const currentPair of allPairs) {
    keyValue = currentPair.split("=");
    cookieObj[keyValue[0]] = keyValue[1];
  }

  return cookieObj;
}

function hasCookie(cookieName) {
  // Check whether a cookie exists or not
  if (arguments.length !== 1) {
    throw new Error("Enter valid number of arguments");
  }
  if (typeof arguments[0] !== "string") {
    throw new Error("You should enter string value");
  }

  cookieObj = {};
  allPairs = document.cookie.split("; ");
  for (const currentPair of allPairs) {
    keyValue = currentPair.split("=");
    cookieObj[keyValue[0]] = keyValue[1];
  }

  if (cookieObj[cookieName]) return true;

  return false;
}
