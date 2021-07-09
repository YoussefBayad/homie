import React from 'react';
import { useDispatch } from 'react-redux';
import { authChange } from '../redux/authSlice';

const useAuthListener = async () => {
  const dispatch = useDispatch();
  // if (user) {
  //   const userRef = await handleUserProfile(user);
  //   userRef.onSnapshot((snapshot) => {
  //     dispatch(
  //       authChange({
  //         user: {
  //           id: snapshot.id,
  //           ...snapshot.data(),
  //         },
  //         loading,
  //         error,
  //       })
  //     );
  //   });
  // } else {
  //   dispatch(
  //     authChange({
  //       user,
  //       loading,
  //       error,
  //     })
  //   );
  // }
};

export default useAuthListener;
