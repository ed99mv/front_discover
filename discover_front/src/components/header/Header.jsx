import React from "react";
import "./Header.css"; // Archivo de estilos para el header
import { AuthContext } from "../../authContext";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import LogOut from "../logout/LogOut";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="HeaderContainer">
      <header className="Header">
        <nav className="Nav">
          <a href="#">Inicio</a>
          <a href="#">Tours</a>
          <a href="#">Agentes Turísticos</a>
          <a href="#">Inscríbete</a>
          {!isLoggedIn && (
            <a>
              <SignIn />
            </a>
          )}
          {isLoggedIn && (
            <a>
              <LogOut />
            </a>
          )}
        </nav>
      </header>
      <div className="content">{/* Contenido de la página */}</div>
    </div>
  );
};

export default Header;
