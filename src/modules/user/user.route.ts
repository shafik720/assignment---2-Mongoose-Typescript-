import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// --- will create a new user
router.post('', UserController.createNewUser);

// --- get all user data
router.get('', UserController.getAllUser);

// --- get a single user by ID
router.get('/:userId', UserController.getSingleUser);

export const UserRoutes = router;
