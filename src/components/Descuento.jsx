import React, { useEffect, useRef, useState } from 'react'
import './css/Descuento.css'
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

  const getDiscount = async () => {
    try {
      const response = await fetch(
        'https://two19labsdescuento-back.onrender.com/descuento/guardar-email', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        }
      );
  
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Error al guardar el email");
      }
  
      console.log("Respuesta del servidor:", result);
      return result;
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert(`Hubo un error: ${error.message}`);
      throw error;
    }
  };  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();  // Prevenir la acción por defecto del formulario (recarga de página)

    if (!email || !email.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    try {
      const result = await getDiscount();
      alert('¡Gracias por registrarte! Te hemos enviado tu descuento.');
      closeModal();
    } catch (error) {
      alert('Hubo un problema al registrar tu email. Por favor, inténtalo de nuevo.');
    }
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

          {/* Formulario envuelto aquí */}
          <form onSubmit={handleFormSubmit}>
            <input
              className="input-email"
              placeholder="INGRESA TU EMAIL"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="boton" type="submit">APLICAR 20% DE DESCUENTO</button>
          </form>

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

export default Descuento;
