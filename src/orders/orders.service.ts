import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { iUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import mongoose, { Types } from 'mongoose';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) // tiêm model mapping   
    private orderModel: SoftDeleteModel<OrderDocument>,
    private booksService: BooksService
  ) { }



  async create(createOrderDto: CreateOrderDto, iUser: iUser) {
    createOrderDto.createdBy = {
      _id: iUser._id,
      email: iUser.email,
    };

    const session = await this.orderModel.db.startSession();
    session.startTransaction();
    try {
      // 1. Tạo mới đơn hàng
      const newOrder = await this.orderModel.create([createOrderDto], { session });

      // 2. Duyệt từng item để update book (sold và stock)
      for (const item of createOrderDto.items) {
        await this.booksService.updateSoldAndStock(item.productId, item.quantity);
      }

      await session.commitTransaction();
      session.endSession();

      return newOrder[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }


  async findOneByID(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID không hợp lệ');
    }
    const user = await this.orderModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('Không tìm thấy đơn');
    }
    return user;
  }



  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    console.log("Filter sau khi parse:", filter)
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.orderModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.orderModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  async update(id: string, updateOrderkDto: UpdateOrderDto, user: iUser) {
    // Kiểm tra xem id có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }



    // Thực hiện cập nhật bằng updateOne
    const result = await this.orderModel.updateOne(
      { _id: id, },
      {
        ...updateOrderkDto,
        $set: {
          updatedBy: {
            _id: user._id,
            name: user.name,
          }
        }
      }
    );
    return result;
  }

  async remove(id: string, user: iUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }
    await this.orderModel.updateOne(
      { _id: id, },
      {
        $set: {
          deletedBy: {
            _id: user._id,
            name: user.name,
          }
        }
      }
    );

    // Thực hiện cập nhật bằng updateOne
    return await this.orderModel.softDelete(
      { _id: id, }
    );
  }
}
