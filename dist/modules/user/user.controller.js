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
exports.UserController = void 0;
const user_zod_validation_1 = require("./user.zod.validation");
const user_service_1 = require("./user.service");
// --- create a new user
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = req.body.users;
        // --- validating data with zod schema
        const zodParsedData = user_zod_validation_1.UserZodSchema.parse(users);
        const result = yield user_service_1.UserServices.createNewUser(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: err,
        });
    }
});
// --- get all user data
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUser();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: err,
        });
    }
});
// --- get a single user by ID
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getSingleUser(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: {
                code: 404,
                description: 'User not found!'
            },
        });
    }
});
exports.UserController = {
    createNewUser,
    getAllUser,
    getSingleUser
};
