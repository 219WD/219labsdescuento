import React, { useCallback, useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PieController,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import "./css/Clientes.css";
import NavDashboard from "./NavDashboard";
import DateTime from "../hooks/DateTime";

// Registrar los elementos necesarios para Chart.js
ChartJS.register(
    LineElement,
    BarElement,
    PieController,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Analiticas = () => {
    const [emails, setEmails] = useState([]);

    // URL base del backend
    const API_URL_EMAIL = 'http://localhost:4000/descuento';

    // Obtener los datos desde el backend
    const fetchEmails = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL_EMAIL}/emails`);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setEmails(data);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
    }, []);

    // Calcular cantidad de suscritos y no suscritos
    const suscritos = emails.filter(email => email.suscripcion).length;
    const noSuscritos = emails.length - suscritos;

    const [carritos, setCarritos] = useState([]);
    const API_URL = 'http://localhost:4000/carrito';

    const verPedidos = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/verCarritos`);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setCarritos(data);
        } catch (error) {
            console.error('Error al obtener carritos:', error);
        }
    }, []);

    useEffect(() => {
        verPedidos();
    }, [verPedidos]);

    // Filtrar solo carritos cerrados para las ventas por mes
    const ventasPorMes = carritos
        .filter(carrito => carrito.estado === "cerrado") // Filtrar carritos cerrados
        .reduce((acc, carrito) => {
            const mes = new Date(carrito.updatedAt).getMonth(); // Usar la fecha de actualización
            acc[mes] = (acc[mes] || 0) + 1;
            return acc;
        }, {});

    const labelsMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    useEffect(() => {
        fetchEmails();
    }, [fetchEmails]);

    const ventasData = {
        labels: labelsMeses,
        datasets: [
            {
                label: "Ventas",
                data: labelsMeses.map((_, i) => ventasPorMes[i] || 0), // Mapeo para asegurar que todos los meses estén cubiertos
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                pointRadius: 5,
            },
        ],
    };

    // Comparativa entre carritos cerrados y pendientes
    const suscritosData = {
        labels: ["Carritos Cerrados", "Carritos Pendientes"],
        datasets: [
            {
                label: "Estado de Carritos",
                data: [
                    carritos.filter(carrito => carrito.estado === "cerrado").length,
                    carritos.filter(carrito => carrito.estado === "pendiente").length,
                ],
                backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"],
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const noSuscritosData = {
        labels: ["Suscritos", "No Suscritos"],
        datasets: [
            {
                label: "Estado de Suscripción",
                data: [suscritos, noSuscritos],
                backgroundColor: ["#4CAF50", "#FF6384"],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Meses",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Cantidad",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="dashboard">
            <NavDashboard />
            <div className="main-content">
                <header className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar clientes" />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    <DateTime />
                </header>

                <section className="stats">
                    <div className="stat">
                        <h3>{suscritos}</h3>
                        <p>Usuarios suscritos</p>
                    </div>
                    <div className="stat">
                        <h3>{carritos.filter(carrito => carrito.estado === "pendiente").length}</h3>
                        <p>Carritos pendientes</p>
                    </div>
                    <div className="stat">
                        <h3>{carritos.filter(carrito => carrito.estado === "cerrado").length}</h3>
                        <p>Ventas</p>
                    </div>
                </section>

                <section className="analiticas">
                    <h3>Analíticas</h3>

                    <div className="chart-large">
                        <h5>Ventas</h5>
                        <Line data={ventasData} options={options} />
                    </div>

                    <div className="chart-small-container">
                        <div className="chart-small">
                            <h5>Suscripciones</h5>
                            <Pie data={noSuscritosData} />
                        </div>
                        <div className="chart-small extra">
                            <h5>Carritos</h5>
                            <Bar data={suscritosData} options={options} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Analiticas;
