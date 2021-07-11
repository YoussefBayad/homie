import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function WithAuth({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? children : <Redirect to='/login' />)}
    />
  );
}

export default WithAuth;
