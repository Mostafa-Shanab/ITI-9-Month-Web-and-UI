// Abstract Products
class Car {
  assemble() {}
}

class CarSpecification {
  display() {}
}

// Concrete Products
class Sedan extends Car {
  assemble() {
    console.log("Assembling Sedan car.");
  }
}

class Hatchback extends Car {
  assemble() {
    console.log("Assembling Hatchback car.");
  }
}

class NorthAmericaSpecification extends CarSpecification {
  display() {
    console.log(
      "North America Car Specification: Safety features compliant with local regulations.",
    );
  }
}

class EuropeSpecification extends CarSpecification {
  display() {
    console.log(
      "Europe Car Specification: Fuel efficiency and emissions compliant with EU standards.",
    );
  }
}

// Factories
class CarFactory {
  createCar() {}
  createSpecification() {}
}

class NorthAmericaCarFactory extends CarFactory {
  createCar() {
    return new Sedan();
  }
  createSpecification() {
    return new NorthAmericaSpecification();
  }
}

class EuropeCarFactory extends CarFactory {
  createCar() {
    return new Hatchback();
  }
  createSpecification() {
    return new EuropeSpecification();
  }
}

// Client Code
// const northFactory = new NorthAmericaCarFactory();
// let car = northFactory.createCar();
// let spec = northFactory.createSpecification();
// car.assemble();
// spec.display();

// const europeFactory = new EuropeCarFactory();
// car = europeFactory.createCar();
// spec = europeFactory.createSpecification();
// car.assemble();
// spec.display();

function buildCar(factory) {
  let car = factory.createCar();
  let spec = factory.createSpecification();
  car.assemble();
  spec.display();

  console.log("-------------------");
}

const northAmericaFactory = new NorthAmericaCarFactory();

const europeFactory = new EuropeCarFactory();

buildCar(northAmericaFactory);

buildCar(europeFactory);
