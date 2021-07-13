import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '../forms/Button';

const Google = () => {
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const user = {
      userName: result.name,
      email: result.email,
      profilePicture: result.photoURL,
    };
    console.log('res', res);
    try {
      // dispatch({ type: AUTH, data: { result, token } });
      // history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    console.log('Google Sign In was unsuccessful. Try again later');
  return (
    <GoogleLogin
      clientId='16092100188-nvrgkdtmo3od77d6o8fnrfmm5j513vso.apps.googleusercontent.com'
      render={(renderProps) => (
        <Button
          className='google-login'
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
          Google Sign In
        </Button>
      )}
      onSuccess={googleSuccess}
      onFailure={googleError}
      cookiePolicy='single_host_origin'
    />
  );
};

export default Google;
