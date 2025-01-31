import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, ValidateNested } from "class-validator";



export class createdBy {
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    _id: string;
    @IsNotEmpty({ message: 'CreatedBy không được để trống' })
    email: string;
}

//data transfer object
export class CreateUserDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: 'Pass không được để trống' })
    password: string;

    @IsNotEmpty({ message: 'Age không được để trống' })
    age: number;

    @IsNotEmpty({ message: 'Gender không được để trống' })
    gender: string;

    @IsNotEmpty({ message: 'Address không được để trống' })
    address: string;

    @IsNotEmpty({ message: 'Role không được để trống' })
    role: string;

    @ValidateNested()
    @Type(() => createdBy)
    createdBy: createdBy;
}


export class RegisterUserDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: 'Pass không được để trống' })
    password: string;

    @IsNotEmpty({ message: 'Age không được để trống' })
    age: number;

    @IsNotEmpty({ message: 'Gender không được để trống' })
    gender: string;

    @IsNotEmpty({ message: 'Address không được để trống' })
    address: string;
}