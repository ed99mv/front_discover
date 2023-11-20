import React from "react";
import "./App.css";
import { AuthContext } from "../../authContext";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import LogOut from "../logout/LogOut";
const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">Discover Pacific</div>
        <nav className="nav">
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
