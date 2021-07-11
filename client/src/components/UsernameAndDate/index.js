import React from 'react';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceToNow } from 'date-fns';
import unknownUser from '../../assets/icon/unknownUser.jpg';

//style
import './style.scss';

const UsernameAndDate = ({
  id,
  profilePicture,
  username,
  createdAt,
  ...otherProps
}) => {
  const date = createdAt && parseISO(createdAt);
  const timeAgo = createdAt && formatDistanceToNow(date);
  return (
    <Link to={`/profile/${id}`}>
      <div className='post-header' {...otherProps}>
        <div className='circle'>
          <img src={profilePicture || unknownUser} alt='user' />
        </div>
        <div className='username-and-date'>
          <p className='post-username'>{username} </p>
          {createdAt && (
            <p className='post-date' title={date}>
              <i>{timeAgo} ago</i>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default React.memo(UsernameAndDate);
