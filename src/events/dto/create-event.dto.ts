import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

class createdBy {
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    _id: string;
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    email: string;
}

export class CreateEventDto {
    @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
    name: string;

    description: string;

    image: string;

    @ValidateNested()
    @Type(() => createdBy)
    createdBy: createdBy;
}
