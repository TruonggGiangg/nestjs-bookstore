import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permissions, PermissionsSchema } from './schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permissions.name, schema: PermissionsSchema }])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService]
})
export class PermissionsModule { }
