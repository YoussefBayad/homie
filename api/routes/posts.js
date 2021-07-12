import express from 'express';

const router = express.Router();

import {
  getPost,
  createPost,
  deletePost,
  updatePost,
  getTimeLinePosts,
  likePost,
} from '../controllers/posts.js';

router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id/:userId', deletePost);
router.get('/:id', getPost);
router.get('/timeline/:userId', getTimeLinePosts);
router.put('/:id/like', likePost);

export default router;
