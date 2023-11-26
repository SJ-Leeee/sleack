import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {}

  @Post()
  postUsers(@Body() data: JoinRequestDto) {}

  @Post('login')
  login() {}

  @Post('logout')
  logout() {}
}
