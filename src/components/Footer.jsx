import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faWhatsapp,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-grid">
          <div>
            <h2 className="footer-logo">219LABS</h2>
            <p className="footer-tagline">Agencia Digital</p>
            <h3 className="footer-title">Sobre Nosotros</h3>
            <p className="footer-text">
              Queremos ayudar a las empresas a crecer en el mundo digital.
              Nuestro objetivo es brindar soluciones digitales para su negocio.
            </p>
            <h3 className="footer-title">Contáctanos</h3>
            <p className="footer-contact">
              <FontAwesomeIcon icon={faPhoneAlt} className="footer-icon" /> +54
              381 6671884
            </p>
            <p className="footer-contact">
              <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />{' '}
              juan@219labs.com
            </p>
          </div>
          <div>
            <h3 className="footer-title">Información</h3>
            <ul className="footer-links">
              <li>
                <a href="https://219labs.tech/">Sobre Nosotros</a>
              </li>
              <li>
                <a href="https://219labs.tech/">Más Búsquedas</a>
              </li>
              <li>
                <a href="https://219labs.tech/">Testimonios</a>
              </li>
              <li>
                <a href="https://219labs.tech/">Servicios</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Enlaces Útiles</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20saber%20de%20otros%20servicios.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20necesito%20ayuda%20con%20soporte%20técnico.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Soporte
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20contratar%20un%20servicio%20de%20software.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Software a medida
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20buenas,%20vengo%20de%20la%20página%20y%20quiero%20ponerme%20en%20contacto.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contacto directo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Suscríbete para Más Información</h3>
            <div className="footer-subscribe">
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="footer-input"
              />
              <button className="footer-button">Suscribirse</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
          <p className="footer-copy">
            &copy; 2020 @ 219LABS Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;