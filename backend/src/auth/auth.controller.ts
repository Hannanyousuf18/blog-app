import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: any) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }
}
