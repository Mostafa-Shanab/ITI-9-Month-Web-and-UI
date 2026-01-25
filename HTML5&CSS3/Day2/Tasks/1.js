(function () {
  if (window.localStorage) return;

  window.localStorage = {
    setItem: function (key, value) {
      if (arguments.length !== 2) {
        throw new Error("setItem requires exactly 2 arguments");
      }
      setCookie(key, value);
    },

    getItem: function (key) {
      if (arguments.length !== 1) {
        throw new Error("getItem requires exactly 1 argument");
      }
      return hasCookie(key) ? getCookie(key) : null;
    },

    removeItem: function (key) {
      if (arguments.length !== 1) {
        throw new Error("removeItem requires exactly 1 argument");
      }
      deleteCookie(key);
    },

    clear: function () {
      const cookies = allCookieList();
      for (let key in cookies) {
        deleteCookie(key);
      }
    },

    key: function (index) {
      const keys = Object.keys(allCookieList());
      return keys[index] || null;
    },

    get length() {
      return Object.keys(allCookieList()).length;
    },
  };
})();

/***********************
 *  TEST UTILITIES
 ***********************/
function assert(condition, message) {
  if (condition) {
    console.log("✅ PASS:", message);
  } else {
    console.error("❌ FAIL:", message);
  }
}

console.log("🔍 Running localStorage polyfill tests...");

/***********************
 *  TEST CASES
 ***********************/

// Clear before testing
localStorage.clear();

/* Test 1: setItem & getItem */
localStorage.setItem("name", "Ahmed");
assert(
  localStorage.getItem("name") === "Ahmed",
  "setItem / getItem should work",
);

/* Test 2: getItem non-existing */
assert(
  localStorage.getItem("unknown") === null,
  "getItem should return null if key not found",
);

/* Test 3: removeItem */
localStorage.setItem("age", "22");
localStorage.removeItem("age");
assert(
  localStorage.getItem("age") === null,
  "removeItem should delete the key",
);

/* Test 4: length */
localStorage.clear();
localStorage.setItem("a", "1");
localStorage.setItem("b", "2");
assert(
  localStorage.length === 2,
  "length should return correct number of items",
);

/* Test 5: key(index) */
const k0 = localStorage.key(0);
const k1 = localStorage.key(1);
assert(k0 !== null && k1 !== null, "key(index) should return stored keys");

/* Test 6: clear */
localStorage.clear();
assert(localStorage.length === 0, "clear should remove all items");

/* Test 7: error handling */
try {
  localStorage.setItem("x");
  assert(false, "setItem should throw error on invalid args");
} catch {
  assert(true, "setItem throws error on invalid args");
}

try {
  localStorage.getItem("x", "y");
  assert(false, "getItem should throw error on invalid args");
} catch {
  assert(true, "getItem throws error on invalid args");
}

/* Test 8: cookie integration */
localStorage.setItem("theme", "dark");
assert(hasCookie("theme") === true, "setItem should create cookie");

assert(getCookie("theme") === "dark", "cookie value should match stored value");

console.log("🎉 All tests finished");
