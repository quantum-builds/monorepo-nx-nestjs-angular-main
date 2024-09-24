import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  // First Name field
  lastName: { type: String, required: true },   // Last Name field
  email: { type: String, unique: true, required: true }, // Email field
  username: { type: String, unique: true, required: true }, // Username field
  password: { type: String, required: true },   // Password field
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

export interface User extends Document {
  firstName: string;  // First Name field
  lastName: string;   // Last Name field
  email: string;
  username: string;   // Username field
  password: string;
}
