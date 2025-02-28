import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Descuento from '../components/Descuento';
import TripleSection from '../components/TripleSection';
import IconsSection from '../components/IconSection';
import NavBar from '../components/NavBar';
import ShoppingCart from '../components/ShoppingCart';
import PlanCardList from '../components/PlanCardList'; // Importa PlanCardList
import Footer from '../components/Footer';
import { useCarrito } from '../context/ContextCart'; // Importa el hook useCarrito

const HomeScreen = () => {
  const {
    carrito,
    isCartVisible,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    toggleCartVisibility,
  } = useCarrito(); // Usa el hook useCarrito

  // Verifica que carrito sea un array antes de usar reduce
  const cartCount = Array.isArray(carrito) ? carrito.reduce((acc, item) => acc + (item.quantity || 0), 0) : 0;

  return (
    <div className='container'>
      <NavBar
        cartCount={cartCount}
        toggleCartVisibility={toggleCartVisibility}
      />
      <Hero addToCart={agregarProducto} />
      {isCartVisible && (
        <ShoppingCart
          cart={carrito}
          removeFromCart={eliminarProducto}
          updateQuantity={actualizarCantidad}
        />
      )}
      <Descuento />
      <IconsSection />
      <TripleSection />
      <PlanCardList addToCart={agregarProducto} /> {/* Usa PlanCardList aquí */}
      {isCartVisible && (
        <ShoppingCart
          cart={carrito}
          removeFromCart={eliminarProducto}
          updateQuantity={actualizarCantidad}
        />
      )}
      <Footer />
    </div>
  );
};

export default HomeScreen;