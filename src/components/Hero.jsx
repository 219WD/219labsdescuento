import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './css/Hero.css'
import Grad from '../assets/grad.webp'
import mockupUno from '../assets/mockupHero.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPercent, faChartLine, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Hero = ({ addToCart }) => {
    const [specialProduct, setSpecialProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/landing/getLanding')
            .then(response => response.json())
            .then(data => setSpecialProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, []);

    const handleAddToCart = () => {
        if (specialProduct) {
            addToCart(specialProduct);
        }
    };

    useEffect(() => {
        gsap.to(".hero", { backgroundColor: "#000000", duration: 1.5, ease: "power2.inOut" });
        gsap.to(".hero-img", { opacity: 1, duration: 1.5, delay: 1.5, ease: "power2.inOut" });
        gsap.to(".image", { opacity: 1, duration: 1.5, delay: 1, ease: "power2.inOut" });
        gsap.to(".text-container", { opacity: 1, duration: 1.5, delay: 1, ease: "power2.inOut" });
    }, []);

    return (
        <div className="container hero-out">
            <section className="hero" id="hero">
                <div className="hero-img"><img src={Grad} alt="Gradiant" /></div>
                <div className="background">
                    <div className="container-content">
                        <div className="content">
                            <div className="image-container">
                                <img alt="Two smartphones displaying a modern online store interface" className="image" src={specialProduct ? specialProduct.image : mockupUno} />
                            </div>
                            <div className="text-container">
                                {specialProduct && (
                                    <>
                                        <h1 className="main-title">{specialProduct.title}</h1>
                                        <div className="features">
                                            <div className="feature"><FontAwesomeIcon icon={faCreditCard} className="icon" /><p>FORMAS DE PAGO</p></div>
                                            <div className="feature"><FontAwesomeIcon icon={faPercent} className="icon" /><p>SIN COMISIONES</p></div>
                                            <div className="feature"><FontAwesomeIcon icon={faChartLine} className="icon" /><p>ANALITICAS</p></div>
                                        </div>
                                        <p className="description">
                                            {specialProduct.description}
                                        </p>
                                        <h2 className="price-dashed">PRECIO ANTES: <span>{specialProduct.oldPrice}</span></h2>
                                        <h2 className="price">AHORA: ${specialProduct.newPrice}</h2>
                                    </>
                                )}
                                <div className="botones">
                                    <button className="service-button" onClick={handleAddToCart}><FontAwesomeIcon icon={faCartShopping} /> CONTRATAR SERVICIO</button>
                                    <button className="service-button" onClick={() => window.open("https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20pedir%20otra%20cotización.&type=phone_number&app_absent=0", "_blank", "noopener,noreferrer")}>
                                        <FontAwesomeIcon icon={faWhatsapp} /> PEDIR OTRA COTIZACIÓN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;
