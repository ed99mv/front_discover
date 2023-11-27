import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [authToken, setAuthToken] = useState(storedToken || '');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (authToken) {
      const decoded = jwtDecode(authToken);
      const userIdFromToken = decoded.sub;
      setUserId(userIdFromToken);
    }
  }, [authToken]);

  const setAuthData = (token) => {
    localStorage.setItem('token', token);
    console.log(token);
    setIsLoggedIn(true);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setAuthToken('');
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: setAuthData,
        logout,
        authToken,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };