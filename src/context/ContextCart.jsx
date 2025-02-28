import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import {
    addProductoToCarrito,
    getCarritoByUsuario,
    updateProductoInCarrito,
    deleteProductoFromCarrito,
    clearCarrito,
} from '../utils/CarritoAPI';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    // Obtener el token y el usuarioId desde las cookies
    const token = Cookies.get('jwt');
    const usuarioId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

    // Cargar el carrito al iniciar la aplicación
    useEffect(() => {
        if (usuarioId) {
            fetchCarrito(usuarioId);
        }
    }, [usuarioId]);

    // Función para obtener el carrito del usuario
    const fetchCarrito = async (usuarioId) => {
        setLoading(true);
        try {
            const response = await getCarritoByUsuario(token, usuarioId);
    
            // Extrae la lista de productos del objeto devuelto por el backend
            const productos = response.productos || [];
    
            // Actualiza el estado carrito con la lista de productos
            setCarrito(productos);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            setCarrito([]); // En caso de error, establece un array vacío
        } finally {
            setLoading(false);
        }
    };

    // Función para agregar un producto al carrito
    const agregarProducto = async (producto) => {
        if (!usuarioId) {
          console.error("Usuario no autenticado");
          return;
        }
      
        // Asegúrate de que carrito sea un array
        if (!Array.isArray(carrito)) {
          console.error("Carrito no es un array:", carrito);
          setCarrito([]); // Restablece carrito a un array vacío
          return;
        }
      
        // Busca si el producto ya está en el carrito
        const existingItem = carrito.find((item) => item.id === producto.id);
      
        if (existingItem) {
          // Si el producto ya está en el carrito, actualiza la cantidad
          await actualizarCantidad(producto.id, existingItem.quantity + 1);
        } else {
          try {
            // Si el producto no está en el carrito, agrégalo
            const response = await addProductoToCarrito(token, usuarioId, producto.id, 1);
      
            // Extrae la lista de productos del objeto devuelto por el backend
            const productos = response.productos || [];
      
            // Actualiza el estado carrito con la lista de productos
            setCarrito(productos);
          } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
          }
        }
      };

    // Función para actualizar la cantidad de un producto en el carrito
    const actualizarCantidad = async (productoId, cantidad) => {
        if (!usuarioId) {
          console.error("Usuario no autenticado");
          return;
        }
      
        try {
          const response = await updateProductoInCarrito(token, usuarioId, productoId, cantidad);
      
          // Verifica si la respuesta es válida
          if (!response || !response.productos) {
            throw new Error("Respuesta inválida del servidor");
          }
      
          // Extrae la lista de productos del objeto devuelto por el backend
          const productos = response.productos;
      
          // Actualiza el estado carrito con la lista de productos
          setCarrito(productos);
        } catch (error) {
          console.error("Error al actualizar cantidad del carrito:", error);
        }
      };

    // Función para eliminar un producto del carrito
    const eliminarProducto = async (productoId) => {
        if (!usuarioId) {
            console.error("Usuario no autenticado");
            return;
        }

        try {
            const data = await deleteProductoFromCarrito(token, usuarioId, productoId);
            setCarrito(data);
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };

    // Función para limpiar el carrito
    const limpiarCarrito = async () => {
        if (!usuarioId) {
            console.error("Usuario no autenticado");
            return;
        }

        try {
            await clearCarrito(token, usuarioId);
            setCarrito([]);
        } catch (error) {
            console.error("Error al limpiar el carrito:", error);
        }
    };

    // Función para mostrar/ocultar el carrito
    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                loading,
                isCartVisible,
                agregarProducto,
                actualizarCantidad,
                eliminarProducto,
                limpiarCarrito,
                toggleCartVisibility,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => useContext(CarritoContext);