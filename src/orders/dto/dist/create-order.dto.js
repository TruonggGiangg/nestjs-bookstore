"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateOrderDto = exports.CreateOrderItemDto = exports.CreatedByDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreatedByDto = /** @class */ (function () {
    function CreatedByDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: "ID người tạo không được để trống" }),
        class_validator_1.IsString({ message: "ID người tạo phải là chuỗi" })
    ], CreatedByDto.prototype, "_id");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Email người tạo không được để trống" }),
        class_validator_1.IsString({ message: "Email người tạo phải là chuỗi" })
    ], CreatedByDto.prototype, "email");
    return CreatedByDto;
}());
exports.CreatedByDto = CreatedByDto;
var CreateOrderItemDto = /** @class */ (function () {
    function CreateOrderItemDto() {
    }
    __decorate([
        class_validator_1.IsMongoId({ message: "ID sản phẩm không hợp lệ" })
    ], CreateOrderItemDto.prototype, "productId");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Tên sản phẩm không được để trống" })
    ], CreateOrderItemDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Tác giả không được để trống" })
    ], CreateOrderItemDto.prototype, "author");
    __decorate([
        class_validator_1.IsNumber({}, { message: "Giá sản phẩm phải là số" }),
        class_validator_1.IsPositive({ message: "Giá sản phẩm phải lớn hơn 0" })
    ], CreateOrderItemDto.prototype, "price");
    __decorate([
        class_validator_1.IsNumber({}, { message: "Số lượng phải là số" }),
        class_validator_1.Min(1, { message: "Số lượng tối thiểu là 1" })
    ], CreateOrderItemDto.prototype, "quantity");
    return CreateOrderItemDto;
}());
exports.CreateOrderItemDto = CreateOrderItemDto;
var CreateOrderDto = /** @class */ (function () {
    function CreateOrderDto() {
    }
    __decorate([
        class_validator_1.IsArray({ message: "Danh sách sản phẩm phải là một mảng" }),
        class_validator_1.ValidateNested({ each: true, message: "Mỗi sản phẩm trong đơn hàng phải hợp lệ" }),
        class_transformer_1.Type(function () { return CreateOrderItemDto; })
    ], CreateOrderDto.prototype, "items");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(['pending', 'processing', 'completed', 'cancelled'], {
            message: "Trạng thái không hợp lệ (pending, processing, completed, cancelled)"
        })
    ], CreateOrderDto.prototype, "status");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber({}, { message: "Tổng tiền phải là một số" })
    ], CreateOrderDto.prototype, "totalAmount");
    __decorate([
        class_validator_1.ValidateNested({ message: "Thông tin người tạo không hợp lệ" }),
        class_transformer_1.Type(function () { return CreatedByDto; })
    ], CreateOrderDto.prototype, "createdBy");
    __decorate([
        class_validator_1.IsString({ message: "Địa chỉ giao hàng phải là chuỗi" })
    ], CreateOrderDto.prototype, "shippingAddress");
    __decorate([
        class_validator_1.IsString({ message: "Số điện thoại phải là chuỗi" }),
        class_validator_1.IsNotEmpty({ message: "Số điện thoại không được để trống" })
    ], CreateOrderDto.prototype, "numberPhone");
    return CreateOrderDto;
}());
exports.CreateOrderDto = CreateOrderDto;
