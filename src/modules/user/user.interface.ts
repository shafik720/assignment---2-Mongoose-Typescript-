import { Model } from 'mongoose';

export type FullName = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Order[];
};

// static method
export interface UserModels extends Model<User> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<User | null>;
}
