import React, { memo, useEffect } from 'react';
import NotificationIcon from '../navigation/NotificationIcon';
import AddPost from '../../features/posts/AddPost';
import Posts from '../../features/posts/Posts';
import BackToTop from '../BackToTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/usersSlice';
import { fetchPosts } from '../../redux/postsSlice';

//style
import './style.scss';
const Feed = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  dispatch(fetchPosts(userId));
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
