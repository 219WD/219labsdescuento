import React from 'react';

const PaymentModal = ({ modalInfo, closeModal, notify }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      notify(`Copiado al portapapeles: ${text}`, 'success');
    });
  };

  return (
    <div className="modal-cart">
      <div className="modal-content-cart">
        <h3>{modalInfo.title}</h3>
        {modalInfo.details.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
        <button className="modal-button copy" onClick={() => copyToClipboard('mi-alias')}>
          Copiar Alias
        </button>
        <button className="modal-button copy" onClick={() => copyToClipboard('1234567890123456789012')}>
          Copiar CBU
        </button>
        <button className="close-modal" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
