import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocumentDto, UserSecureDto } from 'src/users/dtos/user.dto';
import { LoginDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  login(loginForm: LoginDto): UserSecureDto {
    const user = this.usersService.findOne(loginForm?.email?.trim());

    if (!user || !this.comparePasswords(loginForm.password, user?.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateJwt(user);

    return {
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        id: user.id,
      },
      auth: { token },
    };
  }

  generateJwt(user: UserDocumentDto): string {
    return this.jwt.sign({ id: user.id, role: user.role });
  }

  async decodeJwt(token: string): Promise<{ id: number; role: string }> {
    const payload = await this.jwt.verifyAsync(token, {
      secret: 'secret',
    });

    return payload;
  }

  comparePasswords(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
