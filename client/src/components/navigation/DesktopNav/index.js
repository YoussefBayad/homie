import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../assets/icon/search.svg';
import { ReactComponent as MingleIcon } from '../../../assets/icon/direct.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/icon/notification.svg';
import { ReactComponent as UserIcon } from '../../../assets/icon/user.svg';
import { ReactComponent as FeedIcon } from '../../../assets/icon/feed.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/icon/logout.svg';

//style
import './style.scss';

const DesktopNav = ({ userId }) => {
  const notifications = [];
  const admin = 'volTozosNrMZJuUCZqvPswYPWzm2';
  return (
    <nav className='desktop-nav'>
      <NavLink exact to='/' className='link' activeClassName='main-nav-active'>
        <FeedIcon />
        <p>Feed</p>
      </NavLink>
      <NavLink
        to={`/chat/${userId}/${admin}`}
        className='link'
        activeClassName='main-nav-active'>
        <MingleIcon />
        <p>Chat</p>
      </NavLink>
      <NavLink
        to='/notification'
        className='link'
        activeClassName='main-nav-active'>
        <NotificationIcon />
        <p>notification</p>
        {notifications.length > 0 && (
          <p className='notifications-count'>{notifications.length}</p>
        )}
      </NavLink>
      <NavLink to='/search' className='link' activeClassName='main-nav-active'>
        <SearchIcon />
        <p>Search</p>
      </NavLink>
      <NavLink
        to={`/profile/${userId}`}
        className='link'
        activeClassName='main-nav-active'>
        <UserIcon />
        <p>Profile</p>
      </NavLink>
      <div className='link'>
        <LogoutIcon />
        <p>Logout</p>
      </div>
    </nav>
  );
};

export default DesktopNav;
