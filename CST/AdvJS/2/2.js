function Book(
  title,
  numofCopies,
  numofChapters,
  author,
  numofPages,
  publisher
) {
  this.numofChapters = numofChapters;
  this.author = author;
  this.numofPages = numofPages;
  this.publisher = publisher;
  this.title = title;
  this.numofCopies = numofCopies;
}

function Box(height, width, length, volume, material) {
  this.height = height;
  this.width = width;
  this.length = length;
  this.volume = volume;
  this.material = material;
  var content = [];
  this.numOfBooks = function () {
    return content.length;
  };
  // this.numOfBooks = content.length;

  this.add = function (bookObj) {
    var existed = false;
    for (var i = 0; i < content.length; i++) {
      if (content[i].title == bookObj.title) {
        content[i].numofCopies += bookObj.numofCopies;
        existed = true;
      }
    }
    if (!existed) {
      content.push(bookObj);
    }
  };
  this.delete = function (bookTitle) {
    for (var i = 0; i < content.length; i++) {
      if (content[i].title == bookTitle) {
        content[i].numofCopies--;
        if (content[i].numofCopies == 0) {
          content.splice(i, 1);
        }
      }
    }
  };

  this.print = function () {
    for (var i = 0; i < content.length; i++) {
      console.log("🚀 ~ Box ~ content:", content[i]);
    }
  };
}

var book1 = new Book("book1", 10, 5, "Shanab", 100, "Shanab Publisher");
var book2 = new Book("book2", 5, 5, "Shanab", 100, "Shanab Publisher");
var book3 = new Book("book2", 115, 5, "Shanab", 100, "Shanab Publisher");

var box = new Box(10, 10, 10, 10, "Wood");

box.add(book1);
box.add(book2);
box.add(book3);
box.delete("book1");
box.delete("book1");
box.delete("book1");
box.delete("book1");
box.delete("book1");
box.delete("book1");
box.delete("book1");
box.delete("book1");
box.delete("book1");
console.log("🚀 ~ box.numOfBooks:", box.numOfBooks());

box.print();
