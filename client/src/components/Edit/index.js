import React, { useState } from 'react';
import Textarea from '../forms/Textarea';
import Button from '../forms/Button';
import { useDispatch } from 'react-redux';

//style
import './style.scss';

const Edit = ({ content, id, userId, editThunk, setIsEditing, height }) => {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState(content);
  const handleEditPost = () => {
    dispatch(
      editThunk({
        _id: id,
        userId: userId,
        content: newContent,
      })
    );
    setIsEditing(false);
  };

  return (
    <div className='edit'>
      <Textarea
        style={{ height: height }}
        autoFocus
        content={newContent}
        setContent={setNewContent}
      />
      <Button disabled={!newContent} onClick={handleEditPost}>
        Update
      </Button>
    </div>
  );
};

export default Edit;
