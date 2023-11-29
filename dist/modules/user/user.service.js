"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// --- create a new user
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(user.userId)) {
        throw new Error('User already exists !');
    }
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
// --- get all user data
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find().select('-_id -userId -hobbies -isActive -__v -fullName._id -address._id');
    return result;
});
// --- get a single user by ID
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.isUserExists(userId); //-- finding user's existence based on static method as mentioned in Assignment Requirement
    if (isUserExists) {
        return user_model_1.UserModel.findOne({ userId }).select('-_id -__v -fullName._id -address._id');
    }
    else {
        throw new Error('User not found !');
    }
});
// --- update a user
const updateUser = (userId, updatedDoc) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.isUserExists(userId); //-- finding user's existence based on static method as mentioned in Assignment Requirement
    if (!isUserExists) {
        throw new Error('User not found !');
    }
    else if (isUserExists) {
        const filter = { userId };
        const doc = yield user_model_1.UserModel.findOneAndUpdate(filter, updatedDoc, {
            new: true,
        });
        return doc;
    }
});
// --- delete a user
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.isUserExists(userId); //-- static method to find user's existence
    if (!isUserExists) {
        throw new Error('User not found !');
    }
    else if (isUserExists) {
        const filter = { userId };
        const doc = yield user_model_1.UserModel.findOneAndDelete(filter);
        return doc;
    }
});
// --- add a order
const addOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.isUserExists(userId);
    if (!isUserExists) {
        throw new Error('User not found !');
    }
    else if (isUserExists) {
        const userFilter = { userId };
        const doc = yield user_model_1.UserModel.updateOne(userFilter, {
            $push: { orders: orderData },
        });
        return doc;
    }
});
// --- retrieve all order for a user
const getAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    const isUserExists = yield user_model_1.UserModel.isUserExists(userId);
    if (!isUserExists) {
        throw new Error('User not found !');
    }
    else if (isUserExists) {
        const result = yield user_model_1.UserModel.findOne(filter, 'orders');
        return result;
    }
});
// --- calculation the total price
const totalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.isUserExists(userId);
    if (!isUserExists) {
        throw new Error('User not found !');
    }
    else if (isUserExists) {
        const result = yield user_model_1.UserModel.aggregate([
            { $match: { userId } },
            { $unwind: '$orders' },
            {
                $group: {
                    _id: '$userId',
                    totalPrice: {
                        $sum: {
                            $multiply: ['$orders.price', '$orders.quantity'],
                        },
                    },
                },
            },
            { $project: { totalPrice: 1, _id: 0 } },
        ]);
        return result;
    }
});
exports.UserServices = {
    createNewUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrders,
    totalPrice,
};
