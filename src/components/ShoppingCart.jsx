import React, { useEffect, useState } from 'react';
import './css/ShoppingCart.css';
import useNotify from '../hooks/useToast';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import PaymentOptions from './PaymentOptions';
import PaymentModal from './PaymentModal';

const ShoppingCart = ({ cart, setCart, removeFromCart, updateQuantity }) => {
  const notify = useNotify();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  // Calcular el total del carrito
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Guardar carrito en localStorage cuando se actualiza
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handlePayOptions = () => {
    if (cart.length === 0) {
      notify('El carrito está vacío. Agrega productos antes de pagar.', 'error');
      return;
    }
    setShowPaymentOptions(true);
  };

  const openModal = (info) => {
    setModalInfo(info);
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  return (
    <div className="cart">
      <h3 className="cart-title">Carrito de Compras</h3>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      <CartTotal total={total} onPayClick={handlePayOptions} />
      {showPaymentOptions && (
        <PaymentOptions
          cart={cart}
          setCart={setCart}
          total={total}
          closeOptions={() => setShowPaymentOptions(false)}
          openModal={openModal}
        />
      )}
      {modalInfo && (
        <PaymentModal modalInfo={modalInfo} closeModal={closeModal} notify={notify} />
      )}
    </div>
  );
};

export default ShoppingCart;
