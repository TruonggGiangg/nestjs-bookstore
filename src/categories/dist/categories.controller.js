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
exports.CategoriesController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("src/decorator/customize");
var CategoriesController = /** @class */ (function () {
    function CategoriesController(categoriesService) {
        this.categoriesService = categoriesService;
    }
    CategoriesController.prototype.create = function (createCategoryDto, iUser) {
        return this.categoriesService.create(createCategoryDto, iUser);
    };
    CategoriesController.prototype.findAll = function (currentPage, limit, qs) {
        return this.categoriesService.findAll(+currentPage, +limit, qs);
    };
    CategoriesController.prototype.findOne = function (id) {
        return this.categoriesService.findOne(id);
    };
    CategoriesController.prototype.update = function (id, updateCategoryDto, iUser) {
        return this.categoriesService.update(id, updateCategoryDto, iUser);
    };
    CategoriesController.prototype.remove = function (id, user) {
        return this.categoriesService.remove(id, user);
    };
    __decorate([
        common_1.Post(),
        customize_1.ResponseMessage("Tạo danh mục"),
        __param(0, common_1.Body()),
        __param(1, customize_1.User())
    ], CategoriesController.prototype, "create");
    __decorate([
        customize_1.Public(),
        common_1.Get(),
        customize_1.ResponseMessage("Lấy danh sách tất cả danh mục"),
        __param(0, common_1.Query("current")),
        __param(1, common_1.Query("pageSize")),
        __param(2, common_1.Query())
    ], CategoriesController.prototype, "findAll");
    __decorate([
        customize_1.Public(),
        common_1.Get(':id'),
        customize_1.ResponseMessage("Lấy danh một danh mục"),
        __param(0, common_1.Param('id'))
    ], CategoriesController.prototype, "findOne");
    __decorate([
        common_1.Put(':id'),
        customize_1.ResponseMessage("Cập nhật danh mục"),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, customize_1.User())
    ], CategoriesController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        customize_1.ResponseMessage("Xóa danh mục"),
        __param(0, common_1.Param('id')),
        __param(1, customize_1.User())
    ], CategoriesController.prototype, "remove");
    CategoriesController = __decorate([
        common_1.Controller('categories')
    ], CategoriesController);
    return CategoriesController;
}());
exports.CategoriesController = CategoriesController;
