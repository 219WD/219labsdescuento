import React, { useState } from 'react';
import { useCarrito } from '../context/ContextCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillTransfer, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import useNotify from '../hooks/useToast';
import './css/ShoppingCart.css';

const ShoppingCart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity 
  } = useCarrito();
  
  const notify = useNotify();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  // Función segura para obtener el precio
  const getSafePrice = (item) => item?.price || 0;
  
  // Función segura para obtener la cantidad
  const getSafeQuantity = (item) => item?.quantity || 1;

  // Calcula el total del carrito
  const total = cart.reduce((acc, item) => 
    acc + (getSafePrice(item) * getSafeQuantity(item))
  , 0);

  // Manejador de cambios en los inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Genera el mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return 'El carrito está vacío.';
    let message = '¡Hola! Quisiera comprar una tienda online:\n\n';
    cart.forEach((item) => {
      const price = getSafePrice(item);
      const quantity = getSafeQuantity(item);
      message += `🛒 ${item.title} (x${quantity}) - $${price.toFixed(2)} c/u\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}\n\n`;
    message += `Información del cliente:\n📛 Nombre: ${formData.name}\n📞 Teléfono: ${formData.phone}`;
    return encodeURIComponent(message);
  };

  // Manejador para mostrar opciones de pago
  const handlePayOptions = () => {
    if (cart.length === 0) {
      notify('El carrito está vacío. Agrega productos antes de pagar.', 'error');
      return;
    }
    setShowPaymentOptions(true);
  };

  // Manejador para pago por WhatsApp
  const handleWhatsAppPay = () => {
    if (!formData.name || !formData.phone) {
      notify('Por favor, completa todos los campos antes de enviar.', 'error');
      return;
    }
    window.location.href = `https://api.whatsapp.com/send?phone=3816671884&text=${generateWhatsAppMessage()}`;
  };

  // Manejador para MercadoPago
  const handleMercadoPago = async () => {
    if (cart.length === 0) {
      notify('El carrito está vacío. Agrega productos antes de pagar.', 'error');
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/Mercado_Pago/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart.map(item => ({
          id: item.productoId, // Cambiado de item.id a item.productoId
          title: item.title,
          description: item.description,
          image: item.image,
          price: getSafePrice(item),
          quantity: getSafeQuantity(item)
        })))
      });
      
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      
      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        notify('No se pudo obtener el enlace de pago.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Error de conexión al procesar el pago.', 'error');
    }
  };

  // Manejador para disminuir cantidad
  const handleDecreaseQuantity = (item) => {
    updateQuantity(item.id, Math.max(1, getSafeQuantity(item) - 1));
  };

  // Manejador para aumentar cantidad
  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.id, getSafeQuantity(item) + 1);
  };

  // Manejador para eliminar producto
  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart">
      <h3 className='cart-title'>Carrito de Compras</h3>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map((item) => {
          const safePrice = getSafePrice(item);
          const safeQuantity = getSafeQuantity(item);
          
          return (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>${safePrice.toFixed(2)}</p>
              </div>
              <div className="buttons-cart">
                <button onClick={() => handleDecreaseQuantity(item)}>
                  -
                </button>
                <span>{safeQuantity}</span>
                <button onClick={() => handleIncreaseQuantity(item)}>
                  +
                </button>
              </div>
              <button 
                className="delete-button" 
                onClick={() => handleRemoveItem(item)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          );
        })
      )}
      {cart.length > 0 && (
        <>
          <div className="cart-total">
            <p>Total: ${total.toFixed(2)}</p>
            <button className="pay-button" onClick={handlePayOptions}>
              <FontAwesomeIcon icon={faMoneyBillTransfer} /> Pagar
            </button>
          </div>
          {showPaymentOptions && (
            <div className="payment-options">
              <h5>Información de contacto</h5>
              <input 
                type="text" 
                name="name" 
                placeholder="Nombre" 
                value={formData.name} 
                onChange={handleInputChange} 
                required
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Teléfono" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required
              />
              <button className="payment-button whatsapp" onClick={handleWhatsAppPay}>
                <FontAwesomeIcon icon={faWhatsapp} /> Efectivo
              </button>
              <button className="payment-button mercadopago" onClick={handleMercadoPago}>
                <FontAwesomeIcon icon={faCreditCard} /> Pagar con MercadoPago
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;