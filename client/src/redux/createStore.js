import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import commentsReducer from './commentsSlice';
import likesReducer from './likesSlice';
import notificationsReducer from './notificationsSlice';
import messagesReducer from './messagesSlice';
import usersReducer from './usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    notifications: notificationsReducer,
    messages: messagesReducer,
    users: usersReducer,
  },
});
