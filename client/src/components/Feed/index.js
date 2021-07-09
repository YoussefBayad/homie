import React, { memo, useEffect } from 'react';
import NotificationIcon from '../navigation/NotificationIcon';
import AddPost from '../../features/posts/AddPost';
import Posts from '../../features/posts/Posts';
import BackToTop from '../BackToTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/usersSlice';
//style
import './style.scss';

const Feed = () => {
  const dispatch = useDispatch();

  const {
    id: userId,
    displayName,
    photoURL,
  } = useSelector((state) => state.auth.user);

  return (
    <div className='feed '>
      <nav className='feed-nav'>
        <NotificationIcon />
      </nav>
      <AddPost />
      <Posts />
      <BackToTop />
    </div>
  );
};

export default memo(Feed);
