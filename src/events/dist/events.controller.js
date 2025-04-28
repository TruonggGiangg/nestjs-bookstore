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
exports.EventsController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("src/decorator/customize");
var EventsController = /** @class */ (function () {
    function EventsController(eventsService) {
        this.eventsService = eventsService;
    }
    EventsController.prototype.create = function (createEventDto, iUser) {
        return this.eventsService.create(createEventDto, iUser);
    };
    EventsController.prototype.findAll = function (currentPage, limit, qs) {
        return this.eventsService.findAll(+currentPage, +limit, qs);
    };
    EventsController.prototype.findOne = function (id) {
        return this.eventsService.findOne(id);
    };
    EventsController.prototype.update = function (id, updateEventDto, iUser) {
        return this.eventsService.update(id, updateEventDto, iUser);
    };
    EventsController.prototype.remove = function (id, iUser) {
        return this.eventsService.remove(id, iUser);
    };
    __decorate([
        common_1.Post(),
        customize_1.ResponseMessage("Tạo sự kiện"),
        __param(0, common_1.Body()),
        __param(1, customize_1.User())
    ], EventsController.prototype, "create");
    __decorate([
        customize_1.Public(),
        common_1.Get(),
        customize_1.ResponseMessage("Lấy tất cả sự kiện"),
        __param(0, common_1.Query("current")),
        __param(1, common_1.Query("pageSize")),
        __param(2, common_1.Query())
    ], EventsController.prototype, "findAll");
    __decorate([
        customize_1.Public(),
        common_1.Get(':id'),
        customize_1.ResponseMessage("Lấy sự kiện theo id"),
        __param(0, common_1.Param('id'))
    ], EventsController.prototype, "findOne");
    __decorate([
        common_1.Put(':id'),
        customize_1.ResponseMessage("Sửa sự kiện"),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, customize_1.User())
    ], EventsController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        customize_1.ResponseMessage("Xóa sự kiện"),
        __param(0, common_1.Param('id')),
        __param(1, customize_1.User())
    ], EventsController.prototype, "remove");
    EventsController = __decorate([
        common_1.Controller('events')
    ], EventsController);
    return EventsController;
}());
exports.EventsController = EventsController;
