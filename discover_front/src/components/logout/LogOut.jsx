import React, { useContext } from "react";
import { AuthContext } from "../../authContext";


const LogOut = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      if (isLoggedIn) {

     
        const response = await fetch("http://localhost:3001/logout", {
          method: "DELETE",
          credentials: "include",
        });
       
        if (!response.ok) {
            console.log(response.headers.get("Authorization"));
          const authorizationToken = response.headers.get("Authorization");
          logout(authorizationToken); // Llama a la función logout del contexto para cerrar la sesión
          console.log("Sesión cerrada exitosamente");
        } else {
          throw new Error("Error al cerrar sesión");
        }
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>{isLoggedIn && <a className="a" onClick={handleLogout}>Cerrar Sesión</a>}</>
  );
};

export default LogOut;
