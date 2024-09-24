// auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // User Registration (Sign-up)
  async registerUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await this.userService.createUser({ ...userData, password: hashedPassword });
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new BadRequestException('Failed to register user');
    }
  }

  // User Validation (Sign-in)
  async validateUser(userData) {
    const { email, password } = userData;
    console.log('username', email);
  
    try {
      const user = await this.userService.findUserByEmail(email);
      console.log('Fetched user:', user); // Log fetched user data
  
      if (!user) {
        return { error: 'Invalid credentials' }; // Return an error message instead of throwing an exception
      }
  
  
      // Password validation (uncomment these lines when you integrate real password logic)
      const trimmedPassword = password.trim();
      const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
  
      if (!isPasswordValid) {
        return { error: 'Invalid credentials' }; // Return an error message instead of throwing an exception
      }
  
      const token = this.jwtService.sign({ username: user.username }, { expiresIn: '8h' });
      return { token }; // Return the signed JWT token upon successful validation
  
    } catch (error) {
      console.error('Error validating user:', error);
      return { error: 'An internal server error occurred. Please try again later.' }; // Return generic error message
    }
  }
  
}
