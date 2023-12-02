import "./UserMenu.css";
import React, { useRef, useState } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { AuthContext } from "../../authContext";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import LogOut from "../logout/LogOut";
import NewTourForm from "../form_tour/NewTourForm";
import NewCompanyForm from "../form_company/NewCompanyForm";

function UserMenu() {
  const { isLoggedIn, userName, userId } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalCompany = () => {
    setIsModalOpenCompany(!isModalOpenCompany);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  console.log("isActive:", isActive);

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={toggleMenu} className="menu-trigger">
          <span>{isLoggedIn ? userId : "Regístrate"}</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : ""}`}>
          <ul>
            <li>{!isLoggedIn && <SignIn />}</li>
            {isLoggedIn && (
              <>
                <li>
                  <LogOut />
                </li>
                <li>
                  <a onClick={toggleModal}>Crear Tour</a>
                </li>
                <li>
                  <a onClick={toggleModalCompany}>Crear Empresa</a>
                </li>
                {isModalOpen && (
                  <li>
                    <NewTourForm
                      isOpen={isModalOpen}
                      toggleModal={toggleModal}
                    />
                  </li>
                )}
                {isModalOpenCompany && (
                  <li>
                    <NewCompanyForm
                      isOpen={isModalOpenCompany}
                      toggleModalCompany={toggleModalCompany}
                    />
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserMenu;
