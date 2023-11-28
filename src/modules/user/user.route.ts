import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// --- will create a new user
router.post('', UserController.createNewUser);

// --- get all user data
router.get('', UserController.getAllUser);

// --- get a single user by ID
router.get('/:userId', UserController.getSingleUser);

// --- update a user
router.put('/:userId', UserController.updateUser);

// --- delete a user
router.delete('/:userId', UserController.deleteUser);

// --- add a order
router.put('/:userId/orders', UserController.addOrder);

// --- retrieve all order for a user
router.get('/:userId/orders', UserController.getUserOrders)

export const UserRoutes = router;
