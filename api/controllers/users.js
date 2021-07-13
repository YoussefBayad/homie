import User from '../models/User.js';

// get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const { updatedAt, password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update user

export const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
};

// delete user
export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
};

//follow user

export const follow = async (req, res) => {
  if (req.body.username !== req.params.username) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const currentUser = await User.findOne({ username: req.body.username });
      if (!user.followers.includes(req.body.username)) {
        await user.updateOne({ $push: { followers: req.body.username } });
        await currentUser.updateOne({
          $push: { followings: req.params.username },
        });
        res.status(200).json({
          message: 'user has been followed',
          username: req.params.username,
        });
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
};

// unfollow

export const unfollow = async (req, res) => {
  if (req.body.username !== req.params.username) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const currentUser = await User.findOne({ username: req.body.username });
      console.log(user.followers);
      console.log(req.params.username, req.body.username);
      if (user.followers.includes(req.body.username)) {
        await user.updateOne({ $pull: { followers: req.body.username } });
        await currentUser.updateOne({
          $pull: { followings: req.params.username },
        });
        res.status(200).json({
          message: 'user has been unfollowed',
          username: req.params.username,
        });
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
};
