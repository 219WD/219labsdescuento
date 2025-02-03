import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./css/Descuento.css"; 

const EstadoCarritoModal = ({ isOpen, onClose, carritoId, onUpdateEstado }) => {
  const modalRef = useRef(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!estado) {
      alert("Por favor, selecciona un estado.");
      return;
    }
    onUpdateEstado(carritoId, estado);
  };

  if (!isOpen) return null;

  return (
    <div className="container">
        <div className="modal" ref={modalRef}>
          <button className="cerrar" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <h5>Cambiar estado del Carrito</h5>
          <form onSubmit={handleSubmit}>
            <label htmlFor="estado">Selecciona el nuevo estado:</label>
            <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="contactado">Contactado</option>
              <option value="cerrado">Cerrado</option>
            </select>
            <button className="boton" type="submit">Actualizar Estado</button>
          </form>
        </div>
    </div>
  );
};

export default EstadoCarritoModal;
