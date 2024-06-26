import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decoractors';
import { SignupDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/add')
  @Roles(Role.Admin)
  signupHandler(@Body(new ValidationPipe()) body: SignupDto) {
    return this.usersService.create(body);
  }
  @Get('/all')
  @Roles(Role.Admin, Role.BaseUser)
  getAllUsers() {
    return this.usersService.findAll().filter((user) => user.isActive);
  }

  @Get('/:id')
  @Roles(Role.Admin)
  getUser(@Param('id') id: string) {
    const user = this.usersService.findById(Number(id));
    delete user?.password;
    return user;
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }
}
