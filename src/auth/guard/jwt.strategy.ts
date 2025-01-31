import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { iUser } from 'src/users/user.interface';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';


// Đoạn mã trên triển khai một chiến lược xác thực JWT
// (JSON Web Token) bằng cách sử dụng Passport trong NestJS.
// Đây là cách hệ thống xác thực người dùng thông qua token
// JWT được gửi từ phía client.


// Hàm JwtStrategy này có nhiệm vụ:
// Xác thực JWT:
// Sử dụng passport-jwt để kiểm tra tính hợp lệ của JWT được gửi từ client.
// Token được trích xuất từ Authorization header dưới dạng Bearer token.
// Xác minh chữ ký của JWT:
// Sử dụng JWT_SECRET từ ConfigService để kiểm tra tính toàn vẹn của token.
// Kiểm tra thời gian hết hạn:
// Nếu token đã hết hạn, hệ thống từ chối xác thực.
// Trả về thông tin người dùng:
// Nếu token hợp lệ, phương thức validate sẽ trích xuất _id, name, email, role từ payload của token và trả về để gán vào req.user trong request.
// Thông tin này giúp các route và middleware tiếp theo xác định danh tính và quyền hạn của người dùng.
// Tóm lại
// Hàm này giúp hệ thống xác thực người dùng dựa trên JWT trong NestJS, đảm bảo chỉ những request hợp lệ với token đúng mới được xử lý.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private configService: ConfigService,
        private roleService: RolesService,
        private permissionService: PermissionsService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: iUser) {
        const { _id, name, email, role } = payload;

        //lấy ra roleid
        const userRole = role
        //lấy ra role
        const temp = await this.roleService.findOne(userRole)
        //lấy ra permissions
        const permissions = temp?.permissions ?? [];
        //lấy ra id của permissions
        const newPermissions = await Promise.all(
            permissions.map(async (permission) => {
                const permissionFind = await this.permissionService.findOne(permission.toString());
                return {
                    apiPath: permissionFind.apiPath,
                    method: permissionFind.method
                };
            })
        );

        const objUser = {
            _id, name, email, role,
            permissions: newPermissions
        }
        return objUser;
    }
}



//có nhiệm vụ giải mã