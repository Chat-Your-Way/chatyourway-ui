import { useState } from 'react';

export const useUser = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('accessToken'));

  const localLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuth('');
  };

  const logIn = (accToken, refToken) => {
    localStorage.setItem('accessToken', accToken);
    localStorage.setItem('refreshToken', refToken);
    setIsAuth(accToken);
  };

  return {
    isAuthenticated: !!isAuth,
    isAuth,
    localLogOut,
    logIn,
  };
};
