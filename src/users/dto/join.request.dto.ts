import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'aaaa@gmail.com',
    description: '이메일',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '웅노',
    description: '닉네임',
    required: true,
  })
  nickname: string;

  @ApiProperty({
    example: 'aaa12345',
    description: '비밀번호',
    required: true,
  })
  password: string;
}
