"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderSchema = exports.Order = exports.OrderItem = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, required: true })
    ], OrderItem.prototype, "productId");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], OrderItem.prototype, "name");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], OrderItem.prototype, "author");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], OrderItem.prototype, "price");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], OrderItem.prototype, "quantity");
    OrderItem = __decorate([
        mongoose_1.Schema()
    ], OrderItem);
    return OrderItem;
}());
exports.OrderItem = OrderItem;
var OrderItemSchema = mongoose_1.SchemaFactory.createForClass(OrderItem);
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        mongoose_1.Prop({ type: [OrderItemSchema], required: true })
    ], Order.prototype, "items");
    __decorate([
        mongoose_1.Prop({ "default": 'pending', "enum": ['pending', 'processing', 'completed', 'cancelled'] })
    ], Order.prototype, "status");
    __decorate([
        mongoose_1.Prop()
    ], Order.prototype, "totalAmount");
    __decorate([
        mongoose_1.Prop({ type: String, required: true })
    ], Order.prototype, "shippingAddress");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Order.prototype, "numberPhone");
    __decorate([
        mongoose_1.Prop()
    ], Order.prototype, "createdAt");
    __decorate([
        mongoose_1.Prop()
    ], Order.prototype, "updatedAt");
    __decorate([
        mongoose_1.Prop()
    ], Order.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Order.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Order.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Order.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Order.prototype, "deletedBy");
    Order = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Order);
    return Order;
}());
exports.Order = Order;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
