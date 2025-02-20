import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { iUser } from 'src/users/user.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ResponseMessage("Tạo danh mục")
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() iUser: iUser
  ) {
    return this.categoriesService.create(createCategoryDto, iUser);
  }


  @Get()
  @ResponseMessage("Lấy danh sách tất cả danh mục")
  findAll(
    @Query("current") currentPage: String,
    @Query("pageSize") limit: String,
    @Query() qs
  ) {
    return this.categoriesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Lấy danh một danh mục")
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage("Cập nhật danh mục")
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() iUser: iUser
  ) {
    return this.categoriesService.update(id, updateCategoryDto, iUser);
  }

  @Delete(':id')
  @ResponseMessage("Xóa danh mục")
  remove(
    @Param('id') id: string,
    @User() user: iUser
  ) {
    return this.categoriesService.remove(id, user);
  }
}
