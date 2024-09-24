// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';  // User interface to define the shape of a user object
import { CreateUserDto } from './create-user.dto';  // DTO for creating a user

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,  // Inject the User model
  ) {}

  // Method to find a user by username
 async findUserByUsername(username: string): Promise<User | null> {
    try {
        const user = await this.userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }).exec();
        console.log('Found user by username:', user);
        return user;
    } catch (error) {
        console.error('Error during user lookup by username:', error);
        return null; // Return null instead of throwing an error
    }
}


  // Updated createUser method to check for existing username
  async createUser(createUserDto: CreateUserDto): Promise<{ user?: User; error?: string }> {
    const existingEmailUser = await this.findUserByEmail(createUserDto.email);
    if (existingEmailUser) {
      return { error: 'Email already exists' };
    }

    const existingUsernameUser = await this.findUserByUsername(createUserDto.username);
    if (existingUsernameUser) {
      return { error: 'Username already exists' };
    }

    const createdUser = new this.userModel(createUserDto);
    try {
      await createdUser.save();
      return { user: createdUser };
    } catch (error) {
      console.error('Error during user creation:', error);
      return { error: 'Failed to create user' };
    }
  }

  // Method to find a user by email
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log('Found user by email:', user);
      return user;
    } catch (error) {
      console.error('Error during user lookup by email:', error);
      return null; // Return null instead of throwing an error
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();  // Retrieve all users from the database
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');  // Handle errors appropriately
    }
  }
}
