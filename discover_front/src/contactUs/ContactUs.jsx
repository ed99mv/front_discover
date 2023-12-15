import React, { useContext } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import { AuthContext } from "../authContext";
import { useState } from "react";

const ContactUs = ({ toEmail }) => {
  const { isLoggedIn, userEmail, userName, userPhoneNumber } =
    useContext(AuthContext);
  const [amountPeople, setAmountPeople] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_5bv70zh";
    const templateId = "template_w1paok7";
    const apiKey = "9FbUhN1LagZn4rMcF";

    emailjs
      .sendForm(serviceId, templateId, e.target, apiKey)
      .then((result) => {
        console.log(result.text);
        // Lógica para mensaje de correo enviado
        setAmountPeople("");
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLoggedIn && (
        <p style={{ textAlign: "center" }}>
          Por favor, <a href="/login">inicia sesión</a> o{" "}
          <a href="/register">regístrate</a> para enviar un mensaje.
        </p>
      )}
      <legend>Detalles de Reserva</legend>
      <fieldset>
        <label>
          Nombre:
          <input
            type="text"
            name="userName"
            defaultValue={userName}
            required
            disabled={!isLoggedIn}
          />
        </label>
      </fieldset>
      <br />
      <fieldset>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="userEmail"
            defaultValue={userEmail}
            required
            disabled={!isLoggedIn}
          />
        </label>
      </fieldset>
      <br />
      <fieldset>
        <label>
          Teléfono:
          <input
            type="tel"
            name="phoneNumber"
            defaultValue={userPhoneNumber}
            required
            disabled={!isLoggedIn}
          />
        </label>
      </fieldset>
      <br />
      <fieldset>
        <label>
          Cantidad de Personas:
          <input
            type="number"
            name="amountPeople"
            value={amountPeople}
            onChange={(e) => setAmountPeople(e.target.value)}
            required
            disabled={!isLoggedIn}
          />
        </label>
      </fieldset>
      <br />
      <fieldset>
        <label>
          Mensaje:
          <textarea
            name="message"
            rows="4"
            cols="50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={!isLoggedIn}
          ></textarea>
        </label>
      </fieldset>
      <input type="hidden" name="to_email" value={toEmail} />
      <button type="submit" disabled={!isLoggedIn}>
        Enviar
      </button>
    </form>
  );
};

export default ContactUs;
