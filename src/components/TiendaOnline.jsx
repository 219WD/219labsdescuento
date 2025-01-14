import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCreditCard, 
  faPercent, 
  faChartLine 
} from "@fortawesome/free-solid-svg-icons";
import "./TiendaOnline.css";

const TiendaOnline = () => {
  return (
    <div className="background">
      <div className="container">
        <div className="content">
          <div className="image-container">
            <img
              alt="Two smartphones displaying a modern online store interface"
              className="image"
              src="https://placehold.co/300x600"
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
            <h2 className="price">PRECIO: $400.000</h2>
            <button className="service-button">CONTRATAR SERVICIO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaOnline;
