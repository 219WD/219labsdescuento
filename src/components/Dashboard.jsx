import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/dashboard.css";
import NavDashboard from "./NavDashboard";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    const [carritos, setCarritos] = useState([]);
    const [visitas, setVisitas] = useState(0);

    // URL base del backend
    const API_URL = 'http://localhost:4000/carrito';

    // Obtener los datos desde el backend
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

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        verPedidos();
    }, [verPedidos]);

    // Cambiar estado del carrito en el backend
    const cambiarEstado = async (carritoId, nuevoEstado) => {
        try {
            const response = await fetch(`${API_URL}/estado/${carritoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            if (!response.ok) {
                throw new Error("Error al cambiar el estado del carrito");
            }

            // Actualizar estado localmente en la UI
            setCarritos((prevCarritos) =>
                prevCarritos.map((carrito) =>
                    carrito._id === carritoId
                        ? { ...carrito, estado: nuevoEstado }
                        : carrito
                )
            );
        } catch (error) {
            console.error("Error al cambiar el estado del carrito:", error);
        }
    };

    // Manejar botón "Listo"
    const marcarContactado = (carritoId) => cambiarEstado(carritoId, "contactado");

    // Manejar botón "Despachar"
    const despacharPedido = (carritoId) => cambiarEstado(carritoId, "cerrado");

    useEffect(() => {
        const fetchVisitas = async () => {
            try {
                const response = await fetch("http://localhost:4000/visitas"); // Ajusta según tu API
                const data = await response.json();
                setVisitas(data.totalVisits);
            } catch (error) {
                console.error("Error obteniendo visitas:", error);
            }
        };

        fetchVisitas();
    }, []);

    return (
        <div className="dashboard">
            <NavDashboard />
            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="Search orders" />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="header-time">18:10 PM Miercoles, 15 Ene 2025</div>
                </header>

                {/* Stats */}
                <section className="stats">
                    <div className="stat">
                        <h3>{visitas}</h3>
                        <p>Visitas al sitio</p>
                    </div>
                    <div className="stat">
                    <h3>{carritos.filter(carrito => carrito.estado === "pendiente").length}</h3>
                    <p>Carritos Pendientes</p>
                    </div>
                    <div className="stat">
                    <h3>{carritos.filter(carrito => carrito.estado === "cerrado").length}</h3>
                    <p>Ventas</p>
                    </div>
                    <div className="help">
                        <h3>GRAFICOS</h3>
                        <p>Para una analitica mas detallada, ver los graficos de estadistica.</p>
                        <button>VER GRAFICOS</button>
                    </div>
                </section>

                {/* Orders Table */}
                <section className="orders-table">
                    <h3>Pedidos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Forma de Pago</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carritos.map((carrito) => (
                                <tr key={carrito._id}>
                                    <td>
                                        {carrito.productos && carrito.productos.length > 0
                                            ? carrito.productos.map((prod) => prod.productoId?.title).join(' ')
                                            : 'Sin productos'}
                                    </td>
                                    <td>
                                        {carrito.productos && carrito.productos.length > 0
                                            ? carrito.productos
                                                .map((prod) => prod.productoId?.price) // Valida si price existe o coloca '0'
                                                .join(' ')
                                            : 'Sin productos'}
                                    </td>
                                    <td>Descuento 20%</td>
                                    <td>{carrito.formaDePago}</td>
                                    <td>{new Date(carrito.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className="status shipped">{carrito.estado}</span>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </section>
            </div>

            {/* Right Sidebar */}
            <aside className="right-sidebar">
                <h3>Lista de pedidos</h3>
                <div className="items">
                    <h3>Pendientes</h3>
                    {carritos
                        .filter((carrito) => carrito.estado === "pendiente")
                        .map((carrito) => (
                            <div key={carrito._id} className="item">
                                <img
                                    src={
                                        carrito.productos && carrito.productos.length > 0
                                            ? carrito.productos.map((prod) => prod.productoId?.image).join(' ')
                                            : 'Sin productos'}
                                    alt="Producto"
                                />
                                <div className="info">
                                    <p>
                                        {carrito.productos && carrito.productos.length > 0
                                            ? carrito.productos.map((prod) => prod.productoId?.title).join(' ')
                                            : 'Sin Producto'}</p>
                                    <ul>
                                        <li>Forma de pago: {carrito.formaDePago}</li>
                                        <li>Descuento: 20%</li>
                                        <li>Estado: {carrito.estado}</li>
                                    </ul>
                                    <button
                                        className="ready-btn"
                                        onClick={() => marcarContactado(carrito._id)}
                                    >
                                        Listo
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="details">
                    <h3>Contactados</h3>
                    {carritos
                        .filter((carrito) => carrito.estado === "contactado")
                        .map((carrito) => (
                            <div key={carrito._id} className="item">
                                <img
                                    src={
                                        carrito.productos && carrito.productos.length > 0
                                            ? carrito.productos.map((prod) => prod.productoId?.image).join(' ')
                                            : 'Sin productos'}
                                    alt="Producto"
                                />
                                <div className="info">
                                    <p>
                                        {carrito.productos?.map((prod) => prod.productoId?.title).join(", ") || "Sin productos"}
                                    </p>
                                    <ul>
                                        <li>Forma de pago: {carrito.formaDePago}</li>
                                        <li>Descuento: 20%</li>
                                        <li>Estado: {carrito.estado}</li>
                                    </ul>
                                    <button
                                        className="ready-btn"
                                        onClick={() => despacharPedido(carrito._id)}
                                    >
                                        Despachar
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <button>Ver todos los pedidos</button>
            </aside>
        </div>
    );
}

export default Dashboard;
