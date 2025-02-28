import React, { useEffect, useState } from 'react';
import './css/PlanCard.css';
import PlanCard from './PlanCard';
import { getProductos } from '../utils/ProductoAPI'; // Importa la función para obtener productos
import Cookies from 'js-cookie';

const PlanCardList = ({ addToCart }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el token desde las cookies
  const token = Cookies.get('jwt');

  // Obtener los productos al cargar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos(token);
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [token]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container planes">
      <h2 className="title-pricing">Nuestros Planes</h2>
      <div className="plans-container">
        {productos.map((producto) => (
          <PlanCard
            key={producto._id}
            title={producto.title}
            price={producto.price}
            description={producto.description}
            features={producto.features}
            addToCart={addToCart}
            plan={producto} // Pasa el producto como prop
          />
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;