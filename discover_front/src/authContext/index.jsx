import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [authToken, setAuthToken] = useState(storedToken || "");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const userIdFromToken = decodedToken.sub;
      setUserId(userIdFromToken);
    }
  }, [authToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:3001/api/v1/users/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener la información del usuario");
          }

          const userData = await response.json();
          setUserName(userData.full_name);
          setUserEmail(userData.email);
          setUserPhoneNumber(userData.phone_number);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, [authToken, userId]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:3001/api/v1/users/${userId}/get_user_role`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener el rol del usuario");
          }

          const data = await response.json();
          setUserRole(data.role);
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
      }
    };

    fetchUserRole();
  }, [userId]);

  const setAuthData = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAuthToken("");
    setUserId(null);
    setUserName("");
    setUserRole("");
    setUserEmail("");
    setUserPhoneNumber("");
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
        userRole,
        userEmail,
        userPhoneNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
