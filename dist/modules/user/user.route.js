"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// --- will create a new user
router.post('', user_controller_1.UserController.createNewUser);
// --- get all user data
router.get('', user_controller_1.UserController.getAllUser);
// --- get a single user by ID
router.get('/:userId', user_controller_1.UserController.getSingleUser);
// --- update a user
router.put('/:userId', user_controller_1.UserController.updateUser);
// --- delete a user
router.delete('/:userId', user_controller_1.UserController.deleteUser);
// --- add a order
router.put('/:userId/orders', user_controller_1.UserController.addOrder);
// --- retrieve all order for a user
router.get('/:userId/orders', user_controller_1.UserController.getUserOrders);
// --- calculation the total price
router.get('/:userId/orders/total-price', user_controller_1.UserController.totalPrice);
exports.UserRoutes = router;
