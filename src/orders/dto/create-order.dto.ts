import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { Types } from "mongoose";


export class CreatedByDto {
    @IsNotEmpty({ message: "ID người tạo không được để trống" })
    @IsString({ message: "ID người tạo phải là chuỗi" })
    _id: string;

    @IsNotEmpty({ message: "Email người tạo không được để trống" })
    @IsString({ message: "Email người tạo phải là chuỗi" })
    email: string;
}


export class CreateOrderItemDto {
    @IsMongoId({ message: "ID sản phẩm không hợp lệ" })
    productId: string;

    @IsNotEmpty({ message: "Tên sản phẩm không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Tác giả không được để trống" })
    author: string;

    @IsNumber({}, { message: "Giá sản phẩm phải là số" })
    @IsPositive({ message: "Giá sản phẩm phải lớn hơn 0" })
    price: number;

    @IsNumber({}, { message: "Số lượng phải là số" })
    @Min(1, { message: "Số lượng tối thiểu là 1" })
    quantity: number;
}



export class CreateOrderDto {
    @IsArray({ message: "Danh sách sản phẩm phải là một mảng" })
    @ValidateNested({ each: true, message: "Mỗi sản phẩm trong đơn hàng phải hợp lệ" })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

    @IsOptional()
    @IsEnum(['pending', 'processing', 'completed', 'cancelled'], {
        message: "Trạng thái không hợp lệ (pending, processing, completed, cancelled)",
    })
    status?: string;

    @IsOptional()
    @IsNumber({}, { message: "Tổng tiền phải là một số" })
    totalAmount?: number;

    @ValidateNested({ message: "Thông tin người tạo không hợp lệ" })
    @Type(() => CreatedByDto)
    createdBy: CreatedByDto;

    @IsString({ message: "Địa chỉ giao hàng phải là chuỗi" })
    shippingAddress: string;

    @IsString({ message: "Số điện thoại phải là chuỗi" })
    @IsNotEmpty({ message: "Số điện thoại không được để trống" })
    numberPhone: string;
}


