import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
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

  @Public()
  @Get()
  @ResponseMessage("Lấy danh sách tất cả hóa đơn")
  findAll(
    @Query("current") currentPage: String,
    @Query("pageSize") limit: String,
    @Query() qs
  ) {
    return this.ordersService.findAll(+currentPage, +limit, qs);
  }


  @Public()
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
