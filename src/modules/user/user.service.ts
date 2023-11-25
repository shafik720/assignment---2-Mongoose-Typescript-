import { User } from "./user.interface";
import { UserModel } from "./user.model";



// --- create a new user
const createNewUser = async(user : User) => {
    const result = await UserModel.create(user);
    return result;
}


export const UserServices = {
    createNewUser
}