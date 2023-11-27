/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, Others, User, UserModels } from './user.interface';
import bcrypt from 'bcrypt';
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
  productName: { type: String, required: false },
  price: { type: Number, required: false },
  quantity: { type: Number, required: false },
});

const orderSchema = new Schema<Orders>({
  productName : {type : String, required : false},
  price : {type : Number, required : false},
  quantity : {type : Number, required : false}
})

const userSchema = new Schema<User, UserModels>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true, min: 1, max: 90 },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  others: { type: othersSchema, required: false },
  orders : orderSchema
});

// --- pre save middleware
// --- using for hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// --- this middleware will 'hash' the password, so that even after any 'edit or update' to the data password will be hash protected in db
userSchema.pre(
  'findOneAndUpdate', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user : any = this.getUpdate();
    
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  },
);

// --- post save middleware
// --- removing password field in the response
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// --- static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<User, UserModels>('User', userSchema);
