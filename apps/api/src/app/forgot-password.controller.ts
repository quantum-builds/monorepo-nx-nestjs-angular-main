// forgot-password.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ForgotPasswordService } from './user/forgot-password.service';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  async forgotPassword(@Body() forgotPasswordDto: { username: string }) {
    return this.forgotPasswordService.forgotPassword(forgotPasswordDto.username);
  }

  @Post('reset')
  async resetPassword(@Body() resetPasswordDto: { token: string; newPassword: string }) {
    return this.forgotPasswordService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }
}