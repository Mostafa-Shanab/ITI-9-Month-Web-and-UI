var LnkdLstObj = {
  data: [],

  exists: function (value) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].val === value) return true;
    }
    return false;
  },

  enqueue: function (value) {
    if (this.exists(value)) throw new Error("Value already exists");
    if (this.data.length > 0 && value < this.data[this.data.length - 1].val) {
      throw new Error("Value would break sorting");
    }
    this.data.push({ val: value });
  },

  push: function (value) {
    if (this.exists(value)) throw new Error("Value already exists");
    if (this.data.length > 0 && value < this.data[this.data.length - 1].val) {
      throw new Error("Value would break sorting");
    }
    this.data.push({ val: value });
  },

  insert: function (index, value) {
    if (this.exists(value)) throw new Error("Value already exists");
    if (index < 0 || index > this.data.length)
      throw new Error("Index out of bounds");

    var prev = index > 0 ? this.data[index - 1].val : -Infinity;
    var next = index < this.data.length ? this.data[index].val : Infinity;

    if (value < prev || value > next) {
      throw new Error("Value would break sorting");
    }

    this.data.splice(index, 0, { val: value });
  },

  pop: function () {
    if (this.data.length === 0) return null;
    return this.data.pop();
  },

  dequeue: function () {
    if (this.data.length === 0) return null;
    return this.data.shift();
  },

  remove: function (value) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].val === value) {
        return this.data.splice(i, 1)[0];
      }
    }
    return "data not found";
  },

  display: function () {
    for (var i = 0; i < this.data.length; i++) {
      console.log(this.data[i].val);
    }
  },
};

LnkdLstObj.enqueue(2);
LnkdLstObj.enqueue(5);
LnkdLstObj.push(7);

try {
  LnkdLstObj.push(3);
} catch (e) {
  console.log(e.message);
}

LnkdLstObj.insert(1, 3);

try {
  LnkdLstObj.insert(2, 6);
} catch (e) {
  console.log(e.message);
}

// LnkdLstObj.remove(5);
// LnkdLstObj.dequeue();
// LnkdLstObj.pop();
LnkdLstObj.display();
