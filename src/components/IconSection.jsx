import React from 'react';
import Service from './Service';
import { faCreditCard, faShippingFast, faHome, faBoxOpen, faQrcode, faPercent, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './css/IconSection.css';

const IconSection = () => {
    return (
        <section className="services">
            <div className="service-icons">
                <Service icon={faCreditCard} description="Formas de pago" size={4} />
                <Service icon={faPercent} description="Sin comisiones" size={4} />
                <Service icon={faChartLine} description="Analíticas" size={4} />
                <Service icon={faBoxOpen} description="Página de Producto" size={4} />
                <Service icon={faQrcode} description="Carta QR" size={4} />
            </div>
        </section>
    );
};

export default IconSection;