import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import './css/Configuracion.css';
import NavDashboard from "./NavDashboard";

const Configuracion = () => {
    const { isDarkMode, toggleDarkMode, changeMainColor } = useTheme();
    const [color, setColor] = useState("#d32f2f"); // Color inicial del dashboard

    const handleColorChange = (event) => {
        setColor(event.target.value);
        changeMainColor(event.target.value);
    };

    return (
        <div className="congifuracion">
            <NavDashboard />
            <div className="config-panel">
                <h3>Configuración del Dashboard</h3>

                {/* Modo Oscuro/Claro */}
                <div className="toggle-theme">
                    <label>Modo Oscuro</label>
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                </div>

                {/* Cambiar color principal */}
                <div className="color-picker">
                    <label>Seleccionar color:</label>
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Configuracion;
