import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { iUser } from 'src/users/user.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @ResponseMessage("Tạo order")
  create(
    @Body() createOrderDto: CreateOrderDto,
    @User() iUser: iUser
  ) {
    return this.ordersService.create(createOrderDto, iUser);
  }

  @Get()
  findAll(

    currentPage: number, limit: number, qs: string
  ) {
    return this.ordersService.findAll(currentPage, limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneByID(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @User() iUser: iUser
  ) {
    return this.ordersService.update(id, updateOrderDto, iUser);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() iUser: iUser
  ) {
    return this.ordersService.remove(id, iUser);
  }
}
