import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

import {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
} from '../controllers/users.js';

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', follow);
router.put('/:id/unfollow', unfollow);

export default router;
