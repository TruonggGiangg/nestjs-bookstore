import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

export class createdBy {
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    _id: string;
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    email: string;
}

export class CreateBookDto {
    @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
    title: string;

    @IsNotEmpty({ message: 'Tác giả không được để trống' })
    author: string[];

    @IsNotEmpty({ message: 'Danh mục thể loại không được để trống' })
    categories: string[];

    @IsNotEmpty({ message: 'Giá không được để trống' })
    price: number;

    @IsNotEmpty({ message: 'Số lượng tồn không được để trống' })
    stock: number;

    description: string;

    coverImage: string[];

    logo: string;

    publishedDate: Date;

    rating: number;

    @ValidateNested()
    @Type(() => createdBy)
    createdBy: createdBy;
}
