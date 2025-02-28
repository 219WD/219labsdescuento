import { API_URL } from '/Initials/ApiUrl';

const PRODUCTO = '/productos'; // Base URL para las rutas de productos

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

// Obtener todos los productos
export const getProductos = async (jwt) => {
    return await fetchRequest(`${API_URL}${PRODUCTO}/verProductos`, jwt);
};