function logger(con: Function) {
  console.log("decorator executed", con.name);
}

function ReadOnly(target: any, key: string) {
  console.log(target);
  console.log(key);
  Object.defineProperty(target, key, {
    writable: false,
  });
}

@logger
class Animal {
  @ReadOnly
  name: string;
  //   @ReadOnly
  //   newName: string;
  constructor(name: string) {
    this.name = name;
    // this.newName = n;
  }
}

const a = new Animal("cat");
a.name = "dog";
console.log(a.name);
