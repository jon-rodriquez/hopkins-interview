import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './users/dtos/users.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  loginHandler(@Body() body: LoginDto) {
    console.log(body);
    return this.authService.login(body);
  }
}
