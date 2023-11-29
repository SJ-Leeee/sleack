import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'nickname'],
    });

    if (!user) {
      return null;
    }
    console.log(email, pass, user);

    const result = bcrypt.compare(pass, user.password);
    if (result) {
      const { password, ...userInfoWithoutPassword } = user;
      return userInfoWithoutPassword;
    }
    return null;
  }
}
