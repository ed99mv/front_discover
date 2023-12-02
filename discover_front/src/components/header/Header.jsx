import React, { useState } from "react";
import "./Header.css"; // Archivo de estilos para el header
import { AuthContext } from "../../authContext";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import LogOut from "../logout/LogOut";
import NewTourForm from "../form_tour/NewTourForm";
import NewCompanyForm from "../form_company/NewCompanyForm";
import UserMenu from "../userMenu/UserMenu";

const Header = () => {

  return (
    <div className="HeaderContainer">
      <header className="Header">
        <nav className="Nav">
          <a href="/">Tours</a>
          <a href="/companiespage">Agentes Turísticos</a>
          <a href="#">Inscríbete</a>
          <UserMenu />
        </nav>
      </header>
    </div>
  );
};

export default Header;
