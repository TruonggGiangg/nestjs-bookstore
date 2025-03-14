import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Event, EventDocument } from './schema/Event.schema';
import { Types } from 'mongoose';
import { iUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) // tiêm model mapping
    private eventModel: SoftDeleteModel<EventDocument>
  ) { }


  async checkName(nameEven: string) {
    const isExistTitle = await this.findOneByName(nameEven);
    if (isExistTitle) {
      throw new BadRequestException("Tên sự kiện đã tồn tại")
    } else {
      return true
    }
  }

  async create(createEventDto: CreateEventDto, iUser: iUser) {

    createEventDto.createdBy = {
      _id: iUser._id,
      email: iUser.email
    }
    this.checkName(createEventDto.name);
    const event = this.eventModel.create(
      createEventDto
    );


    return event
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;


    const totalItems = (await this.eventModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.eventModel.find(filter)
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

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID không hợp lệ');
    }
    const event = await this.eventModel.findOne({ _id: id }).exec();

    if (!event) {
      throw new NotFoundException('Không tìm thấy sự kiện');
    }
    return event;
  }

  async findOneByName(name: string) {

    const event = await this.eventModel.findOne({ name: name }).exec();

    if (!event) {
      throw new NotFoundException('Không tìm thấy sự kiện');
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, user: iUser) {
    // Kiểm tra xem id có hợp lệ hay không
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }

    await this.checkName(updateEventDto.name);
    // Thực hiện cập nhật bằng updateOne
    const result = await this.eventModel.updateOne(
      { _id: id, },
      {
        ...updateEventDto,
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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }
    await this.eventModel.updateOne(
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
    return await this.eventModel.softDelete(
      { _id: id, }
    );
  }
}
