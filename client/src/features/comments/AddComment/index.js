import React, { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as DirectIcon } from '../../../assets/icon/direct.svg';
import { addComment } from '../../../redux/commentsSlice';
import { editPost } from '../../../redux/postsSlice';
import unknownUser from '../../../assets/icon/unknownUser.jpg';
//style
import './style.scss';

const AddComment = ({ postId, setShowComments, commentsCount }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { username, profilePicture, id } = user;
  const [content, setContent] = useState('');
  const canSave = content.trim() && true;

  const handleAddComment = useCallback(
    (e) => {
      e.preventDefault();
      if (content.trim() === '') return;
      const comment = {
        createdAt: new Date().toISOString(),
        user: {
          username,
          profilePicture,
          id,
        },
        content,
        postId,
      };
      dispatch(addComment(comment));

      dispatch(editPost({ id: postId, commentsCount: commentsCount + 1 }));
      setShowComments(true);
      setContent('');
    },
    [
      username,
      profilePicture,
      id,
      content,
      dispatch,
      postId,
      setShowComments,
      commentsCount,
    ]
  );
  return (
    <div className='add-comment'>
      {useMemo(
        () => (
          <div className='circle'>
            <img
              src={profilePicture || unknownUser}
              title={username}
              alt='user'
            />
          </div>
        ),
        [profilePicture, username]
      )}
      <form onSubmit={handleAddComment}>
        <div className='add-comment-input'>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            placeholder='Write a comment...'
          />
          <DirectIcon
            className={canSave && 'submit'}
            type='submit'
            onClick={handleAddComment}
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(AddComment);
