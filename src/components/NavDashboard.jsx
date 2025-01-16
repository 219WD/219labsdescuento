import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBox,
    faCog,
    faSignOutAlt,
    faUser,
    faChartLine,
    faBoxesPacking,
    faPencil
} from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom';

const NavDashboard = () => {
    return (
        <div className='dashboard'>
            {/* Sidebar */}
            <div className="sidebar">
                <div className="profile-picture">
                    <img src={logo} alt="User profile" />
                </div>
                <nav className="menu">
                    <Link to={'/dashboard'} className="menu-item">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to={'/pedidos'} className="menu-item">
                        <FontAwesomeIcon icon={faBox} />
                        <span>Pedidos</span>
                    </Link>
                    <Link to={'/clientes'} className="menu-item">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Clientes</span>
                    </Link>
                    <Link to={'/productos'} className="menu-item">
                        <FontAwesomeIcon icon={faBoxesPacking} />
                        <span>Productos</span>
                    </Link>
                    <Link to={'/editar-pagina'} className="menu-item">
                        <FontAwesomeIcon icon={faPencil} />
                        <span>Editar Página</span>
                    </Link>
                    <Link to={'/analiticas'} className="menu-item">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>Analíticas</span>
                    </Link>
                    <Link to={'/configuracion'} className="menu-item">
                        <FontAwesomeIcon icon={faCog} />
                        <span>Configuración</span>
                    </Link>
                    <Link to={'/cerrar-sesion'} className="menu-item">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Cerrar Sesión</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default NavDashboard;
