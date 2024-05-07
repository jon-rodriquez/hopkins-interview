import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthRoleGuard } from './auth-role.guard';
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
  providers: [
    AuthService,
    //globally scoped guard
    {
      provide: APP_GUARD,
      useClass: AuthRoleGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
