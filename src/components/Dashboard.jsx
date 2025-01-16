import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./dashboard.css";
import NavDashboard from "./NavDashboard";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
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
                        <h3>1,356</h3>
                        <p>Clientes en el Día</p>
                        <p className="positive">+6.8%</p>
                    </div>
                    <div className="stat">
                        <h3>250</h3>
                        <p>Carritos Cancelados</p>
                        <p className="negative">+15%</p>
                    </div>
                    <div className="stat">
                        <h3>800</h3>
                        <p>Ventas</p>
                        <p className="negative">+5.3%</p>
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
                                <th>Descuento</th>
                                <th>Forma de Pago</th>
                                <th>Contactado</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tienda Basica</td>
                                <td>Descuento 20%</td>
                                <td>Transferencia</td>
                                <td>No</td>
                                <td>
                                    <span className="status shipped">Pendiente</span>
                                </td>
                            </tr>
                            {/* Additional Rows */}
                        </tbody>
                    </table>
                </section>
            </div>

            {/* Right Sidebar */}
            <aside className="right-sidebar">
                <h3>Lista de pedidos</h3>
                <div className="items">
                    <div className="item">
                        <img src="https://placehold.co/30x30" alt="LCD TV Flat 30" />
                        <div className="info">
                            <p>Tienda Pro</p>
                            <ul>
                                <li>Paga con efectivo</li>
                                <li>Descuento: 20%</li>
                                <li>Contactado: Si</li>
                            </ul>
                            <button className="ready-btn">Listo</button>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://placehold.co/30x30" alt="Blith Speaker" />
                        <div className="info">
                            <p>Tienda Premium</p>
                            <ul>
                                <li>Paga con tarjeta</li>
                                <li>Sin descuento</li>
                                <li>Contactado: Si</li>
                            </ul>
                            <button className="ready-btn">Listo</button>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <h3>Pedido Listo</h3>
                    <div className="item">
                        <img src="https://placehold.co/30x30" alt="LCD TV Flat 30" />
                        <div className="info">
                            <p>Tienda Pro</p>
                            <ul>
                                <li>Paga con efectivo</li>
                                <li>Descuento: 20%</li>
                                <li>Contactado: Si</li>
                            </ul>
                            <button className="ready-btn">Despachar</button>
                        </div>
                    </div>
                </div>
                <button>Ver todos los pedidos</button>
            </aside>

        </div>
    );
}

export default Dashboard;
