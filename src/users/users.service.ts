import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async signUp(data) {
    const { email, nickname, password } = data;
    if (!email) {
      throw new HttpException('이메일이 없습니다.', 400);
    }
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new HttpException('이미 존재하는 계정입니다.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
