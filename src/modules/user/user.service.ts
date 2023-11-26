import { User } from './user.interface';
import { UserModel } from './user.model';

// --- create a new user
const createNewUser = async (user: User) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists !');
  }
  const result = await UserModel.create(user);
  return result;
};

// --- get all user data
const getAllUser = async () => {
  const result = await UserModel.find().select(
    '-_id -userId -hobbies -isActive -__v -fullName._id -address._id',
  );
  return result;
};

// --- get a single user by ID
const getSingleUser = async (userId: number) => {
  const isUserExists = await UserModel.isUserExists(userId); //-- finding user's existence based on static method as mentioned in Assignment Requirement
  if (isUserExists) {
    return UserModel.findOne({userId}).select(
      '-_id -__v -fullName._id -address._id',
    );
  } else {
    throw new Error('User not found !');
  }  
};

// --- update a user
const updateUser = async(userId : number, updatedDoc : User) => {
  const isUserExists = await UserModel.isUserExists(userId); //-- finding user's existence based on static method as mentioned in Assignment Requirement
  if(!isUserExists){
    throw new Error('User not found !');
  }else if (isUserExists){
    const filter = {userId} ; 
    const doc = await UserModel.findOneAndUpdate(filter, updatedDoc, {new : true}) ; 
    return doc ; 
  }
}

export const UserServices = {
  createNewUser,
  getAllUser,
  getSingleUser,
  updateUser
};
