// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      // Realizar verificaciones adicionales del token si es necesario
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    console.log("token recibido", token);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = (token) => {
    console.log("token recibido", token)
    localStorage.removeItem('token', token);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

