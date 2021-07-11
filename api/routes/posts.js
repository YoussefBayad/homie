import express from 'express';
import bcrypt from 'bcrypt';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

import {
  createPost,
  deletePost,
  updatePost,
  getTimeLinePosts,
  likePost,
} from '../controllers/posts.js';

router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getPost);
router.get('/timeline/:userId', getTimeLinePosts);
router.put('/:id/like', likePost);

export default router;
