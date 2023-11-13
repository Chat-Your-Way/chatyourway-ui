import { useState } from 'react';

export const useUser = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('accessToken'));

  const localLogOut = () => {
    localStorage.removeItem('accessToken');
    setIsAuth('');
  };

  const logIn = (token) => {
    localStorage.setItem('accessToken', token);
    setIsAuth(token);
  };

  return {
    isAuthenticated: !!isAuth,
    isAuth,
    localLogOut,
    logIn,
  };
};
