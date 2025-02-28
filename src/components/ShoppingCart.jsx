import React, { useEffect, useState } from 'react';
import './css/ShoppingCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank, faCreditCard, faMoneyBillTransfer, faTrash } from '@fortawesome/free-solid-svg-icons';
import useNotify from '../hooks/useToast';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ShoppingCart = ({ cart, removeFromCart, updateQuantity }) => {
  const notify = useNotify();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  // Campos del formulario
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Calcular el total del carrito
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    if (cart.length === 0) {
      return 'El carrito está vacío.';
    }

    let message = '¡Hola! Quisiera comprar una tienda online:\n\n';
    cart.forEach((item) => {
      const price = parseFloat(item.price);
      message += `🛒 ${item.title} (x${item.quantity}) - $${price.toFixed(2)} c/u\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}\n\n`;
    message += `Información del cliente:\n`;
    message += `📛 Nombre: ${name}\n`;
    message += `📞 Teléfono: ${phone}`;
    return encodeURIComponent(message);
  };

  const handlePayOptions = () => {
    if (cart.length === 0) {
      notify('El carrito está vacío. Agrega productos antes de pagar.', 'error');
      return;
    }
    setShowPaymentOptions(true);
  };

  const handleWhatsAppPay = () => {
    if (!name || !phone) {
      notify('Por favor, completa todos los campos antes de enviar.', 'error');
      return;
    }

    const whatsappNumber = '3816671884';
    const message = generateWhatsAppMessage();
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.location.href = whatsappURL;
    notify('Pedido enviado correctamente a WhatsApp.', 'success');
  };

  const handleSendReceipt = () => {
    const whatsappNumber = '3816671884';
    const message = `¡Hola! Acabo de realizar el pago para la tienda online. Pronto enviaré el comprobante.\n\n${generateWhatsAppMessage()}`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.location.href = whatsappURL;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    .then(() => notify(`Copiado al portapapeles: ${text}`, 'success'))
    .catch(() => notify('Error al copiar al portapapeles.', 'error'));
  };

  const openModal = (info) => {
    setModalInfo(info);
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  const handleMercadoPago = async () => {
    if (cart.length === 0) {
      notify('El carrito está vacío. Agrega productos antes de pagar.', 'error');
      return;
    }

    const items = cart.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity, 10),
    }));

    try {
      const response = await fetch("http://localhost:4000/Mercado_Pago/pagar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir al usuario a la URL de MercadoPago
        window.location.href = data.init_point;
        notify('Redirigiendo a MercadoPago...', 'success');
      } else {
        console.error("Error:", data.error);
        notify('Hubo un problema al procesar el pago.', 'error');
      }
    } catch (error) {
      console.error("Error de red:", error);
      notify('Error de conexión al procesar el pago.', 'error');
    }
  };

  return (
    <div className="cart">
      <h3 className='cart-title'>Carrito de Compras</h3>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <p>${parseFloat(item.price).toFixed(2)}</p>
            </div>
            <div className="buttons-cart">
              <button onClick={() => updateQuantity(item._id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, 1)}>+</button>
            </div>
            <button
              className="delete-button"
              onClick={() => removeFromCart(item._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))
      )}
      <div className="cart-total">
        <p>Total: ${total.toFixed(2)}</p>
        <button className="pay-button" onClick={handlePayOptions}>
        <FontAwesomeIcon icon={faMoneyBillTransfer} /> Pagar
        </button>
      </div>
      {showPaymentOptions && (
        <div className="payment-options">
          <h5>Informacion de contacto</h5>
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
          <button
            className="payment-button mercadopago"
            onClick={handleMercadoPago}
          >
            <FontAwesomeIcon icon={faCreditCard} /> Pagar con MercadoPago
          </button>
        </div>
      )}
      {modalInfo && (
        <div className="modal-cart">
          <div className="modal-content-cart">
            <h3>{modalInfo.title}</h3>
            {modalInfo.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
            <button className="modal-button copy" onClick={() => copyToClipboard('mi-alias')}>Copiar Alias</button>
            <button className="modal-button copy" onClick={() => copyToClipboard('1234567890123456789012')}>Copiar CBU</button>
            <button className="modal-button send" onClick={handleSendReceipt}>Enviar Comprobante</button>
            <button className="close-modal" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;