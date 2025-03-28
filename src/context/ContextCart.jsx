// ContextCart.js - Versión corregida
import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import Cookies from "js-cookie";
import {
  addProductoToCarrito,
  getCarritoByUsuario,
  updateProductoInCarrito,
  deleteProductoFromCarrito,
  clearCarrito,
} from "../utils/CarritoAPI";
import useNotify from "../hooks/useToast";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const notify = useNotify();

  const token = useMemo(() => Cookies.get("jwt"), []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUsuarioId(decoded?.id || null);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setUsuarioId(null);
      }
    }
  }, [token]);

  useEffect(() => {
    if (usuarioId && token) {
      fetchCarrito(usuarioId);
    }
  }, [usuarioId, token]);

  const normalizeProduct = (item) => {
    if (!item) return null;
    
    // El producto puede venir en item.productoId (cuando es respuesta del backend) o directamente (cuando lo agregamos)
    const producto = item.productoId || item;
    
    return {
      id: item._id || `temp-${Math.random().toString(36).substr(2, 9)}`, // ID del item en el carrito
      productoId: producto._id, // ID del producto
      title: producto.title || "Producto sin nombre",
      price: producto.price || 0,
      quantity: item.cantidad || 1,
      image: producto.image || "default-image.jpg",
      description: producto.description || "",
    };
  };

  const fetchCarrito = async (userId) => {
    if (!userId || !token) return;
    
    setLoading(true);
    try {
      const response = await getCarritoByUsuario(token, userId);
      
      // Manejar diferentes formatos de respuesta
      let items = [];
      if (response?.productos) {
        items = response.productos;
      } else if (Array.isArray(response)) {
        items = response;
      }

      const productosNormalizados = items.map(normalizeProduct).filter(Boolean);
      setCarrito(productosNormalizados);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      notify("Error al cargar el carrito", "error");
      setCarrito([]);
    } finally {
      setLoading(false);
    }
  };

  const agregarProducto = async (producto) => {
    if (!usuarioId || !token) {
      notify("Debes iniciar sesión para agregar productos al carrito", "error");
      return;
    }

    try {
      const existingItem = carrito.find(item => item.productoId === producto._id);
      
      if (existingItem) {
        await actualizarCantidad(existingItem.id, existingItem.quantity + 1);
      } else {
        const response = await addProductoToCarrito(
          token,
          usuarioId,
          producto._id,
          1
        );
        
        const nuevoItem = normalizeProduct(response);
        if (nuevoItem) {
          setCarrito(prev => [...prev, nuevoItem]);
        }
      }
      notify("Producto agregado al carrito", "success");
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      notify("Error al agregar producto al carrito", "error");
    }
  };

  const actualizarCantidad = async (itemId, cantidad) => {
    if (!usuarioId || !token || cantidad < 1) return;

    try {
      const item = carrito.find(item => item.id === itemId);
      if (!item) return;

      const response = await updateProductoInCarrito(
        token,
        usuarioId,
        item.productoId,
        cantidad
      );

      const updatedItem = normalizeProduct(response);
      setCarrito(prev => 
        prev.map(item => item.id === itemId ? updatedItem : item)
      );
    } catch (error) {
      console.error("Error al actualizar cantidad del carrito:", error);
      notify("Error al actualizar la cantidad", "error");
    }
  };

  const eliminarProducto = async (itemId) => {
    if (!usuarioId || !token) return;

    try {
      const item = carrito.find(item => item.id === itemId);
      if (!item) return;

      await deleteProductoFromCarrito(token, usuarioId, item.productoId);
      
      setCarrito(prev => prev.filter(item => item.id !== itemId));
      notify("Producto eliminado del carrito", "success");
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      notify("Error al eliminar el producto", "error");
    }
  };

  const limpiarCarrito = async () => {
    if (!usuarioId || !token) return;

    try {
      await clearCarrito(token, usuarioId);
      setCarrito([]);
      notify("Carrito vaciado", "success");
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
      notify("Error al vaciar el carrito", "error");
    }
  };

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
        cart: carrito, // alias para compatibilidad
        removeFromCart: eliminarProducto,
        updateQuantity: actualizarCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};