import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const CartTotal = ({ total, onPayClick }) => (
  <div className="cart-total">
    <p>Total: ${total.toFixed(2)}</p>
    <button className="pay-button" onClick={onPayClick}>
      <FontAwesomeIcon icon={faMoneyBillTransfer} /> Pagar
    </button>
  </div>
);

export default CartTotal;
