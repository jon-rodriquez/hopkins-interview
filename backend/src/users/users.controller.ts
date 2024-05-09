import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decoractors';
import { SignupDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/add')
  @Roles(Role.Admin)
  signupHandler(@Body() body: SignupDto) {
    console.log(body);
    return this.usersService.create(body);
  }
  @Get('/all')
  @Roles(Role.Admin)
  getAllUsers() {
    return this.usersService.findAll().map((user) => {
      delete user.password;
      return user;
    });
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
