import React from 'react';

const ContactForm = ({ name, setName, phone, setPhone }) => (
  <div className='payment-options'>
    <h5>Información de contacto</h5>
    <input
      type="text"
      placeholder="Nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="text"
      placeholder="Teléfono"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  </div>
);

export default ContactForm;
