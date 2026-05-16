class Coffee {
  constructor() {
    this.base = 10;
    // this.sugar = 1;
    // this.milk = 2;
    // this.cream = 4;
  }

  cost() {
    return this.base;
  }

  //bad implementation
  //   cost(additions) {
  //     let price = this.base;
  //     if (additions.includes("sugar")) {
  //       price += this.sugar;
  //     }
  //     if (additions.includes("milk")) {
  //       price += this.milk;
  //     }
  //     if (additions.includes("cream")) {
  //       price += this.cream;
  //     }
  //     return price;
  //   }
}

//Decorator
//serve as a wrapper
function WithSugar(coffee) {
  let sugar = 1;
  return {
    cost() {
      return coffee.cost() + sugar;
    },
  };
}

function WithMilk(coffee) {
  let milk = 2;
  return {
    cost() {
      return coffee.cost() + milk;
    },
  };
}

function WithCream(coffee) {
  let cream = 4;
  return {
    cost() {
      return coffee.cost() + cream;
    },
  };
}
//Bad implementation
class SugarCoffee extends Coffee {
  cost() {
    return super.cost() + this.sugar;
  }
}

class MilkCoffee extends Coffee {
  cost() {
    return super.cost() + this.milk;
  }
}

class CreamCoffee extends Coffee {
  cost() {
    return super.cost() + this.cream;
  }
}

class SugarMilkCoffee extends Coffee {
  cost() {
    return super.cost() + this.sugar + this.milk;
  }
}

// let myCoffee = new SugarMilkCoffee();
let myCoffee = new Coffee();
let myCoffeeCost = WithSugar(WithMilk(WithCream(myCoffee)));

//Static typed languages
//Coffee myCoffee = new Coffee()

//JS
myCoffee.cost = function () {
  return 100;
};

myCoffee.milk = true;
myCoffee.WithMilk = function () {
  if (this.milk) {
    return this.cost() + 2;
  }
};

console.log(myCoffee.WithMilk());
