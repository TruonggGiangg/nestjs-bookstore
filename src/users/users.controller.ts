import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './user.interface';
import { ResponseMessage, User } from 'src/decorator/customize';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ResponseMessage("Tạo người dùng")
  @Post()
  async create(
    @Body() user: CreateUserDto,
    @User() user_create: iUser
  ) {
    return await this.usersService.create(user, user_create);

  }

  @Get()
  @ResponseMessage('Lấy danh sách tất cả người dùng')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    //const id: string = req.params.id;
    const data = this.usersService.findOne(id);
    return data
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @User() user: iUser,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const updateUser = await this.usersService.update(id, updateUserDto, user);
    return {
      message: 'Cập nhật người dùng thành công',
      data: updateUser,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() user: iUser,
  ) {
    return await this.usersService.remove(id, user);
  }
}
