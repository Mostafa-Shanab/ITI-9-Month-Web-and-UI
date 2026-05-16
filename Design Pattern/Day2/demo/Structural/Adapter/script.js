function StripeProvider() {
  return {
    amount: 100,
    currency: "USD",
  };
}

function PaypalProvider() {
  return {
    total: "200",
    currency_code: "EUR",
  };
}

function StripeAdapter(data) {
  return {
    amount: data.amount,
    currency: data.currency,
  };
}

function PaypalAdapter(data) {
  return {
    amount: parseFloat(data.total),
    currency: data.currency_code,
  };
}

function proccessPayment(payment) {
  //   const amount = payment.amount || parseFloat(payment.total);
  //   const currency = payment.currency || payment.currency_code;
  console.log(payment.amount, payment.currency);
}

const stripeData = StripeAdapter(StripeProvider());
const paypalData = PaypalAdapter(PaypalProvider());

proccessPayment(stripeData);
proccessPayment(paypalData);
