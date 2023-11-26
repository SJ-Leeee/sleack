import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.users;
  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {}

  @Post('login')
  login(@Req() req) {
    return req.users;
  }

  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logout(); // passport 로 구현
    res.clearCookie('connect.sid', { httpOnluy: true });
    res.send('ok');
  }
}
