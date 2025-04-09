import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { iUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { Types } from 'mongoose';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) // tiêm model mapping
    private categoryModel: SoftDeleteModel<CategoryDocument>
  ) { }

  async checkTitle(title: string) {
    const isExistTitle = await this.findOneByTitle(title);
    if (isExistTitle) {
      throw new BadRequestException("Title đã tồn tại")
    } else {
      return true
    }
  }


  async create(createCategoryDto: CreateCategoryDto, iUser: iUser) {
    createCategoryDto.createdBy = {
      _id: iUser._id,
      email: iUser.email
    }

    await this.checkTitle(createCategoryDto.name);

    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory;
  }


  async findOneByTitle(name: string) {
    const resultBook = await this.categoryModel.findOne({ name: name }).exec();
    return resultBook;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.categoryModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // if (isEmpty(sort)) {
    //   // @ts-ignore: Unreachable code error
    //   sort = "-updatedAt"
    // }

    const result = await this.categoryModel.find(filter)
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
    const category = await this.categoryModel.findOne({ _id: id }).exec();

    if (!category) {
      throw new NotFoundException('Không tìm thấy thể loại');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, user: iUser) {
    // Kiểm tra xem id có hợp lệ hay không
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }


    // Thực hiện cập nhật bằng updateOne
    const result = await this.categoryModel.updateOne(
      { _id: id, },
      {
        ...updateCategoryDto,
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
    await this.categoryModel.updateOne(
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
    return await this.categoryModel.softDelete(
      { _id: id, }
    );
  }
}
