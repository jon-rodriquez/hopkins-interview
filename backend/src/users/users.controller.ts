import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/add')
  signupHandler(@Body() body: SignupDto) {
    console.log(body);
    return this.usersService.create(body);
  }
}
