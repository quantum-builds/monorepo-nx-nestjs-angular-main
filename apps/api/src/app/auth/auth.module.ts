// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy'; // Assuming you're using a strategy for JWT

@Module({
  imports: [
    UserModule, // To access UserService
    PassportModule, 
    JwtModule.register({
      secret: 'secret', // Replace with a strong secret
      signOptions: { expiresIn: '8h' }, // Token expires after 8 hours
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
