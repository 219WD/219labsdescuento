import React, { useEffect, useRef, useState } from 'react'
import './Descuento.css'
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Descuento = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [email, setEmail] = useState('');
    const modalRef = useRef(null);
  
    useEffect(() => {
      if (isModalVisible) {
        // Animación con GSAP: Aplicar un retraso de 2 segundos
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, delay: 4 }
        );
      }
    }, [isModalVisible]);
  
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleFormSubmit = () => {
      if (!email) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
      }
  
      // Simular envío de datos
      console.log('Enviando email:', email);
      alert('¡Gracias por registrarte! Te hemos enviado tu descuento.');
  
      closeModal();
    };
  
    if (!isModalVisible) {
      return null;
    }
    return (
        <div className="container">
            <div className="overlay">
                <div className="modal" ref={modalRef}>
                    <button className="cerrar" onClick={closeModal}><FontAwesomeIcon icon={faClose} /></button>
                    <img
                        alt="Logo"
                        className="logo"
                        src="https://res.cloudinary.com/dtxdv136u/image/upload/v1736802552/site-logo_sdlwth.webp"
                    />
                    <h1 className="titulo">TU TIENDA ONLINE</h1>
                    <p className="subtitulo">VENDE POR VOS <span>LAS 24HS</span></p>
                    <p className="descripcion">TE REGALAMOS UN</p>
                    <h2 className="oferta">20%</h2>
                    <p className="descripcion-oferta">DE DESCUENTO</p>
                    <p className="nota">En tu proxima compra</p>
                    <p className="descripcion-pequena">REGISTRATE <span>CON TU EMAIL</span> GRATIS!</p>
                    <input
                        className="input-email"
                        placeholder="INGRESA TU EMAIL"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button className="boton" onClick={handleFormSubmit}>APLICAR 20% DE DESCUENTO</button>
                    <a className="enlace-no-gracias" onClick={closeModal}>
                        NO GRACIAS
                    </a>
                    <p className="texto-legal">
                        Toda la información recolectada será tratada con <span>estricta confidencialidad</span>  y de acuerdo con nuestra <span>política de privacidad</span>. Solo utilizaremos su <span>correo electrónico</span> para enviarle <span>descuentos</span> exclusivos y noticias relevantes.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Descuento