import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms = require('ms');
import { PermissionsService } from 'src/permissions/permissions.service';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';
import { iUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private roleService: RolesService,
    private permissionService: PermissionsService,
    private jwtService: JwtService,
    private configService: ConfigService

  ) { }

  async validateUser(username: string, password: string) {
    console.log(username, password)

    //tìm ra user bằng email
    const user = await this.usersService.findOneByEmail(username);
    if (user) {

      const isMatch = await this.usersService.isValidPass(password, user.password);
      if (isMatch) {
        const userRole = user.role
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

        const objUser: iUser = {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          permission: newPermissions
        }
        console.log("check", objUser)
        return objUser;
      }
    }
    return null;
  }

  async login(user: any, res: Response) {
    const { _id, name, email, role } = user;

    //lấy ra roleid
    const userRole = user.role
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




    const payload = {
      sub: "token login",
      iss: "from server",
      _id,
      name,
      email,
      role,
      permissions: newPermissions
    };
    const refreshToken = this.createRefreshToken(payload);
    this.usersService.updateUserToken(_id, refreshToken);

    //set token vao cookie
    res.clearCookie('refreshToken');
    res.cookie('refreshToken', refreshToken,
      {
        httpOnly: true,
        maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
      }
    );

    console.log(ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')))

    return {
      access_token: this.jwtService.sign(payload),
      //giải thích
      //access_token: this.jwtService.sign(payload) sẽ tạo ra một token JWT với payload là thông tin của user
      //và secret key được lấy từ file .env
      //và trả về token đó cho client
      user: {
        _id,
        name,
        email,
        role,
        permissions: newPermissions
      }
    };
  }

  createRefreshToken = (payload) => {
    return this.jwtService.sign(
      payload, {
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
      secret: this.configService.get<string>('JWT_SECRET')
    }
    );
  }

  async register(user: RegisterUserDto) {

    const newUser = { ...user, role: '679c6ec3a16b63b7b3d985fd' };


    const result = await this.usersService.register(newUser);

    if (result) {
      delete result.password;
      return result;
    }

  }

  refreshToken = async (refresh: string, res: Response) => {
    try {
      const flat = await this.jwtService.verify(refresh,
        {
          secret: this.configService.get<string>('JWT_SECRET')
        }
      );
      if (flat) {
        const user = await this.usersService.findOneByRefreshToken(refresh);
        const { name, email, role } = user;
        const _id = user._id.toString();

        //lấy ra roleid
        const userRole = user.role
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


        if (user) {
          return this.login({
            _id,
            name,
            email,
            role,
            permission: newPermissions
          }, res);

        } else {
          throw new BadRequestException(`Refresh token không hợp lệ`);
        }
      } else {
        throw new BadRequestException(`Refresh token không hợp lệ`);
      }
    }
    catch (error) {
      throw new BadRequestException(`Refresh token không hợp lệ`);
    }
  }

  logout = async (user: iUser, res: Response) => {
    res.clearCookie('refreshToken');
    return await this.usersService.updateUserToken(user._id, null);
  }

}

