import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBox,
    faCog,
    faSignOutAlt,
    faUser,
    faChartLine,
    faBoxesPacking,
    faPencil,
    faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
import "./css/dashboard.css";
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NavDashboard = () => {
  const { clearToken } = useContext(AuthContext);

  const handleLogout = () => {
    clearToken();
    window.location.href = '/'; // Redirigir al home después de cerrar sesión
  };

    return (
        <div className='dashboard'>
            {/* Sidebar */}
            <div className="sidebar">
                <div className="profile-picture">
                    <img src={logo} alt="User profile" />
                </div>
                <nav className="menu">
                    <Link to={'/'} className="menu-item">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Homescreen</span>
                    </Link>
                    <Link to={'/dashboard'} className="menu-item">
                        <FontAwesomeIcon icon={faTachometerAlt} />
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
                    <Link to={'/editarLanding'} className="menu-item">
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
                    <Link to={'/cerrar-sesion'} className="menu-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Cerrar Sesión</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default NavDashboard;
