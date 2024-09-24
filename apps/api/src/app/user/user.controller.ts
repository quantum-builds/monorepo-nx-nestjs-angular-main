// user.controller.ts
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';  // Import your User interface

@Controller('api/users')  // Define the base route for users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()  // Define a GET route for fetching users
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
