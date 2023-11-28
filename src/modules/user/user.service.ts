import { Orders, User } from './user.interface';
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
    return UserModel.findOne({ userId }).select(
      '-_id -__v -fullName._id -address._id',
    );
  } else {
    throw new Error('User not found !');
  }
};

// --- update a user
const updateUser = async (userId: number, updatedDoc: User) => {
  const isUserExists = await UserModel.isUserExists(userId); //-- finding user's existence based on static method as mentioned in Assignment Requirement
  if (!isUserExists) {
    throw new Error('User not found !');
  } else if (isUserExists) {
    const filter = { userId };
    const doc = await UserModel.findOneAndUpdate(filter, updatedDoc, {
      new: true,
    });
    return doc;
  }
};

// --- delete a user
const deleteUser = async (userId: number) => {
  const isUserExists = await UserModel.isUserExists(userId); //-- static method to find user's existence
  if (!isUserExists) {
    throw new Error('User not found !');
  } else if (isUserExists) {
    const filter = { userId };
    const doc = await UserModel.findOneAndDelete(filter);
    return doc;
  }
};

// --- add a order
const addOrder = async (userId: number, orderData: Orders) => {
  const isUserExists = await UserModel.isUserExists(userId);

  if (!isUserExists) {
    throw new Error('User not found !');
  } else if (isUserExists) {
    const userFilter = { userId };

    const doc = await UserModel.updateOne(userFilter, {
      $push: { orders: orderData },
    });

    return doc;
  }
};

// --- retrieve all order for a user
const getAllOrders = async (userId: number) => {
  const filter = { userId };
  const isUserExists = await UserModel.isUserExists(userId);
  if (!isUserExists) {
    throw new Error('User not found !');
  } else if (isUserExists) {
    const result = await UserModel.findOne(filter, 'orders');

    return result;
  }
};

// --- calculation the total price
const totalPrice = async (userId: number) => {
  const isUserExists = await UserModel.isUserExists(userId);
  if (!isUserExists) {
    throw new Error('User not found !');
  } else if (isUserExists) {
    const result = await UserModel.aggregate([
      {$match : {userId}},
      {$unwind : "$orders"},
      {
        $group : {
          _id : "$userId",
          totalPrice : {
            $sum : {
              $multiply : ['$orders.price', '$orders.quantity']
            }
          } 
        }
      },
      {$project : {"totalPrice" : 1, "_id" : 0}}
    ]);

    return result;
  }
};

export const UserServices = {
  createNewUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  totalPrice
};
