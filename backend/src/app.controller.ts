import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorators';
import { LoginDto } from './users/dtos/users.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('/login')
  loginHandler(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
