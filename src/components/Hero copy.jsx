import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './css/Hero.css'
import Grad from '../assets/grad.webp'
import mockupUno from '../assets/mockupHero.png'
import triple from '../assets/mockupTriple.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCreditCard,
    faPercent,
    faChartLine,
    faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Hero = ({ addToCart }) => {
    const specialProduct = {
        id: 999,
        image: triple,
        title: 'Tienda Online',
        description: 'Tienda online moderna con tres formas de pago y analíticas.',
        price: 400000,
    };

    const handleAddToCart = () => {
        addToCart(specialProduct);
    };

    useEffect(() => {
        // Animar el fondo de blanco a negro
        gsap.to(".hero", {
            backgroundColor: "#000000", // Cambiar el fondo a negro
            duration: 1.5, // Duración de la animación
            ease: "power2.inOut", // Efecto de la animación
        });

        // Animar el gradiente de opacidad 0 a 1
        gsap.to(".hero-img", {
            opacity: 1, // Cambiar la opacidad a 1
            duration: 1.5, // Duración de la animación
            delay: 1.5, // Retardar la animación para que suceda después de que el fondo cambie
            ease: "power2.inOut", // Efecto de la animación
        });

        gsap.to(".image", {
            opacity: 1, // Cambiar la opacidad a 1
            duration: 1.5, // Duración de la animación
            delay: 1, // Retardar la animación para que suceda después de que el fondo cambie
            ease: "power2.inOut", // Efecto de la animación
        });

        gsap.to(".text-container", {
            opacity: 1, // Cambiar la opacidad a 1
            duration: 1.5, // Duración de la animación
            delay: 1, // Retardar la animación para que suceda después de que el fondo cambie
            ease: "power2.inOut", // Efecto de la animación
        });
    }, []);

    return (
        <div className="container hero-out">
            <section className="hero" id="hero">
                <div className="hero-img"><img src={Grad} alt="Gradiant" /></div>
                <div className="background">
                    <div className="container-content">
                        <div className="content">
                            <div className="image-container">
                                <img
                                    alt="Two smartphones displaying a modern online store interface"
                                    className="image"
                                    src={mockupUno}
                                />
                            </div>
                            <div className="text-container">
                                <h1 className="main-title">TU TIENDA ONLINE</h1>
                                <div className="features">
                                    <div className="feature">
                                        <FontAwesomeIcon icon={faCreditCard} className="icon" />
                                        <p>FORMAS DE PAGO</p>
                                    </div>
                                    <div className="feature">
                                        <FontAwesomeIcon icon={faPercent} className="icon" />
                                        <p>SIN COMISIONES</p>
                                    </div>
                                    <div className="feature">
                                        <FontAwesomeIcon icon={faChartLine} className="icon" />
                                        <p>ANALITICAS</p>
                                    </div>
                                </div>
                                <p className="description">
                                    Nos encargamos de hacerte una <span className="bold">página web moderna</span>,
                                    con tres formas de pago, que muestre el verdadero potencial de tu
                                    producto o servicio y que venda por vos{" "}
                                    <span className="bold">mientras dormís</span>.
                                </p>
                                <h2 className="price-dashed">PRECIO ANTES: <span>$500.000</span></h2>
                                <h2 className="price">AHORA: $400.000</h2>
                                <div className="botones">
                                    <button className="service-button" onClick={handleAddToCart}><FontAwesomeIcon icon={faCartShopping} /> CONTRATAR SERVICIO</button>
                                    <button
                                        className="service-button"
                                        onClick={() => {
                                            window.open(
                                                "https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20pedir%20otra%20cotización.&type=phone_number&app_absent=0",
                                                "_blank",
                                                "noopener,noreferrer"
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faWhatsapp} /> PEDIR OTRA COTIZACIÓN
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero;