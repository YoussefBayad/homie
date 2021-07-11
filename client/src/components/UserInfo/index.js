import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../forms/Button';
import Spinner from '../Spinner';
import * as Yup from 'yup';
import ErrorText from '../ErrorText';
import unknownUser from '../../assets/icon/unknownUser.jpg';

//style
import './style.scss';
import { editUserInfo } from '../../redux/authSlice';
import UploadForm from '../Upload';

const UserInfo = ({
  ifCurrentUser,
  user,
  setIsEditing,
  isEditing,
  showUpload,
}) => {
  const [photoURL, setPhotoURL] = useState(null);
  const dispatch = useDispatch();
  const posts = [];
  const postsCount = posts.filter((post) => post.user.id === user.id).length;
  const initialValues = {
    username: user.username,
    bio: user.bio,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    bio: Yup.string().required('Bio is required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    dispatch(
      editUserInfo({
        id: user.id,
        username: values.username,
        bio: values.bio,
        photoURL: photoURL || user.photoURL,
      })
    );
    onSubmitProps.resetForm();

    setIsEditing(false);
    setPhotoURL(null);
  };
  return (
    <div className='user-info'>
      <Link to={`/profile/${user.id}`}>
        <div className='circle'>
          <img src={user.profilePicture || unknownUser} alt='profile picture' />
        </div>
      </Link>
      {showUpload && ifCurrentUser && (
        <UploadForm svg='add' setPhotoURL={setPhotoURL} />
      )}
      {!photoURL && !isEditing ? (
        <>
          <h3 className='username'>{user.username}</h3>
          <h4 className='bio'>{user.bio}</h4>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}>
          <Form>
            {photoURL && (
              <img className='user-new-img' src={photoURL} alt='user avatar' />
            )}
            <Field type='username' placeholder='Username' name='username' />
            <ErrorMessage component={ErrorText} name='username' />
            <Field type='bio' placeholder='Bio...' name='bio' />
            <ErrorMessage component={ErrorText} name='bio' />

            <Button type='submit' className='btn profile-info-save'>
              save
            </Button>
          </Form>
        </Formik>
      )}
      <div className='profile-numbers'>
        <div className='profile-number'>
          <p>{postsCount}</p>
          <p>posts</p>
        </div>
        <div className='profile-number'>
          <p>{user.followersCount}</p>
          <p>followers</p>
        </div>
        <div className='profile-number'>
          <p>{user.followingCount}</p>
          <p>following</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
