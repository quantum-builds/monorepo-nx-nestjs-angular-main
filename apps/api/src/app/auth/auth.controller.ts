import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUpDto, SignInDto } from './../validators/auth.dto';
import { UserService } from '../user/user.service';
import { ValidationPipe } from '@nestjs/common';
import { User } from '../user/user.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; // Import your JwtAuthGuard

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: SignUpDto
  ) {
    const result = await this.authService.registerUser(body);
    
    if (result.error) {
      return { error: result.error };
    }

    return { message: 'User registered successfully', user: result.user };
  }

  @Post('signin')
  async signIn(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: SignInDto, 
    @Res() res: Response
  ) {
    try {
      const result = await this.authService.validateUser(body);
  
      if (result.error) {
        return res.status(401).json({ error: result.error });
      }
  
      const token = result.token; // Extract token from the result
  
      // Set the JWT token as an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });
  
      // Return success message and JWT token in the response body
      return res.status(200).json({
        message: 'Logged in successfully',
        token, // Include the JWT token in the JSON response
      });
  
    } catch (error) {
      console.error('Error during sign-in:', error);
      return res.status(500).json({ error: 'Failed to sign in' });
    }
  }
  

  @Post('signout')
  async signOut(@Res() res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Signed out successfully' });
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
