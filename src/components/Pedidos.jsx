import React, { useEffect, useState, useCallback, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import {
    verCarritos,
    deleteProductoFromCarrito,
    updateEstadoCarrito
} from '../utils/CarritoAPI';
import './css/Pedidos.css';
import NavDashboard from './NavDashboard';
import AuthContext from '../context/AuthContext';
import EstadoCarritoModal from './CarritoModal';
import useNotify from '../hooks/useToast';
import DataTime from '../hooks/DateTime';


const Pedidos = () => {
    const [carritos, setCarritos] = useState([]);
    const [estadoModalOpen, setEstadoModalOpen] = useState(false);
    const [carritoIdEstado, setCarritoIdEstado] = useState(null);
    const { token } = useContext(AuthContext);
    const notify = useNotify();


    const fetchCarritos = useCallback(async () => {
        if (!token) return;
        try {
            const data = await verCarritos(token);
            setCarritos(data || []);
        } catch (error) {
            console.error('Error al obtener los carritos:', error);
        }
    }, [token]);

    const handleDeleteProducto = async (productoId) => {
        if (!token) return;
        if (window.confirm('¿Seguro que deseas eliminar este producto del carrito?')) {
            try {
                await deleteProductoFromCarrito(token, productoId);
                await fetchCarritos();
                alert('Producto eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        }
    };

    const handleOpenEstadoModal = (carritoId) => {
        setCarritoIdEstado(carritoId);
        setEstadoModalOpen(true);
    };

    const handleUpdateEstado = async (carritoId, nuevoEstado) => {
        if (!token || !nuevoEstado) return;
        try {
            await updateEstadoCarrito(token, carritoId, nuevoEstado);
            await fetchCarritos();
            notify('Estado actualizado con éxito', 'success'); 
            setEstadoModalOpen(false);
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            notify('Error al actualizar el estado', 'error');
        }
    };

    useEffect(() => {
        fetchCarritos();
    }, [fetchCarritos]);

    return (
        <div className="dashboard">
            <NavDashboard />
            <div className="main-content">
                <header className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar en carritos" />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    <DataTime />
                </header>

                <section className="orders-table">
                    <h3>Carritos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Productos</th>
                                <th>Forma de Pago</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carritos.map((carrito) => (
                                <tr key={carrito._id}>
                                    <td>{carrito.usuarioId?.name || "Desconocido"}</td>
                                    <td>
                                        {carrito.productos.length > 0
                                            ? carrito.productos.map((prod) => (
                                                <div key={prod.productoId?._id}>
                                                    {prod.productoId?.title} ({prod.cantidad})
                                                </div>
                                            ))
                                            : 'Sin productos'}
                                    </td>
                                    <td>{carrito.formaDePago}</td>
                                    <td>{carrito.estado}</td>
                                    <td>${carrito.total}</td>
                                    <td className="buttons">
                                        <button
                                            onClick={() => handleDeleteProducto(carrito._id)}
                                            className="btn btn-delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenEstadoModal(carrito._id)}
                                            className="btn btn-update"
                                        >
                                            <FontAwesomeIcon icon={faSyncAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal para actualizar el estado del carrito */}
                    <EstadoCarritoModal
                        isOpen={estadoModalOpen}
                        onClose={() => setEstadoModalOpen(false)}
                        carritoId={carritoIdEstado}
                        onUpdateEstado={handleUpdateEstado}
                    />
                </section>
            </div>
        </div>
    );
};

export default Pedidos;
