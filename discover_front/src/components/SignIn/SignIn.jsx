import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import RegisterModal from "../RegisterModal/RegisterModal";
import { AuthContext } from "../../authContext";

const SignIn = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [open, setOpen] = useState(!isLoggedIn);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openModal = () => {
    setOpen(true);
    setShowRegisterModal(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true); // Abrir el modal de registro al hacer clic en "Registrarme"
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();

      // Guardar el token de autenticación en localStorage
      const authorizationToken = response.headers.get("Authorization");
      console.log(authorizationToken);
      localStorage.setItem("token", authorizationToken);
      login(authorizationToken);
      console.log("Inicio de sesión exitoso");

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <div>
        <div>
          {!isLoggedIn && (
            <a className="a" onClick={openModal}>
              Iniciar Sesión
            </a>
          )}
        </div>
      </div>

      <Modal isOpen={open} style={modalStyles}>
        <ModalHeader>Iniciar Sesión</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          <Button color="primary" onClick={openRegisterModal}>
            Registrarme
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      <RegisterModal
        isOpen={showRegisterModal} // Propiedad para controlar la visibilidad del modal de registro
        toggle={closeRegisterModal} // Función para cerrar el modal de registro
        handleLogin={handleLogin}
      />
    </>
  );
};

export default SignIn;
