import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Clientes.css';
import NavDashboard from './NavDashboard';

const Clientes = () => {
    const [emails, setEmails] = useState([]);

    // URL base del backend
    const API_URL = 'http://localhost:4000/descuento';

    // Obtener los datos desde el backend
    const fetchEmails = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/emails`);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setEmails(data);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
    }, []);

    // Editar cliente
    const handleEdit = async (id) => {
        const emailToEdit = emails.find((email) => email._id === id);
        if (!emailToEdit) {
            console.error('El email a editar no fue encontrado');
            return;
        }

        const newEmail = prompt('Editar email:', emailToEdit.email);
        if (newEmail && newEmail.trim() !== '') {
            try {
                const response = await fetch(`${API_URL}/actualizar-email/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: newEmail.trim() }),
                });
                if (!response.ok) throw new Error('Error al actualizar el cliente');
                await fetchEmails(); // Actualizar la lista
                alert('Email actualizado con éxito');
            } catch (error) {
                console.error('Error al actualizar cliente:', error);
            }
        } else {
            alert('El email no puede estar vacío');
        }
    };

    // Eliminar cliente
    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
            try {
                const response = await fetch(`${API_URL}/eliminar-email/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Error al eliminar el cliente');
                await fetchEmails(); // Actualizar la lista
                alert('Cliente eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar cliente:', error);
            }
        }
    };

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        fetchEmails();
    }, [fetchEmails]);

    // Estadísticas
    const totalEmails = emails.length;
    const notRegistered = emails.filter((email) => !email.registered).length;

    return (
        <div className="dashboard">
            <NavDashboard />
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar clientes" />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="header-time">18:10 PM Miercoles, 15 Ene 2025</div>
                </header>

                {/* Stats */}
                <section className="stats">
                    <div className="stat">
                        <h3>{totalEmails}</h3>
                        <p>Total de Clientes</p>
                    </div>
                    <div className="stat">
                        <h3>{notRegistered}</h3>
                        <p>No Registrados</p>
                    </div>
                    <div className="help">
                        <h3>GRAFICOS</h3>
                        <p>Para una analítica más detallada, ver los gráficos de estadística.</p>
                        <button>VER GRAFICOS</button>
                    </div>
                </section>

                {/* Emails Table */}
                <section className="emails-table">
                    <h3>Clientes</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Suscripción</th>
                                <th>Fecha de Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails.map((email) => (
                                <tr key={email._id}>
                                    <td>{email.email}</td>
                                    <td>{email.registered ? 'Sí' : 'No'}</td>
                                    <td>{new Date(email.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(email._id)}>
                                            Editar
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(email._id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Clientes;
