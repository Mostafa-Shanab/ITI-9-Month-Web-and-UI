"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.PaymentMethod = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "Cash";
    PaymentMethod["VISA"] = "Visa";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
class Order {
    id;
    amount;
    longitude;
    latitude;
    clientId;
    paymentMethod;
}
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map