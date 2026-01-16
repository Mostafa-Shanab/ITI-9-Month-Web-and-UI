function listSeq(start, end, step) {
  var data = [];

  for (var index = start; index <= end; index += step) data.push(index);

  this.append = function (val) {
    if (data.length == 0) data.push(val);
    else if (data[data.length - 1] === val - step) data.push(val);
    else throw new Error("Invalid Value");
  };

  this.prepend = function (val) {
    if (data.length == 0) data.push(val);
    else if (data[0] === val + step) data.unshift(val);
    else throw new Error("Invalid Value");
  };

  this.dequeue = function () {
    if (data.length == 0) throw new Error("No Data");

    return data.shift();
  };

  this.pop = function () {
    if (data.length == 0) throw new Error("No Data");

    return data.pop();
  };

  this.display = function () {
    for (var index = 0; index < data.length; index++) {
      console.log(data[index]);
    }
  };
}

var list1 = new listSeq(1, 10, 2);
list1.display();
list1.dequeue();
list1.dequeue();
list1.dequeue();
list1.dequeue();
list1.dequeue();
list1.append(3);
list1.append(5);
list1.display();
