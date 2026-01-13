var obj = {
  id: "10",
  location: "Cairo",
  addr: "Egypt",

  getSetGen: function () {
    for (var prop in this) {
      if (typeof this[prop] === "function") continue;

      var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

      // create getter
      if (!this["get" + capName]) {
        this["get" + capName] = (function (p) {
          return function () {
            return this[p];
          };
        })(prop);
      }

      // create setter
      if (!this["set" + capName]) {
        this["set" + capName] = (function (p) {
          return function (value) {
            this[p] = value;
          };
        })(prop);
      }
    }
  },
};

obj.getSetGen();
console.log(obj.getId());

var user = {
  name: "Ali",
  age: 10,
};

obj.getSetGen.call(user);

console.log(user.getName());
user.setAge(25);
console.log(user.getAge());
