import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ContactForm from './ContactForm';

const PaymentOptions = ({ cart, setCart, total, closeOptions, openModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleWhatsAppPay = () => {
    if (!name || !phone) {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }
    const message = `Hola, quiero comprar: Total $${total}`;
    window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="payment-options">
      <ContactForm name={name} setName={setName} phone={phone} setPhone={setPhone} />
      <button className="payment-button whatsapp" onClick={handleWhatsAppPay}>
        <FontAwesomeIcon icon={faWhatsapp} /> Efectivo
      </button>
      <button
        className="payment-button transferencia"
        onClick={() =>
          openModal({
            title: 'Transferencia Bancaria',
            details: ['Alias: mi-alias', 'CBU: 1234567890123456789012'],
          })
        }
      >
        <FontAwesomeIcon icon={faBank} /> Transferencia
      </button>
      <button className="payment-button mercadopago">
        <FontAwesomeIcon icon={faCreditCard} /> Pagar con MercadoPago
      </button>
    </div>
  );
};

export default PaymentOptions;
