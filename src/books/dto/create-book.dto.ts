import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";

export class CreatedByDto {
    @IsNotEmpty({ message: "CreatedBy không được để trống" })
    @IsString()
    _id: string;

    @IsNotEmpty({ message: "Email không được để trống" })
    @IsString()
    email: string;
}

export class BookAttributesDto {
    @IsOptional()
    @IsString({ message: "Nhà xuất bản phải là chuỗi" })
    publisher?: string;

    @IsOptional()
    @IsNumber({}, { message: "Số trang phải là số" })
    pages?: number;

    @IsOptional()
    @IsString({ message: "Ngôn ngữ phải là chuỗi" })
    language?: string;


    @IsOptional()
    classification?: Types.ObjectId[] | string[];


    @IsOptional()
    @IsString({ message: "ISBN phải là chuỗi" })
    isbn?: string;

    @IsOptional()
    @Transform(({ value }) => new Date(value)) // Chuyển đổi từ string thành Date
    @IsDate({ message: "Ngày xuất bản phải là kiểu Date" })
    publishedDate?: Date;
}


export class ReviewDto {
    @IsNotEmpty({ message: "UserId không được để trống" })
    userId: Types.ObjectId | string;

    @IsNotEmpty({ message: "userName không được để trống" })
    @IsString()
    userName: string;

    @IsNotEmpty({ message: "Comment không được để trống" })
    @IsString()
    comment: string;

    @IsNotEmpty({ message: "Rating không được để trống" })
    @IsNumber()
    rating: number;

    @IsNotEmpty({ message: "CreatedAt không được để trống" })
    @IsDate()
    createdAt: Date;
}




export class CreateBookDto {
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @IsString()
    title: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    author?: string[];

    @IsNotEmpty({ message: "Thông tin có phải là sách hay không không đươc để trống`" })
    isBook: boolean;

    @IsNotEmpty({ message: "Giá không được để trống" })
    @IsNumber()
    price: number;

    @IsNotEmpty({ message: "Số lượng tồn không được để trống" })
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    sold?: number;


    @IsNotEmpty({ message: "Mô tả không được để trống" })
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    reviews?: ReviewDto[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    coverImage?: string[];

    @IsOptional()
    @IsString()
    logo?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => BookAttributesDto)
    attributes?: BookAttributesDto;


    @IsOptional()
    @IsNumber()
    rating?: number;

    @ValidateNested()
    @Type(() => CreatedByDto)
    createdBy: CreatedByDto;
}
