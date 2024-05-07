import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  
  login(loginForm: LoginDto): UserDto | undefined {
    const userIndex = this.users.findIndex(
      (user) => user.email === loginForm.email,
    );

    if (userIndex === -1 || this.users[userIndex]?.password !== loginForm.password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
