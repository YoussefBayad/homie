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

router.get('/:username', getUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);
router.put('/:username/follow', follow);
router.put('/:username/unfollow', unfollow);

export default router;
