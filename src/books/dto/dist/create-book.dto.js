"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateBookDto = exports.ReviewDto = exports.BookAttributesDto = exports.CreatedByDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreatedByDto = /** @class */ (function () {
    function CreatedByDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: "CreatedBy không được để trống" }),
        class_validator_1.IsString()
    ], CreatedByDto.prototype, "_id");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Email không được để trống" }),
        class_validator_1.IsString()
    ], CreatedByDto.prototype, "email");
    return CreatedByDto;
}());
exports.CreatedByDto = CreatedByDto;
var BookAttributesDto = /** @class */ (function () {
    function BookAttributesDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: "Nhà xuất bản phải là chuỗi" })
    ], BookAttributesDto.prototype, "publisher");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber({}, { message: "Số trang phải là số" })
    ], BookAttributesDto.prototype, "pages");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: "Ngôn ngữ phải là chuỗi" })
    ], BookAttributesDto.prototype, "language");
    __decorate([
        class_validator_1.IsOptional()
    ], BookAttributesDto.prototype, "classification");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: "ISBN phải là chuỗi" })
    ], BookAttributesDto.prototype, "isbn");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Transform(function (_a) {
            var value = _a.value;
            return new Date(value);
        }) // Chuyển đổi từ string thành Date
        ,
        class_validator_1.IsDate({ message: "Ngày xuất bản phải là kiểu Date" })
    ], BookAttributesDto.prototype, "publishedDate");
    return BookAttributesDto;
}());
exports.BookAttributesDto = BookAttributesDto;
var ReviewDto = /** @class */ (function () {
    function ReviewDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: "UserId không được để trống" })
    ], ReviewDto.prototype, "userId");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "userName không được để trống" }),
        class_validator_1.IsString()
    ], ReviewDto.prototype, "userName");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Comment không được để trống" }),
        class_validator_1.IsString()
    ], ReviewDto.prototype, "comment");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Rating không được để trống" }),
        class_validator_1.IsNumber()
    ], ReviewDto.prototype, "rating");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "CreatedAt không được để trống" }),
        class_validator_1.IsDate()
    ], ReviewDto.prototype, "createdAt");
    return ReviewDto;
}());
exports.ReviewDto = ReviewDto;
var CreateBookDto = /** @class */ (function () {
    function CreateBookDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Tiêu đề không được để trống" }),
        class_validator_1.IsString()
    ], CreateBookDto.prototype, "title");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], CreateBookDto.prototype, "author");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Thông tin có phải là sách hay không không đươc để trống`" })
    ], CreateBookDto.prototype, "isBook");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Giá không được để trống" }),
        class_validator_1.IsNumber()
    ], CreateBookDto.prototype, "price");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Số lượng tồn không được để trống" }),
        class_validator_1.IsNumber()
    ], CreateBookDto.prototype, "stock");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber()
    ], CreateBookDto.prototype, "sold");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Mô tả không được để trống" }),
        class_validator_1.IsString()
    ], CreateBookDto.prototype, "description");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsArray()
    ], CreateBookDto.prototype, "reviews");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], CreateBookDto.prototype, "coverImage");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateBookDto.prototype, "logo");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return BookAttributesDto; })
    ], CreateBookDto.prototype, "attributes");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber()
    ], CreateBookDto.prototype, "rating");
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return CreatedByDto; })
    ], CreateBookDto.prototype, "createdBy");
    return CreateBookDto;
}());
exports.CreateBookDto = CreateBookDto;
