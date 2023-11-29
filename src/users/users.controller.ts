import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { User } from 'src/common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/intercepters/undefinedToNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUser(@User() user) {
    return user || false;
  }

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post()
  async signUp(@Body() data: JoinRequestDto) {
    await this.usersService.join(data);
  }

  @ApiOkResponse({
    // status:200
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logout(); // passport 로 구현
    res.clearCookie('connect.sid', { httpOnluy: true });
    res.send('ok');
  }
}
