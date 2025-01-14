import React from 'react'
import './TripleSection.css'
import photo1 from '../assets/mockupTriple.png'
import photo2 from '../assets/mockupMac.png'
import photo3 from '../assets/mockupCelulares.png'
import useTriple from '../hooks/useGsapTripleSection'

const TripleSection = () => {
    useTriple();
    return (
        <div className='container tripleSection'>
            <section className='triple'>
                <div className="first">
                    <div className="txt-triple">
                        <h3>Tres formas de pago</h3>
                        <p>Con nuestro ecommerce, entiende a tus clientes y mejora su experiencia ofreciendo formas de pago. Facilita sus compras con tres opciones de pago: efectivo, transferencia y Mercado Pago.</p>
                    </div>
                    <img src={photo1} alt="mockup" />
                </div>
                <div className="second">
                    <div className="txt-triple">
                        <h3>Motores de búsqueda</h3>
                        <p>Optimizamos tu página para posicionarla en los principales buscadores, aumentando su relevancia y visibilidad. Con estrategias de SEO, tu sitio alcanzará más usuarios, logrando que te encuentren fácilmente en internet.</p>
                    </div>
                    <img src={photo2} alt="mockup" />
                </div>
                <div className="third">
                    <div className="txt-triple">
                        <h3>El 70% de los argentinos compran desde el celu</h3>
                        <p>Con un diseño responsive, tu tienda online se adapta perfectamente a cualquier dispositivo, asegurando una experiencia de compra fluida desde celulares, tablets o computadoras. Con esta optimización, tus clientes pueden navegar y comprar cómodamente desde donde sea, disfrutando de un acceso rápido y eficiente.
                        </p>
                    </div>
                    <img src={photo3} alt="mockup" />
                </div>
            </section>
        </div>
    )
}

export default TripleSection