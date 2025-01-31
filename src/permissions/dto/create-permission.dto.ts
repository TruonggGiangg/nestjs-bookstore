import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";


export class createdBy {
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    _id: string;
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    email: string;
}

export class CreatePermissionDto {

    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'API path không được để trống' })
    apiPath: string;

    @IsNotEmpty({ message: 'Method thể loại không được để trống' })
    method: string;

    @IsNotEmpty({ message: 'Module không được để trống' })
    module: number;

    @ValidateNested()
    @Type(() => createdBy)
    createdBy: createdBy;
}
