// UserMenu.jsx
import React, { useContext, useRef, useState } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { AuthContext } from "../../authContext";
import SignIn from "../SignIn/SignIn";
import LogOut from "../logout/LogOut";
import NewTourForm from "../form_tour/NewTourForm";
import NewCompanyForm from "../form_company/NewCompanyForm";
import RoleChange from "../RoleChange/RoleChange";
import "./UserMenu.css";

function UserMenu() {
  const { isLoggedIn, userRole, userName } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isRoleChangeOpen, setIsRoleChangeOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsModalOpenCompany(false);
    setIsRoleChangeOpen(false);
  };

  const toggleModalCompany = () => {
    setIsModalOpenCompany(!isModalOpenCompany);
    setIsModalOpen(false);
    setIsRoleChangeOpen(false);
  };

  const handleRoleChangeClick = () => {
    setIsRoleChangeOpen(!isRoleChangeOpen);
    setIsModalOpen(false);
    setIsModalOpenCompany(false);
  };

  const toggleMenu = () => {
    setIsActive(!isLoggedIn);
  };

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={toggleMenu} className="menu-trigger">
          <span>{isLoggedIn ? userName : "Regístrate"}</span>
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
                {(userRole === "admin" || userRole === "company") && (
                  <>
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
                {userRole === "admin" && (
                  <>
                    <li>
                      <a onClick={handleRoleChangeClick}>Cambiar Rol</a>
                    </li>
                    {isRoleChangeOpen && (
                      <li>
                        <RoleChange
                          isRoleChangeOpen={isRoleChangeOpen}
                          toggle={handleRoleChangeClick}
                        />
                      </li>
                    )}
                  </>
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
