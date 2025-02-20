import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // giải thích: AuthGuard là một class được cung cấp sẵn từ thư viện passport của NestJS,
    // nó sẽ kiểm tra xem token được gửi lên từ phía client có hợp lệ không.
    // Trong trường hợp token không hợp lệ, AuthGuard sẽ trả về một lỗi UnauthorizedException.
    // Để sử dụng AuthGuard, chúng ta cần extend class này và truyền vào một chiến lược xác thực (strategy).
    // Trong trường hợp này, chúng ta sử dụng chiến lược xác thực JWT, do đó chúng ta truyền vào 'jwt' như một tham số cho AuthGuard.
    constructor(
        private reflector: Reflector,
        private permissionService?: PermissionsService
    ) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }


    //lấy kết quả từ jwt strategy nó dịch jwt và trả vể
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();

        if (err || !user) {
            throw err || new UnauthorizedException("Token không hợp lệ hoặc không tồn tại");
        }

        // Lấy method và path hiện tại
        const currentMethod = request.method;
        const currentPath = request.route?.path;

        const currentPermission = {
            apiPath: currentPath,
            method: currentMethod
        }

        console.log(user.permissions, 'user.permissions')

        let checkPermission = false;

        checkPermission = user.permissions.some(permission =>
            currentPermission.apiPath.includes(permission.apiPath) &&
            permission.method === currentPermission.method
        );

        if (!checkPermission) {
            throw new ForbiddenException("Bạn không có quyền truy cập");
        }

        return user;
    }
}
//có tác dụng xem api truyền JWT hợp lệ không