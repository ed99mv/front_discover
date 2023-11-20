import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Discover<span>Pacific</span>
        </h3>
        <p className="footer-links">
          <Link to="/assistancepage" className="link-1">
            Centro De Ayuda
          </Link>
          <br />
          <Link to="/termspage" className="link-1">
            Términos
          </Link>
          <br />
          <Link to="/aboutpage" className="link-1">
            About
          </Link>
        </p>
        <p className="footer-company-name">Discover Pacific © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>506 - Costa Rica Tour</span> Puntarenas Beach, Costa Rica
          </p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+506 87966065</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">discover@pacific.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>Sobre la Compañía</span> La seguridad y el bienestar de nuestros
          viajeros son nuestra máxima prioridad. Implementamos rigurosos
          estándares de seguridad en todos nuestros tours y nos aseguramos de
          contar con guías capacitados y profesionales.
        </p>
        <div className="footer-icons">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
