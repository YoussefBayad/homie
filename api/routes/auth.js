import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
const router = express.Router();
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.js';

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

router.put('/passwordreset/:resetToken', resetPassword);

export default router;
