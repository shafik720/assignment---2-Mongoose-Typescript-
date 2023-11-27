import { Request, Response } from 'express';
import { UserZodSchema } from './user.zod.validation';
import { UserServices } from './user.service';

// --- create a new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const users = req.body;

    // --- validating data with zod schema
    const zodParsedData = UserZodSchema.parse(users);

    const result = await UserServices.createNewUser(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

// --- get a single user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    
    const result = await UserServices.getSingleUser(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: {
        code : 404,
        description : 'User not found!'
      },
    });
  }
};

// --- update a user
const updateUser = async(req: Request, res: Response) => {
  try{
    const userId = Number(req.params.userId) ; 
    const updatedDoc = req.body ;

    const result = await UserServices.updateUser(userId, updatedDoc);

    res.status(200).json({
      success: true,
      message: 'User Updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: {
        code : 404,
        description : 'User not found!'
      },
    });
}
}

// --- delete a user
const deleteUser = async(req: Request, res: Response) => {
  try{
    const userId = Number(req.params.userId) ; 

    const result = await UserServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: {
        code : 404,
        description : 'User not found!'
      },
    });
}
}

export const UserController = {
  createNewUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};
