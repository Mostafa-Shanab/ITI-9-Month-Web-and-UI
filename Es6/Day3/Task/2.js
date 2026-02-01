const handler = {
  set(target, prop, value) {
    switch (prop) {
      case "name":
        if (typeof value !== "string" || value.length !== 7) {
          throw new Error("Name must be a string of exactly 7 characters");
        }
        break;

      case "address":
        if (typeof value !== "string") {
          throw new Error("Address must be a string");
        }
        break;

      case "age":
        if (typeof value !== "number" || value < 25 || value > 60) {
          throw new Error("Age must be a number between 25 and 60");
        }
        break;

      default:
        throw new Error(`Property '${prop}' is not allowed`);
    }

    target[prop] = value;
  },
};

const person = new Proxy({}, handler);

person.name = "Mostafa";
person.address = "Cairo";
person.age = 30; //

console.log(person);

// Errors
person.name = "Ali";
person.age = 70;
person.email = "x@y.com";
