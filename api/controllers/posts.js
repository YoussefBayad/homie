import Post from '../models/Post.js';
import User from '../models/User.js';
// create post

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.updateOne({
        $set: req.body,
      });
      res
        .status(200)
        .json({ message: 'Post has been updated', post: req.body });
    } else {
      return res.status(403).json('You can update only your posts !');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// delete post

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.params.userId === post.userId || req.body.isAdmin) {
      await post.deleteOne();
      res
        .status(200)
        .json({ message: 'Post has been deleted', postId: post._id });
    } else {
      return res.status(403).json('You can delete only your posts !');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// get post

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post._doc);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get time line posts

export const getTimeLinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: req.params.userId });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Posts.find({ userId: friendId });
      })
    );
    res.status(200).json(friendsPosts.concat(...userPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

//like post
export const likePost = async (req, res) => {
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
};
