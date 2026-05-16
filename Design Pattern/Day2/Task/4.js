// Component
class Item {
  showDetails(indent = 0) {}
}

// Leaf
class Book extends Item {
  constructor(name, pages) {
    super();
    this.name = name;
    this.pages = pages;
  }

  showDetails(indent = 0) {
    console.log(
      " ".repeat(indent) + `Book: ${this.name}, Pages: ${this.pages}`,
    );
  }
}

// Composite
class Box extends Item {
  constructor(name) {
    super();
    this.name = name;
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  showDetails(indent = 0) {
    console.log(" ".repeat(indent) + `Box: ${this.name}`);

    this.items.forEach((item) => {
      item.showDetails(indent + 4);
    });
  }
}

const book1 = new Book("JavaScript", 300);
const book2 = new Book("Design Patterns", 500);

const smallBox = new Box("Small Box");
smallBox.add(book1);

const bigBox = new Box("Big Box");
bigBox.add(book2);
bigBox.add(smallBox);

bigBox.showDetails();
