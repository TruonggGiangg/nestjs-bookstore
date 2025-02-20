import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public, User } from 'src/decorator/customize';
import { iUser } from 'src/users/user.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto,
    @User() user: iUser
  ) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  findAll(
    @Query("current") currentPage: String,
    @Query("pageSize") limit: String,
    @Query() qs
  ) {
    return this.rolesService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: iUser
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() user: iUser
  ) {
    return this.rolesService.remove(id, user);
  }
}
