import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

class createdBy {
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    _id: string;
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    email: string;
}

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
    name: string;

    @IsNotEmpty({ message: "Có phải thuộc tính cho sách hay không không được để trống" })
    isBook: boolean;

    description: string;



    image: string;

    @ValidateNested()
    @Type(() => createdBy)
    createdBy: createdBy;
}
