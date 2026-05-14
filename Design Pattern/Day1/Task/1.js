class InstanceCounter {
  constructor() {
    if (InstanceCounter.instance) {
      InstanceCounter.counter++;
      return InstanceCounter.instance;
    }

    InstanceCounter.counter = 1;
    InstanceCounter.instance = this;
  }
}

const counter1 = new InstanceCounter();
const counter2 = new InstanceCounter();

console.log(counter1 === counter2);
console.log(InstanceCounter.counter);
