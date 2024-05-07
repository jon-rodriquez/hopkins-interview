import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signupHandler(@Body() body: SignupDto) {
    console.log(body);
    return this.usersService.create(body);
  }
}
