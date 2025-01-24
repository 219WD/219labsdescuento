import React, { createContext, useState, useContext } from 'react';
import {
    addProductoToCarrito,
    getCarritoByUsuario,
    updateProductoInCarrito,
    deleteProductoFromCarrito,
    clearCarrito,
} from '../utils/CarritoAPI'; // Tu archivo con los endpoints

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(false);

    const jwt = localStorage.getItem('jwt'); // Obtener JWT desde el almacenamiento local (ajusta según tu flujo)

    // Cargar carrito al iniciar sesión
    const fetchCarrito = async (usuarioId) => {
        setLoading(true);
        try {
            const data = await getCarritoByUsuario(jwt, usuarioId);
            setCarrito(data);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        } finally {
            setLoading(false);
        }
    };

    // Agregar producto al carrito
    const agregarProducto = async (usuarioId, productoId, cantidad) => {
        try {
            const data = await addProductoToCarrito(jwt, usuarioId, productoId, cantidad);
            setCarrito(data); // Actualiza el carrito después de agregar
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    };

    // Actualizar cantidad
    const actualizarCantidad = async (usuarioId, productoId, cantidad) => {
        try {
            const data = await updateProductoInCarrito(jwt, usuarioId, productoId, cantidad);
            setCarrito(data); // Actualiza el carrito después de modificar
        } catch (error) {
            console.error("Error al actualizar cantidad del carrito:", error);
        }
    };

    // Eliminar producto
    const eliminarProducto = async (usuarioId, productoId) => {
        try {
            const data = await deleteProductoFromCarrito(jwt, usuarioId, productoId);
            setCarrito(data); // Actualiza el carrito después de eliminar
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };

    // Limpiar carrito
    const limpiarCarrito = async (usuarioId) => {
        try {
            const data = await clearCarrito(jwt, usuarioId);
            setCarrito([]);
        } catch (error) {
            console.error("Error al limpiar el carrito:", error);
        }
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                loading,
                fetchCarrito,
                agregarProducto,
                actualizarCantidad,
                eliminarProducto,
                limpiarCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => useContext(CarritoContext);
