import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { iUser } from 'src/users/user.interface';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) // tiêm model mapping   
    private orderModel: SoftDeleteModel<OrderDocument>
  ) { }



  async create(createBookDto: CreateOrderDto, iUser: iUser) {
    createBookDto.createdBy = {
      _id: iUser._id,
      email: iUser.email
    }

    const newOrder = await this.orderModel.create(createBookDto);
    return newOrder;
  }



  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
