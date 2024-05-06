import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocumentDto, UserDto } from './dtos/user.dto';
import { LoginDto, SignupDto } from './dtos/users.dto';

@Injectable()
export class UsersService {
  private idCounter = 1;

  private users: UserDocumentDto[] = [
    {
      id: 1,
      email: 'admin@mail.com',
      password: 'admin',
      name: 'Admin User',
      role: 'admin',
    },
  ];

  login(loginForm: LoginDto): UserDto | undefined {
    const user = this.users.find((user) => user.email === loginForm.email);

    if (user?.password !== loginForm.password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  findOne(email: string): UserDto | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(user: SignupDto): UserDocumentDto {
    const newUser = {
      id: ++this.idCounter,
      email: user.email,
      password: user.password,
      name: user.name,
      role: 'baseUser',
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: UserDto): UserDocumentDto | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException();
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...user,
    };
    return this.users[userIndex];
  }
}
