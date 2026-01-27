const user = {
  name: "Mostafa",
  age: 22,
  job: "Developer",

  [Symbol.iterator]() {
    const entries = Object.entries(this);
    let index = 0;

    return {
      next() {
        if (index < entries.length) {
          return {
            value: {
              key: entries[index][0],
              value: entries[index++][1],
            },
            done: false,
          };
        }
        return { done: true };
      },
    };
  },
};

// for (const item of user) {
//   console.log(item);
// }

for (const { key, value } of user) {
  console.log(`${key} => ${value}`);
}
