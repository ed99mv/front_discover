import React, { useState, useContext } from "react";
import emailjs from "emailjs-com";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
} from "reactstrap";
import { AuthContext } from "../../authContext";
import Swal from "sweetalert2";

const Subscribe = ({ isOpen, toggle }) => {
  const { isLoggedIn, userEmail, userName, userPhoneNumber } =
    useContext(AuthContext);
  const [message, setMessage] = useState("");

  const enviarCorreo = (e) => {
    e.preventDefault();

    // Configuración de EmailJS
    const templateParams = {
      userName: userName,
      userEmail: userEmail,
      phoneNumber: userPhoneNumber,
      message: message,
    };

    emailjs
      .send(
        "service_4rzxpse",
        "template_a68bsau",
        templateParams,
        "9-O4RPMRr5eBX7jtq"
      )
      .then((response) => {
        console.log(
          "Correo enviado correctamente!",
          response.status,
          response.text
        );
        setMessage("");

        Swal.fire({
          position: "center", // Use 'center' instead of 'top-end'
          icon: "success",
          title: "Solicitud de subscripción enviada",
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            // Add a custom class for centering
            popup: "center-alert-popup",
          },
        });
      })

      .catch((error) => {
        console.error("Error al enviar el correo:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Solicitud de Suscripción</ModalHeader>
      <ModalBody>
        {!isLoggedIn && (
          <p style={{ textAlign: "center" }}>
            Por favor,{" "}
            <a href="/login" onClick={toggle}>
              inicia sesión
            </a>{" "}
            o{" "}
            <a href="/register" onClick={toggle}>
              regístrate
            </a>{" "}
            para solicitar la suscripción.
          </p>
        )}
        <Label>Nombre:</Label>
        <Input type="text" value={userName} disabled />

        <Label>Correo Electrónico:</Label>
        <Input type="email" value={userEmail} disabled />

        <Label>Número de Contacto:</Label>
        <Input type="text" value={userPhoneNumber} disabled />

        <Label>Mensaje:</Label>
        <Input
          type="textarea"
          value={message}
          disabled={!isLoggedIn}
          onChange={(e) => setMessage(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button type="submit" onClick={enviarCorreo} disabled={!isLoggedIn}>
          Enviar
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Subscribe;
