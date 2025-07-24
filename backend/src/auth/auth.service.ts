import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUser, User } from 'src/interface/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: CreateUser) {
    const hash = bcrypt.hash(userData.password, 10) as string;
    const user = await this.usersService.create({
      ...userData,
      password: hash,
    });
    return this.login(user); // Auto login after registration
  }

  login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
