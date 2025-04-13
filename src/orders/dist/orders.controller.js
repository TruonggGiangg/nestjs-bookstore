"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.OrdersController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("src/decorator/customize");
var OrdersController = /** @class */ (function () {
    function OrdersController(ordersService) {
        this.ordersService = ordersService;
    }
    OrdersController.prototype.create = function (createOrderDto, iUser) {
        return this.ordersService.create(createOrderDto, iUser);
    };
    OrdersController.prototype.findAll = function () {
        return this.ordersService.findAll();
    };
    OrdersController.prototype.findOne = function (id) {
        return this.ordersService.findOne(+id);
    };
    OrdersController.prototype.update = function (id, updateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    };
    OrdersController.prototype.remove = function (id) {
        return this.ordersService.remove(+id);
    };
    __decorate([
        common_1.Post(),
        customize_1.ResponseMessage("Tạo order"),
        __param(0, common_1.Body()),
        __param(1, customize_1.User())
    ], OrdersController.prototype, "create");
    __decorate([
        common_1.Get()
    ], OrdersController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], OrdersController.prototype, "findOne");
    __decorate([
        common_1.Put(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], OrdersController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], OrdersController.prototype, "remove");
    OrdersController = __decorate([
        common_1.Controller('orders')
    ], OrdersController);
    return OrdersController;
}());
exports.OrdersController = OrdersController;
