import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/forms/Button';
import { follow, unfollow } from '../../redux/authSlice';

const Follow = ({ username, userToFollow, followings }) => {
  const dispatch = useDispatch();

  const alreadyFollow = followings?.includes(userToFollow);
  const handleFollow = () => {};
  return alreadyFollow ? (
    <Button onClick={() => dispatch(unfollow({ username, userToFollow }))}>
      Unfollow
    </Button>
  ) : (
    <Button onClick={() => dispatch(follow({ username, userToFollow }))}>
      Follow
    </Button>
  );
};

export default Follow;
