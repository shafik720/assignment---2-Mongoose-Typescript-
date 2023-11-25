import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// --- will create a new user
router.post('', UserController.createNewUser);

// --- get all user data
router.get('',UserController.getAllUser)

export const UserRoutes = router;
