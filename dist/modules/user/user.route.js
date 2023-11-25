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
exports.UserRoutes = router;
