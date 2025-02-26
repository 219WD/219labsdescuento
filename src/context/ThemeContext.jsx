import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const ThemeContext = createContext();

// Proveedor de contexto
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false); // Modo claro/oscuro
    const [mainColor, setMainColor] = useState("#d32f2f"); // Color principal (rojo por defecto)

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);
    const changeMainColor = (color) => setMainColor(color);

    return (
        <ThemeContext.Provider value={{ isDarkMode, mainColor, toggleDarkMode, changeMainColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook para consumir el contexto
export const useTheme = () => useContext(ThemeContext);
