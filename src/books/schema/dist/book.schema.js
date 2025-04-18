"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookSchema = exports.Book = exports.Review = void 0;
var mongoose_1 = require("@nestjs/mongoose");
//review
var Review = /** @class */ (function () {
    function Review() {
    }
    Review = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Review);
    return Review;
}());
exports.Review = Review;
var Book = /** @class */ (function () {
    function Book() {
    }
    __decorate([
        mongoose_1.Prop({ required: true, unique: true })
    ], Book.prototype, "title");
    __decorate([
        mongoose_1.Prop({ type: [String] }) // Danh sách tác giả
    ], Book.prototype, "author");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "isBook");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Book.prototype, "price");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Book.prototype, "stock");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "sold");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "description");
    __decorate([
        mongoose_1.Prop({ type: [String] }) // Danh sách ảnh bìa
    ], Book.prototype, "coverImage");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "logo");
    __decorate([
        mongoose_1.Prop({
            type: Object
        })
    ], Book.prototype, "attributes");
    __decorate([
        mongoose_1.Prop({ type: [Object] })
    ], Book.prototype, "reviews");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "rating");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "isDeleted");
    __decorate([
        mongoose_1.Prop()
    ], Book.prototype, "deletedAt");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Book.prototype, "createdBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Book.prototype, "updatedBy");
    __decorate([
        mongoose_1.Prop({ type: Object })
    ], Book.prototype, "deletedBy");
    Book = __decorate([
        mongoose_1.Schema({ timestamps: true })
    ], Book);
    return Book;
}());
exports.Book = Book;
exports.BookSchema = mongoose_1.SchemaFactory.createForClass(Book);
exports.BookSchema.index({
    title: 'text',
    author: 'text',
    description: 'text'
});
