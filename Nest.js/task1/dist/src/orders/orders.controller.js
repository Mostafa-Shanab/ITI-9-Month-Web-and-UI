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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const order_entity_1 = require("./entities/order.entity");
const create_order_dto_1 = require("./dtos/create-order.dto");
const update_order_dto_1 = require("./dtos/update-order.dto");
const get_orders_filter_dto_1 = require("./dtos/get-orders-filter.dto");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    getAllOrders(filters) {
        return this.ordersService.getAllOrders(filters);
    }
    getOrderById(id) {
        const order = this.ordersService.getOrderById(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID "${id}" not found`);
        }
        return order;
    }
    createOrder(createOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }
    updateOrder(id, updateOrderDto) {
        const updatedOrder = this.ordersService.updateOrder(id, updateOrderDto);
        if (!updatedOrder) {
            throw new common_1.NotFoundException(`Order with ID "${id}" not found`);
        }
        return updatedOrder;
    }
    deleteOrder(id) {
        const wasDeleted = this.ordersService.deleteOrder(id);
        if (!wasDeleted) {
            throw new common_1.NotFoundException(`Order with ID "${id}" not found`);
        }
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_orders_filter_dto_1.GetOrdersFilterDto]),
    __metadata("design:returntype", Array)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", order_entity_1.Order)
], OrdersController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", order_entity_1.Order)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", order_entity_1.Order)
], OrdersController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deleteOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map