import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import ms = require('ms');
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './guard/jwt.strategy';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    //dùng dể xác thực local
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ms(configService.get<string>('JWT_EXPIRE')) / 1000,
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,// xác thực local
    JwtStrategy,// xác thực jwt
  ],
  exports: [AuthService],
})
export class AuthModule { }