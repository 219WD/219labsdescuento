import React from 'react';
import './css/PlanCard.css';
import usePricing from '../hooks/useGsapPricing';

const PlanCard = ({ title, price, description, features, addToCart }) => {
  const handleAddToCart = () => {
    addToCart({ title, price, description, features });
  };

  usePricing();
  return (
    <div className="plan">
      <div className="inner">
        <span className="pricing">
          <span>
            ${price}
          </span>
        </span>
        <p className="title">{title}</p>
        <p className="descrip">{description}</p>
        <ul className="features">
          {features.map((feature, index) => (
            <li key={index}>
              <span className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    fill="currentColor"
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                  ></path>
                </svg>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="action">
          <button className="button" onClick={handleAddToCart}>
            Contratar Plan
          </button>
        </div>
      </div>
    </div>
  );
};

const PlanCardList = () => {
  const plans = [
    {
      title: 'Basico',
      price: 300000,
      description: 'Perfecto para arrancar con tu negocio o proyecto personal.',
      features: ['30 productos', '3 formas de pago', 'Código QR', 'Botones a Whatsapp', 'Link a Redes Sociales', 'Mapa e información', 'Soporte 24/7', 'Sin comisiones', 'Dominio gratis'],
    },
    {
      title: 'Premium',
      price: 500000,
      description:
        'Perfecto para empresas que buscan crecer y expandirse con una presencia online impactante.',
      features: ['200 productos', '3 formas de pago', 'Página de producto', 'Personalizacion total', 'Código QR', 'Botones a Whatsapp', 'Link a Redes Sociales', 'Mapa e información', 'Soporte 24/7', 'Sin comisiones', 'Dominio gratis',],
    },
    {
      title: 'Pro',
      price: 1000000,
      description: 'Perfecto para una marca ya consolidada que busca expandirse y llegar a más clientes sin depender de terceros.',
      features: ['Productos ilimitados', 'Autoadministrable', '3 formas de pago', 'Página de producto', 'Página acerca de nosotros', 'Panel de administrador', 'Analíticas', 'Registo/Inicio de sesión', 'Personalizacion total', 'Código QR', 'Botones a Whatsapp', 'Link a Redes Sociales', 'Mapa e información', 'Soporte 24/7', 'Sin comisiones', 'Dominio gratis',],
    },
  ];

  return (
    <div className="container planes">
      <h2 className='title-pricing'>Nuestros Planes</h2>
      <div className="plans-container">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;
