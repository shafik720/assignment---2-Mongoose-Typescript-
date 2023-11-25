/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { Address, FullName, Others, User } from './user.interface';
import bcrypt from 'bcrypt' ;
import config from '../../app/config';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, 'First Name Cannot exceed 20 characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const othersSchema = new Schema<Others>({
  productName: { type: String, required : false},
  price: { type: Number, required : false},
  quantity: { type: Number, required : false },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true, min: 1, max:90 },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  others: { type: othersSchema, required : false},
});

// --- pre save middleware
// --- using to hashing password
userSchema.pre('save', async function(next){
  const user = this ;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next() ; 
}) 

export const UserModel = model<User>('User', userSchema);
