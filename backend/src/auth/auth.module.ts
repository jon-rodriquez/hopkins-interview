import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      //this is a secret key that will be used to sign the JWT token, its a temporary key
      //you should use a more secure key in production
      secret: 'secret',
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
