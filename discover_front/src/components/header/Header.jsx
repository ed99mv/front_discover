import React, { useState } from "react";
import "./Header.css"; // Archivo de estilos para el header
import { AuthContext } from "../../authContext";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import LogOut from "../logout/LogOut";
import NewTourForm from "../form_tour/NewTourForm";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Función para abrir/cerrar el modal
  };

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
            <React.Fragment>
              <a>
                <LogOut />
              </a>
              <a onClick={toggleModal}>Crear Tour</a>
            </React.Fragment>
          )}
        </nav>
      </header>
      <div className="content">
        {/* Contenido de la página */}
        {isLoggedIn && ( // Renderizar el componente NewTourForm si está loggeado
          <NewTourForm isOpen={isModalOpen} toggleModal={toggleModal} />
        )}
      </div>
    </div>
  );
};

export default Header;
