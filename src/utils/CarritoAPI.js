import { API_URL } from '../../Initials/ApiUrl';

const CARRITO = '/carrito'; // Base URL para las rutas del carrito

// Helper function to perform fetch requests
const fetchRequest = async (url, jwt, options = {}) => {
    if (!jwt) throw new Error("JWT no proporcionado");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwt);

    if (options.body) {
        myHeaders.append("Content-Type", "application/json");
    }

    const requestOptions = {
        headers: myHeaders,
        redirect: "follow",
        ...options,
    };

    try {
        const response = await fetch(url, requestOptions);

        if (response.status >= 400) {
            alert(`Error: ${response.statusText}`);
            return null;
        }

        const result = await response.json();
        return result.data || result; 
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

// Agregar un producto al carrito
export const addProductoToCarrito = async (jwt, usuarioId, productoId, cantidad) => {
    const body = JSON.stringify({ usuarioId, productoId, cantidad });
    return await fetchRequest(`${API_URL}${CARRITO}/agregar`, jwt, { method: "POST", body });
};

// Obtener el carrito de un usuario
export const getCarritoByUsuario = async (jwt, usuarioId) => {
    return await fetchRequest(`${API_URL}${CARRITO}/${usuarioId}`, jwt);
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductoInCarrito = async (jwt, usuarioId, productoId, cantidad) => {
    const body = JSON.stringify({ cantidad });
    return await fetchRequest(`${API_URL}${CARRITO}/actualizar/${usuarioId}/${productoId}`, jwt, { method: "PUT", body });
};

// Eliminar un producto del carrito
export const deleteProductoFromCarrito = async (jwt, usuarioId, productoId) => {
    return await fetchRequest(`${API_URL}${CARRITO}/eliminar/${usuarioId}/${productoId}`, jwt, { method: "DELETE" });
};

// Limpiar el carrito de un usuario
export const clearCarrito = async (jwt, usuarioId) => {
    return await fetchRequest(`${API_URL}${CARRITO}/limpiar/${usuarioId}`, jwt, { method: "DELETE" });
};
