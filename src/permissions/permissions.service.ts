import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permissions, PermissionsDocument } from './schema/permission.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { iUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions.name) // tiêm model mapping   
    private permissionsModel: SoftDeleteModel<PermissionsDocument>
  ) { }



  async findOneByPath(apiPath: string) {
    const resultBook = await this.permissionsModel.findOne({ apiPath: apiPath }).exec();
    return resultBook;
  }

  async create(createPermissionDto: CreatePermissionDto, iUser: iUser) {
    createPermissionDto.createdBy = {
      _id: iUser._id,
      email: iUser.email
    }


    return await this.permissionsModel.create(createPermissionDto);

  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * (+limit);
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.permissionsModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // if (isEmpty(sort)) {
    //   // @ts-ignore: Unreachable code error
    //   sort = "-updatedAt"
    // }


    const result = await this.permissionsModel.find(filter)
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

  async getIDByMethodAndPathAip(path: string, method: string) {
    const permission = await this.permissionsModel.findOne({ apiPath: path }).exec();
    if (permission) {
      return permission._id;

    }
    return ''
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID không hợp lệ');
    }
    const permission = await this.permissionsModel.findOne({ _id: id }).exec();

    if (!permission) {
      throw new NotFoundException('Không tìm thấy permission');
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, iUser: iUser) {
    // Kiểm tra xem id có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }
    // Thực hiện cập nhật bằng updateOne
    const result = await this.permissionsModel.updateOne(
      { _id: id, },
      {
        ...updatePermissionDto,
        $set: {
          updatedBy: {
            _id: iUser._id,
            name: iUser.name,
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
    await this.permissionsModel.updateOne(
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
    return await this.permissionsModel.softDelete(
      { _id: id, }
    );
  }
}
