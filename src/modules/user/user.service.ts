import { User } from "./user.interface";
import { UserModel } from "./user.model";



// --- create a new user
const createNewUser = async(user : User) => {
    if(await UserModel.isUserExists(user.userId)){
        console.log('Duplicate id');
        throw new Error('User already exists !') ; 
    }
    const result = await UserModel.create(user);
    return result;
}

// --- get all user data
const getAllUser = async() => {
    // const result = await UserModel.find().select('username fullName age email address') ; 
    const result = await UserModel.find().select('-_id -userId -hobbies -isActive -__v -fullName._id -address._id') ; 
    return result ; 
}

export const UserServices = {
    createNewUser,
    getAllUser
}