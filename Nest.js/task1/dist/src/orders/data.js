"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawOrders = void 0;
const uuid_1 = require("uuid");
const order_entity_1 = require("./entities/order.entity");
exports.rawOrders = [
    { id: (0, uuid_1.v4)(), amount: 1230.50, longitude: 23.21, latitude: 31.01, ClientId: 1, PaymentMethod: order_entity_1.PaymentMethod.CASH },
    { id: (0, uuid_1.v4)(), amount: 450.00, longitude: 23.25, latitude: 31.05, ClientId: 2, PaymentMethod: order_entity_1.PaymentMethod.VISA },
    { id: (0, uuid_1.v4)(), amount: 89.90, longitude: 23.30, latitude: 31.10, ClientId: 1, PaymentMethod: order_entity_1.PaymentMethod.CASH }
];
//# sourceMappingURL=data.js.map