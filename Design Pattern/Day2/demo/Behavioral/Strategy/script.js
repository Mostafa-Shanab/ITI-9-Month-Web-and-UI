class Payment {
  pay(amount) {}
}

//strategy1
class CreditCard extends Payment {
  pay(amount) {
    console.log(`paid ${amount} using credit card`);
  }
}

//strategy2
class Cash extends Payment {
  pay(amount) {
    console.log(`paid ${amount} using cash`);
  }
}
//strategy3
class EWallet extends Payment {
  pay(amount) {
    console.log(`paid ${amount} using wallet`);
  }
}

class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  pay(amount) {
    this.strategy.pay(amount);
  }
}

//delegation
const payment = new PaymentContext(new CreditCard());
payment.pay(1000);
payment.setStrategy(new EWallet());
payment.pay(500);
