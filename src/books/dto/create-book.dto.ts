import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";

export class CreatedByDto {
    @IsNotEmpty({ message: "CreatedBy không được để trống" })
    @IsString()
    _id: Types.ObjectId;

    @IsNotEmpty({ message: "Email không được để trống" })
    @IsString()
    email: string;
}

export class BookAttributesDto {
    @IsOptional()
    @IsString({ message: "Nhà xuất bản phải là chuỗi" })
    publisher?: string;

    @IsOptional()
    @IsNumber({}, { message: "Năm xuất bản phải là số" })
    publishedYear?: number;

    @IsOptional()
    @IsNumber({}, { message: "Số trang phải là số" })
    pages?: number;

    @IsOptional()
    @IsString({ message: "Ngôn ngữ phải là chuỗi" })
    language?: string;

    @IsOptional()
    @IsString({ message: "ISBN phải là chuỗi" })
    isbn?: string;
}

export class CreateBookDto {
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @IsString()
    title: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    author?: string[];

    @IsNotEmpty({ message: "Danh mục thể loại không được để trống" })
    @IsArray()
    @IsString({ each: true })
    categories: Types.ObjectId[];

    @IsNotEmpty({ message: "Giá không được để trống" })
    @IsNumber()
    price: number;

    @IsNotEmpty({ message: "Số lượng tồn không được để trống" })
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    description?: string;

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
    @IsDate()
    publishedDate?: Date;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @ValidateNested()
    @Type(() => CreatedByDto)
    createdBy: CreatedByDto;
}
