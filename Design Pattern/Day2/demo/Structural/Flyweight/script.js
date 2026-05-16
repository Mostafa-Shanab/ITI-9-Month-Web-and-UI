class Tree {
  constructor(x, y, treeType) {
    // this.type = type;
    // this.color = color;
    // this.texture = texture;
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }
}

//flyweight
class TreeType {
  constructor(type, color, texture) {
    this.type = type;
    this.color = color;
    this.texture = texture;
  }
}

//flyweight factory
class TreeFactory {
  constructor() {
    this.treeTypes = {};
  }

  getTreeType = function (type, color, texture) {
    let key = type + color + texture;
    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(type, color, texture);
    }
    return this.treeTypes[key];
  };
}

//client code
// let forest = [];
// for (let i = 0; i < 5000; i++) {
//   forest.push(
//     new Tree("oak", "green", "wood", Math.random() * 100, Math.random() * 100),
//   );
// }

let forest = [];
const treeFactory = new TreeFactory();
for (let i = 0; i < 5000; i++) {
  const treeType = treeFactory.getTreeType("oak", "green", "wood");
  forest.push(new Tree(Math.random() * 100, Math.random() * 100, treeType));
}

console.log(forest);
