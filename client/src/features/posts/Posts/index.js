import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import Post from '../Post';

//style
import './style.scss';

const Posts = ({ userId }) => {
  let { data: posts, loading, error } = useSelector((state) => state.posts);

  if (userId) posts = posts.filter((post) => post.userId === userId);
  return (
    <div className='posts'>
      {loading && <Spinner style={{ height: '15rem', width: '15rem' }} />}
      {error && <h1>{error.message}</h1>}
      {posts && posts.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default React.memo(Posts);
