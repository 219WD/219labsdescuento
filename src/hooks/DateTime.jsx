import React, { useState, useEffect } from "react";

const DateTime = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Actualiza cada segundo

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString("es-ES", options);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="header-time">
            {formatTime(currentDate)} {formatDate(currentDate)}
        </div>
    );
};

export default DateTime;
