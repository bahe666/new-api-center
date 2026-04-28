import { useState } from 'react';

export default function useGlobalModel() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('sensecore-logged-in') === 'true',
  );

  const login = () => {
    localStorage.setItem('sensecore-logged-in', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('sensecore-logged-in');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
