import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const _tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(_tokenExpirationDate);
    window.localStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        userId: uid,
        expirationDate: _tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    console.log('[DEBUG] logout');
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    window.localStorage.removeItem('userData');
  }, []);

  // useEffect run after render cycle，先跑render 再跑useEffect
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expirationDate)
      );
    }
  }, [login]);

  // login or autologin or logout
  useEffect(() => {
    if (!token || !tokenExpirationDate) {
      clearTimeout(logoutTimer);
      return;
    }
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    setTimeout(logout, remainingTime);
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId };
};
