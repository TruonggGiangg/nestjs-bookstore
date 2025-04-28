import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schema/book.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { iUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import mongoose, { Types } from 'mongoose';
@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) // tiêm model mapping   
    private bookModel: SoftDeleteModel<BookDocument>
  ) { }


  async checkTitle(title: string) {
    const isExistTitle = await this.findOneByTitle(title);
    if (isExistTitle) {
      throw new BadRequestException("Title đã tồn tại")
    } else {
      return true
    }
  }


  async create(createBookDto: CreateBookDto, iUser: iUser) {
    createBookDto.createdBy = {
      _id: iUser._id,
      email: iUser.email
    }

    await this.checkTitle(createBookDto.title);

    createBookDto.attributes.publishedDate = new Date(createBookDto.attributes.publishedDate);
    const newBook = await this.bookModel.create(createBookDto);
    return newBook;
  }

  async findOneByTitle(title: string) {
    const resultBook = await this.bookModel.findOne({ title: title }).exec();
    return resultBook;
  }
  async updateSoldAndStock(bookId: string, soldChange: number) {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Kiểm tra còn hàng không
    if ((book.stock || 0) < soldChange) {
      throw new BadRequestException(`Not enough stock for ${book.title}`);
    }

    const newSold = (book.sold || 0) + (soldChange || 0);
    const newStock = (book.stock || 0) - (soldChange || 0);

    if (isNaN(newSold) || isNaN(newStock)) {
      throw new BadRequestException('Invalid sold/stock value');
    }

    await this.bookModel.findByIdAndUpdate(bookId, {
      sold: newSold,
      stock: newStock,
    });
  }



  async searchBooks(keyword: string, currentPage = 1, pageSize = 10) {
    const skip = (currentPage - 1) * pageSize;

    const [data, totalItems] = await Promise.all([
      this.bookModel
        .find(
          { $text: { $search: keyword } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(pageSize)
        .exec(),

      this.bookModel.countDocuments({ $text: { $search: keyword } }),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      meta: {
        currentPage,
        pageSize,
        pages: totalPages,
        total: totalItems,
      },
      result: data,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    console.log("Filter sau khi parse:", filter)
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.bookModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // if (isEmpty(sort)) {
    //   // @ts-ignore: Unreachable code error
    //   sort = "-updatedAt"
    // }

    const result = await this.bookModel.find(filter)
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
    const user = await this.bookModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('Không tìm thấy sách');
    }
    return user;
  }

  async update(id: string, updateBookDto: UpdateBookDto, user: iUser) {
    // Kiểm tra xem id có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`ID ${id} không hợp lệ`);
    }


    // Thực hiện cập nhật bằng updateOne
    const result = await this.bookModel.updateOne(
      { _id: id, },
      {
        ...updateBookDto,
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
    await this.bookModel.updateOne(
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
    return await this.bookModel.softDelete(
      { _id: id, }
    );
  }



}
