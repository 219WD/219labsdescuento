import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "./css/productos.css";
import NavDashboard from "./NavDashboard";
import Cloudinary from "./Cloudinary";
import useNotify from '../hooks/useToast';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        price: "",
        description: "",
        features: "",
        image: "",
    });
    const totalProductos = productos.length;
    const productosActivos = productos.filter((producto) => producto.estado === "activo").length;
    const productosInactivos = totalProductos - productosActivos;
    const notify = useNotify();

    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [imageReset, setImageReset] = useState(false);
    const API_URL = "http://localhost:4000/productos";

    const fetchProductos = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/verProductos`);
            if (!response.ok) throw new Error("Error al obtener productos");
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al obtener productos");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editing
            ? `${API_URL}/actualizar/${editingId}`
            : `${API_URL}/crear`;

        const method = editing ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) throw new Error("Error al guardar producto");
            await fetchProductos();
            setFormValues({ title: "", price: "", description: "", features: "", image: "" });
            setEditing(false);
            setImageReset(true); // Triggerear el reinicio del Cloudinary
            setTimeout(() => setImageReset(false), 100); // Reset tempora
            notify(editing ? "Producto actualizado" : "Producto creado", 'success'); 
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al guardar producto");
            notify('Error al guardar el producto', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            const response = await fetch(`${API_URL}/eliminar/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar producto");
            await fetchProductos();
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al eliminar producto");
        }
    };

    const handleToggleEstado = async (id, currentStatus) => {
        const newStatus = currentStatus === "activo" ? "inactivo" : "activo";
        try {
            const response = await fetch(`${API_URL}/actualizarEstado/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: newStatus }),
            });

            if (!response.ok) throw new Error("Error al cambiar estado del producto");
            await fetchProductos();
            notify('Estado actualizado', 'success');
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al cambiar estado");
            notify('Error al actualizar el estado', 'error');
        }
    };

    const handleEdit = (producto) => {
        setFormValues(producto);
        setEditing(true);
        setEditingId(producto._id);
    };

    const handleUploadComplete = (url) => {
        setFormValues({ ...formValues, image: url }); // Actualizamos la URL de la imagen en el estado
    };

    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);

    return (
        <div className="dashboard">
            <NavDashboard />
            <div className="main-content">
                <header className="header">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar productos" />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="header-time">18:10 PM Miercoles, 15 Ene 2025</div>
                </header>
                <h3 className="productos-title">Gestión de Productos</h3>

                <section className="stats">
                    <div className="stat">
                        <h3>{totalProductos}</h3>
                        <p>Total de Productos</p>
                    </div>
                    <div className="stat">
                        <h3>{productosActivos}</h3>
                        <p>Productos Activos</p>
                    </div>
                    <div className="stat">
                        <h3>{productosInactivos}</h3>
                        <p>Productos Inactivos</p>
                    </div>
                </section>

                <h5>Agregar Producto</h5>
                <form onSubmit={handleSubmit} className="productos-form">
                    <input
                        type="text"
                        placeholder="Título"
                        className="form-control"
                        value={formValues.title}
                        onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        className="form-control"
                        value={formValues.price}
                        onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Descripción"
                        className="form-control"
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Características"
                        className="form-control"
                        value={formValues.features}
                        onChange={(e) => setFormValues({ ...formValues, features: e.target.value })}
                    />
                    <Cloudinary onUploadComplete={handleUploadComplete}  reset={imageReset} />
                    <button type="submit" className="btn btn-submit">
                        {editing ? "Actualizar" : "Crear"} Producto
                    </button>
                </form>


                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="orders-table">
                    <h3>Productos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Características</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto._id}>
                                    <td>{producto.title}</td>
                                    <td>{producto.price}</td>
                                    <td>{producto.description}</td>
                                    <td>{producto.features}</td>
                                    <td>
                                        <img src={producto.image} alt={producto.title} className="product-image" />
                                    </td>
                                    <td className="buttons">
                                        <button onClick={() => handleEdit(producto)} className="btn btn-edit">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDelete(producto._id)} className="btn btn-delete">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button
                                            onClick={() => handleToggleEstado(producto._id, producto.estado)}
                                            className={`btn btn-toggle ${producto.estado === "activo" ? "activo" : "inactivo"}`}
                                        >
                                            <FontAwesomeIcon icon={faPowerOff} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Productos;
