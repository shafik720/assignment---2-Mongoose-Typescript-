import { Request, Response } from 'express';
import { UserZodSchema } from './user.zod.validation';
import { UserServices } from './user.service';

// --- create a new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const users = req.body.users;

    // --- validating data with zod schema
    const zodParsedData = UserZodSchema.parse(users);

    const result = await UserServices.createNewUser(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    });
  }
};

// --- get all user data
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    });
  }
};

export const UserController = {
  createNewUser,
  getAllUser,
};
