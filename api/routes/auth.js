import express from 'express';

const router = express.Router();
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  getUser,
} from '../controllers/auth.js';

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

// router.get('/isTokenValid', protect, getUser);

router.put('/passwordreset/:resetToken', resetPassword);

export default router;
