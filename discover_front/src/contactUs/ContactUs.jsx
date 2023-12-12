import React from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = () => {
  const toEmail = "discoverpacific@outlook.com";
  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_5bv70zh"; // Reemplaza con tu Service ID
    const templateId = "template_w1paok7"; // Reemplaza con tu Template ID
    const apiKey = "9FbUhN1LagZn4rMcF"; // Reemplaza con tu API Key

    emailjs
      .sendForm(serviceId, templateId, e.target, apiKey)
      .then((result) => {
        console.log(result.text);
        // Aquí puedes agregar lógica adicional después de que el formulario se haya enviado correctamente
      })
      .catch((error) => {
        console.error(error);
        // Manejo de errores en caso de que haya un problema con el envío del formulario
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Detalles de Reserva</legend>
      <fieldset>
        <label>
          Nombre:
          <input type="text" name="userName" required />
        </label>
      </fieldset>
      <br />
      <fieldset>
        <label>
          Correo Electrónico:
          <input type="email" name="userEmail" required />
        </label>
      </fieldset>
      <br />
      <fieldset>
        <label>
          Mensaje:
          <textarea name="message" rows="4" cols="50" required></textarea>
        </label>
      </fieldset>
      {/* Campo oculto para el 'to_email' */}
      <input type="hidden" name="to_email" value={toEmail} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactUs;
