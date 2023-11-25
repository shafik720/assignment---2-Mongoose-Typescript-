import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const othersSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameSchema,
  age: z.number().min(1).max(90),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  others: othersSchema.optional(),
});

export const UserZodSchema = userSchema;
