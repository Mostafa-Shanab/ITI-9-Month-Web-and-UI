/*
primitive -> leaf 
non-primitive -> composite 
 */

class Component {
  show() {
    throw new Error("must be implemented");
  }
}

//leaf
class File extends Component {
  constructor(name) {
    this.name = name;
  }

  show() {
    console.log(this.name);
  }
}

//composite
class Folder extends Component {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  add(item) {
    if (item instanceof Component) {
      this.children.push(item);
    }
  }

  show() {
    for (let child of this.children) {
      child.show();
      //   if (child instanceof File) {
      //     child.show();
      //   } else if (child instanceof Folder) {
      //     child.show();
      //   }
    }
  }
}
