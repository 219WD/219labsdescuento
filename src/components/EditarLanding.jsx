import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import NavDashboard from "./NavDashboard";
import useNotify from "../hooks/useToast";
import Cloudinary from "./Cloudinary";

const LandingEditor = () => {
    const [landingData, setLandingData] = useState({
        title: "",
        description: "",
        oldPrice: "",
        newPrice: "",
        image: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [imageReset, setImageReset] = useState(false);
    const notify = useNotify();
    const API_URL = "http://localhost:4000/landing";

    const fetchLandingData = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/getLanding`);
            if (!response.ok) throw new Error("Error al obtener la landing");
            const data = await response.json();
            setLandingData(data);
        } catch (error) {
            console.error(error);
            setMessage("Error al cargar la información");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLandingData();
    }, [fetchLandingData]);

    const handleChange = (e) => {
        setLandingData({ ...landingData, [e.target.name]: e.target.value });
    };

    const handleUploadComplete = (imageUrl) => {
        setLandingData((prevData) => ({
            ...prevData,
            image: imageUrl,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/editLanding`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(landingData),
            });

            if (!response.ok) throw new Error("Error al actualizar");
            setImageReset(true);
            setMessage("Landing actualizada correctamente");
            notify("Landing actualizada", "success");
        } catch (error) {
            console.error(error);
            setMessage("Hubo un error al actualizar.");
            notify("Error al actualizar", "error");
        }
    };

    if (loading) return <p className="loading">Cargando...</p>;

    return (
        <div className="dashboard">
            <NavDashboard />
            <div className="main-content">
                <header className="header">
                    <h3>Editar Encabezado</h3>
                </header>
                {message && <p className="help-message">{message}</p>}
                <form className="productos-form" onSubmit={handleSubmit}>
                    <label>Título</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        className="form-control"
                        value={landingData.title}
                        onChange={handleChange}
                        required
                    />
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        className="form-control"
                        value={landingData.description}
                        onChange={handleChange}
                        required
                    />
                    <label>Precio Antes</label>
                    <input
                        type="number"
                        name="oldPrice"
                        placeholder="Precio viejo"
                        className="form-control"
                        value={landingData.oldPrice}
                        onChange={handleChange}
                        required
                    />
                    <label>Precio Ahora</label>
                    <input
                        type="number"
                        name="newPrice"
                        placeholder="Precio nuevo"
                        className="form-control"
                        value={landingData.newPrice}
                        onChange={handleChange}
                        required
                    />

                    <Cloudinary onUploadComplete={handleUploadComplete} reset={imageReset} />
                    <button type="submit" className="btn btn-submit">
                        <FontAwesomeIcon icon={faSave} />  Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LandingEditor;
