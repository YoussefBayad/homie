import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../../assets/icon/user.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/icon/logout.svg';
import { useSelector } from 'react-redux';

//style
import './style.scss';

const TopMobileNav = () => {
  const username = useSelector((state) => state.auth.user.username);

  return (
    <div className='top-mobile-nav'>
      <div className='top-mobile-nav-inner'>
        <NavLink
          to={`/profile/${username}`}
          className='link'
          activeClassName='main-nav-active'>
          <UserIcon />
        </NavLink>
        <h1 className='title'>Homie</h1>
        <div className='link'>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default TopMobileNav;
