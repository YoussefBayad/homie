import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/forms/Button';
import { addPost } from '../../../redux/postsSlice';
import Textarea from '../../../components/forms/Textarea';
// import avatar from '../../../assets/icon/unknownUser.jpg';
//style
import './style.scss';
import { useMemo } from 'react';
import { useCallback } from 'react';
import UploadForm from '../../../components/Upload';

const AddPost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [content, setContent] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const canSave = useMemo(() => content.trim() && true, [content]);

  const handleAddPost = useCallback(() => {
    const post = {
      createdAt: new Date().toISOString(),
      user: {
        username: user.username,
        id: user._id,
        profilePicture: user.profilePicture,
      },
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      content,
      profilePicture,
    };
    dispatch(addPost(post));
    setContent('');
    setProfilePicture(null);
  }, [user.username, user._id, user.profilePicture, content, dispatch]);
  return (
    <div className='add-post' id='top'>
      {useMemo(
        () => (
          <div className='circle'>
            <img title={user.username} src={user.profilePicture} alt='user' />
          </div>
        ),
        [user.username, user.profilePicture]
      )}
      <div className='first-row'>
        <Textarea
          id='add-post-input'
          placeholder="What's on your mind?"
          content={content}
          setContent={setContent}
        />
        {profilePicture && (
          <div className='post-img'>
            <img src={profilePicture} alt='post' />
          </div>
        )}
        <div className='second-row'>
          <UploadForm svg='image' setProfilePicture={setProfilePicture} />
          <Button onClick={handleAddPost} disabled={!canSave}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddPost);
