import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [authToken, setAuthToken] = useState(storedToken || '');
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const userIdFromToken = decodedToken.sub;
      const userNameFromToken = decodedToken.full_name; 
      console.log(userNameFromToken);
      setUserId(userIdFromToken);
      setUserName(userNameFromToken); 
    }
  }, [authToken]);

  const setAuthData = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setAuthToken('');
    setUserId(null);
    setUserName(''); 
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: setAuthData,
        logout,
        authToken,
        userId,
        userName, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
