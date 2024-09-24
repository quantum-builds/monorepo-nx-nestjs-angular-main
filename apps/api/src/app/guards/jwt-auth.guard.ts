import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [bearer, token] = authHeader.split(' ');

    if (!token || bearer !== 'Bearer') {
      throw new UnauthorizedException('Invalid token format');
    }

    // You can add additional logic here if needed (e.g., checking token format, blacklist, etc.)
    return super.canActivate(context); // Continue with default authentication flow
  }

  handleRequest(err, user, info) {
    // If any error occurs during the JWT validation, throw an UnauthorizedException
    if (err || !user) {
      console.error('Error:', err, 'Info:', info); // Log any errors or warnings
      throw new UnauthorizedException('Invalid or expired token');
    }

    return user; // Return the user if validation is successful
  }
}
