import { Controller, Post, UseGuards, Req, Res, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.grard';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { Request, Response } from 'express';
import { iUser } from 'src/users/user.interface';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @ResponseMessage("Login")
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request & { user: any },
    @Res({ passthrough: true }) res: Response
    //giải thích: req: Request & { user: any } => req là 1 object có thêm 1 thuộc tính user
  ) {
    return await this.authService.login(req.user, res);
  }


  @Public()
  @ResponseMessage("Register")
  @Post('register')
  handleRegister(@Body() user) {
    return this.authService.register(user);
  }


  @Get('profile')
  @ResponseMessage("Get profile")
  getProfile(@Req() req) {
    return req.user;
  }
  //giải thích
  //getProfile(@Req() req) => lấy thông tin user từ req.user


  @ResponseMessage("Get user infomation")
  @Get('account')
  handleGetAccount(@User() user: iUser) {
    return { user };
  }



  //refresh token
  @Public()
  @ResponseMessage("Refresh token")
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.refreshToken(req.cookies.refreshToken, res);
  }

  @ResponseMessage("Logout")
  @Post('logout')
  async logout(
    @User() user: iUser,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.logout(user, res);
  }
}
