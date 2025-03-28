import React from 'react';
import Hero from '../components/Hero';
import Descuento from '../components/Descuento';
import TripleSection from '../components/TripleSection';
import IconsSection from '../components/IconSection';
import NavBar from '../components/NavBar';
import ShoppingCart from '../components/ShoppingCart';
import PlanCardList from '../components/PlanCardList';
import Footer from '../components/Footer';
import { useCarrito } from '../context/ContextCart';

const HomeScreen = () => {
  const {
    carrito,
    isCartVisible,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    toggleCartVisibility,
    loading
  } = useCarrito();

  const cartCount = Array.isArray(carrito) ? carrito.reduce((acc, item) => acc + (item.quantity || 0), 0) : 0;

  return (
    <div className='container'>
      <NavBar
        cartCount={cartCount}
        toggleCartVisibility={toggleCartVisibility}
      />
      <Hero addToCart={agregarProducto} />
      <Descuento />
      <IconsSection />
      <TripleSection />
      <PlanCardList addToCart={agregarProducto} />
      <Footer />
      
      {/* Mover el ShoppingCart fuera del flujo normal para que no afecte el layout */}
      {isCartVisible && (
        <div className="cart-overlay">
          <ShoppingCart
            cart={carrito}
            removeFromCart={eliminarProducto}
            updateQuantity={actualizarCantidad}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;