import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';
const router = express.Router();

// @desc  Register
router.post('/register', registerUser);

// @desc  Login
router.post('/login', authUser);

export default router;
