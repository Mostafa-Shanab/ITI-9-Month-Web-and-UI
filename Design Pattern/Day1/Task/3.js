class Pizza {
  constructor() {
    this.parts = [];
  }

  add(part) {
    this.parts.push(part);
  }

  show() {
    console.log(this.parts.join(", "));
  }
}

class PizzaBuilder {
  constructor() {
    this.pizza = new Pizza();
  }

  addDough() {
    this.pizza.add("Dough");
    return this;
  }

  addCheese() {
    this.pizza.add("Cheese");
    return this;
  }

  addPepperoni() {
    this.pizza.add("Pepperoni");
    return this;
  }

  build() {
    return this.pizza;
  }
}

const pizza = new PizzaBuilder().addDough().addCheese().addPepperoni().build();

pizza.show();
