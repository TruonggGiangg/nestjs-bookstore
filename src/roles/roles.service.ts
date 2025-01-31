import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { iUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import mongoose, { Types } from 'mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) // tiêm model mapping   
    private RoleModel: SoftDeleteModel<RoleDocument>
  ) { }


  async checkName(name: string) {
    const isExistTitle = await this.findOneByName(name);
    if (isExistTitle) {
      throw new BadRequestException("Tên đã tồn tại")
    }
  }

  async create(createRoleDto: CreateRoleDto, iUser: iUser) {
    createRoleDto.createdBy = {
      _id: iUser._id,
      email: iUser.email
    }

    this.checkName(createRoleDto.name);

    const newRole = await this.RoleModel.create(createRoleDto);
    return newRole;
  }

  async findOneByName(name: string) {
    const resultRole = await this.RoleModel.findOne({ name: name }).exec();
    return resultRole;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.RoleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // if (isEmpty(sort)) {
    //   // @ts-ignore: Unreachable code error
    //   sort = "-updatedAt"
    // }

    const result = await this.RoleModel.find(filter)
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
    const user = await this.RoleModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('Không tìm thấy role');
    }
    return user;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: iUser) {
    // Kiểm tra xem id có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }
    // Thực hiện cập nhật bằng updateOne
    const result = await this.RoleModel.updateOne(
      { _id: id, },
      {
        ...updateRoleDto,
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
    await this.RoleModel.updateOne(
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
    return await this.RoleModel.softDelete(
      { _id: id, }
    );
  }



}
