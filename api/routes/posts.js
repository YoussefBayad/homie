import express from 'express';
import bcrypt from 'bcrypt';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

//creat post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update post

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json('Post has been updated');
    } else {
      return res.status(403).json('You can update only your posts !');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete post

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.deleteOne();
      res.status(200).json('Post has been deleted');
    } else {
      return res.status(403).json('You can delete only your posts !');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post._doc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get timeline posts

router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Posts.find({ userId: friendId });
      })
    );
    res.status(200).json(friendsPosts.concat(...userPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});
// like post

router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('post has been disliked');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
