import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { iUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @ResponseMessage("Tạo sách")
  create(
    @Body() createBookDto: CreateBookDto,
    @User() iUser: iUser
  ) {
    return this.booksService.create(createBookDto, iUser);
  }

  @Get()
  findAll(
    @Query("current") currentPage: String,
    @Query("pageSize") limit: String,
    @Query() qs
  ) {
    return this.booksService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @User() iUser: iUser
  ) {
    return await this.booksService.update(id, updateBookDto, iUser);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() iUser: iUser
  ) {
    return this.booksService.remove(id, iUser);
  }
}
