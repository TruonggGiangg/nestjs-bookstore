import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { iUser } from 'src/users/user.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @ResponseMessage("Tạo sự kiện")
  create(
    @Body() createEventDto: CreateEventDto,
    @User() iUser: iUser
  ) {
    return this.eventsService.create(createEventDto, iUser);
  }


  @Public()
  @Get()
  @ResponseMessage("Lấy tất cả sự kiện")
  findAll(
    @Query("current") currentPage: String,
    @Query("pageSize") limit: String,
    @Query() qs

  ) {
    return this.eventsService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage("Lấy sự kiện theo id")
  findOne(
    @Param('id') id: string
  ) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage("Sửa sự kiện")
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @User() iUser: iUser
  ) {
    return this.eventsService.update(id, updateEventDto, iUser);
  }

  @Delete(':id')
  @ResponseMessage("Xóa sự kiện")
  remove(
    @Param('id') id: string,
    @User() iUser: iUser
  ) {
    return this.eventsService.remove(id, iUser);
  }
}
