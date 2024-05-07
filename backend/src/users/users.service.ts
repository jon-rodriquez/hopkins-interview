import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserDocumentDto, UserDto } from './dtos/user.dto';
import { SignupDto } from './dtos/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private idCounter = 1;

  private users: UserDocumentDto[] = [
    {
      id: 1,
      email: 'admin@mail.com',
      password: '$2b$10$Kucek.2nu4ODzYVY7cA.9uMToas9Bpa7rVrdS16ytpHUe3BzbPwyy',
      name: 'Admin User',
      role: 'admin',
    },
  ];

  findOne(email: string): UserDocumentDto | undefined {
    return this.users.find((user) => user.email === email);
  }

  findAll(): UserDocumentDto[] {
    return this.users;
  }

  findById(id: number): UserDocumentDto | undefined {
    if (Number.isNaN(id))
      throw new NotAcceptableException('id is not a number');
    return this.users.find((user) => user.id === id);
  }

  create(user: SignupDto): UserDocumentDto {
    const newUser = {
      id: ++this.idCounter,
      email: user.email,
      password: this.hashPassword(user.password),
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
  hashPassword(password: string): string {
    //its recommended to use async function for hashing password
    //but for simplicity we are using sync function
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }
}
