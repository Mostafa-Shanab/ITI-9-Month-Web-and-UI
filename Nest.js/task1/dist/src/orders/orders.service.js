"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./entities/order.entity");
const uuid_1 = require("uuid");
const data_1 = require("./data");
let OrdersService = class OrdersService {
    orders = [];
    constructor() {
        if (Array.isArray(data_1.rawOrders)) {
            this.orders = data_1.rawOrders.map((raw) => {
                const order = new order_entity_1.Order();
                order.id = raw.id;
                order.amount = raw.amount;
                order.longitude = raw.longitude;
                order.latitude = raw.latitude;
                order.clientId = raw.ClientId;
                order.paymentMethod = raw.PaymentMethod;
                return order;
            });
        }
    }
    getAllOrders(filters) {
        let result = [...this.orders];
        if (filters.clientId !== undefined && filters.clientId !== null) {
            result = result.filter((order) => order.clientId === filters.clientId);
        }
        if (filters.paymentMethod !== undefined && filters.paymentMethod !== null) {
            const normalizedFilter = filters.paymentMethod;
            result = result.filter((order) => order.paymentMethod === normalizedFilter);
        }
        return result;
    }
    getOrderById(id) {
        const order = this.orders.find((o) => o.id === id);
        return order || null;
    }
    createOrder(createOrderDto) {
        const newOrder = new order_entity_1.Order();
        newOrder.id = (0, uuid_1.v4)();
        newOrder.amount = createOrderDto.amount;
        newOrder.longitude = createOrderDto.longitude;
        newOrder.latitude = createOrderDto.latitude;
        newOrder.clientId = createOrderDto.clientId;
        newOrder.paymentMethod = createOrderDto.paymentMethod;
        this.orders.push(newOrder);
        return newOrder;
    }
    updateOrder(id, updateOrderDto) {
        const order = this.orders.find((o) => o.id === id);
        if (!order) {
            return null;
        }
        if (updateOrderDto.amount !== undefined) {
            order.amount = updateOrderDto.amount;
        }
        if (updateOrderDto.longitude !== undefined) {
            order.longitude = updateOrderDto.longitude;
        }
        if (updateOrderDto.latitude !== undefined) {
            order.latitude = updateOrderDto.latitude;
        }
        if (updateOrderDto.clientId !== undefined) {
            order.clientId = updateOrderDto.clientId;
        }
        if (updateOrderDto.paymentMethod !== undefined) {
            order.paymentMethod = updateOrderDto.paymentMethod;
        }
        return order;
    }
    deleteOrder(id) {
        const initialLength = this.orders.length;
        this.orders = this.orders.filter((o) => o.id !== id);
        return this.orders.length < initialLength;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrdersService);
//# sourceMappingURL=orders.service.js.map