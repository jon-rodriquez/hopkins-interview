import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './public.decorators';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //to enable public access to a route
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (!roles) {
      throw new UnauthorizedException('Unauthorized to access this resource');
    }
    const request = context.switchToHttp().getRequest();
    const token = this.grabToken(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized to access this resource');
    }

    try {
      const payload = await this.authService.decodeJwt(token);
      if (!roles.includes(payload?.role)) {
        throw new UnauthorizedException('Unauthorized to access this resource');
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized to access this resource');
    }

    return true;
  }

  private grabToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
