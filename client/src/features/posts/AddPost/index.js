import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/forms/Button';
import { addPost } from '../../../redux/postsSlice';
import Textarea from '../../../components/forms/Textarea';
import unknownUser from '../../../assets/icon/unknownUser.jpg';

//style
import './style.scss';
import { useMemo } from 'react';
import { useCallback } from 'react';
import UploadForm from '../../../components/Upload';

const AddPost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [content, setContent] = useState('');
  const [img, setImg] = useState(null);
  const canSave = useMemo(() => content.trim() && true, [content]);

  const handleAddPost = useCallback(() => {
    const post = {
      username: user.username,
      userId: user._id,
      profilePicture: user.profilePicture,
      content,
      img,
    };
    dispatch(addPost({ post, token: user.token }));
    setContent('');
    setImg(null);
  }, [img, content, dispatch]);
  return (
    <div className='add-post' id='top'>
      {useMemo(
        () => (
          <div className='circle'>
            <img
              title={user.username}
              src={user.profilePicture || unknownUser}
              alt='profile picture'
            />
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
        {img && (
          <div className='post-img'>
            <img src={img} alt='post' />
          </div>
        )}
        <div className='second-row'>
          <UploadForm svg='image' setImg={setImg} />
          <Button onClick={handleAddPost} disabled={!canSave}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddPost);
