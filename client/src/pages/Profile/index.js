import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '../../components/UserInfo';
import Posts from '../../features/posts/Posts';
import BackToTop from '../../components/BackToTop';
import { Link, useParams } from 'react-router-dom';
import AddPost from '../../features/posts/AddPost';
import Button from '../../components/forms/Button';
import { ReactComponent as DirectIcon } from '../../assets/icon/direct.svg';

//style
import './style.scss';
import { fetchUser } from '../../redux/usersSlice';
import Follow from '../../features/follow';

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.users.data);
  const ifCurrentUser = username === currentUser.username;

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (!ifCurrentUser) {
      dispatch(fetchUser(username));
    }
  }, [dispatch, username]);
  return (
    <div className='profile'>
      {user && (
        <>
          <UserInfo
            ifCurrentUser={ifCurrentUser}
            showUpload
            user={user}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
          {ifCurrentUser && !isEditing && (
            <Button
              className='btn profile-info-edit'
              onClick={() => setIsEditing(true)}>
              Edit Info
            </Button>
          )}
          {!ifCurrentUser && (
            <>
              <Follow
                username={currentUser.username}
                userToFollow={username}
                followings={currentUser.followings}
              />
              <Link
                to={`/chat/${currentUser.username}/${username}`}
                className='btn send-message'>
                Send Message
                <DirectIcon />
              </Link>
            </>
          )}
        </>
      )}
      <h2>Posts</h2>
      {ifCurrentUser && <AddPost />}
      <Posts userId={user._id} />
      <BackToTop />
    </div>
  );
};

export default React.memo(Profile);
