// forgot-password.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly jwtService: JwtService) {}

  async forgotPassword(username: string) {
    // implement logic to find user by username
    const user = { id: 1, username };
    if (!user) {
      throw new Error('User not found');
    }
    const token = this.jwtService.sign({ sub: user.id, username: user.username });
    // send token to user's email
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.jwtService.verify(token);
    if (!user) {
      throw new Error('Invalid token');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // implement logic to update user's password
  }
}