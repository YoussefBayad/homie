import React from 'react';
import { useDispatch } from 'react-redux';
import { follow, unfollow } from '../../redux/usersSlice';

const Follow = ({ username, userToFollow, followings, followers }) => {
  const dispatch = useDispatch();

  const follow = followers?.includes(userToFollow);
  console.log(follow);

  return !follow ? (
    <button
      className='btn '
      onClick={() => dispatch(follow(username, userToFollow))}>
      Follow
    </button>
  ) : (
    <button
      className='btn unfollow'
      onClick={() => dispatch(unfollow(username, userToFollow))}>
      Unfollow
    </button>
  );
};

export default Follow;
