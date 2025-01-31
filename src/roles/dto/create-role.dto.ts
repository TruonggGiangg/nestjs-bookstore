import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Types } from "mongoose";


export class createdBy {
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    _id: string;
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    email: string;
}

export class CreateRoleDto {

    @IsNotEmpty({ message: 'Tên role không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    description: string;

    @IsNotEmpty({ message: 'Quyền hạn không được để trống' })
    permissions: Types.ObjectId[];

    @ValidateNested()
    @Type(() => createdBy)
    createdBy: createdBy;
}
