import "./SignIn.css";
import Swal from "sweetalert2";
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
  const [open, setOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    isVisible: false,
    type: "", // Puede ser "success" o "error"
    text: "",
  });

  
  const openModal = () => {
    setOpen(true);
    setShowRegisterModal(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const showMessageAndClose = (type, text) => {
    console.log("Mostrando mensaje1:", type, text);
    setMessage({
      isVisible: true,
      type,
      text,
    });

    setTimeout(() => {
      console.log("Cerrando mensaje");
      setMessage({
        isVisible: false,
        type: "",
        text: "",
      });
    }, 2000);
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

      const authorizationToken = response.headers.get("Authorization");
      localStorage.setItem("token", authorizationToken);
      login(authorizationToken);
      closeModal();
      
      Swal.fire({
        position: "center", // Use 'center' instead of 'top-end'
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          // Add a custom class for centering
          popup: "center-alert-popup",
        },
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      showMessageAndClose("error", "Contraseña o email incorrecto");
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

                {message.isVisible && (
        <>
          <p className={`custom-flash-message ${message.type}`}>
            {message.text}
          </p>
          {console.log("Mostrando mensaje2:", message.type, message.text)}
        </>
      )}

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
        isOpen={showRegisterModal}
        toggle={closeRegisterModal}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default SignIn;
